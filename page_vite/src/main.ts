import CreateLayout from "./layout";
import CreateCoordinate from "./coordinate";
import createRandomSprite from "./randomSprite";

const ly = new CreateLayout();

const coordinate = new CreateCoordinate(ly);

const sprites = new createRandomSprite(ly);
