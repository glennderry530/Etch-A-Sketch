const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#222222';
const DEFAULT_BGCOLOR = '#EEEEEE';
const DEFAULT_TOOL = 'colorPicker'

let currentTool = DEFAULT_TOOL;
let currentColor = DEFAULT_COLOR;
let currentGridSize = DEFAULT_SIZE;
let currentBGColor = DEFAULT_BGCOLOR;

const gridContainer = document.querySelector('.grid');
const colorPicker = document.getElementById("colorPicker");
const clearButton = document.getElementById("clearButton");
const eraser = document.getElementById("eraser");

const penLabel = document.getElementById("penLabel");
const eraserLabel = document.getElementById("eraserLabel");
const clearLabel = document.getElementById("clearLabel");


colorPicker.onchange = function () {changePenColor(colorPicker.value)};

function changePenColor (newColor) {currentColor = newColor};

eraser.onclick = function () {changePenColor('')};

clearButton.onclick = function () {
    changeGridSize(currentGridSize); changePenColor(colorPicker.value);
};

function toolSelect(newTool){
    changeTool(newTool);
    currentTool = newTool;
    console.log(newTool);
};

function changeTool(toolChoice){
if (toolChoice = colorPicker) {
    penLabel.style.fontWeight = 'bold';
} else if (toolChoice = eraser) {
    eraser.style.fontWeight = 'bold';
} else if (toolChoice = clearButton) {
    clearButton.style.fontWeight = 'bold';
}
}


//Slider Section
const slider = document.getElementById("myRange");
const gridNum = document.getElementById("numGrids");
gridNum.textContent = slider.value; // Display the default slider value

slider.oninput = function() { //Update the gridNum text as you drag the slider handle
  gridNum.textContent = this.value;
};

slider.onchange = function() { //change the grid size after you select size
    changeGridSize(this.value);
};




function changeGridSize (total) {
    currentGridSize = total;
    clearGrid();
    createGrid(total);
};

function clearGrid() {
    document.querySelector('.grid').innerHTML=('')
};

//Create grids - from https://tinyurl.com/mrxutdkn
function createGrid(size) {
    let cellTotal = size * size; 
    gridContainer.style.setProperty('--grid-rows', size);
    gridContainer.style.setProperty('--grid-cols', size);
    
    for (let i = 0; i < cellTotal; i++) {
        let cell = document.createElement('div');
        cell.setAttribute("id", "cell");
        cell.style.border = '1px solid darkgrey';
        cell.style.aspectRatio = '1 / 1';
        gridContainer.appendChild(cell).className = "cell";
    };
};

function changeGridColor (e) {
    e.style.backgroundColor=currentColor;
};


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

document.addEventListener('mousemove', function(e) {
    if(e.target && e.target.id== ('cell') && primaryMouseButtonDown === true){
        changeGridColor (e.target)
    }
});


window.onload = () => {
    createGrid(DEFAULT_SIZE);
    toolSelect(DEFAULT_TOOL);
}

