import Konva from "konva";
import CreateLayout from "../layout";

export default class CreateCoordinate {
  ly: CreateLayout;
  /**@description 垂直线组 */
  verLineGroup = new Konva.Group();
  /**@description 水平线组 */
  horLineGroup = new Konva.Group();
  /**@description 线的间距 */
  distance = 20;
  constructor(ly: CreateLayout) {
    this.createLine(ly, "#484842"); // 创建网格
    ly.layer.add(this.verLineGroup, this.horLineGroup);
  }
  /**@description 创建网格 */
  createLine(ly: CreateLayout, Color: string = "#484842") {
    this.ly = ly;
    const bgWidth = ly.layer.width() * 10;
    const bgHeight = ly.layer.height() * 10;

    for (let i = 0; i < bgWidth; i += this.distance) {
      const verLine = new Konva.Line({
        points: [i, 0, i, bgHeight],
        stroke: Color,
        strokeWidth: 1,
        lineCap: "round",
        lineJoin: "round",
      });
      this.verLineGroup.add(verLine);
    }
    for (let i = 0; i < bgHeight; i += this.distance) {
      const horLine = new Konva.Line({
        points: [0, i, bgWidth, i],
        stroke: Color,
        strokeWidth: 1,
        lineCap: "round",
        lineJoin: "round",
      });
      this.horLineGroup.add(horLine);
    }
  }
  resize() {
    this.horLineGroup = new Konva.Group();
    this.verLineGroup = new Konva.Group();
    this.createLine(this.ly);
  }
}
