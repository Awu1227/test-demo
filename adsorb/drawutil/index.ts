import Konva from "konva";
import GraphysicUtil from "../graphicUtil";
import {addKonvaImage} from '../konvaStage/addShape'

const container = document.getElementById('container')!
export function drawLine(stage: Konva.Stage, layer: Konva.Layer, room: Konva.Line, util: GraphysicUtil) {
	console.log('画直线');

	stage.on('mousemove', function () {
		
		const mousePos = stage.getPointerPosition()!
		const {x,y} = mousePos
	})
	stage.on('contextmenu', function () {
		stage.off('mousemove');
		container.setAttribute('data-content','default')
	})
}