import Konva from "konva";

/**@description Layout类，存放Stage和Layer */
export default class CreateLayout {
  public stage: Konva.Stage;
  public layer: Konva.Layer;
  constructor() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.stage = new Konva.Stage({
      container: "konva-dom",
      width: width,
      height: height,
    });
    this.stage.container().style.backgroundColor = "#151e39";

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }
}
