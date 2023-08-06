import Konva from "konva";
import CreateLayout from "../layout";
export default class createRandomSprite {
  spriteGroup = new Konva.Group({
    name: "ranDomSprite",
  });
  constructor(ly: CreateLayout) {
    this.createShape(3000);

    ly.layer.add(this.spriteGroup);
  }
  /**@description 生成Shape */
  createShape(count: number) {
    for (let i = 0; i < count; i++) {
      const polygon = new Konva.RegularPolygon({
        name: "sprite",
        x: Math.random() * window.innerWidth * 10,
        y: Math.random() * window.innerHeight * 10,
        sides: this.getRandomSize(),
        radius: 6,
        fill: this.getRandomColor(),
      });
      this.spriteGroup.add(polygon);
    }
  }
  /**@description 获取随机多边形 */
  getRandomSize() {
    const random = Math.random() * 10;
    if (random < 3) {
      return 3;
    } else if (random < 6) {
      return 4;
    } else {
      return 5;
    }
  }

  /**@description 获取随机颜色 */
  getRandomColor() {
    const random = Math.random() * 10;
    if (random < 3) {
      return "purple";
    } else if (random < 6) {
      return "lightyellow";
    } else if (random < 8) {
      return "lightblue";
    } else {
      return "pink";
    }
  }
}
