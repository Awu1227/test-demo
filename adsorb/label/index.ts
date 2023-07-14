import { Line, Point } from "../type";
const positionArr = ['left', 'right', 'top', 'bottom']
import Konva from "konva";

export default class graphLabel {
	static labelMap: Map<string, HTMLInputElement> = new Map(); // 存放4个标签的Map
	static labelWidth: number
	static labelHeight = 15
	constructor() {
	}
	/**
	 * 
	 * @param width 
	 * @description 创建标签
	 */
	static generateLabel(width: number = 30) {
		this.labelWidth = width
		for (let i = 0; i < positionArr.length; i++) {
			const label = document.createElement('input');
			// label.setAttribute('type', 'number');
			label.classList.add('konva_label')
			label.classList.add(`label-${positionArr[i]}`)
			this.labelMap.set(positionArr[i], label)
			label.style.width = `${width}px`;
			label.style.top = '-50px';
			const konva_dom = document.querySelector('.konvajs-content')!;
			konva_dom.appendChild(label);
		}
		
	}

	static foucusEvent() {
	}

	static changeEvent(e,key:string) {
		
			const input = e.target as HTMLInputElement
			console.log('修改后的标签及数值是',key,input.value, (window as any).lines);

			const lines = (window as any).lines

			lines.get(key).setDistance(input.value)

			// TODO:
			const params = {
				position: key,
				value: input.value
			
			}
			return 

	}

	static addListener() {
		this.labelMap.forEach((label, key, map) => {
			const previusValue = label.value
			label.addEventListener('focus',this.foucusEvent)
			label.addEventListener('change',(e) => {this.changeEvent(e,key)})
		})
	}
	static removeListener() {
		this.labelMap.forEach((label, key, map) => {
			const previusValue = label.value
			label.removeEventListener('focus',this.foucusEvent)
			label.removeEventListener('change',(e) => {this.changeEvent(e,key)})
	})
	}
	/**
	 * 
	 * @param pointXorY 
	 * @param isVertical 
	 * @description 实时更新标签的位置
	 */
	static updateLabelPosition(pointXorY: number, isVertical: boolean) {
		if (isVertical) {
			this.labelMap.get('top')!.style.left = `${pointXorY - this.labelWidth / 2 }px`
			this.labelMap.get('bottom')!.style.left = `${pointXorY - this.labelWidth / 2}px`
		} else {
			this.labelMap.get('left')!.style.top = `${pointXorY - this.labelHeight}px`
			this.labelMap.get('right')!.style.top = `${pointXorY - this.labelHeight}px`
		}
	}

	/**
	 * @description 修改标签数值后，手动更改标签的位置
	 */
	static setLabelPosByHand( position: 'left' | 'right' | 'top' | 'bottom',shape:Konva.Shape, distance: number) {
		const verLine = shape.getLayer()?.getChildren().find(item => item.getAttr('name') === '垂直辅助线') as unknown as any;
		const horLine = shape.getLayer()?.getChildren().find(item => item.getAttr('name') === '水平辅助线') as unknown as any;   
		console.log('position',position);
		const lines = (window as any).lines
		if (position === 'left' || position === 'right') { 
			this.labelMap.get('left')!.style.left = `${verLine.x() - shape.width() / 2 - 20}px`
			this.labelMap.get('right')!.style.left = `${verLine.x() + shape.width() / 2 + 20}px`

			this.labelMap.get('top')!.style.left = `${verLine.x() - this.labelWidth / 2}px`
			this.labelMap.get('bottom')!.style.left = `${verLine.x() - this.labelWidth / 2}px`
		} else {
			this.labelMap.get('top')!.style.top = `${horLine.y() - shape.height() / 2 - 20}px`
			this.labelMap.get('bottom')!.style.top = `${horLine.y() + shape.height() / 2 + 20}px`

			this.labelMap.get('left')!.style.top = `${horLine.y() }px`
			this.labelMap.get('right')!.style.top = `${horLine.y()}px`
		}
		console.log((window as any).lines);
		
	}
	/**
	 * 
	 * @param line 
	 * @param point 
	 * @param objectWidth 
	 * @param labelWidth 
	 * @param linePosition 
	 * @description 计算正确的标签位置
	 */
	static caluatePosition(line: Line, point: Point, objectWidth: number, labelWidth: number, linePosition: 'left' | 'right' | 'top' | 'bottom') {
		switch (linePosition) {
			case 'left':
				if (line.x) {
					return line.x + (point.x - line.x - objectWidth / 2) / 2 - labelWidth / 2
				}
				break;
			case 'right':
				if (line.x) {
					return line.x -(line.x - point.x- objectWidth / 2) / 2 - labelWidth / 2
				}
				break;
			case 'top':
				if (line.y) {
					return line.y + (point.y - line.y - objectWidth / 2) / 2
				}
				break;
			case 'bottom':
				if (line.y) {
					return point.y + (line.y - point.y - objectWidth / 2) / 2
				}
				break;
				default:
					break;
		} 
	}
}