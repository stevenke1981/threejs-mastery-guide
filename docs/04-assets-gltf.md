# 04｜載入 3D 資產：以 glTF 為主

## 為何優先考慮 glTF

glTF 旨在傳遞 3D 場景/模型資料，常見 `.gltf` + 外部資產，或封裝成 `.glb`。它可包含節點階層、網格、材質、貼圖、骨架與動畫等資訊。Web 專案常用它作為交付模型的格式；匯出時要檢查模型尺寸、原點、材質、貼圖與授權。

## GLTFLoader 最小概念

`GLTFLoader` 是 addon，需從 `three/addons/loaders/GLTFLoader.js` 引入。載入成功後常從 `gltf.scene` 取得預設場景；動畫片段通常放在 `gltf.animations`。

```js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const loader = new GLTFLoader();
loader.load('/models/robot.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  // gltf.animations 可交給 AnimationMixer 播放
}, undefined, (error) => {
  console.error('模型載入失敗', error);
});
```

也可使用 `loadAsync()` 搭配 `try/catch`；載入流程通常要處理 loading 狀態、錯誤訊息與場景掛載時機。路徑以公開可讀的 URL 為準，確保 `.glb`、`.gltf` 參照的 buffer/texture 都能部署到主機。

## 調整模型

載入後先看 `Box3().setFromObject(model)` 得到包圍盒，再依需求置中或縮放。對包含骨架、動畫或大量子節點的模型，不要任意複製/重建內部節點；需確認 clone 是否保留骨架關係。查模型層級可遍歷 scene graph 並輸出名稱、型別和位置。

### 常見坑
- 模型出現於場景但看不見：檢查載入錯誤、模型大小、相機方向、near/far、光照與材質。
- 主 HTML 可載入但子貼圖 404：模型相對路徑或部署的 base path 不正確。
- glTF 顏色與 DCC 工具不同：查材質、貼圖色彩空間、曝光與燈光。
- 混用 CommonJS 範例與 ESM 專案，導致 addon import 失敗。
- 將來自網路的模型直接塞進公開站點：先檢查來源授權與檔案安全。

### 官方延伸閱讀
- [Loading 3D models](https://threejs.org/manual/pages/loading-3d-models.html)
- [Loading a glTF file](https://threejs.org/manual/pages/load-gltf.html)
- [GLTFLoader API](https://threejs.org/docs/pages/GLTFLoader.html)
