import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createLight } from "./components/light";
import { createScene } from "./components/scene";

import { createRenderer } from "./systems/renderer";
import { createControls } from './systems/controls.js';
import { Resizer } from "./systems/Resizer";
import Loop from './systems/Loop';
import { createGridHelper } from "./components/gridHelper";
import Transformer3D from '../../utils/transformer3D';

export default class World {
  tsf: Transformer3D
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

    document.addEventListener('pointermove',(evt) => this.onPointerMove(evt))

    const cube = createCube();

    const stuff = {
      m_Object3D: cube,
      setVisible: () => {},
      destory: () => {}
    }
    
    this.tsf = new Transformer3D(stuff, this.camera)
    console.log('controller',this.tsf);
    this.tsf.showController(stuff)

    const light = createLight();

    const gridHelper = createGridHelper()

    const controls = createControls(this.camera,this.renderer.domElement)

    this.loop.updatables.push(cube,controls)
    this.scene.add(cube,gridHelper, light,this.tsf.controller_3d!);

    console.log('scene',this.scene);
    
    const resizer = new Resizer(container, this.camera, this.renderer);
    // resize 触发后，重新渲染
    resizer.onResize = () => {
      this.render();
    };
  }

  onPointerMove(evt:MouseEvent) {
    this.tsf.isShow && this.tsf.OnMouseMove(evt, 1)
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
