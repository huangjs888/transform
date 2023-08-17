(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Transform = {}));
})(this, (function (exports) { 'use strict';

  /*
   * @Author: Huangjs
   * @Date: 2023-02-13 15:22:58
   * @LastEditors: Huangjs
   * @LastEditTime: 2023-06-14 16:40:44
   * @Description: ******
   */

  var DEG_TO_RAD = Math.PI / 180;
  var Matrix = {
    // 将矩阵 lhm 与矩阵 rhm 相乘，然后保存到矩阵 rm 中
    multiply: function multiply(rm, lhm, rhm) {
      var a11 = lhm[0];
      var a12 = lhm[4];
      var a13 = lhm[8];
      var a14 = lhm[12];
      var a21 = lhm[1];
      var a22 = lhm[5];
      var a23 = lhm[9];
      var a24 = lhm[13];
      var a31 = lhm[2];
      var a32 = lhm[6];
      var a33 = lhm[10];
      var a34 = lhm[14];
      var a41 = lhm[3];
      var a42 = lhm[7];
      var a43 = lhm[11];
      var a44 = lhm[15];
      var b11 = rhm[0];
      var b12 = rhm[1];
      var b13 = rhm[2];
      var b14 = rhm[3];
      var b21 = rhm[4];
      var b22 = rhm[5];
      var b23 = rhm[6];
      var b24 = rhm[7];
      var b31 = rhm[8];
      var b32 = rhm[9];
      var b33 = rhm[10];
      var b34 = rhm[11];
      var b41 = rhm[12];
      var b42 = rhm[13];
      var b43 = rhm[14];
      var b44 = rhm[15];
      rm[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
      rm[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
      rm[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
      rm[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
      rm[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
      rm[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
      rm[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
      rm[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
      rm[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
      rm[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
      rm[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
      rm[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
      rm[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
      rm[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
      rm[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
      rm[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    },
    // 将矩阵 m 设置为初始矩阵
    identity: function identity(m) {
      for (var i = 0; i < 16; i++) {
        m[i] = 0;
      }
      for (var _i = 0; _i < 16; _i += 5) {
        m[_i] = 1;
      }
    },
    // 将矩阵 m 按照 x, y, z 平移
    translate: function translate(m, x, y, z) {
      for (var i = 0; i < 4; i++) {
        m[12 + i] += m[i] * x + m[4 + i] * y + m[8 + i] * z;
      }
    },
    // 将矩阵 m 按照 x, y, z 缩放
    scale: function scale(m, x, y, z) {
      for (var i = 0; i < 4; i++) {
        m[i] *= x;
        m[4 + i] *= y;
        m[8 + i] *= z;
      }
    },
    // 将矩阵 m 围绕 x, y, z 旋转a度
    rotate: function rotate(m, a, x, y, z) {
      var rm = new Float32Array(16);
      rm[3] = 0;
      rm[7] = 0;
      rm[11] = 0;
      rm[12] = 0;
      rm[13] = 0;
      rm[14] = 0;
      rm[15] = 1;
      var ra = a * DEG_TO_RAD;
      var s = Math.sin(ra);
      var c = Math.cos(ra);
      if (x === 1 && y === 0 && z === 0) {
        // x轴
        rm[5] = c;
        rm[10] = c;
        rm[6] = s;
        rm[9] = -s;
        rm[1] = 0;
        rm[2] = 0;
        rm[4] = 0;
        rm[8] = 0;
        rm[0] = 1;
      } else if (x === 0 && y === 0 && z === 0) {
        // y轴
        rm[0] = c;
        rm[10] = c;
        rm[8] = s;
        rm[2] = -s;
        rm[1] = 0;
        rm[4] = 0;
        rm[6] = 0;
        rm[9] = 0;
        rm[5] = 1;
      } else if (x === 0 && y === 0 && z === 1) {
        // z轴
        rm[0] = c;
        rm[5] = c;
        rm[1] = s;
        rm[4] = -s;
        rm[2] = 0;
        rm[6] = 0;
        rm[8] = 0;
        rm[9] = 0;
        rm[10] = 1;
      } else {
        var len = Math.sqrt(x * x + y * y + z * z);
        if (len !== 1) {
          var recipLen = 1 / len;
          x *= recipLen;
          y *= recipLen;
          z *= recipLen;
        }
        var nc = 1 - c;
        var xy = x * y;
        var yz = y * z;
        var zx = z * x;
        var xs = x * s;
        var ys = y * s;
        var zs = z * s;
        rm[0] = x * x * nc + c;
        rm[4] = xy * nc - zs;
        rm[8] = zx * nc + ys;
        rm[1] = xy * nc + zs;
        rm[5] = y * y * nc + c;
        rm[9] = yz * nc - xs;
        rm[2] = zx * nc - ys;
        rm[6] = yz * nc + xs;
        rm[10] = z * z * nc + c;
      }
      Matrix.multiply(m, m, rm);
    },
    // 将矩阵 m 按照欧拉角 xa, ya, za 旋转
    rotateEuler: function rotateEuler(m, xa, ya, za) {
      var rm = new Float32Array(16);
      var xra = xa * DEG_TO_RAD;
      var yra = ya * DEG_TO_RAD;
      var zra = za * DEG_TO_RAD;
      var cx = Math.cos(xra);
      var sx = Math.sin(xra);
      var cy = Math.cos(yra);
      var sy = Math.sin(yra);
      var cz = Math.cos(zra);
      var sz = Math.sin(zra);
      var cxsy = cx * sy;
      var sxsy = sx * sy;
      rm[0] = cy * cz;
      rm[1] = -cy * sz;
      rm[2] = sy;
      rm[3] = 0;
      rm[4] = cxsy * cz + cx * sz;
      rm[5] = -cxsy * sz + cx * cz;
      rm[6] = -sx * cy;
      rm[7] = 0;
      rm[8] = -sxsy * cz + sx * sz;
      rm[9] = sxsy * sz + sx * cz;
      rm[10] = cx * cy;
      rm[11] = 0;
      rm[12] = 0;
      rm[13] = 0;
      rm[14] = 0;
      rm[15] = 1;
      Matrix.multiply(m, m, rm);
    },
    // 将矩阵 m 进行perspective变换
    perspective: function perspective(m, fovy, aspect, zNear, zFar) {
      var f = 1 / Math.tan(fovy * (Math.PI / 360.0));
      var rangeReciprocal = 1 / (zNear - zFar);
      m[0] = f / aspect;
      m[1] = 0;
      m[2] = 0;
      m[3] = 0;
      m[4] = 0;
      m[5] = f;
      m[6] = 0;
      m[7] = 0;
      m[8] = 0;
      m[9] = 0;
      m[10] = (zFar + zNear) * rangeReciprocal;
      m[11] = -1;
      m[12] = 0;
      m[13] = 0;
      m[14] = 2 * zFar * zNear * rangeReciprocal;
      m[15] = 0;
    }
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var fails$9 = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$8 = fails$9;

  var functionBindNative = !fails$8(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;

  var FunctionPrototype$1 = Function.prototype;
  var call$5 = FunctionPrototype$1.call;
  var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$1.bind.bind(call$5, call$5);

  var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
    return function () {
      return call$5.apply(fn, arguments);
    };
  };

  var uncurryThis$a = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$a({}.isPrototypeOf);

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$9 =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || commonjsGlobal || Function('return this')();

  var NATIVE_BIND$2 = functionBindNative;

  var FunctionPrototype = Function.prototype;
  var apply$1 = FunctionPrototype.apply;
  var call$4 = FunctionPrototype.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$2 ? call$4.bind(apply$1) : function () {
    return call$4.apply(apply$1, arguments);
  });

  var uncurryThis$9 = functionUncurryThis;

  var toString$1 = uncurryThis$9({}.toString);
  var stringSlice = uncurryThis$9(''.slice);

  var classofRaw$2 = function (it) {
    return stringSlice(toString$1(it), 8, -1);
  };

  var classofRaw$1 = classofRaw$2;
  var uncurryThis$8 = functionUncurryThis;

  var functionUncurryThisClause = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw$1(fn) === 'Function') return uncurryThis$8(fn);
  };

  var documentAll$2 = typeof document == 'object' && document.all;

  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

  var documentAll_1 = {
    all: documentAll$2,
    IS_HTMLDDA: IS_HTMLDDA
  };

  var $documentAll$1 = documentAll_1;

  var documentAll$1 = $documentAll$1.all;

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$a = $documentAll$1.IS_HTMLDDA ? function (argument) {
    return typeof argument == 'function' || argument === documentAll$1;
  } : function (argument) {
    return typeof argument == 'function';
  };

  var objectGetOwnPropertyDescriptor = {};

  var fails$7 = fails$9;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$7(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var NATIVE_BIND$1 = functionBindNative;

  var call$3 = Function.prototype.call;

  var functionCall = NATIVE_BIND$1 ? call$3.bind(call$3) : function () {
    return call$3.apply(call$3, arguments);
  };

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$1(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var createPropertyDescriptor$3 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var uncurryThis$7 = functionUncurryThis;
  var fails$6 = fails$9;
  var classof$3 = classofRaw$2;

  var $Object$3 = Object;
  var split = uncurryThis$7(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$6(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$3('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$3(it) == 'String' ? split(it, '') : $Object$3(it);
  } : $Object$3;

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined$2 = function (it) {
    return it === null || it === undefined;
  };

  var isNullOrUndefined$1 = isNullOrUndefined$2;

  var $TypeError$5 = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$2 = function (it) {
    if (isNullOrUndefined$1(it)) throw $TypeError$5("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject = indexedObject;
  var requireObjectCoercible$1 = requireObjectCoercible$2;

  var toIndexedObject$2 = function (it) {
    return IndexedObject(requireObjectCoercible$1(it));
  };

  var isCallable$9 = isCallable$a;
  var $documentAll = documentAll_1;

  var documentAll = $documentAll.all;

  var isObject$5 = $documentAll.IS_HTMLDDA ? function (it) {
    return typeof it == 'object' ? it !== null : isCallable$9(it) || it === documentAll;
  } : function (it) {
    return typeof it == 'object' ? it !== null : isCallable$9(it);
  };

  var path$3 = {};

  var path$2 = path$3;
  var global$8 = global$9;
  var isCallable$8 = isCallable$a;

  var aFunction = function (variable) {
    return isCallable$8(variable) ? variable : undefined;
  };

  var getBuiltIn$2 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path$2[namespace]) || aFunction(global$8[namespace])
      : path$2[namespace] && path$2[namespace][method] || global$8[namespace] && global$8[namespace][method];
  };

  var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

  var global$7 = global$9;
  var userAgent = engineUserAgent;

  var process = global$7.process;
  var Deno = global$7.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }

  var engineV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION$1 = engineV8Version;
  var fails$5 = fails$9;
  var global$6 = global$9;

  var $String$2 = global$6.String;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$5(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String$2(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$1 = symbolConstructorDetection;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var getBuiltIn$1 = getBuiltIn$2;
  var isCallable$7 = isCallable$a;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var $Object$2 = Object;

  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$1('Symbol');
    return isCallable$7($Symbol) && isPrototypeOf$1($Symbol.prototype, $Object$2(it));
  };

  var $String$1 = String;

  var tryToString$1 = function (argument) {
    try {
      return $String$1(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$6 = isCallable$a;
  var tryToString = tryToString$1;

  var $TypeError$4 = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$2 = function (argument) {
    if (isCallable$6(argument)) return argument;
    throw $TypeError$4(tryToString(argument) + ' is not a function');
  };

  var aCallable$1 = aCallable$2;
  var isNullOrUndefined = isNullOrUndefined$2;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$1 = function (V, P) {
    var func = V[P];
    return isNullOrUndefined(func) ? undefined : aCallable$1(func);
  };

  var call$2 = functionCall;
  var isCallable$5 = isCallable$a;
  var isObject$4 = isObject$5;

  var $TypeError$3 = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$5(fn = input.toString) && !isObject$4(val = call$2(fn, input))) return val;
    if (isCallable$5(fn = input.valueOf) && !isObject$4(val = call$2(fn, input))) return val;
    if (pref !== 'string' && isCallable$5(fn = input.toString) && !isObject$4(val = call$2(fn, input))) return val;
    throw $TypeError$3("Can't convert object to primitive value");
  };

  var shared$1 = {exports: {}};

  var global$5 = global$9;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty = Object.defineProperty;

  var defineGlobalProperty$1 = function (key, value) {
    try {
      defineProperty(global$5, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$5[key] = value;
    } return value;
  };

  var global$4 = global$9;
  var defineGlobalProperty = defineGlobalProperty$1;

  var SHARED = '__core-js_shared__';
  var store$2 = global$4[SHARED] || defineGlobalProperty(SHARED, {});

  var sharedStore = store$2;

  var store$1 = sharedStore;

  (shared$1.exports = function (key, value) {
    return store$1[key] || (store$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.32.0',
    mode: 'pure' ,
    copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.32.0/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var sharedExports = shared$1.exports;

  var requireObjectCoercible = requireObjectCoercible$2;

  var $Object$1 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$1 = function (argument) {
    return $Object$1(requireObjectCoercible(argument));
  };

  var uncurryThis$6 = functionUncurryThis;
  var toObject = toObject$1;

  var hasOwnProperty = uncurryThis$6({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject(it), key);
  };

  var uncurryThis$5 = functionUncurryThis;

  var id = 0;
  var postfix = Math.random();
  var toString = uncurryThis$5(1.0.toString);

  var uid$1 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
  };

  var global$3 = global$9;
  var shared = sharedExports;
  var hasOwn$2 = hasOwnProperty_1;
  var uid = uid$1;
  var NATIVE_SYMBOL = symbolConstructorDetection;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var Symbol$1 = global$3.Symbol;
  var WellKnownSymbolsStore = shared('wks');
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1['for'] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol$5 = function (name) {
    if (!hasOwn$2(WellKnownSymbolsStore, name)) {
      WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$2(Symbol$1, name)
        ? Symbol$1[name]
        : createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var call$1 = functionCall;
  var isObject$3 = isObject$5;
  var isSymbol$1 = isSymbol$2;
  var getMethod = getMethod$1;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$4 = wellKnownSymbol$5;

  var $TypeError$2 = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$4('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$3(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$1(exoticToPrim, input, pref);
      if (!isObject$3(result) || isSymbol$1(result)) return result;
      throw $TypeError$2("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var global$2 = global$9;
  var isObject$2 = isObject$5;

  var document$1 = global$2.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject$2(document$1) && isObject$2(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$4 = descriptors;
  var fails$4 = fails$9;
  var createElement = documentCreateElement;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$4 && !fails$4(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$3 = descriptors;
  var call = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$2 = createPropertyDescriptor$3;
  var toIndexedObject$1 = toIndexedObject$2;
  var toPropertyKey$2 = toPropertyKey$3;
  var hasOwn$1 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$1(O);
    P = toPropertyKey$2(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$1(O, P)) return createPropertyDescriptor$2(!call(propertyIsEnumerableModule.f, O, P), O[P]);
  };

  var fails$3 = fails$9;
  var isCallable$4 = isCallable$a;

  var replacement = /#|\.prototype\./;

  var isForced$1 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable$4(detection) ? fails$3(detection)
      : !!detection;
  };

  var normalize = isForced$1.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$1.data = {};
  var NATIVE = isForced$1.NATIVE = 'N';
  var POLYFILL = isForced$1.POLYFILL = 'P';

  var isForced_1 = isForced$1;

  var uncurryThis$4 = functionUncurryThisClause;
  var aCallable = aCallable$2;
  var NATIVE_BIND = functionBindNative;

  var bind$1 = uncurryThis$4(uncurryThis$4.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind$1(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$2 = descriptors;
  var fails$2 = fails$9;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$2 && fails$2(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var isObject$1 = isObject$5;

  var $String = String;
  var $TypeError$1 = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$1 = function (argument) {
    if (isObject$1(argument)) return argument;
    throw $TypeError$1($String(argument) + ' is not an object');
  };

  var DESCRIPTORS$1 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var anObject = anObject$1;
  var toPropertyKey$1 = toPropertyKey$3;

  var $TypeError = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$1 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey$1(P);
    anObject(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPropertyKey$1(P);
    anObject(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS = descriptors;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$3;

  var createNonEnumerableProperty$1 = DESCRIPTORS ? function (object, key, value) {
    return definePropertyModule$1.f(object, key, createPropertyDescriptor$1(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var global$1 = global$9;
  var apply = functionApply;
  var uncurryThis$3 = functionUncurryThisClause;
  var isCallable$3 = isCallable$a;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var isForced = isForced_1;
  var path$1 = path$3;
  var bind = functionBindContext;
  var createNonEnumerableProperty = createNonEnumerableProperty$1;
  var hasOwn = hasOwnProperty_1;

  var wrapConstructor = function (NativeConstructor) {
    var Wrapper = function (a, b, c) {
      if (this instanceof Wrapper) {
        switch (arguments.length) {
          case 0: return new NativeConstructor();
          case 1: return new NativeConstructor(a);
          case 2: return new NativeConstructor(a, b);
        } return new NativeConstructor(a, b, c);
      } return apply(NativeConstructor, this, arguments);
    };
    Wrapper.prototype = NativeConstructor.prototype;
    return Wrapper;
  };

  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var PROTO = options.proto;

    var nativeSource = GLOBAL ? global$1 : STATIC ? global$1[TARGET] : (global$1[TARGET] || {}).prototype;

    var target = GLOBAL ? path$1 : path$1[TARGET] || createNonEnumerableProperty(path$1, TARGET, {})[TARGET];
    var targetPrototype = target.prototype;

    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
    var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

    for (key in source) {
      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contains in native
      USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);

      targetProperty = target[key];

      if (USE_NATIVE) if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor(nativeSource, key);
        nativeProperty = descriptor && descriptor.value;
      } else nativeProperty = nativeSource[key];

      // export native or implementation
      sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

      if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

      // bind methods to global for calling from export context
      if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global$1);
      // wrap global constructors for prevent changes in this version
      else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
      // make static versions for prototype methods
      else if (PROTO && isCallable$3(sourceProperty)) resultProperty = uncurryThis$3(sourceProperty);
      // default case
      else resultProperty = sourceProperty;

      // add a flag to not completely full polyfills
      if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(resultProperty, 'sham', true);
      }

      createNonEnumerableProperty(target, key, resultProperty);

      if (PROTO) {
        VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
        if (!hasOwn(path$1, VIRTUAL_PROTOTYPE)) {
          createNonEnumerableProperty(path$1, VIRTUAL_PROTOTYPE, {});
        }
        // export virtual prototype methods
        createNonEnumerableProperty(path$1[VIRTUAL_PROTOTYPE], key, sourceProperty);
        // export real prototype methods
        if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {
          createNonEnumerableProperty(targetPrototype, key, sourceProperty);
        }
      }
    }
  };

  var classof$2 = classofRaw$2;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$1 = Array.isArray || function isArray(argument) {
    return classof$2(argument) == 'Array';
  };

  var wellKnownSymbol$3 = wellKnownSymbol$5;

  var TO_STRING_TAG$1 = wellKnownSymbol$3('toStringTag');
  var test = {};

  test[TO_STRING_TAG$1] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var isCallable$2 = isCallable$a;
  var classofRaw = classofRaw$2;
  var wellKnownSymbol$2 = wellKnownSymbol$5;

  var TO_STRING_TAG = wellKnownSymbol$2('toStringTag');
  var $Object = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable$2(O.callee) ? 'Arguments' : result;
  };

  var uncurryThis$2 = functionUncurryThis;
  var isCallable$1 = isCallable$a;
  var store = sharedStore;

  var functionToString = uncurryThis$2(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$1(store.inspectSource)) {
    store.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$1 = store.inspectSource;

  var uncurryThis$1 = functionUncurryThis;
  var fails$1 = fails$9;
  var isCallable = isCallable$a;
  var classof = classof$1;
  var getBuiltIn = getBuiltIn$2;
  var inspectSource = inspectSource$1;

  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = uncurryThis$1(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    switch (classof(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$1 = !construct || fails$1(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor : ceil)(n);
  };

  var trunc = mathTrunc;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$2 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc(number);
  };

  var toIntegerOrInfinity$1 = toIntegerOrInfinity$2;

  var max$1 = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toIntegerOrInfinity$1(index);
    return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
  };

  var toIntegerOrInfinity = toIntegerOrInfinity$2;

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$1 = function (argument) {
    return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength = toLength$1;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$1 = function (obj) {
    return toLength(obj.length);
  };

  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule = objectDefineProperty;
  var createPropertyDescriptor = createPropertyDescriptor$3;

  var createProperty$1 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var fails = fails$9;
  var wellKnownSymbol$1 = wellKnownSymbol$5;
  var V8_VERSION = engineV8Version;

  var SPECIES$1 = wellKnownSymbol$1('species');

  var arrayMethodHasSpeciesSupport$1 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var uncurryThis = functionUncurryThis;

  var arraySlice = uncurryThis([].slice);

  var $ = _export;
  var isArray = isArray$1;
  var isConstructor = isConstructor$1;
  var isObject = isObject$5;
  var toAbsoluteIndex = toAbsoluteIndex$1;
  var lengthOfArrayLike = lengthOfArrayLike$1;
  var toIndexedObject = toIndexedObject$2;
  var createProperty = createProperty$1;
  var wellKnownSymbol = wellKnownSymbol$5;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$1;
  var nativeSlice = arraySlice;

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  var SPECIES = wellKnownSymbol('species');
  var $Array = Array;
  var max = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = lengthOfArrayLike(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array || Constructor === undefined) {
          return nativeSlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var path = path$3;

  var entryVirtual$1 = function (CONSTRUCTOR) {
    return path[CONSTRUCTOR + 'Prototype'];
  };

  var entryVirtual = entryVirtual$1;

  var slice$6 = entryVirtual('Array').slice;

  var isPrototypeOf = objectIsPrototypeOf;
  var method = slice$6;

  var ArrayPrototype = Array.prototype;

  var slice$5 = function (it) {
    var own = it.slice;
    return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.slice) ? method : own;
  };

  var parent$2 = slice$5;

  var slice$4 = parent$2;

  var parent$1 = slice$4;

  var slice$3 = parent$1;

  var parent = slice$3;

  var slice$2 = parent;

  var slice$1 = slice$2;

  var slice = slice$1;

  var _sliceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(slice);

  var Transform = /*#__PURE__*/function () {
    function Transform(t) {
      this.a = t.a;
      this.k = t.k;
      this.x = t.x;
      this.y = t.y;
    }
    Transform.identity = function identity() {
      return new Transform({
        a: 0,
        k: 1,
        x: 0,
        y: 0
      });
    };
    var _proto = Transform.prototype;
    _proto.toRaw = function toRaw() {
      var raw = {};
      if (typeof this.a === 'number') {
        raw.a = this.a;
      }
      if (typeof this.k === 'number') {
        raw.k = this.k;
      }
      if (typeof this.x === 'number') {
        raw.x = this.x;
      }
      if (typeof this.y === 'number') {
        raw.y = this.y;
      }
      return raw;
    };
    _proto.toString = function toString() {
      var _this$a = this.a,
        a = _this$a === void 0 ? 0 : _this$a,
        _this$k = this.k,
        k = _this$k === void 0 ? 1 : _this$k,
        _this$x = this.x,
        x = _this$x === void 0 ? 0 : _this$x,
        _this$y = this.y,
        y = _this$y === void 0 ? 0 : _this$y;
      var matrix = new Float32Array(16);
      Matrix.identity(matrix);
      Matrix.translate(matrix, x, y, 0);
      Matrix.scale(matrix, k, k, k);
      // 这里使用负值，实际matrix3d里负值为顺时针
      Matrix.rotate(matrix, -a, 0, 0, 1);
      return "matrix3d(" + _sliceInstanceProperty(Array.prototype).call(matrix).join(',') + ")";
    };
    return Transform;
  }();

  /*
   * @Author: Huangjs
   * @Date: 2023-07-26 16:28:46
   * @LastEditors: Huangjs
   * @LastEditTime: 2023-08-17 11:41:08
   * @Description: ******
   */

  exports.Matrix = Matrix;
  exports.default = Transform;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=transform.js.map
