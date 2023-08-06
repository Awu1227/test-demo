import Konva from "konva";
import { Circle } from "konva/lib/shapes/Circle";
import CreateLayout from "../layout";
import CreateBall from "../playBall";

export default class HotKey {
  key: string;
  tween?: Konva.Tween;
  constructor(ly: CreateLayout, ballClass: CreateBall) {
    window.addEventListener("keydown", (e) => {
      this.key = e.key;
      switch (this.key) {
        case "ArrowUp": // 上
          this.initTween(ballClass.ball, "upmove");
          this.tween?.play();
          this.eatSprite(ly, ballClass.ball);
          break;
        case "ArrowDown": // 下
          this.initTween(ballClass.ball, "downmove");
          this.tween?.play();
          this.eatSprite(ly, ballClass.ball);

          break;
        case "ArrowLeft": // 左
          this.initTween(ballClass.ball, "leftmove");
          this.tween?.play();
          this.eatSprite(ly, ballClass.ball);

          break;
        case "ArrowRight": // 右
          this.initTween(ballClass.ball, "rightmove");
          this.tween?.play();
          this.eatSprite(ly, ballClass.ball);

          break;

        default:
          break;
      }
    });
  }
  eatSprite(ly: CreateLayout, ball: Circle) {
    const range = this.getRange(ball);

    const spriteGroup = ly.stage.find(
      ".ranDomSprite"
    )[0] as unknown as Konva.Group;
    const aroundSprites = spriteGroup.getChildren().filter((item) => {
      const condition =
        item.x() > range.rangeX[0] &&
        item.x() < range.rangeX[1] &&
        item.y() > range.rangeY[0] &&
        item.y() < range.rangeY[1]; // 与球球相交的sprite
      if (condition) {
        return true;
      }
    });
    aroundSprites.forEach((item) => {
      item.destroy();
    });
    const generateSpriteCount = aroundSprites.length;
    if (generateSpriteCount) {
      ly.ballClass && ly.ballClass.scale(generateSpriteCount);
      ly.sprites?.createShape(generateSpriteCount);
    }

    aroundSprites.length = 0;
  }
  /**@description 获取当前球的周围的距离 */
  getRange(ball: Circle) {
    const radius = ball.radius();
    const center = {
      x: ball.x(),
      y: ball.y(),
    };

    return {
      rangeX: [center.x - radius, center.x + radius],
      rangeY: [center.y - radius, center.y + radius],
    };
  }
  initTween(node: Konva.Circle, name: string) {
    switch (name) {
      case "upmove":
        const upMove_Tween = new Konva.Tween({
          node,
          y: node.y() - 20,
          easing: Konva.Easings.EaseInOut,
          duration: 0.1,
        });
        this.tween = upMove_Tween;
        break;
      case "downmove":
        const downMove_Tween = new Konva.Tween({
          node,
          y: node.y() + 20,
          easing: Konva.Easings.EaseInOut,
          duration: 0.1,
        });
        this.tween = downMove_Tween;
        break;
      case "leftmove":
        const leftMove_Tween = new Konva.Tween({
          node,
          x: node.x() - 20,
          easing: Konva.Easings.EaseInOut,
          duration: 0.1,
        });
        this.tween = leftMove_Tween;
        break;
      case "rightmove":
        const rightMove_Tween = new Konva.Tween({
          node,
          x: node.x() + 20,
          easing: Konva.Easings.EaseInOut,
          duration: 0.1,
        });
        this.tween = rightMove_Tween;
        break;

      default:
        break;
    }
  }
}
