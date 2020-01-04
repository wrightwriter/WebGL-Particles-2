export let vertexShaderSource = `#version 300 es

in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;
uniform float u_fudgeFactor;

out vec4 v_color;

void main() {
  vec4 position = u_matrix * a_position;

  
  //position.x *= 0.5;
  float zToDivideBy = 1.0 + position.z * u_fudgeFactor;
  gl_PointSize = 3.0;
  v_color = a_color;
  gl_Position = vec4(position.xy / zToDivideBy, position.zw);
}
`;

export const fragmentShaderSource = `#version 300 es

precision mediump float;

in vec4 v_color;

out vec4 outColor;

void main() {
  // outColor = v_color;
  outColor = vec4(0.5,0.8,0.6,1.);
}
`;
export let computeShaderSource = `#version 310 es
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
    uint threadID = gl_GlobalInvocationID.x;
    


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
