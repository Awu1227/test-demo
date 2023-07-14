import { Line } from "../type";
import graphLabel from '../label';

/**
 * 
 * @param line 
 * @param that 
 * @param distance
 * @description 更改标签后，更新标签位置
 */
export const setHelperLine = function(line:Line,that:any, distance: number) {
  const verLine = that.shape.getLayer()?.getChildren().find(item => item.getAttr('name') === '垂直辅助线') as unknown as any;
  const horLine = that.shape.getLayer()?.getChildren().find(item => item.getAttr('name') === '水平辅助线') as unknown as any;    
    if (line.distanceX) {
      line.distanceX = +distance
      let leftOrRight: 'left' | 'right' = 'left'         
      for  (const [key, _line] of [...that.lines.entries()]) {
        if (_line === line) {
          leftOrRight = key as 'left' | 'right'
          if (leftOrRight === 'left') {
            verLine.x(line.x! + line.distanceX)
            that.shape.x(line.x! + line.distanceX - that.shape.width() / 2)
          } else {
            verLine.x(line.x! - line.distanceX)
            that.shape.x(line.x! - line.distanceX - that.shape.width() / 2)
          }
          graphLabel.setLabelPosByHand(key, that.shape, distance)
        }
      }
    } else {
      line.distanceY = +distance
      let topOrBottom: 'top' | 'bottom' = 'top'            
      for  (const [key, _line] of [...that.lines.entries()]) {
        if (_line === line) {
          topOrBottom = key as 'top' | 'bottom' 
          if (topOrBottom === 'top') {
            horLine.y(line.y! + line.distanceY)
            that.shape.y(line.y! + line.distanceY - that.shape.height() / 2)
          } else {
            horLine.y(line.y! - line.distanceY)
            that.shape.y(line.y! - line.distanceY - that.shape.height() / 2)
          }
          graphLabel.setLabelPosByHand(key,that.shape, distance)
        }
      }

    }
    that.obtainLineDistance({x: that.shape.x() + that.shape.width() / 2, y: that.shape.y() + that.shape.height() / 2}, that.shape)
  }