import CreateLayout from "./layout";
import CreateCoordinate from "./coordinate";
import createRandomSprite from "./randomSprite";
import CreateBall from "./playBall";

import HotKey from "./hotKey";

const ly = new CreateLayout();

ly.coordinate = new CreateCoordinate(ly);

ly.sprites = new createRandomSprite(ly);

ly.ballClass = new CreateBall(ly);
const hotKey = new HotKey(ly, ly.ballClass);
