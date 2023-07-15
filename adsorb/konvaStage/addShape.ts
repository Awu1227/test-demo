import Konva from 'konva';
import lineHelper from './lineHelper';
import GraphysicUtil from '../graphicUtil';
import { Line, Point } from '../type';
const verLine = lineHelper.verLine
const horLine = lineHelper.horLine
/**
 * 
 * @param name 对象名称
 * @param src 图片资源地址
 * @param layer konva layer
 * @param room 需要处理交互的对象
 * @param util 图形工具实例
 * @param size 对象长宽
 * @description 生成Konva图片对象
 */
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
      // 当前角花的点已存在，将其删除
      const [flowerObj] =  exisitPointsArr.filter(item => item[0] === flower.name())
      if (flowerObj) {
        util.exisitPoints.delete(flowerObj[0])
      }
      // 将其他炮将角花的炮位置设置为原始炮位置
      verLine.stroke('grey')
      horLine.stroke('grey')
      verLine.dash([0,0])
      horLine.dash([0,0])
      util.konvaPoints2Line(util.points) // 移动之前将四边设为原始边

      exisitPointsArr.forEach(([name, point]) => {
        if ( Math.abs(point.x -mousePos.x) < 2 ) {
          verLine.stroke('lightblue')
          verLine.dash([33, 10])
          
          const needUpdateLine = point.y < mousePos.y ? 'top' : 'bottom'
          const line = util.lines.get(needUpdateLine) as Line
          // 替换一边的数据
          line.start.y = point.y
          line.end.y = point.y
          line.y = point.y
          
          // 更新线的数据及标签的位置
          util.obtainLineDistance(mousePos ,this)
        } 
        if (Math.abs(point.y -mousePos.y) < 2) {
          horLine.stroke('lightblue')
          horLine.dash([33, 10])


          const needUpdateLine = point.x < mousePos.x ? 'left' : 'right'
          const line = util.lines.get(needUpdateLine) as Line
          // 替换一边的数据
          line.start.x = point.x
          line.end.x = point.x
          line.x = point.x

          // 更新线的数据及标签的位置
          util.obtainLineDistance(mousePos ,this)
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

export function addkonvaCircle(radius: number,stage: Konva.Stage, layer: Konva.Layer, room: Konva.Line, util: GraphysicUtil, lineGroup: Konva.Group) {
  let circle = new Konva.Circle({
    radius,
    fill: 'black',
  })
  let isclickDown = false
  let lastCircle = circle.clone() as Konva.Circle
  const drawLine: Map<string, Konva.Line> = new Map()
  circle.on('mousemove',function() {
    const mousePos = stage.getPointerPosition();
    console.log('change');
      if (mousePos) {
        circle.x(mousePos.x - circle.width() / 2);
        circle.y(mousePos.y - circle.height() / 2);
        lineHelper.setPosition({x: mousePos.x, y: mousePos.y})
        const isShow =  room.intersects({x:mousePos.x,y:mousePos.y}) && !isclickDown
        isShow? util.show() : util.hide()
        lineHelper.verLine.visible(isShow)
        lineHelper.horLine.visible(isShow)
        isShow&&util.obtainLineDistance(mousePos ,circle)
      }
  })

  circle.on('mousedown',function() {
    console.log('画下了一笔');
    // 画下第一笔就使其失活
    circle.listening(false)
    lastCircle.listening(true)
    lastCircle.setAttr('lineIndex',[...drawLine].length + 1)
    console.log(lastCircle);
    
    isclickDown = true
    util.hide()
    lineHelper.verLine.visible(false)
    lineHelper.horLine.visible(false)
    
    // 下一笔的move
    lastCircle && lastCircle.on('mousemove',function() {
      
      const points= [circle.x(),circle.y(), lastCircle.x(), lastCircle.y()]
      // console.log('xxxxx',circle.x(), lastCircle.x());
      // console.log('yyyyy',circle.y(), lastCircle.y());

      

      const line = new Konva.Line({
      points,
      stroke: 'red',
      strokeWidth: 1,
      lineCap: 'round',
      lineJoin: 'round',
      lineIndex: lastCircle.getAttr('lineIndex')
      })
      drawLine.set(lastCircle.getAttr('lineIndex'), line)
      lineGroup.removeChildren();
      
      [...drawLine].forEach(([index, line]) => {
      
      lineGroup.add(line)
      } )

    })

    function lastCircleClickEvt({evt: {x, y}}) {
      const clickPoint = {x,y}
      console.log('dddddd',clickPoint);

      console.log(lastCircle.x(),circle.x());
      const points= [circle.x(),circle.y(), lastCircle.x(), lastCircle.y()]
      

      const line = new Konva.Line({
      points,
      stroke: 'red',
      strokeWidth: 1,
      lineCap: 'round',
      lineJoin: 'round',
      lineIndex: lastCircle.getAttr('lineIndex')
      })
      drawLine.set(lastCircle.getAttr('lineIndex'), line)
      lineGroup.removeChildren();
      
      [...drawLine].forEach(([index, line]) => {
      
      lineGroup.add(line)
      } )
      circle = circle.clone()

      circle.x(clickPoint.x)
      circle.y(clickPoint.y)
      console.log(circle);
      
      circle = lastCircle
      // lastCircle = lastCircle.clone()
      console.log('lineGroup', lineGroup);
      
      // lastCircle.on('mousedown', lastCircleClickEvt)
      lastCircle.on('mousedown', function() {
        console.log(1111);
        
      })

      lastCircle.setAttr('lineIndex',[...drawLine].length+1)
    }

    lastCircle.on('mousedown', lastCircleClickEvt)
  })


  return {circle,lastCircle}
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