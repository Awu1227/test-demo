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

const stick = new Konva.Rect({
  x: 0,
  y: 0,
  width: 200,
  height:  4,
  fill: 'black',
  stroke: 'black',
  strokeWidth: 0.01,
  draggable: false
  // listening: false
});
layer.add(stick);


const flower = await addKonvaImage(layer,room,util) as unknown as Konva.Image

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

stick.on('mousedown', function () {
  draggable = true
  stick.draggable(draggable)
  stick.fill('red')
})
stick.on('click', function () {
  stick.fill('red')
})



stick.on('dragmove', function () {
  const mousePos = stage.getPointerPosition();
  if (mousePos && draggable) {
    stick.x(mousePos.x - 100);
    stick.y(mousePos.y);
    lineHelper.setPosition({x: mousePos.x, y: mousePos.y})

    const isShow =  room.intersects({x:mousePos.x,y:mousePos.y})
    isShow? util.show() : util.hide()
    verLine.visible(isShow)
    horLine.visible(isShow)
    isShow&&util.obtainLineDistance(mousePos ,stick)
  }
})

stage.on('click', function (e) {
  draggable = false
  stick.draggable(draggable)
  stick.fill('black')
})