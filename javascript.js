



function createGrid(rowtot) {
    let gridContainer = document.querySelector('.grid');
    
    let celltot = rowtot * rowtot; 

    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateRows = `repeat(${rowtot}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rowtot}, 1fr)`;
   
    let row = 1;
    let column = 1;
    for (let i = 1; i <= celltot; i++) {
        let cell = document.createElement('div');
        cell.setAttribute("id", "cell");
        cell.setAttribute("class", "cell");
        cell.style.border = '1px solid lightgrey';
        cell.style.gridRow = row;
        cell.style.gridColumn = column;
        cell.style.aspectRatio = '1 / 1';
        cell.textContent = (null);
        column += 1;
        if (column === rowtot+1) {
            row += 1;
            column = 1;
        }
        gridContainer.appendChild(cell);
    };
    
};
   
createGrid (16);


const color = ('red'); 

function changeGridColor (e) {
    
    e.style.backgroundColor=color;
}

// "is mouse button down section" - from here https://tinyurl.com/58574ep6
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
