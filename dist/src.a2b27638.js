// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/m4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.m4 = void 0;
var m4 = {
  projection: function projection(width, height, depth) {
    // Note: This matrix flips the Y axis so 0 is at the top.
    return [2 / width, 0, 0, 0, 0, -2 / height, 0, 0, 0, 0, 2 / depth, 0, -1, 1, 0, 1];
  },
  multiply: function multiply(a, b) {
    var a00 = a[0 * 4 + 0];
    var a01 = a[0 * 4 + 1];
    var a02 = a[0 * 4 + 2];
    var a03 = a[0 * 4 + 3];
    var a10 = a[1 * 4 + 0];
    var a11 = a[1 * 4 + 1];
    var a12 = a[1 * 4 + 2];
    var a13 = a[1 * 4 + 3];
    var a20 = a[2 * 4 + 0];
    var a21 = a[2 * 4 + 1];
    var a22 = a[2 * 4 + 2];
    var a23 = a[2 * 4 + 3];
    var a30 = a[3 * 4 + 0];
    var a31 = a[3 * 4 + 1];
    var a32 = a[3 * 4 + 2];
    var a33 = a[3 * 4 + 3];
    var b00 = b[0 * 4 + 0];
    var b01 = b[0 * 4 + 1];
    var b02 = b[0 * 4 + 2];
    var b03 = b[0 * 4 + 3];
    var b10 = b[1 * 4 + 0];
    var b11 = b[1 * 4 + 1];
    var b12 = b[1 * 4 + 2];
    var b13 = b[1 * 4 + 3];
    var b20 = b[2 * 4 + 0];
    var b21 = b[2 * 4 + 1];
    var b22 = b[2 * 4 + 2];
    var b23 = b[2 * 4 + 3];
    var b30 = b[3 * 4 + 0];
    var b31 = b[3 * 4 + 1];
    var b32 = b[3 * 4 + 2];
    var b33 = b[3 * 4 + 3];
    return [b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30, b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31, b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32, b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33, b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30, b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31, b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32, b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33, b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30, b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31, b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32, b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33, b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30, b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31, b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32, b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33];
  },
  translation: function translation(tx, ty, tz) {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
  },
  xRotation: function xRotation(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
  },
  yRotation: function yRotation(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
  },
  zRotation: function zRotation(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return [c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  },
  scaling: function scaling(sx, sy, sz) {
    return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
  },
  translate: function translate(m, tx, ty, tz) {
    return m4.multiply(m, m4.translation(tx, ty, tz));
  },
  xRotate: function xRotate(m, angleInRadians) {
    return m4.multiply(m, m4.xRotation(angleInRadians));
  },
  yRotate: function yRotate(m, angleInRadians) {
    return m4.multiply(m, m4.yRotation(angleInRadians));
  },
  zRotate: function zRotate(m, angleInRadians) {
    return m4.multiply(m, m4.zRotation(angleInRadians));
  },
  scale: function scale(m, sx, sy, sz) {
    return m4.multiply(m, m4.scaling(sx, sy, sz));
  },
  orthographic: function orthographic(left, right, bottom, top, near, far) {
    return [2 / (right - left), 0, 0, 0, 0, 2 / (top - bottom), 0, 0, 0, 0, 2 / (near - far), 0, (left + right) / (left - right), (bottom + top) / (bottom - top), (near + far) / (near - far), 1];
  }
};
exports.m4 = m4;
},{}],"src/setGeometry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGeometry = setGeometry;
exports.geometryF = void 0;
// Fill the current ARRAY_BUFFER buffer
// with the values that define a letter 'F'.
var geometryF = new Float32Array([// left column front
0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0, // top rung front
30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0, // middle rung front
30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0, // left column back
0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30, // top rung back
30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30, // middle rung back
30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30, // top
0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30, // top rung right
100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30, // under top rung
30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0, // between top rung and middle
30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30, // top of middle rung
30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30, // right of middle rung
67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30, // bottom of middle rung.
30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0, // right of bottom
30, 90, 0, 30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150, 30, // bottom
0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0, // left side
0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0]);
exports.geometryF = geometryF;

function setGeometry(gl) {
  gl.bufferData(gl.ARRAY_BUFFER, geometryF, gl.STATIC_DRAW);
}
},{}],"src/setColors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setColors = setColors;

