import Konva from 'konva';

export default function initLineHelper(stage: Konva.Stage) {

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
  
  let horLine=new Konva.Line({
    name:'水平辅助线',
    points: [0, 0, stage.width(), 0],
    stroke: 'grey',
    strokeWidth: 2,
    lineJoin: 'round',
    visible: false,
    listening: false
  });

  return {verLine,horLine}
}

