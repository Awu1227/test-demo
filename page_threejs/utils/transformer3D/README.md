# 该文件夹为3D控制器组件

## 用法

```ts
/**@description 传入的stuff */
export interface Istuff {
  m_Object3D: THREE.Object3D
  isLock: boolean
  setLock: (isLock: boolean) => any
  destory()
  move?: (vect3: THREE.Vector3) => any
  rotate?: (vect3: THREE.Vector3) => any
  mirrorX?: () => any
  mirrorY?: () => any
  mirrorZ?: () => any
  release?: () => any
  setVisible?: (isV: boolean) => any
  copy?: () => any
}
```

```ts
const tsf = new Transformer3D(stuff, scene, camera, type?)

/**@apiDescription 鼠标按下事件 */
tsf.mousedown(event: MouseEvent)

/**@apiDescription 鼠标移动事件 */
tsf.mousemove(event: MouseEvent)

/**@description 鼠标抬起事件 */
tsf.mouseup(event: MouseEvent)

/**@description 键盘按下事件 */
tsf.keydown(event: KeyboardEvent，config?: {height: number})

/**@description 移动 */
tsf.move(vect3: THREE.Vector3)

/**@description 旋转 */
tsf.rotate(vect3: THREE.Vector3)

/**@description 绕X轴翻转 */
tsf.mirrorX()

/**@description 绕Y轴翻转 */
tsf.mirrorY()

/**@description 绕Z轴翻转 */
tsf.mirrorZ()

/**@description 复制方法 */
tsf.copy()

/**@description 锁定方法，true 表示锁定*/
tsf.setlock(isLock: boolean)

/**@description 显示与隐藏方法 */
tsf.setVisible(isV: boolean)

/**@description 销毁控制器方法 */
tsf.release()

/**@description 总销毁方法 */
tsf.destory()
```

### 快捷键

- **D** 下落
- **U** 更改高度
