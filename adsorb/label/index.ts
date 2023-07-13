import { Line, Point } from "../type";
const positionArr = ['left', 'right', 'top', 'bottom']

export default class graphLabel{
	static labelMap: Map<string, HTMLInputElement> = new Map(); // 存放4个标签的Map
	static labelWidth: number
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
		console.log(this.labelMap);
		
	}

	static onChange() {
		this.labelMap.forEach((label, key, map) => {
			label.addEventListener('change',e => {
				const input = e.target as HTMLInputElement
				console.log('修改后的标签及数值是',key,input.value);
				// TODO:

			})
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
			this.labelMap.get('left')!.style.top = `${pointXorY}px`
			this.labelMap.get('right')!.style.top = `${pointXorY}px`
		}
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