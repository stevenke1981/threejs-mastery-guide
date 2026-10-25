# 01｜Scene Graph 與座標

## Object3D 樹

`Scene`、`Group`、`Mesh`、相機與燈光都可放在場景的物件階層中。每個 `Object3D` 有 position、rotation、scale 等 transform；子物件的 transform 會相對父節點解讀。用 `Group` 把一組需共同移動、旋轉或顯示/隱藏的物件組織起來。

```js
const group = new THREE.Group();
group.position.x = 2;
scene.add(group);
group.add(mesh); // mesh 的位置此時是相對 group
```

`Mesh` 是可繪製物件，不等於幾何本身。相同 geometry/material 可被多個 mesh 共用；若共享資源，清理時要等最後一個使用者結束再 dispose。

## 座標與方向

Three.js 常見座標慣例為 Y 軸向上。物件預設位於局部原點；`position` 表示相對父物件的平移，rotation 使用弧度，scale 表示軸向倍率。父節點 transform 會影響其後代。要比較世界位置可呼叫 `getWorldPosition()`，父子重新掛載若需保留世界 transform，先了解 `attach()` 的語意。

## Geometry 的角色

內建 `BoxGeometry`、`SphereGeometry` 等適合原型與示範。一般幾何資料在 BufferGeometry 的 attributes / index 等緩衝結構中；細分越高通常代表更多頂點與三角形。先用低成本幾何確認構圖，再按需要提升細節。

### 常見坑
- 改了父物件位置卻把子物件座標當世界座標解讀。
- rotation 直接使用度數；Three.js 的 `rotation.x/y/z` 使用弧度。
- 每個物件都重建相同幾何/材質，造成重複 GPU 資源與 draw calls。
- 模型匯入後多出多層節點；先遍歷 scene graph、檢查名稱與 transform，再決定如何重組。

### 官方延伸閱讀
- [Scene API](https://threejs.org/docs/pages/Scene.html)
- [Object3D API](https://threejs.org/docs/pages/Object3D.html)
- [Creating a scene](https://threejs.org/manual/pages/creating-a-scene.html)
