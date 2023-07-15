import './style.css'
import initCanvas from './konvaStage';
import lineHelper from './konvaStage/lineHelper';
import Konva from 'konva';
import {drawLine} from './drawutil'

const {stage, layer} =  initCanvas()

const verLine = lineHelper.verLine // 垂直辅助线
const horLine = lineHelper.horLine // 水平辅助线

import GraphysicUtil from './graphicUtil';
import { addKonvaImage } from './konvaStage/addShape';


const roomPoints =  [400,200,1500,200,1500,800,400,800,400,200]
// TODO:
const width = 1100
const height = 600
const room = new Konva.Line({
  points: roomPoints,
  fill: 'white',
  stroke: 'black',
  strokeWidth: 4,
  closed:true
});

layer.add(room);

const util = new GraphysicUtil(roomPoints)
util.konvaPoints2Line(roomPoints);


const flower1Src = "https://s41.shejijia.com/i/e243f818-2c57-4106-b7d3-e5d28f12bf00/Top.png?x-oss-process=image/format,webp"
addKonvaImage('角花1',flower1Src,layer,room,util) as unknown as Konva.Image

const flower2Src = "https://s41.shejijia.com/i/e243f818-2c57-4106-b7d3-e5d28f12bf00/Top.png?x-oss-process=image/format,webp"
addKonvaImage('角花2',flower2Src,layer,room,util) as unknown as Konva.Image

const flower3Src = "https://s41.shejijia.com/i/e243f818-2c57-4106-b7d3-e5d28f12bf00/Top.png?x-oss-process=image/format,webp"
addKonvaImage('角花3',flower3Src,layer,room,util) as unknown as Konva.Image

const flower4Src = "https://s41.shejijia.com/i/e243f818-2c57-4106-b7d3-e5d28f12bf00/Top.png?x-oss-process=image/format,webp"
addKonvaImage('角花4',flower3Src,layer,room,util) as unknown as Konva.Image


const plasterLine1Src = 'https://s45.shejijia.com/i/64b2317a-f57d-4d18-bc2b-da03edb56c3b/Top.png?x-oss-process=image/format,webp'
addKonvaImage('成品石膏线1',plasterLine1Src,layer,room,util,{x: 200, y: 10}) as unknown as Konva.Image

layer.add(verLine,horLine)

const container = document.getElementById('container')!

const drawLabels = document.querySelectorAll('.box')
console.log(drawLabels);



[...drawLabels].forEach((label,index) => {
  label.addEventListener('click',() => {
    console.log(index,label);
    switch (index) {
      case 0:
        drawLine(stage,layer,room,util)
        container.setAttribute('data-content', 'none')
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }
  })
})



