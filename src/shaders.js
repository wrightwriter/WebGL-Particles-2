import {NUM_PARTICLES} from './vars'

export const vertexShaderRectangleSource = `#version 310 es
in vec4 a_position;

uniform mat4 u_matrix;
uniform float u_fudgeFactor;
uniform vec2 u_resolution;

out vec4 v_color;
out vec4 v_position;

void main() {

  vec4 position = u_matrix * a_position;
  float zToDivideBy = 1.;
  v_color = vec4(1,1,1,1.);
  v_position = a_position;
  gl_Position = vec4(position.xy / zToDivideBy, position.zw);
}

`
export const fragmentShaderRectangleSource = `#version 310 es
precision highp float;
in vec4 v_color;
in vec4 v_position;
out vec4 outColor;

uniform vec2 u_resolution;
uniform sampler2D u_previousFrame;
uniform sampler2D u_currFrame;

void main() {
  vec2 uv = v_position.xy/u_resolution;

  uv *= 1.0;
  uv.y = 1. - uv.y;

  outColor = vec4(0,0,0,1);
  vec3 previous =  texture(u_previousFrame,uv).xyz;
  vec3 curr =  texture(u_currFrame,uv).xyz;

  outColor.xyz += previous*1. + curr*1.0;
}
`;
export const vertexShaderSource = `#version 310 es


in vec4 a_position;
// in vec4 a_color;

// layout (rgba8, binding = 0) uniform readonly highp image2D u_distTex;

uniform mat4 u_matrix;
uniform float u_fudgeFactor;
// uniform sampler2D u_distTex;
uniform int u_particleId;
uniform int u_particleCount;
uniform vec2 u_resolution;
uniform vec2 u_positionMouse;

// layout (std430, binding = 0) buffer SSBO {
//   vec3 data[];
// } ssbo;
struct Particle {
  vec3 position;
  vec3 velocity;
};
layout (location = 0) in vec3 particle;
layout (location = 1) in vec3 particleVelocity;

out vec4 v_color;

void main() {
  float particleCount = float(u_particleCount);

  Particle t = Particle(particle,particleVelocity);

  vec4 position = u_matrix * vec4(0. + t.position.x*u_resolution.x,u_resolution.y-t.position.y*u_resolution.y,1.,1.);
  // vec4 position = u_matrix * vec4(0. + u_positionMouse.x*u_resolution.x,u_resolution.y-t.position.y*u_resolution.y,1.,1.);
  
  float zToDivideBy = 1.;
  gl_PointSize = 4.0;
  v_color = vec4(particleVelocity,1.);
  gl_Position = vec4(position.xy / zToDivideBy, position.zw);
}
`;

export const fragmentShaderSource = `#version 310 es

precision mediump float;

in vec4 v_color;

out vec4 outColor;


void main() {
  // outColor = v_color;
  vec2 uv = 2.*gl_PointCoord - 1.;

  float r = 1.;
  outColor = vec4(v_color.x,v_color.y,1,1.) * smoothstep(r, r*0.99, length(uv));
}
`;
export const computeShaderSource = `#version 310 es
  layout (local_size_x = 1, local_size_y = 1, local_size_z = 1) in;

  struct Particle {
    vec3 position;
    vec3 velocity;
  };

  layout (std430, binding = 0) buffer SSBO {
    vec3 position[${NUM_PARTICLES}]; // TODO: make this an import
    vec3 velocity[${NUM_PARTICLES}];
  } ssbo;

  uniform vec2 u_resolution;
  uniform vec2 u_positionMouse;
  uniform float u_mousePressed;
  uniform int u_particleCount;
  uniform float u_timeElapsed;
  uniform float u_avoidance;
  uniform vec2 u_gravity;
  

  float r11(float i) {return fract(sin(i*212.12)*124.41);}
  vec3 r13(float i) {return vec3( r11(i), r11(i*2.4), r11(i*1.57));} 

  void main() {
    ivec2 posGlobal = ivec2(gl_GlobalInvocationID.xy);

    // Particle previous = ssbo.particle[posGlobal.x];
    // Particle previous = Particle(ssbo.position[posGlobal.x], ssbo.velocity[posGlobal.x]);
    Particle previous = Particle(ssbo.position[posGlobal.x], ssbo.velocity[posGlobal.x]);
    Particle next = previous;

    vec2 positionMouse = u_positionMouse ;
    vec2 directionMouse = normalize(positionMouse - previous.position.xy );


    if (u_timeElapsed <=  20.) {
      // ssbo.position[posGlobal.x] = vec3(0.5,0.5,1);
      ssbo.position[posGlobal.x] = r13(float(posGlobal.x) + 1.);
      ssbo.position[posGlobal.x].z = 1.;
      // ssbo.velocity[posGlobal.x] = vec3(0);
    } else {
      // -- bounds -- //
      if (previous.position.x < 0.) {
        previous.velocity.x = -1.*abs(previous.velocity.x);
      }
      if (previous.position.x > 1.){
        previous.velocity.x = 1.*abs(previous.velocity.x);
      }
      if (previous.position.y < 0.) {
        previous.velocity.y = -1.*abs(previous.velocity.y);
      }
      if (previous.position.y > 1.) {
        previous.velocity.y = 1.*abs(previous.velocity.y);
      }
      
      // -- mouse -- //
      if (u_mousePressed == 1.) {
        previous.velocity.x -= directionMouse.x*0.0001;
        previous.velocity.y -= directionMouse.y*0.0003;
      }


      
      // -- avoidance -- //
      for (int i = 0; i < u_particleCount; i++) {
        vec3 otherPos = ssbo.position[int(i)];
        vec3 direction = normalize(otherPos - previous.position);
        float dis = length(otherPos - previous.position);
        previous.velocity += direction * exp(-dis*(200. - u_avoidance*190.))*0.0001;
      }

      // -- vortex -- //
      float frId = 10.*float(posGlobal.x)/float(u_particleCount);
      vec2 vortexPos = vec2(sin(frId + u_timeElapsed*0.001), cos(frId + u_timeElapsed*0.001))*0.5 + 0.5;
      vec2 vortexDir = normalize(vortexPos - previous.position.xy);
      // previous.velocity.xy -= vortexDir*0.0001;
      


      
      // -- damping -- //
      previous.velocity *= 0.99;
      // -- gravity -- //
      previous.velocity.xy -= u_gravity*0.0003;

      next.position -= previous.velocity;
      next.velocity = previous.velocity;

      // -- bounds -- //
      // if (next.position.y == 0.) {
      //   next.position.y = abs(next.position.y);        
      // }
      // next.position.y = max(next.position.y, 0.);
      // next.position.xy = max(min(next.position.xy, vec2(1.)), vec2(0));

      ssbo.position[posGlobal.x] = next.position;
      ssbo.velocity[posGlobal.x] = next.velocity;
    }

  }


`;

