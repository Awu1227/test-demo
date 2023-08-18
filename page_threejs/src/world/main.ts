import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createLight } from "./components/light";
import { createScene } from "./components/scene";

import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import Loop from './systems/Loop';

export default class World {
  private camera: PerspectiveCamera;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private loop: Loop

  constructor(container: Element) {
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera,this.scene,this.renderer)
    container.append(this.renderer.domElement);

    const cube = createCube();
    this.loop.updatables.push(cube)
    const light = createLight();
    this.scene.add(cube, light);

    const resizer = new Resizer(container, this.camera, this.renderer);
    // resize 触发后，重新渲染
    resizer.onResize = () => {
      this.render();
    };
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}
