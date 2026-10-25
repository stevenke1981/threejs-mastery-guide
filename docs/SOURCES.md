# 官方來源與版本紀錄

本專案是摘要型學習導覽。核心 API 說明請回到 Three.js 官方文件核對；內容整理基準為 2026-10-26，範例套件固定 `three@0.186.1`（r186）。官方文件會持續更新，若內容不同，以官方頁面與套件版本為準。

## 官方文件索引

### 入門與場景
- [Installation](https://threejs.org/manual/pages/installation.html)
- [Creating a scene](https://threejs.org/manual/pages/creating-a-scene.html)
- [Scene API](https://threejs.org/docs/pages/Scene.html)
- [Object3D API](https://threejs.org/docs/pages/Object3D.html)

### 相機、畫面與互動
- [Responsive design](https://threejs.org/manual/pages/responsive.html)
- [PerspectiveCamera API](https://threejs.org/docs/pages/PerspectiveCamera.html)
- [WebGLRenderer API](https://threejs.org/docs/pages/WebGLRenderer.html)
- [OrbitControls API](https://threejs.org/docs/pages/OrbitControls.html)
- [Raycaster API](https://threejs.org/docs/pages/Raycaster.html)

### 內容、光照與資產
- [Materials](https://threejs.org/manual/pages/materials.html)
- [Lights](https://threejs.org/manual/pages/lights.html)
- [Color management](https://threejs.org/manual/pages/color-management.html)
- [Loading 3D models](https://threejs.org/manual/pages/loading-3d-models.html)
- [Loading a glTF file](https://threejs.org/manual/pages/load-gltf.html)
- [GLTFLoader API](https://threejs.org/docs/pages/GLTFLoader.html)
- [Animation system](https://threejs.org/manual/pages/animation-system.html)

### 效能與進階
- [Cleanup](https://threejs.org/manual/pages/cleanup.html)
- [WebGPU renderer API](https://threejs.org/docs/pages/WebGPURenderer.html)
- [Three.js Migration Guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide)
- [Three.js releases](https://github.com/mrdoob/three.js/releases)

## 版本策略

- `package.json` 與 `package-lock.json` 鎖定可重現的範例版本；更新時重新建置並檢閱 Migration Guide。
- API 文件會隨 Three.js 更新。本文不保證舊版相容性，也不替代實際瀏覽器測試。
- Three.js 官方專案及商標不屬於本指南；本指南僅提供摘要、教學範例與來源連結。
