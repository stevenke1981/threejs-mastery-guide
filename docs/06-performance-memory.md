# 06｜效能與資源生命週期

## 先量測，再優化

`renderer.info` 可提供 draw call、三角形與部分 GPU 資源計數的觀察值；它不是跨瀏覽器的完整效能分析器。另用瀏覽器 DevTools 的 Performance、Memory、Network 面板觀察 CPU、GC、載入與影格時間。比較時固定場景、尺寸與操作方式。

## 常見優化順序

1. 減少每幀不必要的運算和 DOM 更新。
2. 共用 geometry/material；大量重複物件考慮 `InstancedMesh`。
3. 控制 draw calls、三角形、貼圖尺寸與裝置 pixel ratio。
4. 對靜態場景避免持續重繪；避免每幀建立臨時 Vector、材質或幾何物件。
5. 用 LOD、可見性裁切、壓縮貼圖/模型等方式降低場景成本；以目標裝置實測。

合併網格雖可能降低 draw calls，但會降低獨立互動能力；Instancing 適合共享幾何與材質的大量複本，且每個 instance 的資料和排序需求需一併設計。

## dispose 與清理

Three.js 的 GPU 資源生命週期不等同於 JavaScript 物件被 GC 回收。當不再需要時，依資源類型呼叫 `geometry.dispose()`、`material.dispose()`、`texture.dispose()` 等；移除 Mesh 本身不會自動釋放所有相關 GPU 資源。共享資源要管理引用關係，不能第一個物件卸載時就把仍被其他物件使用的材質 dispose。

載入器可能建立多個貼圖與材質；清理時遍歷模型樹並避免重複 dispose。後處理 render targets、controls、renderer、event listeners、ResizeObserver 也需要各自清理。建議把建置與 teardown 封裝在明確的生命週期函式。

## 陰影與透明度成本

陰影貼圖、透明混合、後處理、過高的 framebuffer 尺寸會增加 GPU 成本。先在目標裝置記錄基準，再一次改一個變數。多數效能瓶頸取決於場景、解析度與硬體，沒有單一設定適合所有裝置。

### 官方延伸閱讀
- [Cleanup](https://threejs.org/manual/pages/cleanup.html)
- [InstancedMesh API](https://threejs.org/docs/pages/InstancedMesh.html)
- [WebGLRenderer API](https://threejs.org/docs/pages/WebGLRenderer.html)
