const vertexShaderSource = `#version 310 es

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

const fragmentShaderSource = `#version 310 es

precision mediump float;

in vec4 v_color;


out vec4 outColor;

void main() {
  // outColor = v_color;
  outColor = vec4(0.5,0.8,0.6,1.);
}
`;
const computeShaderSource = `#version 310 es
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

export { vertexShaderSource, fragmentShaderSource, computeShaderSource };
