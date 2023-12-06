const container = document.querySelector(".container");

function createGrid(size) {
  for (let i = 0; i < size * size; i += 1) {
    const div = document.createElement("div");
    div.classList.add("box");
    div.addEventListener("mouseover", (e) => {
      e.target.style.cssText = "background-color: blueviolet";
    });
    div.addEventListener("mousedown", () => {});
    container.appendChild(div);
  }
}

createGrid(16);
