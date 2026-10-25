# 00｜從哪裡開始

Three.js 是 JavaScript 3D 函式庫，負責把場景、相機與可繪製物件交給瀏覽器圖形後端。學習時先建立「資料如何組成一張畫面」的模型，再逐步補齊模型載入、互動、動畫與效能。

## 最小前置知識

- JavaScript modules：`import` / `export`、事件、陣列與物件。
- HTML/CSS 基本概念；一個 3D 畫布通常是 `<canvas>`。
- 向量、座標、角度有助理解，但可邊做邊學。
- 使用 Node.js 與本機開發伺服器；不要用 `file://` 直接開 ES module 範例，瀏覽器安全限制會使載入失敗。

## 核心心智模型

1. **Scene** 是物件樹的根，保存要呈現的內容與背景。
2. **Camera** 決定從何處、以何種投影觀察場景。
3. **Renderer** 將 scene 從 camera 的視角繪製到 canvas。
4. 一個 **Mesh** 通常由 Geometry（形狀資料）與 Material（表面外觀）組成。
5. 每幀更新狀態，再 render；互動則把輸入事件映射到場景物件。

## 在本專案動手

```bash
npm ci
npm run dev
```

開啟 Vite 顯示的 localhost 位址。拖曳與縮放由 OrbitControls 處理；點擊物件則由 Raycaster 對相機射線做相交測試。請改旋轉速度與線框開關，再到 `src/main.js` 找對應事件。

## 推薦閱讀順序

- 先讀 [Scene Graph 與座標](01-scene-graph.md)、[Camera 與 Renderer](02-camera-rendering.md)。
- 再讀 [材質與光照](03-materials-lighting-color.md)、[載入 GLTF](04-assets-gltf.md)。
- 最後看 [動畫與互動](05-animation-interaction.md) 及 [效能與清理](06-performance-memory.md)。

### 官方延伸閱讀
- [Installation](https://threejs.org/manual/pages/installation.html)
- [Creating a scene](https://threejs.org/manual/pages/creating-a-scene.html)