function setColors(gl) {
  gl.bufferData(gl.ARRAY_BUFFER, new Uint8Array([// left column front
  200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, // top rung front
  200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, // middle rung front
  200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, // left column back
  80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, // top rung back
  80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, // middle rung back
  80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, // top
  70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, // top rung right
  200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, // under top rung
  210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, // between top rung and middle
  210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, // top of middle rung
  70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, // right of middle rung
  100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, // bottom of middle rung.
  76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, // right of bottom
  140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, // bottom
  90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, // left side
  160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220]), gl.STATIC_DRAW);
}
},{}],"src/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProgram = createProgram;
exports.makeBuffer = makeBuffer;
exports.createProgramFromSources = createProgramFromSources;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
  var errFn = opt_errorCallback || error;
  var program = gl.createProgram();
  shaders.forEach(function (shader) {
    gl.attachShader(program, shader);
  });

  if (opt_attribs) {
    opt_attribs.forEach(function (attrib, ndx) {
      gl.bindAttribLocation(program, opt_locations ? opt_locations[ndx] : ndx, attrib);
    });
  }

  gl.linkProgram(program); // Check the link status

  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (!linked) {
    // something went wrong with the link
    var lastError = gl.getProgramInfoLog(program);
    errFn("Error in program linking:" + lastError);
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function error(msg) {
  console.error(msg);
}

function makeBuffer(gl, attributeLocationName, program, size, type, normalize, stride, offset, data) {
  var positionAttributeLocation = gl.getAttribLocation(program, attributeLocationName);
  var pointsBuffer = gl.createBuffer();
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, pointsBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_toConsumableArray(data)), gl.STATIC_DRAW);
  size = 3;
  type = gl.FLOAT;
  normalize = false;
  stride = 0;
  offset = 0;
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
  var bufferObject = {
    attributeLocation: positionAttributeLocation,
    program: program,
    properties: {
      size: size,
      type: type,
      normalize: normalize,
      stride: stride,
      offset: offset
    }
  };
  return bufferObject;
}

var defaultShaderType = ["VERTEX_SHADER", "FRAGMENT_SHADER"];

function createProgramFromSources(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  var shaders = [];

  for (var ii = 0; ii < shaderSources.length; ++ii) {
    shaders.push(loadShader(gl, shaderSources[ii], gl[defaultShaderType[ii]], opt_errorCallback));
  }

  return createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback);
}

function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
  var errFn = opt_errorCallback || error; // Create the shader object

  var shader = gl.createShader(shaderType); // Load the shader source

  gl.shaderSource(shader, shaderSource); // Compile the shader

  gl.compileShader(shader); // Check the compile status

  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!compiled) {
    // Something went wrong during compilation; get the error
    var lastError = gl.getShaderInfoLog(shader);
    errFn("*** Error compiling shader '" + shader + "':" + lastError);
    gl.deleteShader(shader);
    return null;
  }
}
},{}],"src/shaders.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeShaderSourceOld = exports.computeShaderSource = exports.fragmentShaderSource = exports.vertexShaderSource = void 0;
var vertexShaderSource = "#version 310 es\n\nin vec4 a_position;\nin vec4 a_color;\n\nuniform mat4 u_matrix;\nuniform float u_fudgeFactor;\n\nout vec4 v_color;\n\nvoid main() {\n  vec4 position = u_matrix * a_position;\n\n  \n  //position.x *= 0.5;\n  float zToDivideBy = 1.0 + position.z * u_fudgeFactor;\n  gl_PointSize = 3.0;\n  v_color = a_color;\n  gl_Position = vec4(position.xy / zToDivideBy, position.zw);\n}\n";
exports.vertexShaderSource = vertexShaderSource;
var fragmentShaderSource = "#version 310 es\n\nprecision mediump float;\n\nin vec4 v_color;\n\nout vec4 outColor;\n\nvoid main() {\n  // outColor = v_color;\n  outColor = vec4(0.5,0.8,0.6,1.);\n}\n";
exports.fragmentShaderSource = fragmentShaderSource;
var computeShaderSource = "#version 310 es\n  layout (local_size_x = 1, local_size_y = 1, local_size_z = 1) in;\n  layout (rgba8, binding = 0) writeonly uniform highp image2D destTex;\n\n  void main() {\n    ivec2 posGlobal = ivec2(gl_GlobalInvocationID.xy);\n    imageStore(destTex, posGlobal, vec4(vec2(gl_WorkGroupID.xy) / vec2(gl_NumWorkGroups.xy), 0.0, 1.0));\n  }\n\n";
exports.computeShaderSource = computeShaderSource;
var computeShaderSourceOld = "#version 310 es\n  layout (local_size_x = ".concat(10, ", local_size_y = 1, local_size_z = 1) in;\n\n  // layout (std140, binding = 0) buffer SSBOIn {\n  //   Boids data[];\n  //  } ssboIn;\n\n  struct Particle {\n    vec3 position;\n    vec3 velocity;\n  }\n  // shared Particle sharedData[", 10, "];\n\n  void main () {\n    uint localThreadID = gl_LocallInvocationID.x;\n    uint globalThreadID = gl_GlobalInvocationID.x;\n    uint workGroupSize = gl_WorkGroupSize.x;\n  }\n\n\n"); // export let fragmentShaderSource = `#version 310 es
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

