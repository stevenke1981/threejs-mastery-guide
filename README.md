# Three.js 繁體中文指南與互動範例

> 以主題分類的 Three.js 學習地圖、常見問題整理，以及一個可直接執行的互動場景。適合剛接觸 Web 3D 到需要建立實務心智模型的開發者。

[![Build](https://github.com/stevenke1981/threejs-mastery-guide/actions/workflows/build.yml/badge.svg)](https://github.com/stevenke1981/threejs-mastery-guide/actions/workflows/build.yml)

## 先看互動範例

```bash
npm ci
npm run dev
```

依終端機顯示的本機網址開啟。範例需瀏覽器支援 WebGL 2。拖曳旋轉、滾輪縮放，點擊球體／方塊／圓環以查看 Raycaster 命中資訊；也可調整旋轉速度與切換線框。正式建置：`npm run build`，輸出至 `dist/`。

## 學習地圖

### 入門與渲染骨架
- [00｜從哪裡開始](docs/00-start-here.md) — 安裝、學習順序、核心心智模型。
- [01｜Scene Graph 與座標](docs/01-scene-graph.md) — Object3D、Mesh、父子階層、局部／世界座標。
- [02｜Camera、Renderer 與響應式畫布](docs/02-camera-rendering.md) — 相機、裁切面、像素比、ResizeObserver。

### 場景內容與互動
- [03｜幾何、材質、光照與色彩](docs/03-materials-lighting-color.md) — BufferGeometry、PBR、色彩管理、陰影。
- [04｜載入 3D 資產](docs/04-assets-gltf.md) — GLTFLoader、資產路徑、模型尺寸與除錯。
- [05｜動畫、控制器與拾取](docs/05-animation-interaction.md) — 時間步進、AnimationMixer、OrbitControls、Raycaster。

### 上線與品質
- [06｜效能與資源生命週期](docs/06-performance-memory.md) — draw calls、instancing、dispose、DPR。
- [07｜WebGPU 與進階方向](docs/07-webgpu-and-next-steps.md) — WebGPURenderer、TSL 的定位與漸進式學習。
- [08｜常見故障排查](docs/08-troubleshooting.md) — 空白畫面、模型不見、顏色不對、效能低落。
- [名詞表](docs/glossary.md) · [官方來源與版本紀錄](docs/SOURCES.md)

## 建議學習路徑

1. **第一次做 3D**：00 → 01 → 02 → 啟動互動範例。
2. **做出場景**：03 → 04 → 05。
3. **準備上線**：06 → 08 → 07（需要時再學 WebGPU）。

## 版本與範圍

- 整理基準：Three.js `r186` / npm 套件 `three@0.186.1`；Vite `8.3.5`。版本只是本範例的可重現基線；請以 [官方文件](https://threejs.org/docs/) 與各頁 API 為準。
- 本專案是社群整理的學習材料，**非 Three.js 官方專案**。不複製官方文件全文；主題摘要、示例程式與官方文件連結分開標示。
- Three.js 更新快速；升級套件時請檢查官方 [Migration Guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide) 及相應 API 文件。

## 貢獻

歡迎修正錯字、補充可重現的範例或更新官方來源。請保留章節中的「用途／常見坑／官方延伸閱讀」結構，並在程式碼變更後執行 `npm ci && npm run build`。

## 授權

本專案文字與程式碼採 MIT License（見 [LICENSE](LICENSE)）。Three.js 為其各自作者所有，依 [Three.js 專案授權](https://github.com/mrdoob/three.js/blob/dev/LICENSE) 使用。