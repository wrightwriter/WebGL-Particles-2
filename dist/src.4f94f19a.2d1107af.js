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
})({"src.4f94f19a.js":[function(require,module,exports) {
var define;
parcelRequire = function (e, r, t, n) {
  var i,
      o = "function" == typeof parcelRequire && parcelRequire,
      u = "function" == typeof require && require;

  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[t][1][r] || r;
      }, p.cache = {};
      var l = r[t] = new f.Module(t);
      e[t][0].call(l.exports, p, l, l.exports, this);
    }

    return r[t].exports;

    function p(e) {
      return f(p.resolve(e));
    }
  }

  f.isParcelRequire = !0, f.Module = function (e) {
    this.id = e, this.bundle = f, this.exports = {};
  }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
    e[r] = [function (e, r) {
      r.exports = t;
    }, {}];
  };

  for (var c = 0; c < t.length; c++) try {
    f(t[c]);
  } catch (e) {
    i || (i = e);
  }

  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
      return l;
    }) : n && (this[n] = l);
  }

  if (parcelRequire = f, i) throw i;
  return f;
}({
  "Tnu0": [function (require, module, exports) {}, {}],
  "JEbG": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.m4 = void 0;
    var t = {
      projection: function (t, n, o) {
        return [2 / t, 0, 0, 0, 0, -2 / n, 0, 0, 0, 0, 2 / o, 0, -1, 1, 0, 1];
      },
      multiply: function (t, n) {
        var o = t[0],
            r = t[1],
            i = t[2],
            u = t[3],
            a = t[4],
            e = t[5],
            c = t[6],
            l = t[7],
            s = t[8],
            f = t[9],
            p = t[10],
            y = t[11],
            R = t[12],
            h = t[13],
            m = t[14],
            v = t[15],
            M = n[0],
            x = n[1],
            d = n[2],
            g = n[3],
            z = n[4],
            j = n[5],
            _ = n[6],
            b = n[7],
            O = n[8],
            P = n[9],
            k = n[10],
            q = n[11],
            w = n[12],
            A = n[13],
            B = n[14],
            C = n[15];
        return [M * o + x * a + d * s + g * R, M * r + x * e + d * f + g * h, M * i + x * c + d * p + g * m, M * u + x * l + d * y + g * v, z * o + j * a + _ * s + b * R, z * r + j * e + _ * f + b * h, z * i + j * c + _ * p + b * m, z * u + j * l + _ * y + b * v, O * o + P * a + k * s + q * R, O * r + P * e + k * f + q * h, O * i + P * c + k * p + q * m, O * u + P * l + k * y + q * v, w * o + A * a + B * s + C * R, w * r + A * e + B * f + C * h, w * i + A * c + B * p + C * m, w * u + A * l + B * y + C * v];
      },
      translation: function (t, n, o) {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, n, o, 1];
      },
      xRotation: function (t) {
        var n = Math.cos(t),
            o = Math.sin(t);
        return [1, 0, 0, 0, 0, n, o, 0, 0, -o, n, 0, 0, 0, 0, 1];
      },
      yRotation: function (t) {
        var n = Math.cos(t),
            o = Math.sin(t);
        return [n, 0, -o, 0, 0, 1, 0, 0, o, 0, n, 0, 0, 0, 0, 1];
      },
      zRotation: function (t) {
        var n = Math.cos(t),
            o = Math.sin(t);
        return [n, o, 0, 0, -o, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      },
      scaling: function (t, n, o) {
        return [t, 0, 0, 0, 0, n, 0, 0, 0, 0, o, 0, 0, 0, 0, 1];
      },
      translate: function (n, o, r, i) {
        return t.multiply(n, t.translation(o, r, i));
      },
      xRotate: function (n, o) {
        return t.multiply(n, t.xRotation(o));
      },
      yRotate: function (n, o) {
        return t.multiply(n, t.yRotation(o));
      },
      zRotate: function (n, o) {
        return t.multiply(n, t.zRotation(o));
      },
      scale: function (n, o, r, i) {
        return t.multiply(n, t.scaling(o, r, i));
      },
      orthographic: function (t, n, o, r, i, u) {
        return [2 / (n - t), 0, 0, 0, 0, 2 / (r - o), 0, 0, 0, 0, 2 / (i - u), 0, (t + n) / (t - n), (o + r) / (o - r), (i + u) / (i - u), 1];
      }
    };
    exports.m4 = t;
  }, {}],
  "Y0UV": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.setGeometry = t, exports.geometryF = void 0;
    var e = new Float32Array([0, 0, 0, 0, 150, 0, 30, 0, 0, 0, 150, 0, 30, 150, 0, 30, 0, 0, 30, 0, 0, 30, 30, 0, 100, 0, 0, 30, 30, 0, 100, 30, 0, 100, 0, 0, 30, 60, 0, 30, 90, 0, 67, 60, 0, 30, 90, 0, 67, 90, 0, 67, 60, 0, 0, 0, 30, 30, 0, 30, 0, 150, 30, 0, 150, 30, 30, 0, 30, 30, 150, 30, 30, 0, 30, 100, 0, 30, 30, 30, 30, 30, 30, 30, 100, 0, 30, 100, 30, 30, 30, 60, 30, 67, 60, 30, 30, 90, 30, 30, 90, 30, 67, 60, 30, 67, 90, 30, 0, 0, 0, 100, 0, 0, 100, 0, 30, 0, 0, 0, 100, 0, 30, 0, 0, 30, 100, 0, 0, 100, 30, 0, 100, 30, 30, 100, 0, 0, 100, 30, 30, 100, 0, 30, 30, 30, 0, 30, 30, 30, 100, 30, 30, 30, 30, 0, 100, 30, 30, 100, 30, 0, 30, 30, 0, 30, 60, 30, 30, 30, 30, 30, 30, 0, 30, 60, 0, 30, 60, 30, 30, 60, 0, 67, 60, 30, 30, 60, 30, 30, 60, 0, 67, 60, 0, 67, 60, 30, 67, 60, 0, 67, 90, 30, 67, 60, 30, 67, 60, 0, 67, 90, 0, 67, 90, 30, 30, 90, 0, 30, 90, 30, 67, 90, 30, 30, 90, 0, 67, 90, 30, 67, 90, 0, 30, 90, 0, 30, 150, 30, 30, 90, 30, 30, 90, 0, 30, 150, 0, 30, 150, 30, 0, 150, 0, 0, 150, 30, 30, 150, 30, 0, 150, 0, 30, 150, 30, 30, 150, 0, 0, 0, 0, 0, 0, 30, 0, 150, 30, 0, 0, 0, 0, 150, 30, 0, 150, 0]);

    function t(t) {
      t.bufferData(t.ARRAY_BUFFER, e, t.STATIC_DRAW);
    }

    exports.geometryF = e;
  }, {}],
  "TWpO": [function (require, module, exports) {
    "use strict";

    function e(e) {
      e.bufferData(e.ARRAY_BUFFER, new Uint8Array([200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 200, 70, 120, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 80, 70, 200, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 70, 200, 210, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 200, 200, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 210, 160, 70, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 70, 180, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 100, 70, 210, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 76, 210, 100, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 140, 210, 80, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 90, 130, 110, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220, 160, 160, 220]), e.STATIC_DRAW);
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.setColors = e;
  }, {}],
  "FOZT": [function (require, module, exports) {
    "use strict";

    function r(r) {
      return o(r) || t(r) || e();
    }

    function e() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    function t(r) {
      if (Symbol.iterator in Object(r) || "[object Arguments]" === Object.prototype.toString.call(r)) return Array.from(r);
    }

    function o(r) {
      if (Array.isArray(r)) {
        for (var e = 0, t = new Array(r.length); e < r.length; e++) t[e] = r[e];

        return t;
      }
    }

    function n(r, e, t, o, n) {
      var i = n || a,
          c = r.createProgram();
      return e.forEach(function (e) {
        r.attachShader(c, e);
      }), t && t.forEach(function (e, t) {
        r.bindAttribLocation(c, o ? o[t] : t, e);
      }), r.linkProgram(c), r.getProgramParameter(c, r.LINK_STATUS) ? c : (i("Error in program linking:" + r.getProgramInfoLog(c)), r.deleteProgram(c), null);
    }

    function a(r) {
      console.error(r);
    }

    function i(e, t, o, n, a, i, c, f, u) {
      var l = e.getAttribLocation(o, t),
          g = e.createBuffer();
      return e.enableVertexAttribArray(l), e.bindBuffer(e.ARRAY_BUFFER, g), e.bufferData(e.ARRAY_BUFFER, new Float32Array(r(u)), e.STATIC_DRAW), e.vertexAttribPointer(l, n, a, i, c, f), {
        attributeLocation: l,
        program: o,
        properties: {
          size: n,
          type: a,
          normalize: i,
          stride: c,
          offset: f
        }
      };
    }

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.createProgram = n, exports.makeBuffer = i, exports.createProgramFromSources = f;
    var c = ["VERTEX_SHADER", "FRAGMENT_SHADER"];

    function f(r, e, t, o, a) {
      for (var i = [], f = 0; f < e.length; ++f) i.push(u(r, e[f], r[c[f]], a));

      return n(r, i, t, o, a);
    }

    function u(r, e, t, o) {
      var n = o || a,
          i = r.createShader(t);
      if (r.shaderSource(i, e), r.compileShader(i), !r.getShaderParameter(i, r.COMPILE_STATUS)) return n("*** Error compiling shader '" + i + "':" + r.getShaderInfoLog(i)), r.deleteShader(i), null;
    }
  }, {}],
  "JCoI": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.NUM_PARTICLES = void 0;
    var e = 1e3;
    exports.NUM_PARTICLES = e;
  }, {}],
  "C7HB": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.computeShaderSource = exports.fragmentShaderSource = exports.vertexShaderSource = exports.fragmentShaderRectangleSource = exports.vertexShaderRectangleSource = void 0;

    var o = require("./vars"),
        n = "#version 310 es\nin vec4 a_position;\n\nuniform mat4 u_matrix;\nuniform float u_fudgeFactor;\nuniform vec2 u_resolution;\n\nout vec4 v_color;\nout vec4 v_position;\n\nvoid main() {\n\n  vec4 position = u_matrix * a_position;\n  float zToDivideBy = 1.;\n  v_color = vec4(1,1,1,1.);\n  v_position = a_position;\n  gl_Position = vec4(position.xy / zToDivideBy, position.zw);\n}\n\n";

    exports.vertexShaderRectangleSource = n;
    var i = "#version 310 es\nprecision highp float;\nin vec4 v_color;\nin vec4 v_position;\nout vec4 outColor;\n\nuniform vec2 u_resolution;\nuniform sampler2D u_previousFrame;\nuniform sampler2D u_currFrame;\n\nvoid main() {\n  vec2 uv = v_position.xy/u_resolution;\n\n  uv *= 1.0;\n  uv.y = 1. - uv.y;\n\n  outColor = vec4(0,0,0,1);\n  vec3 previous =  texture(u_previousFrame,uv).xyz;\n  vec3 curr =  texture(u_currFrame,uv).xyz;\n\n  outColor.xyz += previous*1. + curr*1.0;\n}\n";
    exports.fragmentShaderRectangleSource = i;
    var e = "#version 310 es\n\n\nin vec4 a_position;\n// in vec4 a_color;\n\n// layout (rgba8, binding = 0) uniform readonly highp image2D u_distTex;\n\nuniform mat4 u_matrix;\nuniform float u_fudgeFactor;\n// uniform sampler2D u_distTex;\nuniform int u_particleId;\nuniform int u_particleCount;\nuniform vec2 u_resolution;\nuniform vec2 u_positionMouse;\n\n// layout (std430, binding = 0) buffer SSBO {\n//   vec3 data[];\n// } ssbo;\nstruct Particle {\n  vec3 position;\n  vec3 velocity;\n};\nlayout (location = 0) in vec3 particle;\nlayout (location = 1) in vec3 particleVelocity;\n\nout vec4 v_color;\n\nvoid main() {\n  float particleCount = float(u_particleCount);\n\n  Particle t = Particle(particle,particleVelocity);\n\n  vec4 position = u_matrix * vec4(0. + t.position.x*u_resolution.x,u_resolution.y-t.position.y*u_resolution.y,1.,1.);\n  // vec4 position = u_matrix * vec4(0. + u_positionMouse.x*u_resolution.x,u_resolution.y-t.position.y*u_resolution.y,1.,1.);\n  \n  float zToDivideBy = 1.;\n  gl_PointSize = 4.0;\n  v_color = vec4(particleVelocity,1.);\n  gl_Position = vec4(position.xy / zToDivideBy, position.zw);\n}\n";
    exports.vertexShaderSource = e;
    var t = "#version 310 es\n\nprecision mediump float;\n\nin vec4 v_color;\n\nout vec4 outColor;\n\n\nvoid main() {\n  // outColor = v_color;\n  vec2 uv = 2.*gl_PointCoord - 1.;\n\n  float r = 1.;\n  outColor = vec4(v_color.x,v_color.y,1,1.) * smoothstep(r, r*0.99, length(uv));\n}\n";
    exports.fragmentShaderSource = t;
    var r = "#version 310 es\n  layout (local_size_x = 1, local_size_y = 1, local_size_z = 1) in;\n\n  struct Particle {\n    vec3 position;\n    vec3 velocity;\n  };\n\n  layout (std430, binding = 0) buffer SSBO {\n    vec3 position[".concat(o.NUM_PARTICLES, "]; // TODO: make this an import\n    vec3 velocity[").concat(o.NUM_PARTICLES, "];\n  } ssbo;\n\n  uniform vec2 u_resolution;\n  uniform vec2 u_positionMouse;\n  uniform float u_mousePressed;\n  uniform int u_particleCount;\n  uniform float u_timeElapsed;\n  uniform float u_avoidance;\n  uniform vec2 u_gravity;\n  \n\n  float r11(float i) {return fract(sin(i*212.12)*124.41);}\n  vec3 r13(float i) {return vec3( r11(i), r11(i*2.4), r11(i*1.57));} \n\n  void main() {\n    ivec2 posGlobal = ivec2(gl_GlobalInvocationID.xy);\n\n    // Particle previous = ssbo.particle[posGlobal.x];\n    // Particle previous = Particle(ssbo.position[posGlobal.x], ssbo.velocity[posGlobal.x]);\n    Particle previous = Particle(ssbo.position[posGlobal.x], ssbo.velocity[posGlobal.x]);\n    Particle next = previous;\n\n    vec2 positionMouse = u_positionMouse ;\n    vec2 directionMouse = normalize(positionMouse - previous.position.xy );\n\n\n    if (u_timeElapsed <=  20.) {\n      // ssbo.position[posGlobal.x] = vec3(0.5,0.5,1);\n      ssbo.position[posGlobal.x] = r13(float(posGlobal.x) + 1.);\n      ssbo.position[posGlobal.x].z = 1.;\n      // ssbo.velocity[posGlobal.x] = vec3(0);\n    } else {\n      // -- bounds -- //\n      if (previous.position.x < 0.) {\n        previous.velocity.x = -1.*abs(previous.velocity.x);\n      }\n      if (previous.position.x > 1.){\n        previous.velocity.x = 1.*abs(previous.velocity.x);\n      }\n      if (previous.position.y < 0.) {\n        previous.velocity.y = -1.*abs(previous.velocity.y);\n      }\n      if (previous.position.y > 1.) {\n        previous.velocity.y = 1.*abs(previous.velocity.y);\n      }\n      \n      // -- mouse -- //\n      if (u_mousePressed == 1.) {\n        previous.velocity.x -= directionMouse.x*0.0001;\n        previous.velocity.y -= directionMouse.y*0.0003;\n      }\n\n\n      \n      // -- avoidance -- //\n      for (int i = 0; i < u_particleCount; i++) {\n        vec3 otherPos = ssbo.position[int(i)];\n        vec3 direction = normalize(otherPos - previous.position);\n        float dis = length(otherPos - previous.position);\n        previous.velocity += direction * exp(-dis*(200. - u_avoidance*190.))*0.0001;\n      }\n\n      // -- vortex -- //\n      float frId = 10.*float(posGlobal.x)/float(u_particleCount);\n      vec2 vortexPos = vec2(sin(frId + u_timeElapsed*0.001), cos(frId + u_timeElapsed*0.001))*0.5 + 0.5;\n      vec2 vortexDir = normalize(vortexPos - previous.position.xy);\n      // previous.velocity.xy -= vortexDir*0.0001;\n      \n\n\n      \n      // -- damping -- //\n      previous.velocity *= 0.99;\n      // -- gravity -- //\n      previous.velocity.xy -= u_gravity*0.0003;\n\n      next.position -= previous.velocity;\n      next.velocity = previous.velocity;\n\n      // -- bounds -- //\n      // if (next.position.y == 0.) {\n      //   next.position.y = abs(next.position.y);        \n      // }\n      // next.position.y = max(next.position.y, 0.);\n      // next.position.xy = max(min(next.position.xy, vec2(1.)), vec2(0));\n\n      ssbo.position[posGlobal.x] = next.position;\n      ssbo.velocity[posGlobal.x] = next.velocity;\n    }\n\n  }\n\n\n");
    exports.computeShaderSource = r;
  }, {
    "./vars": "JCoI"
  }],
  "Focm": [function (require, module, exports) {
    "use strict";

    require("./styles.css");

    var e = require("./m4.js"),
        t = require("./setGeometry"),
        r = require("./setColors"),
        a = require("./utils"),
        i = require("./vars"),
        n = require("./shaders.js");

    function o(e) {
      return 180 * e / Math.PI;
    }

    function s(e) {
      return e * Math.PI / 180;
    }

    function u() {
      var t = this;
      var r = document.getElementById("canvas"),
          o = (r.width, r.height, r.getContext("webgl2-compute", {
        antialias: !1
      }));

      if (this.gl = o, o) {
        var u = webglUtils.createProgramFromSources(o, [n.vertexShaderSource, n.fragmentShaderSource]),
            c = webglUtils.createProgramFromSources(o, [n.vertexShaderRectangleSource, n.fragmentShaderRectangleSource]),
            l = o.createShader(o.COMPUTE_SHADER);
        o.shaderSource(l, n.computeShaderSource), o.compileShader(l), o.getShaderParameter(l, o.COMPILE_STATUS) || (console.log(o.getShaderInfoLog(l)), console.log("error compiling shader"));
        var T = o.createProgram();
        o.attachShader(T, l), o.linkProgram(T), o.getProgramParameter(T, o.LINK_STATUS) || console.log("error linking shader");
        var m = o.createBuffer();
        o.bindBuffer(o.SHADER_STORAGE_BUFFER, m), o.bufferData(o.SHADER_STORAGE_BUFFER, new Float32Array(6 * i.NUM_PARTICLES), o.DYNAMIC_COPY), o.bindBufferBase(o.SHADER_STORAGE_BUFFER, 0, m);
        var _ = o.canvas.clientWidth,
            f = o.canvas.clientHeight,
            R = o.createTexture();
        o.bindTexture(o.TEXTURE_2D, R);
        o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, _, f, 0, o.RGBA, o.UNSIGNED_BYTE, null), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.LINEAR), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE);
        var d = o.createFramebuffer();
        o.bindFramebuffer(o.FRAMEBUFFER, d), o.framebufferTexture2D(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, R, 0);
        var v = o.createTexture();
        o.bindTexture(o.TEXTURE_2D, v);
        o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, _, f, 0, o.RGBA, o.UNSIGNED_BYTE, null), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.LINEAR), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE);
        var A = o.createFramebuffer();
        o.bindFramebuffer(o.FRAMEBUFFER, A), o.framebufferTexture2D(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, v, 0);
        var g = o.createTexture();
        o.bindTexture(o.TEXTURE_2D, g);
        o.texImage2D(o.TEXTURE_2D, 0, o.RGBA, _, f, 0, o.RGBA, o.UNSIGNED_BYTE, null), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.LINEAR), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE), o.framebufferTexture2D(o.FRAMEBUFFER, o.COLOR_ATTACHMENT1, o.TEXTURE_2D, g, 0), function (e, t) {
          var r = e.getError();
          r !== e.NO_ERROR && (console.log("ERROR: " + t), console.log(r));
        }(o, "SSBO problem");
        var U = o.createVertexArray();
        o.bindVertexArray(U);
        (0, a.makeBuffer)(o, "a_position", c, 4, o.FLOAT, !1, 16, 0, new Float32Array([0, o.canvas.clientHeight, 0, 1, o.canvas.clientWidth, o.canvas.clientHeight, 1, 1, 0, 0, 1, 1, o.canvas.clientWidth, 0, 1, 1]));
        var h = o.createVertexArray();
        o.bindVertexArray(h);
        (0, a.makeBuffer)(o, "a_position", u, 1, o.FLOAT, !1, 0, 0, new Float32Array(i.NUM_PARTICLES)), o.getUniformLocation(u, "u_color");
        var F = o.getUniformLocation(u, "u_matrix"),
            L = (o.getUniformLocation(u, "u_fudgeFactor"), o.getAttribLocation(u, "a_color"), [0, 0, 0]);
        s(0), s(0), s(0), Math.random(), Math.random(), Math.random();
        this.state = {
          gravity: {
            x: 0,
            y: 0
          },
          timePrevious: new Date().getTime(),
          timeNext: this.timePrevious,
          timeDelta: 0,
          timeElapsed: 0,
          timeStarted: this.timePrevious,
          positionMouse: {
            x: 0,
            y: 0
          },
          mousePressed: 0,
          avoidance: 0,
          formula: "vec2(sin(frId + u_timeElapsed*0.001), cos(frId + u_timeElapsed*0.001))"
        };
        var x,
            S = document.querySelector("#formula");
        S.addEventListener("oninput", function (e) {
          S.innerHTML = e.target.value, t.state.formula = e.target.value, o.shaderSource(l, n.computeShaderSource), o.compileShader(l);
        }), document.body.onmousedown = function (e) {
          t.state.mousePressed = 1;
        }, document.body.onmouseup = function (e) {
          t.state.mousePressed = 0;
        }, window.addEventListener("mousemove", function (e) {
          E.call(t, e);
        }), M.call(this), setInterval(function () {
          M.call(t), function () {
            webglUtils.resizeCanvasToDisplaySize(o.canvas), o.bindFramebuffer(o.FRAMEBUFFER, d), o.viewport(0, 0, o.canvas.clientWidth, o.canvas.clientHeight), o.enable(o.CULL_FACE), o.enable(o.DEPTH_TEST), o.enable(o.BLEND), o.blendFunc(o.SRC_ALPHA, o.ONE_MINUS_SRC_ALPHA), o.clearColor(0, 0, 0, 1), o.clear(o.COLOR_BUFFER_BIT | o.DEPTH_BUFFER_BIT), o.bindVertexArray(h);
            var t = o.canvas.clientWidth,
                r = o.canvas.clientHeight,
                a = e.m4.orthographic(0, t, r, 0, 400, -400);
            o.bindBuffer(o.ARRAY_BUFFER, m), o.vertexAttribPointer(0, 3, o.FLOAT, !1, 8, 0), o.enableVertexAttribArray(0), o.vertexAttribPointer(1, 3, o.FLOAT, !1, 8, 1 * i.NUM_PARTICLES * 4), o.enableVertexAttribArray(1), o.useProgram(u), o.uniformMatrix4fv(F, !1, a), o.uniform1i(o.getUniformLocation(u, "u_particleCount"), i.NUM_PARTICLES), o.uniform2fv(o.getUniformLocation(u, "u_resolution"), new Float32Array([o.canvas.clientWidth, o.canvas.clientHeight])), o.uniform2fv(o.getUniformLocation(u, "u_positionMouse"), new Float32Array([this.state.positionMouse.x, this.state.positionMouse.y])), o.drawArrays(o.POINTS, 0, i.NUM_PARTICLES);
          }.call(t), function () {
            o.activeTexture(o.TEXTURE0), o.bindTexture(o.TEXTURE_2D, null), o.bindFramebuffer(o.FRAMEBUFFER, A), o.viewport(0, 0, o.canvas.clientWidth, o.canvas.clientHeight), o.clearColor(0, 0, 0, 1), o.clear(o.COLOR_BUFFER_BIT | o.DEPTH_BUFFER_BIT), o.bindVertexArray(U);
            var t = o.canvas.clientWidth,
                r = o.canvas.clientHeight,
                a = e.m4.orthographic(0, t, r, 0, 400, -400);
            1 === P ? (o.activeTexture(o.TEXTURE1), o.bindTexture(o.TEXTURE_2D, v), o.drawBuffers([o.COLOR_ATTACHMENT0_EXT])) : (o.activeTexture(o.TEXTURE1), o.bindTexture(o.TEXTURE_2D, g), o.drawBuffers([o.COLOR_ATTACHMENT1_EXT]));
            o.useProgram(c), o.uniform1i(o.getUniformLocation(u, "u_currFrame"), 0), o.uniform1i(o.getUniformLocation(u, "u_previousFrame"), 1), o.uniformMatrix4fv(o.getUniformLocation(c, "u_matrix"), !1, a), o.uniform1i(o.getUniformLocation(c, "u_particleCount"), i.NUM_PARTICLES), o.uniform2fv(o.getUniformLocation(c, "u_resolution"), new Float32Array([o.canvas.clientWidth, o.canvas.clientHeight])), o.uniform2fv(o.getUniformLocation(c, "u_positionMouse"), new Float32Array([this.state.positionMouse.x, this.state.positionMouse.y])), o.drawArrays(o.TRIANGLE_STRIP, 0, 20), o.bindFramebuffer(o.READ_FRAMEBUFFER, d), o.bindFramebuffer(o.DRAW_FRAMEBUFFER, null), o.blitFramebuffer(0, 0, o.canvas.clientWidth, o.canvas.clientHeight, 0, 0, o.canvas.clientWidth, o.canvas.clientHeight, o.COLOR_BUFFER_BIT, o.NEAREST), P = 1 - P, o.bindFramebuffer(o.FRAMEBUFFER, null);
          }.call(t), t.state.timeNext = new Date().getTime(), t.state.timeDelta = t.state.timeNext - t.state.timePrevious, t.state.timeElapsed += t.state.timeDelta, t.state.timePrevious = t.state.timeNext;
        }, 1), webglLessonsUI.setupSlider("#x", {
          value: L[0],
          slide: (x = 0, function (e, t) {
            L[x] = t.value;
          }),
          max: o.canvas.width
        }), webglLessonsUI.setupSlider("#gravity-x", {
          value: 500,
          slide: function (e, r) {
            t.state.gravity.x = r.value / 1e3 - .5;
          },
          max: 1e3
        }), webglLessonsUI.setupSlider("#gravity-y", {
          value: 500,
          slide: function (e, r) {
            t.state.gravity.y = r.value / 1e3 - .5;
          },
          max: 1e3
        }), webglLessonsUI.setupSlider("#avoidance", {
          value: 0,
          slide: function (e, r) {
            t.state.avoidance = r.value / 1e3;
          },
          max: 1e3
        });
        var P = 1;
      }

      function M() {
        o.useProgram(T), o.uniform2fv(o.getUniformLocation(T, "u_resolution"), new Float32Array([o.canvas.clientWidth, o.canvas.clientHeight])), o.uniform2fv(o.getUniformLocation(T, "u_positionMouse"), new Float32Array([this.state.positionMouse.x, this.state.positionMouse.y])), o.uniform2fv(o.getUniformLocation(T, "u_gravity"), new Float32Array([this.state.gravity.x, this.state.gravity.y])), o.uniform1f(o.getUniformLocation(T, "u_avoidance"), this.state.avoidance), o.uniform1f(o.getUniformLocation(T, "u_mousePressed"), this.state.mousePressed), o.uniform1i(o.getUniformLocation(T, "u_particleCount"), i.NUM_PARTICLES), o.uniform1f(o.getUniformLocation(T, "u_timeElapsed"), this.state.timeElapsed), o.dispatchCompute(i.NUM_PARTICLES, 1, 1), o.memoryBarrier(o.SHADER_IMAGE_ACCESS_BARRIER_BIT);
      }
    }

    function c(e, t) {
      var r = (t = t || e.target).getBoundingClientRect();
      return {
        x: e.clientX - r.left,
        y: e.clientY - r.top
      };
    }

    function E(e) {
      var t = l(e, this.gl.canvas),
          r = t.x / this.gl.canvas.width * 2 - 1,
          a = t.y / this.gl.canvas.height * -2 + 1;
      this.state.positionMouse = {
        x: r,
        y: a
      };
    }

    function l(e, t) {
      var r = c(e, t = t || e.target);
      return r.x = r.x * t.width / t.clientWidth, r.y = r.y * t.height / t.clientHeight, r;
    }

    function T() {}

    document.getElementById("app").innerHTML = "<h1>Hello Vanilla!</h1>", window.addEventListener("DOMContentLoaded", u);
  }, {
    "./styles.css": "Tnu0",
    "./m4.js": "JEbG",
    "./setGeometry": "Y0UV",
    "./setColors": "TWpO",
    "./utils": "FOZT",
    "./vars": "JCoI",
    "./shaders.js": "C7HB"
  }]
}, {}, ["Focm"], null);
},{}],"C:/Users/Bambi/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "23466" + '/');

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
},{}]},{},["C:/Users/Bambi/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src.4f94f19a.js"], null)
//# sourceMappingURL=/src.4f94f19a.2d1107af.js.map