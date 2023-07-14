import Konva from 'konva';
import lineHelper from './lineHelper';
import GraphysicUtil from '../graphicUtil';

export async function addKonvaImage(layer: Konva.Layer, room: Konva.Line, util: GraphysicUtil) {
  const flower= await loadKonvaImage(layer) as unknown as Konva.Image

  flower.on('mousedown', function () {
    flower.draggable(true)
    flower.fill('#ddd')
  })

  flower.on('mouseup', function () {
    flower.draggable(false)
    flower.fill('white')
  })

  const stage = layer.getStage()
  flower.on('dragmove', function () {
    const mousePos = stage.getPointerPosition();
    if (mousePos) {
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

function loadKonvaImage(layer: Konva.Layer) {
  let flower: Konva.Image
  let imageObj = new Image();
  imageObj.src="https://s41.shejijia.com/i/e243f818-2c57-4106-b7d3-e5d28f12bf00/Top.png?x-oss-process=image/format,webp"
  return new Promise((resolve, reject) => {
    imageObj.onload = () => {
       let config = {
           id: String(Date.now()),
           x: 100,
           y: 100,
           image: imageObj,
           draggable: true,
           name:"角花",
           width: 30,    
           height: 30,

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