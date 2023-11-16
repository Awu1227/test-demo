import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { setupModel } from './setupModel.js'

async function loadChair() {
  const loader = new GLTFLoader()

  const chairData = await loader.loadAsync('/test-demo/models/office_chair.glb')

  console.log('chairData!', chairData)

  const chair = setupModel(chairData)
  chair.position.set(-100, 0, -150)
  // chair.rotation.set(Math.PI / 4, 0, 0)
  return chair
}

export { loadChair }
