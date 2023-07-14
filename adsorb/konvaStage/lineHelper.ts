import Konva from 'konva';
import {Point} from '../type';

export default class LineHelper {
  static verLine = new Konva.Line({
    name:'垂直辅助线',
    points: [0, 0, 0, 2000],
    stroke: 'grey',
    strokeWidth: 2,
    lineJoin: 'round',
    visible: false,
    listening: false
    // dash: [33, 10],
  });
  static horLine=new Konva.Line({
    name:'水平辅助线',
    points: [0, 0, 2000, 0],
    stroke: 'grey',
    strokeWidth: 2,
    lineJoin: 'round',
    visible: false,
    listening: false
  });

  private constructor() {
  }

  static setPosition({x, y}: Point) {
    this.verLine.x(x);
    this.horLine.y(y)
  }
}



