const DEFAULT_SIZE = 16;
const DEFAULT_MODE = "mono";

const container = document.querySelector(".container");
const gridSizeBtn = document.querySelector(".grid-size");
const resetBtn = document.querySelector(".reset");
const monoBtn = document.querySelector(".mono");
const rgbBtn = document.querySelector(".rgb");
const eraserBtn = document.querySelector(".eraser");
const shadowBtn = document.querySelector(".shadow");

let currentSize = DEFAULT_SIZE;
let currentMode = DEFAULT_MODE;

gridSizeBtn.addEventListener("click", getGridSize);
resetBtn.addEventListener("click", resetGrid);
monoBtn.onclick = () => setCurrentMode("mono");
rgbBtn.onclick = () => setCurrentMode("rgb");
eraserBtn.onclick = () => setCurrentMode("eraser");
shadowBtn.onclick = () => setCurrentMode("shadow");

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
    box.style.backgroundColor = "rgba(255, 255, 255, 1)";
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
      e.target.style.backgroundColor = "rgba(0, 0, 0, 1)";
      return;
    case "rgb":
      e.target.style.backgroundColor = getRandomRGBAColor();
      // e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      return;
    case "eraser":
      e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
      return;
    case "shadow":
      e.target.style.backgroundColor = getShadow(e);
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

function getShadow(e) {
  let toRGBAcolor = "";
  let currentOpacity = "";
  let newRGBAColor = "";
  let currentColor = e.target.style.backgroundColor;

  if (currentColor.indexOf("rgba") === -1) {
    // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below
    toRGBAcolor = currentColor.match(/[\.\d]+/g).map((a) => +a);
    currentOpacity = 0.1;

    if (
      toRGBAcolor[0] === 255 &&
      toRGBAcolor[1] === 255 &&
      toRGBAcolor[2] === 255
    ) {
      newRGBAColor = `rgba(0, 0, 0, ${currentOpacity})`;
      return newRGBAColor;
    }
    newRGBAColor = `rgba(${toRGBAcolor[0]}, ${toRGBAcolor[1]}, ${toRGBAcolor[2]}, ${currentOpacity})`;
    return newRGBAColor;
  }

  toRGBAcolor = currentColor.match(/[\.\d]+/g);

  currentOpacity = Number(toRGBAcolor[3]);
  if (currentOpacity === 0.1 || currentOpacity <= 1) {
    currentOpacity += 0.1;
    newRGBAColor = `rgba(${toRGBAcolor[0]}, ${toRGBAcolor[1]}, ${toRGBAcolor[2]}, ${currentOpacity})`;
    return newRGBAColor;
  }

  console.log("newRGBAColor", newRGBAColor);
  return (e.target.style.backgroundColor = newRGBAColor);
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function setCurrentMode(newMode) {
  currentMode = newMode;
}
