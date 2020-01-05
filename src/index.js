import "./styles.css";
import { m4 } from "./m4.js";
import { setGeometry, geometryF } from "./setGeometry";
import { setColors } from "./setColors";
import { makeBuffer } from "./utils";
import {
  vertexShaderSource,
  fragmentShaderSource,
  computeShaderSource
} from "./shaders.js";
function radToDeg(r) {
  return (r * 180) / Math.PI;
}
function degToRad(d) {
  return (d * Math.PI) / 180;
}

("use strict");
// You can either biond VAO or Buffer

document.getElementById("app").innerHTML = `<h1>Hello Vanilla!</h1>`;


const NUM_PARTICLES = 1000;

function main() {
  // Get A WebGL context
function checkErorrs(gl,ctx){
  const e = gl.getError()
  if (e !== gl.NO_ERROR){
    console.log("ERROR: " + ctx)
    console.log(e)
  }

}
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("canvas");
  const WIDTH = canvas.width
  const HEIGHT = canvas.height

  const gl = canvas.getContext("webgl2-compute", {antialias: false});
  if (!gl) {
    return;
  }

  // ----------- SHADERS ----------- //

  const programParticles = webglUtils.createProgramFromSources(gl, [
    vertexShaderSource,
    fragmentShaderSource
  ]);
  
  const computeShader = gl.createShader(gl.COMPUTE_SHADER);
  gl.shaderSource(computeShader, computeShaderSource);
  gl.compileShader(computeShader);

  if (!gl.getShaderParameter(computeShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(computeShader));
    console.log("error compiling shader")
    // return null;
  }

  const computeProgram = gl.createProgram()
  gl.attachShader(computeProgram, computeShader)
  gl.linkProgram(computeProgram)

  if (!gl.getProgramParameter(computeProgram,gl.LINK_STATUS)){
    console.log("error linking shader")
  }


  const texture = gl.createTexture()

  // make texture
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA8,NUM_PARTICLES, 1)
  gl.bindImageTexture(0, texture, 0, false, 0, gl.READ_WRITE, gl.RGBA8) // bind for writing

  // make framebuffer to read from texture
  const frameBuffer = gl.createFramebuffer()
  gl.bindFramebuffer(gl.READ_FRAMEBUFFER, frameBuffer)
  gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture,0)
  
  checkErorrs(gl, "Texture problem")


  gl.useProgram(computeProgram)
  gl.uniform1i(gl.getUniformLocation(computeProgram, "distTex"), 0) // bind texture 0 

  gl.dispatchCompute(NUM_PARTICLES, 1,1)
  gl.memoryBarrier(gl.SHADER_IMAGE_ACCESS_BARRIER_BIT)

  gl.blitFramebuffer(
    0, 0, NUM_PARTICLES, 1,
    0, 0, WIDTH, HEIGHT,
    gl.COLOR_BUFFER_BIT, gl.NEAREST);


  // const array = new Float32Array(NUM_PARTICLES)
  // const ssbo = gl.createBuffer()
  // gl.bindBuffer(gl.SHADER_STORAGE_BUFFER, ssbo)
  // gl.bufferData(gl.SHADER_STORAGE_BUFFER,array, gl.DYNAMIC_COPY)
  // gl.bindBufferBase(gl.SHADER_STORAGE_BUFFER, 0, ssbo)




  // ----------- ATTRIBUTES ----------- //

  // var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  // var pointsAttributeLocation = gl.getAttribLocation(program, "a_points");

  var colorLocation = gl.getUniformLocation(programParticles, "u_color");
  var matrixLocation = gl.getUniformLocation(programParticles, "u_matrix");
  var fudgeLocation = gl.getUniformLocation(programParticles, "u_fudgeFactor");
  var colorAttributeLocation = gl.getAttribLocation(programParticles, "a_color");

  // ----------- BUFFERS ----------- //

  var vaoP = gl.createVertexArray();
  gl.bindVertexArray(vaoP);

  const pBuffer = makeBuffer(
    gl,
    "a_position",
    programParticles,
    3,
    gl.GL_FLOAT,
    false,
    0,
    0,
    geometryF
  );

  var translation = [45, 150, 0];
  var rotation = [degToRad(40), degToRad(25), degToRad(325)];
  var scale = [1, 1, 1];
  var color = [Math.random(), Math.random(), Math.random(), 1];



  drawParticles();

  webglLessonsUI.setupSlider("#x", {
    value: translation[0],
    slide: updatePosition(0),
    max: gl.canvas.width
  });

  function updatePosition(index) {
    return function(event, ui) {
      translation[index] = ui.value;
      drawScene();
    };
  }
  // ----------- DRAW ----------- //


  function drawParticles() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    gl.bindVertexArray(vaoP);

    const left = 0;
    const right = gl.canvas.clientWidth;
    const bottom = gl.canvas.clientHeight;
    const top = 0;
    const near = 400;
    const far = -400;
    let matrix = m4.orthographic(left, right, bottom, top, near, far);
    matrix = m4.translate(
      matrix,
      translation[0],
      translation[1],
      translation[2]
    );
    matrix = m4.xRotate(matrix, rotation[0]);
    matrix = m4.yRotate(matrix, rotation[1]);
    matrix = m4.zRotate(matrix, rotation[2]);
    matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);

    
    for (let i = 0; i < NUM_PARTICLES; i++) {
      gl.useProgram(programParticles)
      gl.uniform1i(gl.getUniformLocation(programParticles, "u_distTex"), 0) // bind texture 0 
      gl.uniformMatrix4fv(matrixLocation, false, matrix);
      gl.uniform1i(gl.getUniformLocation(programParticles, "u_particleId"), i);
      gl.uniform1i(gl.getUniformLocation(programParticles, "u_particleCount"), NUM_PARTICLES);
      
      var offset = 0;
      var count = 16 * 6;
      gl.drawArrays(gl.POINTS, offset, count);

    }

  }
  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // gl.bindVertexArray(vaoF);
    gl.uniform4fv(colorLocation, color);

    var fudgeFactor = 0;
    // gl.uniform1f(fudgeLocation, fudgeFactor);

    var left = 0;
    var right = gl.canvas.clientWidth;
    var bottom = gl.canvas.clientHeight;
    var top = 0;
    var near = 400;
    var far = -400;
    var matrix = m4.orthographic(left, right, bottom, top, near, far);
    // var matrix = m4.projection(
    //   gl.canvas.clientWidth,
    //   gl.canvas.clientHeight,
    //   400
    // );
    matrix = m4.translate(
      matrix,
      translation[0],
      translation[1],
      translation[2]
    );
    matrix = m4.xRotate(matrix, rotation[0]);
    matrix = m4.yRotate(matrix, rotation[1]);
    matrix = m4.zRotate(matrix, rotation[2]);
    matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);

    gl.useProgram(programParticles);
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;
    gl.drawArrays(gl.POINTS, offset, count);
    // gl.drawArrays(primitiveType, offset, count);
  }
}


function setupCompute () {

}
window.addEventListener('DOMContentLoaded', main)
// main();
