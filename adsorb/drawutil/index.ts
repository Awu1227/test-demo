import Konva from "konva";
import GraphysicUtil from "../graphicUtil";
import {addkonvaCircle} from '../konvaStage/addShape'

const container = document.getElementById('container')!
export function drawLine(stage: Konva.Stage, layer: Konva.Layer, room: Konva.Line, util: GraphysicUtil) {
	console.log('画直线');
	const circle = addkonvaCircle(2,stage,room,util)
	layer.add(circle)
	stage.on('mousemove', function (e) {
		
		const mousePos = stage.getPointerPosition()!
		const {x,y} = mousePos
		circle.x(x)
		circle.y(y)
		
	})
	stage.on('contextmenu', function () {
		stage.off('mousemove');
		container.setAttribute('data-content','default')
	})
}