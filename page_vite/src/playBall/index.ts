import Konva from "konva";
import CreateLayout from "../layout";

/**@description 创建球球 */
export default class CreateBall {
  ball = new Konva.Circle({
    x: 500,
    y: 500,
    fill: "lightblue",
    radius: 40,
  });
  constructor(ly: CreateLayout) {
    this.initBall(ly);
  }
  /**@description 初始化球球 */
  initBall(ly: CreateLayout) {
    // 设置球的位置为Stage的中心
    this.ball.x(ly.stage.width() / 2);
    this.ball.y(ly.stage.height() / 2);

    ly.layer.add(this.ball);
  }
}
