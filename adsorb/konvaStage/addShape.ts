import Konva from 'konva';
import lineHelper from './lineHelper';
import GraphysicUtil from '../graphicUtil';
import { Point } from '../type';
const verLine = lineHelper.verLine
const horLine = lineHelper.horLine
export async function addKonvaImage(name: string, src: string,layer: Konva.Layer, room: Konva.Line, util: GraphysicUtil, size:{x: number, y:number} = {x: 30, y: 30}) {
  const flower= await loadKonvaImage(name,src,layer,size) as unknown as Konva.Image

  flower.on('mousedown', function () {
    flower.draggable(true)
    flower.fill('#ddd')
  })

  flower.on('mouseup', function () {
    flower.draggable(false)
    flower.fill('white')
    const point: Point= {
      x:flower.x() + flower.width() / 2,
      y:flower.y() + flower.height() / 2
    }
    util.exisitPoints.set(flower.name(),point)
    console.log(util);
    
  })

  const stage = layer.getStage()
  flower.on('dragmove', function () {
    const mousePos = stage.getPointerPosition();

    if (mousePos) {
      const exisitPointsArr = [...util.exisitPoints]
      verLine.stroke('grey')
      horLine.stroke('grey')
      verLine.dash([0,0])
      horLine.dash([0,0])
      exisitPointsArr.forEach(([string, point]) => {
        if ( Math.abs(point.x -mousePos.x) < 2 ) {
          console.log(string);
          verLine.stroke('lightblue')
          verLine.dash([33, 10])
        } 
        if (Math.abs(point.y -mousePos.y) < 2) {
          horLine.stroke('lightblue')
          horLine.dash([33, 10])
        } 
      })

      flower.x(mousePos.x - flower.width() / 2);
      flower.y(mousePos.y - flower.height() / 2);
      lineHelper.setPosition({x: mousePos.x, y: mousePos.y})
      const isShow =  room.intersects({x:mousePos.x,y:mousePos.y})
      isShow? util.show() : util.hide()
      lineHelper.verLine.visible(isShow)
      lineHelper.horLine.visible(isShow)
      isShow&&util.obtainLineDistance(mousePos ,flower)
    }
  })

  return flower
}

function loadKonvaImage(name: string, src: string,layer: Konva.Layer, {x: width, y: height}: {x: number, y:number}) {
  let flower: Konva.Image
  let imageObj = new Image();
  imageObj.src=src
  return new Promise((resolve, reject) => {
    imageObj.onload = () => {
       let config = {
           id: String(Date.now()),
           x: 2000 * Math.random(),
           y: 100,
           image: imageObj,
           draggable: true,
           name,
           width,    
           height,

       } 
       flower = new Konva.Image(config)
       layer.add(flower)
       if (flower) {
        resolve(flower)
       } else {
        reject('load error')
       }
   }
  })
}