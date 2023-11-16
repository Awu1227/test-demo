import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { setupModel } from './setupModel.js'

async function loadWindow() {
  const loader = new GLTFLoader()

  const windowData = await loader.loadAsync('/test-demo/models/sliding_window.glb')

  const window = setupModel(windowData)
  console.log('window!', window)
  window.position.set(0, 0, 2.5)
  window.position.set(0, 130, -250)
  return window
}

export { loadWindow }
