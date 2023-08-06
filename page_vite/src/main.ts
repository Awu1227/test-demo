import CreateLayout from "./layout";
import CreateCoordinate from "./coordinate";
import createRandomSprite from "./randomSprite";
import CreateBall from "./playBall";

import HotKey from "./hotKey";

const ly = new CreateLayout();

const coordinate = new CreateCoordinate(ly);

const sprites = new createRandomSprite(ly);

const ballClass = new CreateBall(ly);
const hotKey = new HotKey(ballClass);
