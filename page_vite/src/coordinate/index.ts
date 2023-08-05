import Konva from "konva";
import CreateLayout from "../layout";

export default class CreateCoordinate {
  /**@description 垂直线组 */
  verLineGroup = new Konva.Group();
  /**@description 水平线组 */
  horLineGroup = new Konva.Group();
  /**@description 线的间距 */
  distance = 20;
  constructor(ly: CreateLayout) {
    this.createLine(ly, "#484842"); // 创建网格
  }
  /**@description 创建网格 */
  createLine(ly: CreateLayout, Color: string) {
    const bgWidth = ly.layer.width();
    const bgHeight = ly.layer.height();
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
    ly.layer.add(this.verLineGroup, this.horLineGroup);
  }
}
