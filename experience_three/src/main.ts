import '../styles/main.css'
import World from './world/main'

async function main() {
  const container = document.querySelector('#scene-container')

  if (!container) return

  const world = new World(container)

  // complete async tasks
  await world.init()

  world.start()
}

main()
