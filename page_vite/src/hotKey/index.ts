import Konva from "konva";
import CreateBall from "../playBall";

export default class HotKey {
  key: string;
  tween?: Konva.Tween;
  constructor(ballClass: CreateBall) {
    window.addEventListener("keydown", (e) => {
      this.key = e.key;
      switch (this.key) {
        case "ArrowUp": // 上
          this.initTween(ballClass.ball, "upmove");
          this.tween?.play();

          break;
        case "ArrowDown": // 下
          this.initTween(ballClass.ball, "downmove");
          this.tween?.play();
          break;
        case "ArrowLeft": // 左
          this.initTween(ballClass.ball, "leftmove");
          this.tween?.play();
          break;
        case "ArrowRight": // 右
          this.initTween(ballClass.ball, "rightmove");
          this.tween?.play();
          break;

        default:
          break;
      }
    });
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
