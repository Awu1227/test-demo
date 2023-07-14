import Konva from 'konva';

export function addKonvaImage(layer: Konva.Layer) {
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