import CreateLayout from "./layout";
import CreateCoordinate from "./coordinate";
import createRandomSprite from "./randomSprite";
import CreateBall from "./playBall";

const ly = new CreateLayout();

const coordinate = new CreateCoordinate(ly);

const sprites = new createRandomSprite(ly);

const ball = new CreateBall(ly);
