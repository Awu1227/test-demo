import Konva from "konva";
import CreateCoordinate from "./coordinate";
import CreateBall from "./playBall";
import createRandomSprite from "./randomSprite";

/**@description Layout类，存放Stage和Layer */
export default class CreateLayout {
  public stage: Konva.Stage;
  public layer: Konva.Layer;
  ballInfo: Konva.Text;

  /**@description 坐标系 */
  public coordinate?: CreateCoordinate;
  public sprites?: createRandomSprite;
  public ballClass?: CreateBall;
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
  reSizeStage() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.stage.width(width);
    this.stage.height(height);
    this.coordinate?.resize();
  }
}
