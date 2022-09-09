


let grid = document.getElementById('grid');

let columns = 32, rows =  32;

let cells = document.createElement('cells');
cells.className = 'cells';
for (let i = 0; i < columns; i++) {
    let column = document.createElement('div');
    column.className = ('column');
    for (let j = 0; j < rows; j++) {
        let row = document.createElement('div');
        row.className = ('row');
        row.textContent = i + '-' + j; //col - row in cell
        column.appendChild(row); // append rows in Column
    }
    cells.appendChild(column); // append column in cell
}

grid.appendChild(cells);