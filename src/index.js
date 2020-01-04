import "./styles.css";
import { m4 } from "./m4.js";
import { setGeometry, geometryF } from "./setGeometry";
import { setColors } from "./setColors";
import { makeBuffer, createProgramFromSources } from "./utils";
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

// You can either biond VAO or Buffer

document.getElementById("app").innerHTML = `<h1>Hello Vanilla!</h1>`;

function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.getElementById("canvas");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  // ----------- SHADERS ----------- //
  var program = webglUtils.createProgramFromSources(gl, [
    vertexShaderSource,
    fragmentShaderSource
  ]);

  // const computeShader = gl.createShader(gl.COMPUTE_SHADER);
  // gl.shaderSource(computeShader, computeShaderSource);
  // gl.compileShader(computeShader);

  // ----------- ATTRIBUTES ----------- //

  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var pointsAttributeLocation = gl.getAttribLocation(program, "a_points");

  var colorLocation = gl.getUniformLocation(program, "u_color");
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");
  var fudgeLocation = gl.getUniformLocation(program, "u_fudgeFactor");
  var colorAttributeLocation = gl.getAttribLocation(program, "a_color");

  // ----------- BUFFERS ----------- //

  var vaoF = gl.createVertexArray();
  gl.bindVertexArray(vaoF);

  const fBuffer = makeBuffer(
    gl,
    "a_position",
    program,
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

  drawScene();

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

  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindVertexArray(vaoF);
    gl.uniform4fv(colorLocation, color);

    var fudgeFactor = 0;
    gl.uniform1f(fudgeLocation, fudgeFactor);

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

    gl.useProgram(program);
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;
    gl.drawArrays(gl.POINTS, offset, count);
    // gl.drawArrays(primitiveType, offset, count);
  }
}

main();
