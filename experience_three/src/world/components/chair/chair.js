import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadChair() {
  const loader = new GLTFLoader();

  const chairData = await loader.loadAsync('/models/office_chair.glb');

  console.log('chairData!', chairData);

  const chair = setupModel(chairData);
  chair.position.set(0, 0, 2.5);
  return chair;
}

export { loadChair };
