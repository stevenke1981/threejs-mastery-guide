# 03｜幾何、材質、光照與色彩

## 材質先從用途選

- `MeshBasicMaterial` 不受燈光影響，適合不需光照的圖形或除錯。
- `MeshLambertMaterial`、`MeshPhongMaterial` 是較簡單的光照模型，便於教學或特定風格。
- `MeshStandardMaterial` 提供常用 PBR 粗糙度/金屬度工作流程；`MeshPhysicalMaterial` 有更豐富的物理表面參數，成本與設定也較高。

不要只選看起來「最高級」的材質。若 scene 沒有合適的光源，Standard/Physical 物件可能接近全黑；若大量使用透明、反射或高細分，也需量測效能。

## 光源與陰影

常見光源有 ambient/hemisphere、directional、point、spot 等。先建立清楚的主光、補光與環境光層次，再細調材質。陰影需正確啟用 renderer 與 light/object 的 shadow 設定，並限制 shadow camera 範圍與貼圖解析度；只對重要光源開陰影。

## 色彩管理

色彩會受到來源色彩空間、材質、光照、tone mapping 與 renderer 輸出的共同影響。顏色看起來不對時，確認貼圖標記、色彩管理與 tone mapping，不要盲目增加燈光強度。不同 renderer 或顯示設定可能產生視覺差異，需以目標裝置驗收。

## 貼圖與 UV

貼圖是 GPU 紋理資源；常見用途包括 `map`、`normalMap`、`roughnessMap`、`metalnessMap`。確認 UV、影像方向、壓縮格式、尺寸與載入 URL。2D 色彩貼圖與資料貼圖不是同一類色彩資料，應依官方文件正確指定。

### 常見坑
- PBR 材質無有效光照，誤以為材質色彩壞掉。
- 以 sRGB 十六進位色值和線性光照值混為一談。
- 陰影範圍過大或解析度過高，增加耗用卻看不到改善。
- 使用透明材質時遇到排序、深度寫入或邊緣問題；先縮小問題至單一材質與物件。

### 官方延伸閱讀
- [Materials](https://threejs.org/manual/pages/materials.html)
- [Lights](https://threejs.org/manual/pages/lights.html)
- [Color management](https://threejs.org/manual/pages/color-management.html)
- [Material API](https://threejs.org/docs/pages/Material.html)
