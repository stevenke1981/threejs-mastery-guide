import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './style.css';

const root = document.querySelector('#scene-root');
const viewport = document.querySelector('#viewport');
const scene = new THREE.Scene();
scene.background = new THREE.Color('#080d18');

const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
camera.position.set(5.4, 4.2, 8.2);

const rendererCanvas = document.createElement('canvas');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas: rendererCanvas, antialias: true, alpha: false });
} catch (error) {
  root.innerHTML = '<div class="unsupported" role="alert"><strong>無法啟動 3D 畫布</strong><br />此範例需要支援 WebGL 2 的瀏覽器與可用的圖形加速。請更新瀏覽器或檢查硬體加速設定。</div>';
  console.error('Three.js WebGL 2 renderer initialization failed.', error);
  throw error;
}
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
root.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0.7, 0);

scene.add(new THREE.HemisphereLight('#dceaff', '#182038', 2.1));
const keyLight = new THREE.DirectionalLight('#fff1d3', 3.2);
keyLight.position.set(-3, 7, 5);
scene.add(keyLight);
const rimLight = new THREE.PointLight('#5988ff', 18, 12);
rimLight.position.set(4, 2.6, -2);
scene.add(rimLight);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(200, 200),
  new THREE.MeshStandardMaterial({ color: '#0c1322', roughness: 0.9, metalness: 0.05 }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.82;
scene.add(floor);

const grid = new THREE.GridHelper(20, 20, '#33415f', '#202b42');
grid.position.y = -0.805;
scene.add(grid);

const objects = [];
const shared = {
  sphere: new THREE.MeshStandardMaterial({ color: '#69e0c1', roughness: 0.27, metalness: 0.18 }),
  box: new THREE.MeshStandardMaterial({ color: '#8aa7ff', roughness: 0.32, metalness: 0.12 }),
  torus: new THREE.MeshStandardMaterial({ color: '#ffad76', roughness: 0.24, metalness: 0.35 }),
};

function addObject(name, geometry, material, position, detail) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.userData.detail = detail;
  scene.add(mesh);
  objects.push(mesh);
  return mesh;
}

const sphere = addObject('Sphere', new THREE.SphereGeometry(0.82, 48, 32), shared.sphere, [-2.05, 0.22, 0], 'SphereGeometry · MeshStandardMaterial');
const box = addObject('Box', new THREE.BoxGeometry(1.35, 1.35, 1.35), shared.box, [0, 0.1, 0], 'BoxGeometry · MeshStandardMaterial');
const torus = addObject('Torus', new THREE.TorusKnotGeometry(0.58, 0.2, 120, 16), shared.torus, [2.05, 0.28, 0], 'TorusKnotGeometry · MeshStandardMaterial');

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const selection = document.querySelector('#selection');
const selectionDetail = document.querySelector('#selection-detail');
let selected = null;
let rotationSpeed = 1;
let pointerStart = null;

function updateSelection(next) {
  if (selected) selected.scale.setScalar(1);
  selected = next;
  if (selected) {
    selected.scale.setScalar(1.08);
    selection.textContent = selected.name;
    selectionDetail.textContent = selected.userData.detail;
  } else {
    selection.textContent = '點選一個物件';
    selectionDetail.textContent = 'Raycaster 將回報命中的 Mesh';
  }
}

renderer.domElement.addEventListener('pointerdown', (event) => {
  if (event.button !== 0) return;
  pointerStart = { x: event.clientX, y: event.clientY };
});

renderer.domElement.addEventListener('pointerup', (event) => {
  if (!pointerStart) return;
  const start = pointerStart;
  pointerStart = null;
  if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) return;

  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  scene.updateMatrixWorld(true);
  camera.updateMatrixWorld();
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(objects, false)[0];
  updateSelection(hit?.object ?? null);
});

renderer.domElement.addEventListener('pointercancel', () => { pointerStart = null; });

document.querySelector('#rotation-speed').addEventListener('input', (event) => {
  rotationSpeed = Number(event.target.value);
  document.querySelector('#speed-value').textContent = `${rotationSpeed.toFixed(1)}×`;
});

document.querySelector('#wireframe-toggle').addEventListener('change', (event) => {
  Object.values(shared).forEach((material) => { material.wireframe = event.target.checked; });
});

function resize() {
  const cssWidth = Math.max(1, viewport.clientWidth);
  const cssHeight = Math.max(1, viewport.clientHeight);
  const dpr = window.devicePixelRatio || 1;
  const maxPixelCount = 3840 * 2160;
  const ratioForPixelBudget = Math.sqrt(maxPixelCount / (cssWidth * cssHeight));
  const pixelRatio = Math.min(dpr, 2, ratioForPixelBudget);
  renderer.setSize(Math.floor(cssWidth * pixelRatio), Math.floor(cssHeight * pixelRatio), false);
  camera.aspect = cssWidth / cssHeight;
  camera.updateProjectionMatrix();
}

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(viewport);
resize();
controls.update();
renderer.render(scene, camera);

function updateStats() {
  document.querySelector('#draw-calls').textContent = renderer.info.render.calls;
  document.querySelector('#triangles').textContent = renderer.info.render.triangles.toLocaleString();
  document.querySelector('#geometries').textContent = renderer.info.memory.geometries;
  document.querySelector('#textures').textContent = renderer.info.memory.textures;
}

updateStats();
let previousTime = 0;
let statsFrames = 0;
renderer.setAnimationLoop((time) => {
  const delta = Math.min((time - previousTime) / 1000 || 0, 0.05);
  previousTime = time;
  sphere.rotation.y += delta * 0.32 * rotationSpeed;
  box.rotation.x += delta * 0.22 * rotationSpeed;
  box.rotation.y += delta * 0.42 * rotationSpeed;
  torus.rotation.x += delta * 0.3 * rotationSpeed;
  torus.rotation.y -= delta * 0.35 * rotationSpeed;
  controls.update();
  renderer.render(scene, camera);

  if (++statsFrames % 12 === 0) updateStats();
});

let cleanedUp = false;
window.addEventListener('pagehide', (event) => {
  if (event.persisted || cleanedUp) return;
  cleanedUp = true;
  resizeObserver.disconnect();
  controls.dispose();
  const geometries = new Set();
  const materials = new Set();
  scene.traverse((object) => {
    if (object.geometry) geometries.add(object.geometry);
    if (object.material) {
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) materials.add(material);
    }
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  renderer.dispose();
});
