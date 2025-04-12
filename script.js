const grid = document.getElementById('grid');
const resetBtn = document.getElementById('resetBtn');
const calculateBtn = document.getElementById('calculateBtn');

// Build 7x7 grid
const mirrors = Array(7).fill(0).map(() => Array(7).fill(0));
for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    // If on border, make it a non-editable zero
    if (row === 0 || row === 6 || col === 0 || col === 6) {
        const input = document.createElement('div');
        if (!((row === 0 && col === 0) || (row === 0 && col === 6) || (row === 6 && col === 0) || (row === 6 && col === 6))){ 
            input.className = 'value';
            input.appendChild(document.createTextNode("0"))
        } else {
            input.className = 'solid';
        }
        cell.appendChild(input);
    } else {
        // Inner clickable cell logic
        cell.dataset.state = "0"; // 0: empty, 1: diag-up, 2: diag-down
        cell.addEventListener('click', () => handleInnerClick(cell));
    }
    grid.appendChild(cell);
    }
}

function handleInnerClick(cell) {
    let state = parseInt(cell.dataset.state);
    state = (state + 1) % 3;
    mirrors[cell.dataset.row][cell.dataset.col] = state;
    cell.dataset.state = state.toString();
    cell.classList.remove('diag-up', 'diag-down');
    if (state === 1) {
    cell.classList.add('diag-down');
    } else if (state === 2) {
    cell.classList.add('diag-up');
    }
    updateGrid();
}

resetBtn.addEventListener('click', () => {
    const existingResult = document.getElementById('result');
    if (existingResult) {
        document.body.removeChild(existingResult);
    }
    document.querySelectorAll('.cell').forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if ((row === 0 || row === 6 || col === 0 || col === 6) && !((row === 0 && col === 0) || (row === 0 && col === 6) || (row === 6 && col === 0) || (row === 6 && col === 6))) {
            let valueDiv = cell.querySelector('.value');
            if (!valueDiv) {
                valueDiv = document.createElement('div');
                valueDiv.className = 'value';
                cell.appendChild(valueDiv);
            }
            valueDiv.textContent = "0";
            mirrors[row][col] = 0;
        } else {
            cell.dataset.state = "0";
            cell.classList.remove('diag-up', 'diag-down');
            mirrors[row][col] = 0;
        }
    });
    updateGrid();
});

calculateBtn.addEventListener('click', () => {
    // Check if result already exists
    const existingResult = document.getElementById('result');
    if (existingResult) {
        document.body.removeChild(existingResult);
    }
    
    let total = 0;
    // sum across the top and bottom
    for (row = 0; row < 7; row+=6){
        for (col = 0; col < 7; col++){
            total += mirrors[row][col];
        }
    }
    // sum across the left and right
    for (row = 1; row < 6; row++){
        for (col = 0; col < 7; col+=6){
            total += mirrors[row][col];
        }
    }
    const result = document.createElement('span');
    result.id = 'result';
    result.textContent = `Total: ${total}`;
    result.style.display = "inline-block";
    document.body.insertBefore(result, calculateBtn.nextElementSibling);
});

const getDistance = function(maze, row, col, rowDir, colDir, total, list) {
    // if not at the start row and col
    if ((total !== 0) && (row === 0 || col === 0 || row >= 6 || col >= 6)){
        list.push(row);
        list.push(col);
        return total // base case, reach the end
    } else if (maze[row][col] === 1){
        // swap the two directions
        if (rowDir === 0){
            // if moving along the col
            return total * getDistance(maze, row-colDir, col, -colDir, 0, 1, list)
        } else{
            // if moving along the row
            return total * getDistance(maze, row, col-rowDir, 0, -rowDir, 1, list)
        }
    } else if (maze[row][col] === 2){
        // if moving along the col
        if (rowDir === 0){
            return total * getDistance(maze, row+colDir, col, colDir, 0, 1, list);
        } else{
            // if moving along the row
            return total * getDistance(maze, row, col+rowDir, 0, rowDir, 1, list)
        }
    } else{
        return getDistance(maze, row+rowDir, col+colDir, rowDir, colDir, total+1, list)
    }
}

const updateGrid = () => {
    // first reset grid
    resetGrid();
    let visitedCells = [];
    // update the left and right cols
    for (let col = 0; col < 7; col+=6){
        for (let row = 1; row < 6; row++){
            if (visitedCells.includes(`${row},${col}`)) continue;
            let dist = 0;
            let endCords = [];
            if (col === 0){
                dist = getDistance(mirrors, row, col, 0, 1, 0, endCords);
            } else{
                dist = getDistance(mirrors, row, col, 0, -1, 0, endCords);
            }
            // add to visited cells
            visitedCells.push(`${row},${col}`);
            visitedCells.push(`${endCords[0]},${endCords[1]}`);

             // update the mirrors and the grid
            mirrors[row][col] = dist;
            mirrors[endCords[0]][endCords[1]] = dist;
            const startCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            updateCellValue(startCell, dist);
            const endCell = document.querySelector(`.cell[data-row="${endCords[0]}"][data-col="${endCords[1]}"]`);
            updateCellValue(endCell, dist);
        }
    }

    // update the top and bottom rows
    for (let row = 0; row < 7; row+=6){
        for (let col = 1; col < 6; col++){
            if (visitedCells.includes(`${row},${col}`)) continue;
            let dist = 0;
            let endCords = [];
            if (row === 0){
                dist = getDistance(mirrors, row, col, 1, 0, 0, endCords);
            } else{
                dist = getDistance(mirrors, row, col, -1, 0, 0, endCords);
            }
            // add to visited cells
            visitedCells.push(`${row},${col}`);
            visitedCells.push(`${endCords[0]},${endCords[1]}`);
            mirrors[row][col] = dist;
            mirrors[endCords[0]][endCords[1]] = dist;
            const startCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            updateCellValue(startCell, dist);
            const endCell = document.querySelector(`.cell[data-row="${endCords[0]}"][data-col="${endCords[1]}"]`);
            updateCellValue(endCell, dist);
        }
    }

}

function resetGrid() {
    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 7; col++) {
            if ((row === 0 || row === 6 || col === 0 || col === 6) && !((row === 0 && col === 0) || (row === 0 && col === 6) || (row === 6 && col === 0) || (row === 6 && col === 6))) {
                mirrors[row][col] = 0;
                const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
                updateCellValue(cell, 0);
            }
        }
    }
}

function updateCellValue(cell, value) {
    if (!cell) return;
    let valueDiv = cell.querySelector('.value');
    if (!valueDiv) {
        valueDiv = document.createElement('div');
        valueDiv.className = 'value';
        cell.appendChild(valueDiv);
    }
    valueDiv.textContent = value;
}
updateGrid();