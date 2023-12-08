const container = document.querySelector(".container");
const gridSizeBtn = document.querySelector(".grid-size");
const resetBtn = document.querySelector(".reset");

gridSizeBtn.addEventListener("click", getGridSize);
resetBtn.addEventListener("click", resetGrid);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let size = 16;

function createGrid(size) {
  let boxSize = 100 / size;
  console.log(boxSize);

  for (let i = 0; i < size * size; i += 1) {
    const box = document.createElement("div");
    box.classList.add("box");
    // box.style.setProperty("width", `${boxSize}%`);
    // box.style.setProperty("height", `${boxSize}%`);
    box.style.width = `${boxSize}%`;
    box.style.height = `${boxSize}%`;
    box.addEventListener("mouseover", changeColor);
    box.addEventListener("mousedown", changeColor);
    container.appendChild(box);
  }
}

createGrid(size);

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  e.target.style.backgroundColor = "#000";
}

function getGridSize() {
  let gridSize = Number(prompt("Input grid size"));

  if (gridSize > 100) {
    console.log("Size must be above 100 cells");
    return;
  }

  size = gridSize;
  console.log("size", size);
  resetGrid(gridSize);
}

function resetGrid() {
  console.log("sizeR", size);
  container.innerHTML = "";
  createGrid(size);
}
