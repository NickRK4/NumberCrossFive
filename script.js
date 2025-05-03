const grid = document.getElementById('grid');
const resetBtn = document.getElementById('resetBtn');
const calculateBtn = document.getElementById('calculateBtn');

const groups=[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 2, 2, 2, 2, 3, 3, 3, 0, 3],
    [1, 2, 2, 1, 2, 4, 3, 3, 3, 3, 3],
    [1, 2, 2, 1, 2, 4, 4, 3, 3, 4, 3],
    [1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 3],
    [1, 5, 6, 6, 1, 1, 4, 4, 6, 4, 4],
    [1, 5, 6, 6, 6, 6, 6, 6, 6, 7, 7],
    [5, 5, 5, 5, 6, 5, 6, 7, 7, 7, 7],
    [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    [5, 5, 8, 8, 8, 8, 8, 8, 5, 5, 5]
  ];

console.log(groups[0].length)

// Build out the grid grid
const mirrors = Array(11).fill(0).map(() => Array(11).fill(0));

for (let row = 0; row < 11; row++) {
    for (let col = 0; col < 12; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    // make col 0 uneditable
    if (col === 0) {
        cell.classList.add('uneditable');
        cell.innerHTML = 0;
    } else {
        // Inner clickable cell logic
        switch (groups[row][col - 1]) {
            case 0:
                cell.classList.add('one');
                break;
            case 1:
                cell.classList.add('two');
                break;
            case 2:
                cell.classList.add('three');
                break;
            case 3:
                cell.classList.add('four');
                break;
            case 4:
                cell.classList.add('five');
                break;
            case 5:
                cell.classList.add('six');
                break;
            case 6:
                cell.classList.add('seven');
                break;
            case 7:
                cell.classList.add('eight');
                break;
        }


        cell.addEventListener('click', () => handleInnerClick(cell));
    }
    grid.appendChild(cell);
    }
}

function handleInnerClick(cell) {
    
}

resetBtn.addEventListener('click', () => {
    // do later
});

calculateBtn.addEventListener('click', () => {
    // do later
});



