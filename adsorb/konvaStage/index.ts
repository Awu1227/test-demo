import Konva from "konva";

const width = window.innerWidth;
const height = window.innerHeight;



export default function initCanvas() {
  const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
  });
  const layer = new Konva.Layer();
  stage.add(layer)
  return { stage, layer}
}

