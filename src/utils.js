export function createProgram(
  gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
const errFn = opt_errorCallback || error;
const program = gl.createProgram();
shaders.forEach(function(shader) {
  gl.attachShader(program, shader);
});
if (opt_attribs) {
  opt_attribs.forEach(function(attrib, ndx) {
    gl.bindAttribLocation(
        program,
        opt_locations ? opt_locations[ndx] : ndx,
        attrib);
  });
}
gl.linkProgram(program);

// Check the link status
const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
if (!linked) {
    // something went wrong with the link
    const lastError = gl.getProgramInfoLog(program);
    errFn("Error in program linking:" + lastError);

    gl.deleteProgram(program);
    return null;
}
return program;
}

function error(msg) {
  console.error(msg)
}

export function makeBuffer(
  gl,
  attributeLocationName,
  program,
  size,
  type,
  normalize,
  stride,
  offset,
  data
) {
  const positionAttributeLocation = gl.getAttribLocation(
    program,
    attributeLocationName
  );

  const pointsBuffer = gl.createBuffer();

  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([...data]), gl.STATIC_DRAW);

  size = data.length;
  type = gl.FLOAT;
  normalize = false;
  stride = 0;
  offset = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );
  const bufferObject = {
    attributeLocation: positionAttributeLocation,
    program: program,
    properties: {
      size,
      type,
      normalize,
      stride,
      offset
    }
  };

  return bufferObject;
}
  const defaultShaderType = [
    "VERTEX_SHADER",
    "FRAGMENT_SHADER",
  ];
export function createProgramFromSources(
    gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  const shaders = [];
  for (let ii = 0; ii < shaderSources.length; ++ii) {
    shaders.push(loadShader(
        gl, shaderSources[ii], gl[defaultShaderType[ii]], opt_errorCallback));
  }
  return createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback);
}
  function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
    const errFn = opt_errorCallback || error;
    // Create the shader object
    const shader = gl.createShader(shaderType);

    // Load the shader source
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check the compile status
    const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      // Something went wrong during compilation; get the error
      const lastError = gl.getShaderInfoLog(shader);
      errFn("*** Error compiling shader '" + shader + "':" + lastError);
      gl.deleteShader(shader);
      return null;
    }
  }