exports.computeShaderSourceOld = computeShaderSourceOld;
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");

var _m = require("./m4.js");

var _setGeometry = require("./setGeometry");

var _setColors = require("./setColors");

var _utils = require("./utils");

var _shaders = require("./shaders.js");

function radToDeg(r) {
  return r * 180 / Math.PI;
}

function degToRad(d) {
  return d * Math.PI / 180;
}

"use strict"; // You can either biond VAO or Buffer


document.getElementById("app").innerHTML = "<h1>Hello Vanilla!</h1>";
var NUM_PARTICLES = 1000;

function main() {
  // Get A WebGL context
  function checkErorrs(gl, ctx) {
    var e = gl.getError();

    if (e !== gl.NO_ERROR) {
      console.log("ERROR: " + ctx);
      console.log(e);
    }
  }
  /** @type {HTMLCanvasElement} */


  var canvas = document.getElementById("canvas");
  var WIDTH = canvas.width;
  var HEIGHT = canvas.height;
  var gl = canvas.getContext("webgl2-compute", {
    antialias: false
  });

  if (!gl) {
    return;
  } // ----------- SHADERS ----------- //


  var programParticles = webglUtils.createProgramFromSources(gl, [_shaders.vertexShaderSource, _shaders.fragmentShaderSource]);
  var computeShaderSource2 = "#version 310 es\n    layout (local_size_x = ".concat(NUM_PARTICLES, ", local_size_y = 1, local_size_z = 1) in;\n    layout (std430, binding = 0) buffer SSBO {\n      float data[];\n    } ssbo;\n    uniform uvec4 numElements;\n    \n    void main() {\n       float tmp;\n      uint ixj = gl_GlobalInvocationID.x ^ numElements.y;\n      if (ixj > gl_GlobalInvocationID.x)\n      {\n        if ((gl_GlobalInvocationID.x & numElements.x) == 0u)\n        {\n          if (ssbo.data[gl_GlobalInvocationID.x] > ssbo.data[ixj])\n          {\n            tmp = ssbo.data[gl_GlobalInvocationID.x];\n            ssbo.data[gl_GlobalInvocationID.x] = ssbo.data[ixj];\n            ssbo.data[ixj] = tmp;\n          }\n        }\n        else\n        {\n          if (ssbo.data[gl_GlobalInvocationID.x] < ssbo.data[ixj])\n          {\n            tmp = ssbo.data[gl_GlobalInvocationID.x];\n            ssbo.data[gl_GlobalInvocationID.x] = ssbo.data[ixj];\n            ssbo.data[ixj] = tmp;\n          }\n        }\n      }\n    }\n    ");
  var computeShader = gl.createShader(gl.COMPUTE_SHADER);
  gl.shaderSource(computeShader, _shaders.computeShaderSource);
  gl.compileShader(computeShader);

  if (!gl.getShaderParameter(computeShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(computeShader));
    console.log("error compiling shader"); // return null;
  }

  var computeProgram = gl.createProgram();
  gl.attachShader(computeProgram, computeShader);
  gl.linkProgram(computeProgram);

  if (!gl.getProgramParameter(computeProgram, gl.LINK_STATUS)) {
    console.log("error linking shader");
  } // const array = new Float32Array(NUM_PARTICLES)
  // const ssbo = gl.createBuffer()
  // gl.bindBuffer(gl.SHADER_STORAGE_BUFFER, ssbo)
  // gl.bufferData(gl.SHADER_STORAGE_BUFFER,array, gl.DYNAMIC_COPY)
  // gl.bindBufferBase(gl.SHADER_STORAGE_BUFFER, 0, ssbo)


  var texture = gl.createTexture(); // make texture

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texStorage2D(gl.TEXTURE_2D, 1, gl.RGBA8, NUM_PARTICLES, 1);
  gl.bindImageTexture(0, texture, 0, false, 0, gl.READ_WRITE, gl.RGBA8); // bind for writing
  // make framebuffer to read from texture

  var frameBuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.READ_FRAMEBUFFER, frameBuffer);
  gl.framebufferTexture2D(gl.READ_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  checkErorrs(gl, "Texture problem");
  gl.useProgram(computeProgram);
  gl.uniform1i(gl.getUniformLocation(computeProgram, "distTex"), 0); // bind texture 0 

  gl.dispatchCompute(NUM_PARTICLES, 1, 1);
  gl.memoryBarrier(gl.SHADER_IMAGE_ACCESS_BARRIER_BIT);
  gl.blitFramebuffer(0, 0, NUM_PARTICLES, 1, 0, 0, WIDTH, HEIGHT, gl.COLOR_BUFFER_BIT, gl.NEAREST); // for (let i = 0; i < 1024; i++){
  //   gl.useProgram(computeProgram)
  //   gl.dispatchCompute(512/16, 512/16,1)
  //   gl.memoryBarrier(gl.SHADER_IMAGE_ACCESS_BARRIER_BIT)
  //   checkErorrs(gl, "Dispatching compute shader")
  // }
  // show texture to Canvas
  // gl.useProgram(computeProgram)
  // gl.dispatchCompute(NUM_PARTICLES, 1,1)
  // for (let k = )
  // ----------- ATTRIBUTES ----------- //
  // var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  // var pointsAttributeLocation = gl.getAttribLocation(program, "a_points");

  var colorLocation = gl.getUniformLocation(programParticles, "u_color");
  var matrixLocation = gl.getUniformLocation(programParticles, "u_matrix");
  var fudgeLocation = gl.getUniformLocation(programParticles, "u_fudgeFactor");
  var colorAttributeLocation = gl.getAttribLocation(programParticles, "a_color"); // ----------- BUFFERS ----------- //

  var vaoP = gl.createVertexArray();
  gl.bindVertexArray(vaoP);
  var pBuffer = (0, _utils.makeBuffer)(gl, "a_position", programParticles, 3, gl.GL_FLOAT, false, 0, 0, _setGeometry.geometryF);
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
    return function (event, ui) {
      translation[index] = ui.value;
      drawScene();
    };
  } // ----------- DRAW ----------- //


  function drawParticles() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    for (var i = 0; i < NUM_PARTICLES; i++) {}
  }

  function drawScene() {
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.bindVertexArray(vaoF);
    gl.uniform4fv(colorLocation, color);
    var fudgeFactor = 0; // gl.uniform1f(fudgeLocation, fudgeFactor);

    var left = 0;
    var right = gl.canvas.clientWidth;
    var bottom = gl.canvas.clientHeight;
    var top = 0;
    var near = 400;
    var far = -400;

    var matrix = _m.m4.orthographic(left, right, bottom, top, near, far); // var matrix = m4.projection(
    //   gl.canvas.clientWidth,
    //   gl.canvas.clientHeight,
    //   400
    // );


    matrix = _m.m4.translate(matrix, translation[0], translation[1], translation[2]);
    matrix = _m.m4.xRotate(matrix, rotation[0]);
    matrix = _m.m4.yRotate(matrix, rotation[1]);
    matrix = _m.m4.zRotate(matrix, rotation[2]);
    matrix = _m.m4.scale(matrix, scale[0], scale[1], scale[2]);
    gl.useProgram(programParticles);
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;
    gl.drawArrays(gl.POINTS, offset, count); // gl.drawArrays(primitiveType, offset, count);
  }
}

window.addEventListener('DOMContentLoaded', main); // main();
},{"./styles.css":"src/styles.css","./m4.js":"src/m4.js","./setGeometry":"src/setGeometry.js","./setColors":"src/setColors.js","./utils":"src/utils.js","./shaders.js":"src/shaders.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60053" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map