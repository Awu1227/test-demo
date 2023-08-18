import "../styles/main.css";
import World from "./world/main";

function main() {
  const container = document.querySelector("#scene-container");

  if (!container) return;

  const world = new World(container);
  world.start();
}

main();
