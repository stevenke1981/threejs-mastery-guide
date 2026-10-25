# 02｜Camera、Renderer 與響應式畫布

## Camera

Three.js r163 起的 `WebGLRenderer` 需要 WebGL 2；本範例會在無法建立 renderer 時顯示提示。`PerspectiveCamera(fov, aspect, near, far)` 模擬透視投影：`fov` 為垂直視野角度（度），`aspect` 通常是畫布寬/高；near/far 定義可見的深度區間。near 不宜設為 0；過大的 near/far 比例也可能讓深度精度變差。相機需朝向目標，常用 `camera.lookAt()` 或控制器管理視角。

## Renderer 與逐幀繪製

最小流程：建立 renderer → 將 `renderer.domElement` 加入 DOM → 設定尺寸 → render(scene, camera)。需要連續更新時使用 `renderer.setAnimationLoop(callback)`，在回呼內更新動態狀態並繪圖。非即時場景可只在內容變更後重繪，避免無效常駐動畫。

## 響應式尺寸

監看實際容器，而非假設畫布永遠等於 window。容器尺寸變化時：

```js
renderer.setSize(width, height, false);
camera.aspect = width / height;
camera.updateProjectionMatrix();
```

高 DPI 裝置可限制內部解析度（例如自行以 `Math.min(devicePixelRatio, 2)` 計算 drawing buffer 尺寸）；過高解析度會按寬、高兩軸增加像素工作量。官方響應式指南偏好自行計算 drawing buffer 寬高並傳給 `renderer.setSize(..., false)`，而不是使用 `renderer.setPixelRatio()` 的隱式倍乘。手機版也應測試 CSS layout、觸控手勢與可視區高度。

## 色彩與輸出

RGB 值、材質與 renderer 輸出色彩空間互相關聯。不要只靠「把顏色調亮」修正整條色彩管線；先查來源貼圖的色彩空間、材質與 renderer 設定。新版本的色彩管理會自動處理部分輸入轉換，請以目前官方文件為準。

### 常見坑
- 改了相機 `aspect` 忘了 `updateProjectionMatrix()`。
- renderer 使用 window 尺寸但 CSS canvas 填滿不同大小的容器，造成變形或模糊。
- 每幀呼叫 `setSize()`；應在尺寸真的變更時才調整。
- 高 DPR、昂貴材質與大量像素疊加，導致手機掉幀。

### 官方延伸閱讀
- [Responsive design](https://threejs.org/manual/pages/responsive.html)
- [PerspectiveCamera API](https://threejs.org/docs/pages/PerspectiveCamera.html)
- [WebGLRenderer API](https://threejs.org/docs/pages/WebGLRenderer.html)
