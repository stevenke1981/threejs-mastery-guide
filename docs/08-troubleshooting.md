# 08｜常見故障排查

遇到問題時先縮小範圍：確認瀏覽器 console 與 network、建立只含一個 Mesh 的場景、暫時停用 controls/貼圖/後處理，再逐一加回。避免一次換掉相機、材質、燈光與 renderer，否則無法判斷根因。

## 畫面全黑或沒有物件
- 看 console 是否有 module、WebGL 或 shader 錯誤。
- 確認 canvas 有非零 CSS / drawing-buffer 尺寸且 renderer.render(scene, camera) 確實執行。
- 確認物件已加入 scene、相機朝向場景、near/far 合理、物件沒有落在視錐外。
- `MeshStandardMaterial` 等受光材質需檢查是否有足夠且位置合理的光源。

## 畫面變形或模糊
- 比對 canvas CSS 尺寸與 renderer drawing buffer 尺寸。
- 尺寸變動後重新設定 camera.aspect 並更新 projection matrix。
- 限制高 pixel ratio，避免把效能問題誤判為解析度問題。

## glTF 模型缺失或材質怪異
- Network 面板看每一個模型、buffer、貼圖請求是否成功。
- 確認部署 base path、大小寫、相對路徑、CORS 與 MIME 設定。
- 暫時使用簡單材質和單一光源，分別檢查模型幾何、材質與貼圖。
- 查看包圍盒及模型名稱，確認模型實際尺寸和位置。

## 顏色或光照與預期不同
- 確認 texture 色彩空間、材質、光源、tone mapping、曝光與輸出色彩空間。
- 對照 Three.js 當前版本的 Color Management 手冊，不要照抄舊版本的色彩設定。

## 互動點不到物件
- Raycaster 的 NDC 座標使用 canvas 的 bounding rect。
- 確認物件在 raycast 目標清單中，layer 與可見性正確。
- 先以簡單 BoxGeometry 驗證相機射線，再檢查自訂 geometry / raycast 行為。

## 記憶體持續上升
- 確認元件卸載時 geometry/material/texture/render target 已清理。
- 確認事件監聽、控制器、動畫迴圈與載入中的請求已停止。
- 共享資源採集中管理，不要每次切換場景都建立新副本而不釋放。

### 官方延伸閱讀
- [Three.js Manual](https://threejs.org/manual/)
- [Loading a glTF file](https://threejs.org/manual/pages/load-gltf.html)
- [Cleanup](https://threejs.org/manual/pages/cleanup.html)
