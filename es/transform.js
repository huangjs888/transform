/*
 * @Author: Huangjs
 * @Date: 2023-04-27 18:24:36
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-08-16 17:31:23
 * @Description: ******
 */

import Matrix from './matrix';
export default class Transform {
  constructor(t) {
    this.a = t.a;
    this.k = t.k;
    this.x = t.x;
    this.y = t.y;
  }
  static identity() {
    return new Transform({
      a: 0,
      k: 1,
      x: 0,
      y: 0
    });
  }
  toRaw() {
    const raw = {};
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
  }
  toString() {
    const {
      a = 0,
      k = 1,
      x = 0,
      y = 0
    } = this;
    const matrix = new Float32Array(16);
    Matrix.identity(matrix);
    Matrix.translate(matrix, x, y, 0);
    Matrix.scale(matrix, k, k, k);
    // 这里使用负值，实际matrix3d里负值为顺时针
    Matrix.rotate(matrix, -a, 0, 0, 1);
    return `matrix3d(${Array.prototype.slice.call(matrix).join(',')})`;
  }
}