import { Application } from 'https://unpkg.com/@splinetool/runtime@1.0.63/build/runtime.js';

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);

app.load('https://prod.spline.design/f8egARVcZ4MEgr-p/scene.splinecode');
