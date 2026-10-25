# 05｜動畫、控制器與拾取

## 時間步進動畫

動畫不要只按「每幀加固定角度」更新；不同裝置的更新頻率不同，運行速度會因此不一致。以秒為單位的 delta time 更新，並對長時間卡頓後的 delta 做上限保護。互動範例採 `renderer.setAnimationLoop()`，並以 delta 推進簡單旋轉。

## glTF 動畫

對匯入的 clip，典型流程為建立 `AnimationMixer(model)`、選擇 `clipAction(gltf.animations[index])`、呼叫 `play()`，然後在每幀呼叫 `mixer.update(deltaSeconds)`。角色動畫還要妥善處理 clip 切換、淡入淡出、停止與資源清理。

## OrbitControls

`OrbitControls` 是 addon，讓使用者以滑鼠、觸控或滾輪環繞相機。指定 camera 與 canvas；若啟用 `enableDamping` 或 auto-rotate，動畫迴圈中需持續呼叫 `controls.update()`。生產介面要考慮觸控衝突、縮放上限、旋轉限制及鍵盤可及性。

## Raycaster 拾取

Raycaster 將相機視角中的指標座標轉成射線，再測試射線與物件的交集。對 canvas 區域的 pointer 座標先換算為 NDC（x、y 都落在 -1 到 +1），再 `setFromCamera()`；呼叫 `intersectObjects()` 後，第一個命中項通常是最近交點。透明或不可見物件、layer、物件本身的 raycast 實作都會影響命中。

```js
const rect = renderer.domElement.getBoundingClientRect();
pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
raycaster.setFromCamera(pointer, camera);
const hit = raycaster.intersectObjects(targets, false)[0];
```

### 常見坑
- 指標座標用 window 尺寸而非 canvas 的 bounding rect。
- canvas 被 CSS 縮放、位移或放進子容器，仍假設左上角在 (0,0)。
- damping 開啟但沒有持續更新 controls。
- raycast 對高面數模型做每次指標移動測試；可降低頻率、限制目標或採用較簡單的互動代理幾何。

### 官方延伸閱讀
- [Animation system](https://threejs.org/manual/pages/animation-system.html)
- [OrbitControls API](https://threejs.org/docs/pages/OrbitControls.html)
- [Raycaster API](https://threejs.org/docs/pages/Raycaster.html)
