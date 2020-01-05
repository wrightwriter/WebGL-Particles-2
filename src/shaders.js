import {NUM_PARTICLES} from './index'
export let vertexShaderSource = `#version 310 es


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
  //vec4 position = u_matrix * a_position;

  // float id = float(u_particleId);
  float particleCount = float(u_particleCount);
  // float fracId = id/particleCount;

  Particle t = Particle(particle,particleVelocity);
  // t *= 0.1;
  // float t =   imageLoad(u_distTex,ivec2(u_particleId,0)).x;
  // vec4 position = u_matrix * vec4(0. + sin(t.x)*1000. + fracId*u_resolution.x + u_positionMouse.x*u_resolution.y,0. + fracId*u_resolution.y ,1.,1.);
  // vec4 position = u_matrix * vec4(0. + 1.*t.x*u_resolution.y + u_positionMouse.x*u_resolution.y,0. + t.y*u_resolution.y ,1.,1.);
  vec4 position = u_matrix * vec4(0. + t.position.x*u_resolution.x,u_resolution.y-t.position.y*u_resolution.y,0.,1.);
  
  float zToDivideBy = 1.;
  gl_PointSize = 10.0;
  // v_color = a_color;
  v_color = vec4(1);
  gl_Position = vec4(position.xy / zToDivideBy, position.zw);
}
`;

export const fragmentShaderSource = `#version 310 es

precision mediump float;

in vec4 v_color;

out vec4 outColor;


void main() {
  // outColor = v_color;
  outColor = vec4(0,0,1,1.);
}
`;
export const computeShaderSource = `#version 310 es
  layout (local_size_x = 1, local_size_y = 1, local_size_z = 1) in;

  struct Particle {
    vec3 position;
    vec3 velocity;
  };

  layout (std430, binding = 0) buffer SSBO {
    vec3 position[${1000}]; // TODO: make this an import
    vec3 velocity[${1000}];
  } ssbo;

  uniform vec2 u_resolution;
  uniform vec2 u_positionMouse;
  uniform int u_particleCount;
  uniform float u_timeElapsed;
  void main() {
    ivec2 posGlobal = ivec2(gl_GlobalInvocationID.xy);

    // Particle previous = ssbo.particle[posGlobal.x];
    // Particle previous = Particle(ssbo.position[posGlobal.x], ssbo.velocity[posGlobal.x]);
    Particle previous = Particle(vec3(1), vec3(1));
    Particle next = previous;

    vec2 positionMouse = u_positionMouse ;
    vec2 directionMouse = normalize(positionMouse - previous.position.xy );


    if (u_timeElapsed <=  0.) {
      ssbo.position[posGlobal.x] = vec3(0.5,0.5,1);
      ssbo.velocity[posGlobal.x] = vec3(0.5,0.5,1);
    } else {
      next.position.x = min(max(previous.position.x, 0.), 1.);
      next.position.y = min(max(previous.position.y, 0.), 1.);

      next.position.xy += directionMouse*0.009;

      ssbo.position[posGlobal.x] = next.position;
      ssbo.velocity[posGlobal.x] = next.velocity;
      // ssbo.data[posGlobal.x] = vec3(positionMouse, 0);
      // ssbo.data[posGlobal.x] = vec3(0.5,-0.5,1);
    }

  }


`;
export const computeShaderSourceOld = `#version 310 es
  layout (local_size_x = ${1}, local_size_y = 1, local_size_z = 1) in;

  // layout (std140, binding = 0) buffer SSBOIn {
  //   Boids data[];
  //  } ssboIn;

  struct Particle {
    vec3 position;
    vec3 velocity;
  }
  // shared Particle sharedData[${10}];

  void main () {
    uint localThreadID = gl_LocallInvocationID.x;
    uint globalThreadID = gl_GlobalInvocationID.x;
    uint workGroupSize = gl_WorkGroupSize.x;
  }


`;

// export let fragmentShaderSource = `#version 310 es

// precision mediump float;

// // Passed in and varied from the vertex shader.
// in vec3 v_normal;

// uniform vec3 u_reverseLightDirection;
// uniform vec4 u_color;

// // we need to declare an output for the fragment shader
// out vec4 outColor;

// void main() {
//   // because v_normal is a varying it's interpolated
//   // so it will not be a uint vector. Normalizing it
//   // will make it a unit vector again
//   vec3 normal = normalize(v_normal);

//   // compute the light by taking the dot product
//   // of the normal to the light's reverse direction
//   float light = dot(normal, u_reverseLightDirection);

//   outColor = u_color;

//   // Lets multiply just the color portion (not the alpha)
//   // by the light
//   outColor.rgb *= light;
// }
// `;
