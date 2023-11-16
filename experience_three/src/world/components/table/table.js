import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { setupModel } from './setupModel.js'

async function loadTable() {
  const loader = new GLTFLoader()

  const tableData = await loader.loadAsync('/test-demo/models/computer_desk.glb')

  console.log('tableData!', tableData)

  const table = setupModel(tableData)
  table.position.set(-100, 0, -200)
  // table.rotation.y = Math.PI / 2
  return table
}

export { loadTable }
