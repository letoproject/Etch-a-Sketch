const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "mono";

const container = document.querySelector(".container");
const gridSizeBtn = document.querySelector(".grid-size");
const resetBtn = document.querySelector(".reset");
const monoBtn = document.querySelector(".mono");
const rgbBtn = document.querySelector(".rgb");
const eraserBtn = document.querySelector(".eraser");
const darkBtn = document.querySelector(".dark");

let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

gridSizeBtn.addEventListener("click", getGridSize);
resetBtn.addEventListener("click", resetGrid);
monoBtn.onclick = () => setCurrentMode("mono");
rgbBtn.onclick = () => setCurrentMode("rgb");
eraserBtn.onclick = () => setCurrentMode("eraser");
darkBtn.onclick = () => setCurrentMode("dark");
console.log(currentMode);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid(currentSize) {
  let boxSize = 100 / currentSize;

  for (let i = 0; i < currentSize ** 2; i += 1) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.style.width = `${boxSize}%`;
    box.style.height = `${boxSize}%`;
    box.addEventListener("mouseover", changeColor);
    box.addEventListener("mousedown", changeColor);
    container.appendChild(box);
  }
}

createGrid(currentSize);

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;

  switch (currentMode) {
    case "mono":
      e.target.style.backgroundColor = "#000";
      return;
    case "rgb":
      e.target.style.backgroundColor = getRandomRGBAColor();
      return;
    case "eraser":
      e.target.style.backgroundColor = "#fff";
      return;
    case "dark":
      getDark(e);
    default:
      return;
  }
}

function getGridSize() {
  let gridSize = Number(prompt("Input grid size"));

  if (gridSize > 100) {
    console.log("Size must be up to 100 cells");
    return;
  }

  setCurrentSize(gridSize);
  resetGrid(gridSize);
}

function resetGrid() {
  container.innerHTML = "";
  createGrid(currentSize);
}

function getRandomRGBAColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgba(${r}, ${g}, ${b}, 1)`;
}

function getDark(e) {
  let color = e.target.style.backgroundColor;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}
