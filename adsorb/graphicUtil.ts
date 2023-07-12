import { Vector2d } from 'konva/lib/types';
import { Line, Point } from './type';
import { Label } from 'konva/lib/shapes/Label';
import Konva from 'konva';
  export default class GraphysicUtil {
    isShow:boolean
    points: number[]
    lines: Map<string, Line> = new Map()
    crossLines: Line[]
    constructor(points:number[]) {
      this.points = points;
      this.initLabel()
    }

    konvaPoints2Line(points: number[]) { 
      const lines = new Map()
      const pointsArr = this.numberArr2PointsArr(points);
      for (let i = 0; i < pointsArr.length - 1; i++) {
        const startPoint = pointsArr[i];
        const endPoint = pointsArr[i+1];
        const line: Line = {
          isVertical: false,
          start: {x:0,y:0},
          end: {x:0,y:0},
          isCross:false
        }
        line.start = startPoint
        line.end = endPoint
        if (startPoint.x === endPoint.x) {
          line.isVertical = true;
          line.x = startPoint.x;
        } else {
          line.isVertical = false;
          line.y = startPoint.y;
        }
        lines.set(`line${i+1}`, line)
      } 
      this.lines = new Map([...lines])
      return lines
    }

    /**
     * 
     * @description 给line上加上到鼠标的距离
     */
    
    obtainLineDistance(point:Vector2d ,shape:Konva.Shape) {
      let crosNum = 0
      this.lines.forEach((value,key,line) => {
        if (value.isVertical && value.x) {
          const distanceX = Math.abs(value.x - point.x);
          const min = value.start.y > value.end.y ? value.end.y : value.start.y;
          const max = min === value.end.y ? value.start.y : value.end.y;
          let newLine ={...value,distanceX}
          if (point.y >= min && point.y <= max) {
            newLine = {...newLine, isCross: true}
            crosNum ++
          }else {
            newLine = {...newLine, isCross: false}
          }
          line.set(key, newLine)
        } else if(!value.isVertical && value.y){
          const distanceY = Math.abs(value.y - point.y);
          const min = value.start.x > value.end.x ? value.end.x : value.start.x;
          const max = min === value.end.x ? value.start.x : value.end.x;
          let newLine ={...value,distanceY}
          if (point.x >= min && point.x <= max) {
            newLine = {...newLine, isCross: true}
            crosNum ++
          }else {
            newLine = {...newLine, isCross: false}
          }
          line.set(key, newLine)
        }
      })
      console.log('CrossNum',crosNum)
      this.filterCrossLine()
      this.updateLabel(this.crossLines,point,shape)
    }
    filterCrossLine() {
      // TODO:
      this.crossLines = Array.from(this.lines.values()).filter(item => item.isCross)
      console.log(this.crossLines);
      
    }

    initLabel() {
      for (let i = 0; i < 4; i++) {
        const label = document.createElement('input');
        label.classList.add('konva_label')
        label.classList.add(`label${i+1}`)
        label.style.width = '50px';
        label.style.top = '-50px';
        // label.style.left = `${value.start.x}px`;
        document.body.appendChild(label);
      }
    }
    updateLabel(lineArr:Line[],point:Point,shape: Konva.Shape) {
      const verLine = shape.getLayer()?.getChildren().find(item => item.getAttr('name') === '垂直辅助线') as unknown as any;
      const horLine = shape.getLayer()?.getChildren().find(item => item.getAttr('name') === '水平辅助线') as unknown as any;
      
      for (let i = 0; i < this.crossLines.length; i++){
          const line = lineArr[i];
          const label = document.querySelector(`.label${i+1}`) as HTMLInputElement;
          if (line.x && line.distanceX) {
            label.style.left = `${line.x-25}px`;
            label.style.top = `${point.y}px`;
            label.value=`${line.distanceX}`
            if (line.distanceX < 150) {
              if(point.x >line.x) {
                verLine.x(point.x - 50)
                label.style.left = `${line.x- 25 - 45}px`;
                shape.x(line.x)
              } else {
                verLine.x(point.x + 50)
                label.style.left = `${line.x+ -25 + 45}px`;
                shape.x(line.x - 200)
              }
            }

          }else if (line.y && line.distanceY) {
            label.style.top = `${line.y}px`;
            label.style.left = `${point.x -25}px`;
            label.value=`${line.distanceY}`
            if (line.distanceY < 25) {
              if(point.y >line.y) {
                horLine.y(point.y - 25)
                label.style.top = `${line.y- 25}px`;
                shape.y(line.y)
              } else {
                horLine.y(point.y + 25)
                label.style.top = `${line.y+ 25}px`;
                shape.y(line.y)
              }
            }
          }
      }
    }
    /**
     * 
     * @description 将[1,2,3,4]转换为[{x:1,y:2},{x:3,y:4}]
     */
    numberArr2PointsArr(points:number[]) {
      const pointsArr:Point[] = [];
      for (let i = 0; i < points.length - 2; i+=2) {
        const point = {
          x: points[i],
          y: points[i+1]
        };
        pointsArr.push(point)
      }
      pointsArr.push(pointsArr[0]);
      return pointsArr;
    }
    show() {
      this.isShow = true
      const konva_labels = [...document.querySelectorAll('.konva_label')]
      konva_labels.forEach(item => {
        item.classList.remove('hide')
        item.classList.add('show')
      })
    }
    hide() {
      this.isShow = false
      const konva_labels = [...document.querySelectorAll('.konva_label')]
      konva_labels.forEach(item => {
        item.classList.add('show')
        item.classList.add('hide')
      })
    }
  }