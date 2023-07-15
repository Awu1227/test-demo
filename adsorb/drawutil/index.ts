import Konva from "konva";
import GraphysicUtil from "../graphicUtil";
import {addkonvaCircle} from '../konvaStage/addShape'

const container = document.getElementById('container')!
export function drawLine(stage: Konva.Stage, layer: Konva.Layer, room: Konva.Line, util: GraphysicUtil) {
	console.log('画直线');
	const drawLineGroup = new Konva.Group()
	layer.add(drawLineGroup)
	const {circle,lastCircle} = addkonvaCircle(2,stage, layer,room,util,drawLineGroup)
	lastCircle.listening(false)
	layer.add(circle,lastCircle)
	
	stage.on('mousemove', function (e) {

		const mousePos = stage.getPointerPosition()!
		const {x,y} = mousePos
		if (circle.isListening()) {
			circle.x(x)
			circle.y(y)
		}
		
		if (lastCircle) {
			lastCircle.x(x)
			lastCircle.y(y)
		}

		
	})
	stage.on('contextmenu', function () {
		stage.off('mousemove');
		container.setAttribute('data-content','default')
	})
}