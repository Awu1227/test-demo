import { PerspectiveCamera, WebGLRenderer } from "three";

export const Resizer = class {
  constructor(container, camera, renderer) {
    camera.aspect = container.clientWidth / container.clientHeight;

    // 相机的平截头存储在投影矩阵中，需要调用此方法更新
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);

    renderer.setPixelRatio(window.devicePixelRatio);
  }
};
