import "./styles.css";
import { m4 } from "./m4.js";
import { setGeometry, geometryF } from "./setGeometry";
import { setColors } from "./setColors";
import { makeBuffer } from "./utils";
import { NUM_PARTICLES } from "./vars";
import {
  vertexShaderSource,
  fragmentShaderSource,
  vertexShaderRectangleSource,
  fragmentShaderRectangleSource,
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
  const programDrawScreen = webglUtils.createProgramFromSources(gl, [
    vertexShaderRectangleSource,
    fragmentShaderRectangleSource
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


  
  
  // ----------- BUFFERS ----------- //

  // SSBO
  const ssbo = gl.createBuffer()

  gl.bindBuffer(gl.SHADER_STORAGE_BUFFER, ssbo)
  gl.bufferData(gl.SHADER_STORAGE_BUFFER, new Float32Array(NUM_PARTICLES*6), gl.DYNAMIC_COPY)
  gl.bindBufferBase(gl.SHADER_STORAGE_BUFFER, 0, ssbo)

  // Current texture
  const texWidth = gl.canvas.clientWidth
  const texHeight = gl.canvas.clientHeight
  const currTex = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, currTex)
  
  {
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texWidth, texHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }
  
  const currentFrameBuffer = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, currentFrameBuffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, currTex, 0)
  
  // Draw texture
  const drawnTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, drawnTex)
  {
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texWidth, texHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }
  
  const drawnFrameBuffer = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, drawnFrameBuffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, drawnTex, 0)

  // Feedback texture
  const feedbackTex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, feedbackTex)
  {
    const data = null;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texWidth, texHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }
  
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, feedbackTex, 0)


  // const drawnFrameBufferFeedback = gl.createFramebuffer()
  // gl.bindFramebuffer(gl.FRAMEBUFFER, drawnFrameBufferFeedback)
  // gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, feedbackTex, 0)
  

  
  // gl.activeTexture(gl.TEXTURE1)
  // gl.bindTexture(gl.TEXTURE_2D, texture)
  // gl.bindImageTexture(0, texture, 0, false, 0, gl.READ_ONLY, gl.RGBA8) // bind for writing


  
  checkErorrs(gl, "SSBO problem")
  var vaoScreenRectangle = gl.createVertexArray()
  gl.bindVertexArray(vaoScreenRectangle)

  const rectangleGeometry = new Float32Array([
      0, gl.canvas.clientHeight, 0, 1.,
      gl.canvas.clientWidth, gl.canvas.clientHeight, 1, 1,
      0,0,1,1,
      gl.canvas.clientWidth, 0, 1,1,
    ])
  const rectangleBuffer = makeBuffer(
    gl,
    "a_position",
    programDrawScreen,
    4,
    gl.FLOAT,
    false,
    4*4,
    0,
    rectangleGeometry
  )

  
  var vaoP = gl.createVertexArray();
  gl.bindVertexArray(vaoP);
  
  const pBuffer = makeBuffer(
    gl,
    "a_position",
    programDrawParticles,
    1,
    gl.FLOAT,
    false,
    0,
    0,
    new Float32Array(NUM_PARTICLES)
    );
  // ----------- ATTRIBUTES ----------- //

  // var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  // var pointsAttributeLocation = gl.getAttribLocation(program, "a_points");

  var colorLocation = gl.getUniformLocation(programDrawParticles, "u_color");
  var matrixLocation = gl.getUniformLocation(programDrawParticles, "u_matrix");
  var fudgeLocation = gl.getUniformLocation(programDrawParticles, "u_fudgeFactor");
  var colorAttributeLocation = gl.getAttribLocation(programDrawParticles, "a_color");

  // ----------- SETUP ----------- //
  var translation = [0, 0, 0];
  var rotation = [degToRad(0), degToRad(0), degToRad(0)];
  var scale = [1, 1, 1];
  var color = [Math.random(), Math.random(), Math.random(), 1];

  this.state = {
    gravity: {
      x : 0.,
      y : 0.
    },
    timePrevious: new Date().getTime(),
    timeNext : this.timePrevious,
    timeDelta : 0,
    timeElapsed : 0,
    timeStarted : this.timePrevious,
    positionMouse : {x: 0, y:0},
    mousePressed : 0,
    avoidance : 0,
    formula : "vec2(sin(frId + u_timeElapsed*0.001), cos(frId + u_timeElapsed*0.001))",
  }
  const formulaInput = document.querySelector("#formula")
  formulaInput.addEventListener("oninput", e => {
    formulaInput.innerHTML = e.target.value
    this.state.formula = e.target.value
    gl.shaderSource(computeShader, computeShaderSource);
    gl.compileShader(computeShader);
  })

  document.body.onmousedown = e => {
    this.state.mousePressed = 1
  }
  document.body.onmouseup = e => {
    this.state.mousePressed = 0
  }
  window.addEventListener('mousemove', e => {
    getMousePosition.call(this, e)
  })



  runCompute.call(this) 

  // const result = new Float32Array(NUM_PARTICLES)
  // gl.getBufferSubData(gl.SHADER_STORAGE_BUFFER, 0, result)
  // console.log(result)

  setInterval(()=>{
    runCompute.call(this)
    drawParticles.call(this)
    drawScreen.call(this)
    this.state.timeNext = new Date().getTime()
    this.state.timeDelta = this.state.timeNext - this.state.timePrevious
    this.state.timeElapsed += this.state.timeDelta
    this.state.timePrevious = this.state.timeNext
  }, 1)

  webglLessonsUI.setupSlider("#x", {
    value: translation[0],
    slide: updatePosition(0),
    max: gl.canvas.width
  });
  webglLessonsUI.setupSlider("#gravity-x", {
    value: 500,
    slide: (e, ui) => {this.state.gravity.x = ui.value/1000 - 0.5},
    max: 1000
  });
  webglLessonsUI.setupSlider("#gravity-y", {
    value: 500,
    slide: (e, ui) => {this.state.gravity.y = ui.value/1000 - 0.5},
    max: 1000
  });
  webglLessonsUI.setupSlider("#avoidance", {
    value: 0,
    slide: (e, ui) => {this.state.avoidance = ui.value/1000},
    max: 1000
  });

  function updatePosition(index) {
    return function(event, ui) {
      translation[index] = ui.value;
      // drawScene();
    };
  }
  // ----------- RUN ----------- //

  function runCompute () {
    gl.useProgram(programCompute)
    gl.uniform2fv(gl.getUniformLocation(programCompute, "u_resolution"), new Float32Array([gl.canvas.clientWidth, gl.canvas.clientHeight]));
    gl.uniform2fv(gl.getUniformLocation(programCompute, "u_positionMouse"), new Float32Array([this.state.positionMouse.x, this.state.positionMouse.y]));
    gl.uniform2fv(gl.getUniformLocation(programCompute, "u_gravity"), new Float32Array([this.state.gravity.x, this.state.gravity.y]));
    gl.uniform1f(gl.getUniformLocation(programCompute, "u_avoidance"),  this.state.avoidance);
    gl.uniform1f(gl.getUniformLocation(programCompute, "u_mousePressed"), this.state.mousePressed);
    gl.uniform1i(gl.getUniformLocation(programCompute, "u_particleCount"), NUM_PARTICLES);
    gl.uniform1f(gl.getUniformLocation(programCompute, "u_timeElapsed"), this.state.timeElapsed);
    gl.dispatchCompute(NUM_PARTICLES, 1,1)
    gl.memoryBarrier(gl.SHADER_IMAGE_ACCESS_BARRIER_BIT)
  }
  let ping = 1
  function drawScreen() {
    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, null)

    gl.bindFramebuffer(gl.FRAMEBUFFER, drawnFrameBuffer)
    gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindVertexArray(vaoScreenRectangle);

    const left = 0;
    const right = gl.canvas.clientWidth;
    const bottom = gl.canvas.clientHeight;
    const top = 0;
    const near = 400;
    const far = -400;
    let matrix = m4.orthographic(left, right, bottom, top, near, far);

    gl.useProgram(programDrawScreen)
    // if (ping === 1) {
    //   gl.activeTexture(gl.TEXTURE1)
    //   gl.bindTexture(gl.TEXTURE_2D,drawnTex)
    //   gl.drawBuffers([ gl.COLOR_ATTACHMENT0])
    // } else {
    //   gl.activeTexture(gl.TEXTURE1)
    //   gl.bindTexture(gl.TEXTURE_2D,feedbackTex)
    //   gl.drawBuffers([ gl.COLOR_ATTACHMENT1])
    // }
    // checkErorrs(gl,"Problem FBO attachement");

    gl.uniform1i(gl.getUniformLocation(programDrawScreen, "u_currFrame"), 0) // bind texture 0 
    gl.uniform1i(gl.getUniformLocation(programDrawScreen, "u_previousFrame"), 1) // bind texture 0 
    // gl.uniform1i(gl.getUniformLocation(programDrawParticles, "u_distTex"), 0) // bind texture 0 
    gl.uniformMatrix4fv(gl.getUniformLocation(programDrawScreen, "u_matrix"), false, matrix);
    // gl.uniform1i(gl.getUniformLocation(programDrawParticles, "u_particleId"), i);
    gl.uniform1i(gl.getUniformLocation(programDrawScreen, "u_particleCount"), NUM_PARTICLES);
    gl.uniform2fv(gl.getUniformLocation(programDrawScreen, "u_resolution"), new Float32Array([gl.canvas.clientWidth, gl.canvas.clientHeight]));
    gl.uniform2fv(gl.getUniformLocation(programDrawScreen, "u_positionMouse"), new Float32Array([this.state.positionMouse.x, this.state.positionMouse.y]));
    

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, rectangleGeometry.length );


    gl.bindFramebuffer(gl.READ_FRAMEBUFFER, currentFrameBuffer)
    gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null)
    
    gl.blitFramebuffer(
      0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight,
      0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight,
      gl.COLOR_BUFFER_BIT, gl.NEAREST);

    ping = 1 - ping
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  }
  function drawParticles() {
    
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.bindFramebuffer(gl.FRAMEBUFFER, currentFrameBuffer)

    gl.viewport(0, 0, gl.canvas.clientWidth, gl.canvas.clientHeight);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindVertexArray(vaoP);

    const left = 0;
    const right = gl.canvas.clientWidth;
    const bottom = gl.canvas.clientHeight;
    const top = 0;
    const near = 400;
    const far = -400;
    let matrix = m4.orthographic(left, right, bottom, top, near, far);

    gl.bindBuffer(gl.ARRAY_BUFFER, ssbo) // may be able to move these out of the drawParticles() function
    gl.vertexAttribPointer(0,3,gl.FLOAT, false, 2*4,0)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(1,3,gl.FLOAT, false, 2*4,NUM_PARTICLES*1*4)
    gl.enableVertexAttribArray(1)

    
    // for (let i = 0; i < NUM_PARTICLES; i++) {
      gl.useProgram(programDrawParticles)
      // gl.uniform1i(gl.getUniformLocation(programDrawParticles, "u_distTex"), 0) // bind texture 0 
      gl.uniformMatrix4fv(matrixLocation, false, matrix);
      // gl.uniform1i(gl.getUniformLocation(programDrawParticles, "u_particleId"), i);
      gl.uniform1i(gl.getUniformLocation(programDrawParticles, "u_particleCount"), NUM_PARTICLES);
      gl.uniform2fv(gl.getUniformLocation(programDrawParticles, "u_resolution"), new Float32Array([gl.canvas.clientWidth, gl.canvas.clientHeight]));
      gl.uniform2fv(gl.getUniformLocation(programDrawParticles, "u_positionMouse"), new Float32Array([this.state.positionMouse.x, this.state.positionMouse.y]));
      
      gl.drawArrays(gl.POINTS, 0, NUM_PARTICLES);

    // } 
    // gl.blitFramebuffer(
    //   0, 0, WIDTH, HEIGHT,
    //   0, 0, WIDTH, HEIGHT,
    //   gl.COLOR_BUFFER_BIT, gl.NEAREST);

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


  this.state.positionMouse = {
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
