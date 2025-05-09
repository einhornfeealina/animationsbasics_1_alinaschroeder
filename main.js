import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

// A4-Verhältnis (595x842)
const A4_RATIO = 595 / 842;
const scene = new THREE.Scene();

// Kamera
const camera = new THREE.PerspectiveCamera(45, A4_RATIO, 70, 100000);
camera.position.set(0, 0, 1289.2);
camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
resizeRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setClearAlpha(1);
scene.background = new THREE.Color('#7b7b7b');
document.body.appendChild(renderer.domElement);

// Spline-Szene laden
const loader = new SplineLoader();
loader.load(
  'https://prod.spline.design/payNqnsADNnSdpSM/scene.splinecode', // dein Pfad
  (splineScene) => {
    scene.add(splineScene);
  }
);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

// Resizing
window.addEventListener('resize', () => {
  resizeRenderer();
});

function resizeRenderer() {
  const height = window.innerHeight;
  const width = height * A4_RATIO;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate(time) {
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
