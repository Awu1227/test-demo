import Konva from "konva";
import HotKey from "../hotKey";
import CreateLayout from "../layout";

/**@description 创建球球 */
export default class CreateBall {
  ly: CreateLayout;
  ball = new Konva.Circle({
    x: 500,
    y: 500,
    fill: "lightblue",
    radius: 40,
  });
  constructor(ly: CreateLayout) {
    this.ly = ly;
    this.initBall(ly);
  }
  /**@description 初始化球球 */
  initBall(ly: CreateLayout) {
    // 设置球的位置为Stage的中心
    this.ball.x(ly.stage.width() / 2);
    this.ball.y(ly.stage.height() / 2);

    ly.layer.add(this.ball);
  }

  responseKeydown(hotKey: HotKey) {
    console.log(hotKey);
  }
  // 放大或缩小球球
  scale(count: number) {
    this.ball.radius(this.ball.radius() + count / 10);
    const coefficient = this.ball.radius() / 40;
    const reduce_coefficient = 40 / this.ball.radius();
    this.ly.ballInfo.text(
      `我的质量${(100 * +coefficient.toFixed(2)).toFixed()}吨`
    );

    // 缩放Stage
    this.ly.stage.scaleX(this.ly.stage.scaleX() * reduce_coefficient);
    this.ly.stage.scaleY(this.ly.stage.scaleY() * reduce_coefficient);

    this.ly.reSizeStage();
  }
}
