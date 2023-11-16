const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  // 相机的平截头存储在投影矩阵中，需要调用此方法更新
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

export const Resizer = class {
  constructor(container, camera, renderer) {
    // 初始化设置
    setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      setSize(container, camera, renderer);
      this.onResize();
    });
  }
  onResize() {}
};
