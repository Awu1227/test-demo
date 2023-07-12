 export type Point = {
  x: number;
  y: number;
}
export type Line = {
  isVertical: boolean;
  x?:number;
  distanceX?:number;
  y?:number;
  distanceY?:number;
  start: Point;
  end: Point;
  isCross: boolean
}