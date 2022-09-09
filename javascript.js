



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



/*  FIX THIS SECTION
let color = "red"

let cells = document.getElementById('cell');
cells.addEventListener("mouseover", func, false);
cells.addEventListener("mouseout", func1, false);

function func() {
    cells.setAttribute("style", "background-color:blue;")
}
function func1() {
    cells.setAttribute("style", "background-color:green;")
}
*/
