# 07｜WebGPU 與進階方向

## WebGPU 在 Three.js 中的位置

Three.js 提供 `WebGPURenderer` 作為 WebGPU 路徑；官方文件指出，預設會優先嘗試 WebGPU，若瀏覽器不支援則回退至 WebGL 2 backend。初始化是非同步的；採用 `renderer.setAnimationLoop()` 可配合初始化後開始繪製，若自行管理 requestAnimationFrame 或在初始化階段直接使用 renderer，須依文件先 `await renderer.init()`。其功能、效能與瀏覽器支援會隨版本演進；不要假設 `WebGLRenderer` 的全部行為可直接套用。先看目前版本的 API 文件與官方範例，再針對目標瀏覽器實測。

## TSL 與節點式材質

TSL（Three Shading Language）用節點方式描述 shader 邏輯，是跨 renderer 路徑探索著色器的重要方向。學習前先掌握向量、座標空間、法線、UV 與 fragment/vertex 的基本概念，再從官方 node material / TSL 範例開始。API 仍會演進，固定依賴版本並追蹤 Migration Guide。

## 何時該學 WebGPU

- 目標功能明確依賴 WebGPU 或其新渲染能力。
- 需要評估新的渲染架構，且能承擔瀏覽器支援與相容測試。
- 團隊願意維護 feature detection、fallback 與版本升級。

若目標只是初學 3D、載入模型、做互動產品展示，先把 Scene / Camera / Material / Loader / Animation / dispose 的 WebGL 基礎做好，再評估遷移。

### 官方延伸閱讀
- [WebGPURenderer API](https://threejs.org/docs/pages/WebGPURenderer.html)
- [Three.js examples](https://threejs.org/examples/)
- [Migration Guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide)
