# 名詞表

- **Scene**：場景物件樹的根節點。
- **Object3D**：具有 transform 與父子階層能力的基礎場景物件。
- **Mesh**：以 Geometry 和 Material 建立的可繪製物件。
- **Geometry / BufferGeometry**：定義頂點、索引、法線、UV 等形狀資料。
- **Material**：描述表面如何呈現；可能使用顏色、貼圖與光照參數。
- **Camera**：定義視點、投影與視錐。
- **Renderer**：把場景與相機輸出為畫面。
- **Addon**：需從 `three/addons/...` 額外匯入的控制器、載入器或功能模組。
- **glTF / GLB**：常用於傳輸 3D 場景與資產的格式；GLB 是二進位封裝形式之一。
- **PBR**：Physically Based Rendering，以較一致的物理參數描述表面與光照互動。
- **NDC**：Normalized Device Coordinates；Raycaster 指標座標通常需換算至 x/y 的 -1 到 +1 範圍。
- **Draw call**：Renderer 向圖形 API 發出的繪製工作；數量與場景/材質分組相關。
- **DPR**：Device Pixel Ratio；裝置 CSS 像素與實際像素密度的比例。
- **dispose()**：明確釋放 Three.js 管理的 GPU 資源；不是刪除 JavaScript 物件的同義詞。
- **TSL**：Three Shading Language，Three.js 的節點式 shader 描述方式。
