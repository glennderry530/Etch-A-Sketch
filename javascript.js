const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#222222";
const DEFAULT_BGCOLOR = "#CCCCCC";
const DEFAULT_TOOL = "penTool";

let currentTool = DEFAULT_TOOL;
let currentColor = DEFAULT_COLOR;
let currentGridSize = DEFAULT_SIZE;
let currentBGColor = DEFAULT_BGCOLOR;


const gridContainer = document.querySelector(".grid");
const penTool = document.getElementById("penTool");
const penLabel = document.getElementById("penLabel");
const clearButton = document.getElementById("clearButton");
const eraser = document.getElementById("eraser");
const bgPicker = document.getElementById("bgPicker");
const tools = [penTool, eraser, clearButton];

penTool.onclick = () => {
  removeActive();
  penTool.classList.toggle("active");
  currentTool = penTool;
};

penTool.onchange = function () {
  toolChoice();
};


eraser.onclick = () =>  {
  removeActive();
  eraser.classList.toggle("active");
  currentTool = eraser;
  toolChoice();
};


clearButton.onclick = function () {
  changeGridSize(currentGridSize);
  toolChoice();
};

function toolChoice() {
  if (currentTool == penTool) {
    changePenColor(penTool.value);
    }
  if (currentTool == eraser) {
    changePenColor("");
  }
  if (currentTool == bgColor) {
    changeBGColor(bgPicker.value)
  }
}

function changePenColor(newColor) {
  penLabel.style.backgroundColor = newColor;
  currentColor = newColor;
}

function changeBGColor(newColor) {
  currentBGColor = newColor;
}

function removeActive() {
  let i = 0;
  for (i = 0; i < tools.length; i++) {
    console.log(i);
    tools[i].classList.remove("active");
  }
}

//Slider Section
const slider = document.getElementById("myRange");
const gridNum = document.getElementById("numGrids");
gridNum.textContent = slider.value; // Display the default slider value

slider.oninput = function () {
  gridNum.textContent = this.value;
};

slider.onchange = function () {
  changeGridSize(this.value);
};

function changeGridSize(total) {
  currentGridSize = total;
  clearGrid();
  createGrid(total);
}

function clearGrid() {
  document.querySelector(".grid").innerHTML = "";
}

//Create grids - from https://tinyurl.com/mrxutdkn
function createGrid(size) {
  let cellTotal = size * size;
  gridContainer.style.setProperty("--grid-rows", size);
  gridContainer.style.setProperty("--grid-cols", size);

  for (let i = 0; i < cellTotal; i++) {
    let cell = document.createElement("div");
    cell.setAttribute("id", "cell");
    cell.style.border = "1px solid darkgrey";
    cell.style.aspectRatio = "1 / 1";
    gridContainer.appendChild(cell).className = "cell";
  }
}

function changeGridColor(e) {
  e.style.backgroundColor = currentColor;
}

// "is mouse button down section" - https://tinyurl.com/58574ep6 (this section could definatly be better)
let primaryMouseButtonDown = false;

function setPrimaryButtonState(e) {
  let flags = e.buttons !== undefined ? e.buttons : e.which;
  primaryMouseButtonDown = (flags & 1) === 1;
}

document.addEventListener("mousedown", setPrimaryButtonState);
document.addEventListener("mousemove", setPrimaryButtonState);
document.addEventListener("mouseup", setPrimaryButtonState);
// "end of is mouse button down section"

gridContainer.addEventListener("mousemove", function (e) {
  if (e.target && e.target.id == "cell" && primaryMouseButtonDown === true) {
    changeGridColor(e.target);
  }
});

window.onload = () => {
  createGrid(DEFAULT_SIZE);
  toolChoice();
};
