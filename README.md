<!--
 * @Author: Huangjs
 * @Date: 2021-05-10 15:55:29
 * @LastEditors: Huangjs
 * @LastEditTime: 2023-10-09 15:38:51
 * @Description: ******
-->

## transform

样式变换

### 安装使用

```sh

npm install @huangjs888/transform --save

```

### css3样式：

```css

body{
  transform: matrix3d(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );
}
  
```

### 使用方法

```js

import Transform from '@huangjs888/transform';

const transform = new Transform({ a: 0, k: 1, x: 0, y: 0 });
const raw = transform.toRaw();
raw.a += 1;
raw.k *= 2;
raw.x += 1;
raw.y += 1;
document.body.style.transform = transform.toString();
  
```
