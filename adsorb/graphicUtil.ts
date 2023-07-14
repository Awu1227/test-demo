import { Vector2d } from 'konva/lib/types';
import { Line, Point } from './type';
import graphLabel from './label'
import Konva from 'konva';
import {emitter} from './emitter';
import {setHelperLine} from './utils';
  export default class GraphysicUtil {
    exisitPoints: Map<string,Point> = new Map() // 存储需要捕捉的点
    isShow = false // 是否显示辅助线
    adsorbGap_ver = 25 // 垂直方向上触发吸附的间距
    adsorbGap_hor = 150 // 水平方向上触发吸附的间距
    labelWidth = 30 // label标签宽度
    points: number[] // 背景方框的点
    lines: Map<string, Line> = new Map() // 存储所有的线
    crossLines: Line[] // 在鼠标处向四边做射线，与之相交的第一条线的数组
    shape: Konva.Shape;
    constructor(points:number[]) {
      this.points = points;
      graphLabel.generateLabel(this.labelWidth)

      emitter.on('labelPositionChange',(params) => {
        const info = JSON.parse(params)
        
        // const point =
        // TODO:
      })
    }

    konvaPoints2Line(points: number[]) { 
      const positionArr = ['left', 'right', 'top', 'bottom']
      const lines = new Map()
      const lineArr: Line[] = []
      let that = this
      const pointsArr = this.numberArr2PointsArr(points);
      for (let i = 0; i < pointsArr.length - 1; i++) {
        const startPoint = pointsArr[i];
        const endPoint = pointsArr[i+1];
        const line: Line = {
          isVertical: false,
          start: {x:0,y:0},
          end: {x:0,y:0},
          isCross:false,
          setDistance:  function(distance) {
              setHelperLine(this,that,distance)
              const latestPoint:Point = {
                x: that.shape.x(),
                y: that.shape.y()
              }
              
              // that.updateLabel(lineArr,latestPoint)
              // this.updateLabel(this.crossLines,that.shape.,shape)
          }
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
        lineArr.push(line)
      }
      // 确定每条线的位置
      const [line1, line2] = lineArr.filter(line => line.isVertical === true)
        lines.set('left', line1.x! > line2.x! ? line2 : line1)
        lines.set('right', line1.x! > line2.x! ? line1 : line2)
      const [line3, line4] = lineArr.filter(line => line.isVertical === false)
        lines.set('top', line3.y! > line4.y! ? line4 : line3)
        lines.set('bottom', line3.y! > line4.y! ? line3 : line4)
      this.lines = new Map([...lines]);
      (window as any).lines = this.lines
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
      this.filterCrossLine()
      this.updateLabel(this.crossLines,point,shape)
      
    }
    filterCrossLine() {
      // TODO:
      this.crossLines = Array.from(this.lines.values()).filter(item => item.isCross)
      
    }

    conFirmPosition(line: Line, point: Point) {
      if (line.x ) {
        return line.x < point.x ? 'left' : 'right'
      } 
      
      if (line.y){
        return line.y < point.y ? 'top' : 'bottom'
      }
    }
    updateLabel(lineArr:Line[],point:Point,shape: Konva.Shape = this.shape) {
      
      // TODO:
      this.shape = shape
      const verLine = shape.getLayer()?.getChildren().find(item => item.getAttr('name') === '垂直辅助线') as unknown as any;
      const horLine = shape.getLayer()?.getChildren().find(item => item.getAttr('name') === '水平辅助线') as unknown as any;
      
      for (let i = 0; i < this.crossLines.length; i++){
          const line = lineArr[i];
          const position = this.conFirmPosition(line,point)!;
          const label = graphLabel.labelMap.get(position)!;
          switch (position) {
            case 'left':
              label.style.left = `${ graphLabel.caluatePosition(line,point,shape.width(),this.labelWidth,position)}px`
              label.style.top = `${point.y - graphLabel.labelHeight / 2}px`;
              label.value=`${line.distanceX}`
              if (line.distanceX! < this.adsorbGap_hor) {
                verLine.x(point.x - (this.adsorbGap_hor - shape.width()/2))
                graphLabel.updateLabelPosition(verLine.x(),true)
                label.style.left = `${line.x!- this.labelWidth/2 - 45}px`;
                
                label.value = `${shape.width() / 2}`
                shape.x(line.x!)
                return
              }
              break;
            case 'right':
              label.style.left = `${ graphLabel.caluatePosition(line,point,shape.width(),this.labelWidth,position)}px`
              label.style.top = `${point.y - graphLabel.labelHeight / 2}px`;
              label.value=`${line.distanceX}`
              if (line.distanceX! < this.adsorbGap_hor) {
                verLine.x(point.x + (this.adsorbGap_hor - shape.width()/2))
                graphLabel.updateLabelPosition(verLine.x(),true)
                label.style.left = `${line.x! -this.labelWidth/2 + 45}px`;
                label.value = `${shape.width() / 2}`
                shape.x(line.x!- shape.width())
                return
              }
              break;
              case 'top':
                label.style.top = `${graphLabel.caluatePosition(line,point,shape.height(),this.labelWidth,position)}px`
                label.style.left = `${point.x -this.labelWidth/2}px`;
                label.value=`${line.distanceY}`
                if (line.distanceY! < this.adsorbGap_ver) {
                  horLine.y(point.y - this.labelWidth/2)
                  graphLabel.updateLabelPosition(horLine.y(),false)
                  label.style.top = `${line.y!- this.adsorbGap_ver}px`;
                  label.value = `${shape.height() / 2}`
                  shape.y(line.y!)
                  return
                }
                break;
              case 'bottom':
                label.style.top = `${graphLabel.caluatePosition(line,point,shape.height(),this.labelWidth,position)}px`
                label.style.left = `${point.x -this.labelWidth/2}px`;
                label.value=`${line.distanceY}`
                if (line.distanceY! < this.adsorbGap_ver) {
                  horLine.y(point.y + this.adsorbGap_ver)
                  graphLabel.updateLabelPosition(horLine.y(),false)
                  label.style.top = `${line.y!+ this.adsorbGap_ver}px`;
                  label.value = `${shape.height() / 2}`
                  shape.y(line.y!)
                  return
                }
                break;
          
            default:
              break;
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
      
      if (this.isShow) return
      this.isShow = true
      const konva_labels = [...document.querySelectorAll('.konva_label')]
      konva_labels.forEach(item => {
        item.classList.remove('hide')
        item.classList.add('show')
      })      
      graphLabel.addListener()
    }
    hide() {
      if (!this.isShow) return
      this.isShow = false
      const konva_labels = [...document.querySelectorAll('.konva_label')]
      konva_labels.forEach(item => {
        item.classList.add('show')
        item.classList.add('hide')
      })
      graphLabel.removeListener()
    }
  }