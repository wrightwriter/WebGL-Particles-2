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
  this.gl = gl
  if (!gl) {
    return;
  }

  // ----------- SHADERS ----------- //

  const programDrawParticles = webglUtils.createProgramFromSources(gl, [
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

  const programCompute = gl.createProgram()
  gl.attachShader(programCompute, computeShader)
  gl.linkProgram(programCompute)

  if (!gl.getProgramParameter(programCompute,gl.LINK_STATUS)){
    console.log("error linking shader")
  }


  const texture = gl.createTexture()

  // make texture
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA32F,NUM_PARTICLES, 1)
  gl.bindImageTexture(0, texture, 0, false, 0, gl.WRITE_ONLY, gl.RGBA8) // bind for writing

  // gl.activeTexture(gl.TEXTURE1)
  // gl.bindTexture(gl.TEXTURE_2D, texture)
  // gl.bindImageTexture(0, texture, 0, false, 0, gl.READ_ONLY, gl.RGBA8) // bind for writing

  // make framebuffer to read from texture
  gl.activeTexture(gl.TEXTURE0)
  const frameBuffer = gl.createFramebuffer()
  gl.bindFramebuffer(gl.READ_FRAMEBUFFER, frameBuffer)
  gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture,0)
  
  checkErorrs(gl, "Texture problem")




  // const array = new Float32Array(NUM_PARTICLES)
  // const ssbo = gl.createBuffer()
  // gl.bindBuffer(gl.SHADER_STORAGE_BUFFER, ssbo)
  // gl.bufferData(gl.SHADER_STORAGE_BUFFER,array, gl.DYNAMIC_COPY)
  // gl.bindBufferBase(gl.SHADER_STORAGE_BUFFER, 0, ssbo)




  // ----------- ATTRIBUTES ----------- //

  // var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  // var pointsAttributeLocation = gl.getAttribLocation(program, "a_points");

  var colorLocation = gl.getUniformLocation(programDrawParticles, "u_color");
  var matrixLocation = gl.getUniformLocation(programDrawParticles, "u_matrix");
  var fudgeLocation = gl.getUniformLocation(programDrawParticles, "u_fudgeFactor");
  var colorAttributeLocation = gl.getAttribLocation(programDrawParticles, "a_color");

  // ----------- BUFFERS ----------- //

  var vaoP = gl.createVertexArray();
  gl.bindVertexArray(vaoP);

  const pBuffer = makeBuffer(
    gl,
    "a_position",
    programDrawParticles,
    3,
    gl.GL_FLOAT,
    false,
    0,
    0,
    geometryF
  );

  var translation = [0, 0, 0];
  var rotation = [degToRad(0), degToRad(0), degToRad(0)];
  var scale = [1, 1, 1];
  var color = [Math.random(), Math.random(), Math.random(), 1];

  this.positionMouse = {x: 0, y:0}

  window.addEventListener('mousemove', e => {
    getMousePosition.call(this, e)
  })

  this.timePrevious = new Date().getTime()
  this.timeNext = this.timePrevious
  this.timeDelta = 0
  this.timeElapsed = 0
  this.timeStarted = this.timePrevious

  setInterval(()=>{
    runCompute.call(this)
    drawParticles.call(this)
    this.timeNext = new Date().getTime()
    this.timeDelta = this.timeNext - this.timePrevious
    this.timeElapsed += this.timeDelta
    this.timePrevious = this.timeNext
  }, 1)

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
  // ----------- RUN ----------- //

  function runCompute () {
    gl.useProgram(programCompute)
    gl.uniform1i(gl.getUniformLocation(programCompute, "distTex"), 0) // bind texture 0 
    // gl.uniform1i(gl.getUniformLocation(programCompute, "sampleTex"), 1) // bind texture 0 
    gl.uniform2fv(gl.getUniformLocation(programCompute, "u_resolution"), new Float32Array([gl.canvas.clientWidth, gl.canvas.clientHeight]));
    gl.uniform2fv(gl.getUniformLocation(programCompute, "u_positionMouse"), new Float32Array([this.positionMouse.x, this.positionMouse.y]));
    gl.uniform1i(gl.getUniformLocation(programCompute, "u_particleCount"), NUM_PARTICLES);
    gl.uniform1f(gl.getUniformLocation(programCompute, "u_timeElapsed"), this.timeElapsed);

    gl.dispatchCompute(NUM_PARTICLES, 1,1)
    gl.memoryBarrier(gl.SHADER_IMAGE_ACCESS_BARRIER_BIT)

  }
  function drawParticles() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);




    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    // gl.clearColor(0, 0, 0, 0);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


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
      gl.useProgram(programDrawParticles)
      gl.uniform1i(gl.getUniformLocation(programDrawParticles, "u_distTex"), 0) // bind texture 0 
      gl.uniformMatrix4fv(matrixLocation, false, matrix);
      gl.uniform1i(gl.getUniformLocation(programDrawParticles, "u_particleId"), i);
      gl.uniform1i(gl.getUniformLocation(programDrawParticles, "u_particleCount"), NUM_PARTICLES);
      gl.uniform2fv(gl.getUniformLocation(programDrawParticles, "u_resolution"), new Float32Array([gl.canvas.clientWidth, gl.canvas.clientHeight]));
      gl.uniform2fv(gl.getUniformLocation(programDrawParticles, "u_positionMouse"), new Float32Array([this.positionMouse.x, this.positionMouse.y]));
      
      var offset = 0;
      var count = 16 * 6;
      gl.drawArrays(gl.POINTS, offset, count);

    } 
    gl.blitFramebuffer(
      0, 0, NUM_PARTICLES, 1,
      0, 0, WIDTH, HEIGHT,
      gl.COLOR_BUFFER_BIT, gl.NEAREST);

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

    gl.useProgram(programDrawParticles);
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;
    gl.drawArrays(gl.POINTS, offset, count);
    // gl.drawArrays(primitiveType, offset, count);
  }
}


function getRelativeMousePosition(event, target) {
  target = target || event.target;
  var rect = target.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

function getMousePosition(e) {
  const pos = getNoPaddingNoBorderCanvasRelativeMousePosition(e, this.gl.canvas);

  // pos is in pixel coordinates for the canvas.
  // so convert to WebGL clip space coordinates
  const x = pos.x / this.gl.canvas.width  *  2 - 1;
  const y = pos.y / this.gl.canvas.height * -2 + 1;


  this.positionMouse = {
    x: x,
    y: y
  }
}
// assumes target or event.target is canvas
function getNoPaddingNoBorderCanvasRelativeMousePosition(event, target) {
  target = target || event.target;
  var pos = getRelativeMousePosition(event, target);

  pos.x = pos.x * target.width  / target.clientWidth;
  pos.y = pos.y * target.height / target.clientHeight;

  return pos;  
}

function setupCompute () {

}
window.addEventListener('DOMContentLoaded', main)
// main();
