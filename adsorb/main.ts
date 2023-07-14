import './style.css'
import initCanvas from './konvaStage';
import lineHelper from './konvaStage/lineHelper';
import Konva from 'konva';

const {stage, layer} =  initCanvas()

const verLine = lineHelper.verLine
const horLine = lineHelper.horLine

import GraphysicUtil from './graphicUtil';
import { addKonvaImage } from './konvaStage/addShape';


const roomPoints =  [400,200,1500,200,1500,800,400,800,400,200]
let draggable = false

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

const triangle = new Konva.RegularPolygon({
  x: 480,
  y: 520,
  sides: 3,
  radius: 80,
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 4,
});
layer.add(triangle);



const flower1Src = "https://s41.shejijia.com/i/e243f818-2c57-4106-b7d3-e5d28f12bf00/Top.png?x-oss-process=image/format,webp"
const flower1 = await addKonvaImage('角花1',flower1Src,layer,room,util) as unknown as Konva.Image

const flower2Src = "https://s41.shejijia.com/i/e243f818-2c57-4106-b7d3-e5d28f12bf00/Top.png?x-oss-process=image/format,webp"
const flower2 = await addKonvaImage('角花2',flower2Src,layer,room,util) as unknown as Konva.Image

const flower3Src = "https://s41.shejijia.com/i/e243f818-2c57-4106-b7d3-e5d28f12bf00/Top.png?x-oss-process=image/format,webp"
const flower3 = await addKonvaImage('角花3',flower3Src,layer,room,util) as unknown as Konva.Image

const flower4Src = "https://s41.shejijia.com/i/e243f818-2c57-4106-b7d3-e5d28f12bf00/Top.png?x-oss-process=image/format,webp"
const flower4 = await addKonvaImage('角花4',flower3Src,layer,room,util) as unknown as Konva.Image


const plasterLine1Src = 'https://s45.shejijia.com/i/64b2317a-f57d-4d18-bc2b-da03edb56c3b/Top.png?x-oss-process=image/format,webp'
const plasterLine1 = await addKonvaImage('成品石膏线1',plasterLine1Src,layer,room,util,{x: 200, y: 10}) as unknown as Konva.Image

layer.add(verLine,horLine)



room.on('mouseover', function (e) {
  if (draggable) {
    util.show()
    verLine.visible(true)
    horLine.visible(true)

  }
});
room.on('mouseout', function () {
  util.hide()
  verLine.visible(false)
  horLine.visible(false)
  
});
