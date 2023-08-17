"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/slice"));
var _matrix = _interopRequireDefault(require("./matrix"));
/*
 * @Author: Huangjs
 * @Date: 2023-04-27 18:24:36
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-08-16 17:31:23
 * @Description: ******
 */
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
    _matrix.default.identity(matrix);
    _matrix.default.translate(matrix, x, y, 0);
    _matrix.default.scale(matrix, k, k, k);
    // 这里使用负值，实际matrix3d里负值为顺时针
    _matrix.default.rotate(matrix, -a, 0, 0, 1);
    return "matrix3d(" + (0, _slice.default)(Array.prototype).call(matrix).join(',') + ")";
  };
  return Transform;
}();
exports.default = Transform;