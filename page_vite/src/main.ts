import Konva from "konva";
import CreateLayout from "./layout";
import CreateCoordinate from "./coordinate";
import createRandomSprite from "./randomSprite";
import CreateBall from "./playBall";

import HotKey from "./hotKey";

const ly = new CreateLayout();
(window as any).ly = ly;

ly.coordinate = new CreateCoordinate(ly);

ly.sprites = new createRandomSprite(ly);

ly.ballClass = new CreateBall(ly);
const hotKey = new HotKey(ly, ly.ballClass);

// 球球的质量信息
ly.ballInfo = new Konva.Text({
  x: 20,
  y: 5,
  text: "我的质量：100吨",
  fontSize: 16,
  fontFamily: "Calibri",
  fill: "white",
});
ly.layer.add(ly.ballInfo);
