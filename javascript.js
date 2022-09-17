const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#222222";
const DEFAULT_BGCOLOR = "#A0A0A0";
const DEFAULT_TOOL = "penTool";

let currentTool = DEFAULT_TOOL;
let currentColor = DEFAULT_COLOR;
let currentGridSize = DEFAULT_SIZE;
let currentBGColor = DEFAULT_BGCOLOR;

const gridContainer = document.querySelector(".grid");
const penTool = document.getElementById("penTool");
const penLabel = document.getElementById("penLabel");
const rainbow = document.getElementById("rainbow");
const clearButton = document.getElementById("clearButton");
const eraser = document.getElementById("eraser");
const bgPicker = document.getElementById("bgPicker");
const bgLabel = document.getElementById("bgLabel");
const tools = [penLabel, rainbow ,eraser, clearButton, bgLabel];


function randomColorGen() {
  return Math.floor(Math.random()*16777215).toString(16);
};

penTool.onclick = () => {
  removeActive();
  currentColor = penTool.value;
  currentTool = penTool;
  mouseDown = 0;
  toolChoice();
};

penTool.onchange = function () {
  currentColor = penTool.value;
  currentTool = penTool;
  mouseDown = 0;
  toolChoice();
};

bgPicker.onclick = () => {
  removeActive();
  currentBGColor=bgPicker.value;
  currentTool = bgPicker;
  mouseDown = 0;
  toolChoice();
};

bgPicker.onchange = function () {
  currentBGColor=bgPicker.value;
  gridContainer.style.backgroundColor = bgPicker.value;
  bgLabel.style.backgroundColor = bgPicker.value;
  currentTool = penTool;
  currentColor = currentColor = penTool.value;
  mouseDown = 0;
  toolChoice();
};


rainbow.onclick = () =>  {
  removeActive();
  currentTool = rainbow;
  changePenColor("#" + randomColorGen());
  mouseDown = 0;
  toolChoice();
};

eraser.onclick = () =>  {
  removeActive();
  currentTool = eraser;
  changePenColor("");
  mouseDown = 0;
  toolChoice();
};

clearButton.onclick = function () {
  removeActive();
  changeGridSize(currentGridSize);
  currentTool = penTool;
  currentColor = currentColor = penTool.value;
  mouseDown = 0;
  toolChoice();
};

function toolChoice() {
  if (currentTool == penTool) {
    changePenColor(currentColor);
    penLabel.classList.add("active");
    }
  if (currentTool == eraser) {
    changePenColor("");
    mouseDown = 0;
    eraser.classList.add("active");
  }
  if (currentTool == bgPicker) {
    bgLabel.classList.add("active");
  }
  if (currentTool == rainbow) {
    changePenColor("#" + randomColorGen());
    rainbow.classList.add("active");
  }
}

function changePenColor(newColor) {
  penLabel.style.backgroundColor = newColor;
  currentColor = newColor;
}


function removeActive() {
  let i = 0;
  for (i = 0; i < tools.length; i++) {
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



//Grid Section
function changeGridSize(total) {
  currentGridSize = total;
  clearGrid();
  createGrid(total);
}

function clearGrid() {
  gridContainer.innerHTML = "";
}

//Create grids - stolen from https://tinyurl.com/mrxutdkn
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

function changeCellColor(e) {
  if (currentTool == rainbow) {
    changePenColor("#" + randomColorGen())};
  e.style.backgroundColor = currentColor;
}

//*****Still owe Mouse Debounce Stuff here*****
let mouseDown = 0;
document.onmousedown = () => {
  ++mouseDown;
};

document.onmouseup = () => {
  mouseDown = false;
};

document.ontouchstart = () => {
  ++mouseDown;
}

document.ontouchend = () => {
  mouseDown = false;
}

gridContainer.addEventListener('mouseover', function (e) {
  if (e.target.id == "cell") {cell = e.target};
  cell.onclick = () => changeCellColor(cell);
  if (cell && mouseDown == true) {
    changeCellColor(cell);
  }
});

//*****Touch pad section*****
/* function isTouchEnabled() {
  return ('ontouchmove' in window) ||
  (navigator.maxTouchPoints > 0) ||
  (navigator.maxTouchPoints,msMaxTouchPoints > 0);
}

gridContainer.addEventListener('touchmove', function (e) {
  let touch = e.changedTouches[0];
  if (touch.target.id == "cell") {cell = touch.target}
  cell.ontouchmove = () => changeCellColor(cell);
  if (isTouchEnabled()){changeCellColor(cell);
  }
})*/


window.onload = () => {
  createGrid(DEFAULT_SIZE);
  penLabel.classList.add("active");
  toolChoice();
};


