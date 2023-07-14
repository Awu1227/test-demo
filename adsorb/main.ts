import './style.css'

import initCanvas from './konvaStage';
import Konva from 'konva';

const {stage, layer} =  initCanvas()

import GraphysicUtil from './graphicUtil';


const roomPoints =  [400,200,1500,200,1500,800,400,800,400,200]
let draggable = false

const room = new Konva.Line({
  points: roomPoints,
  fill: 'white',
  stroke: 'black',
  strokeWidth: 4,
  closed:true
});
// add the shape to the layer
layer.add(room);
room.zIndex(1)
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


stage.add(layer);
function writeMessage(message: string) {
  text.text(message)
}
let verLine=new Konva.Line({
  name:'垂直辅助线',
  points: [0, 0, 0, stage.height()],
  stroke: 'grey',
  strokeWidth: 2,
  lineJoin: 'round',
  visible: false,
  listening: false
  // dash: [33, 10],
});
verLine.zIndex(2)

let horLine=new Konva.Line({
  name:'水平辅助线',
  points: [0, 0, stage.width(), 0],
  stroke: 'grey',
  strokeWidth: 2,
  lineJoin: 'round',
  visible: false,
  listening: false
  // dash: [33, 10],
});
layer.add(verLine,horLine)

function drawIntersectLine(x: number, y: number) {
  verLine.x(x);
  horLine.y(y)
  // layer.draw()
} 



const text = new Konva.Text({
  x: 10,
  y: 10,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: '',
  fill: 'black',
});

layer.add(text)

layer.draw()


const util = new GraphysicUtil(roomPoints)
util.konvaPoints2Line(roomPoints);


room.on('mouseover', function (e) {
  writeMessage('Mouseover room');
  if (draggable) {
    util.show()
    verLine.visible(true)
    horLine.visible(true)

  }
});
room.on('mouseout', function () {
  util.hide()
  writeMessage('Mouseout room');
  verLine.visible(false)
  horLine.visible(false)
  
});
room.on('mousedown', function () {
  writeMessage('Mousedown room');
});
room.on('mouseup', function () {
  writeMessage('Mouseup room');
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
    writeMessage('x: ' + mousePos.x + ', y: ' + mousePos.y);
    stick.x(mousePos.x - 100);
    stick.y(mousePos.y);
    drawIntersectLine(mousePos.x,mousePos.y)

    const isShow =  room.intersects({x:mousePos.x,y:mousePos.y})
    isShow? util.show() : util.hide()
    verLine.visible(isShow)
    horLine.visible(isShow)
    isShow&&util.obtainLineDistance(mousePos ,stick)
  }
})

stage.on('click', function (e) {
  const point = {x: e.evt.clientX, y: e.evt.clientY}
  writeMessage('Clicked stage');
  draggable = false
  stick.draggable(draggable)
  stick.fill('black')
})