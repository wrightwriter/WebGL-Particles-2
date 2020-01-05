export let vertexShaderSource = `#version 300 es

in vec4 a_position;
// in vec4 a_color;

uniform mat4 u_matrix;
uniform float u_fudgeFactor;
uniform sampler2D u_distTex;
uniform int u_particleId;
uniform int u_particleCount;

out vec4 v_color;

void main() {
  //vec4 position = u_matrix * a_position;

  float id = float(u_particleId);
  float count = float(u_particleCount);
  float t =   texture(u_distTex,vec2(id/count,1)).x;
  vec4 position = u_matrix * vec4(45.  + t*100.,150,0.6,1);
  
  //position.x *= 0.5;
  // float zToDivideBy = 1.0 + position.z * u_fudgeFactor;
  float zToDivideBy = 1.;
  gl_PointSize = 3.0;
  // v_color = a_color;
  v_color = vec4(1);
  gl_Position = vec4(position.xy / zToDivideBy, position.zw);
}
`;

export const fragmentShaderSource = `#version 300 es

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
  layout (rgba8, binding = 0) writeonly uniform highp image2D destTex;

  void main() {
    ivec2 posGlobal = ivec2(gl_GlobalInvocationID.xy);
    //imageStore(destTex, storePos, vec4(vec2(gl_WorkGroupID.xy) / vec2(gl_NumWorkGroups.xy), 0.0, 1.0));
  }

`;
export const computeShaderSourceOld = `#version 310 es
  layout (local_size_x = ${10}, local_size_y = 1, local_size_z = 1) in;

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
