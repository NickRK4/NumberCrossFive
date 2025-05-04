const grid = document.getElementById('grid');
const resetBtn = document.getElementById('resetBtn');
const calculateBtn = document.getElementById('calculateBtn');
const saveBtn = document.getElementById('saveBtn');
let nullify = false;

const labelTexts = [
        'square',
        'product of digits is 20',
        'multiple of 13',
        'multiple of 32',
        'divisible by each of its digits',
        'product of digits is 25',
        'divisible by each of its digits',
        'odd palindrome',
        'fibonacci',
        'product of digits is 2025',
        'prime'
    ];

const rowLabelsContainer = document.querySelector('.row-labels');
labelTexts.forEach(text => {
    const label = document.createElement('div');
    label.classList.add('row-label');
    label.textContent = text;
    rowLabelsContainer.appendChild(label);
});


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

// all the groups that cannot be edited
exclusionRows = [1,1,2,2,3,3,5,6,6,6,6,7,8,8,9];
exclusionCols = [4,5,5,10,9,10,6,2,3,6,7,2,5,6,5];

// Build out the grid grid
const mirrors = Array(11).fill(0).map(() => Array(11).fill(0));

for (let row = 0; row < 11; row++) {
    for (let col = 0; col < 12; col++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.addEventListener('click', () => handleInnerClick(event, cell));

    // make the blocked out rows and cols solid
    for (let i = 0; i < exclusionRows.length; i++) {
        if (row === exclusionRows[i] && col === exclusionCols[i]) {
            cell.classList.add('solid');
            console.log(cell);
        }
    }

    // make col 0 uneditable
    if (col === 0){
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
            case 8:
            cell.classList.add('nine');
        }
    }
    grid.appendChild(cell);
    }
}

// gets all the cells that are in the exlusion rows and cols


const buttonsRow = document.querySelector('.buttons-row');

const groupsList = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const colors = ["#F39292", "#FCD59B","#F8A993","#D8E6D7","#9CC9AA","#AFD8E0","#ADB2C2","#776B7E", "#F2A8DD"];


groupsList.forEach(i => {
    const button = document.createElement('button');
    button.textContent = i;
    button.style.backgroundColor = colors[groupsList.indexOf(i)];
    button.classList = "button-top";
    button.style.borderColor = "black";
    buttonsRow.appendChild(button);

})
// add the special black button
const blackButton = document.createElement('button');
blackButton.textContent = "nullify";
blackButton.style.color = "black";
blackButton.style.backgroundColor = "white";
blackButton.classList = "button-top";
blackButton.style.borderColor = "black";
buttonsRow.appendChild(blackButton);



// select all buttons from the buttons row
const buttons = document.querySelectorAll('.buttons-row button');

console.log(buttons.length);
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const group = button.textContent;
        // Get all the cells with the same group 
        const cells = document.querySelectorAll(`.cell.${group}`);
        console.log(cells.length);
        cells.forEach(cell => {
            if (!cell.textContent) {
                cell.textContent = 1;
            } else{
                if (event.shiftKey) {
                    cell.textContent = (parseInt(cell.textContent) - 1) % 10;
                } else{
                    cell.textContent = (parseInt(cell.textContent) + 1) % 10;
                }
                if (cell.textContent === '-1') {
                    cell.textContent = 9;
                }
            }
        });
    });
});

function handleInnerClick(event, cell) {
    if (nullify){
        // if it's nulled then remove the nulled class
        if (cell.classList.contains('nulled')) {
            cell.classList.remove('nulled');
        } else{
            cell.classList.add('nulled');
        }
    } else {
        if (!cell.textContent) {
            cell.textContent = 1;
            return;
        }
        if (event.shiftKey) {
            cell.textContent = (parseInt(cell.textContent) - 1) % 10;
        } else {
            cell.textContent = (parseInt(cell.textContent) + 1) % 10;
        }
        if (cell.textContent === '-1') {
            cell.textContent = 9;
        }
    }
}



blackButton.addEventListener('click', () => {
    nullify = !nullify;
    blackButton.style.backgroundColor = nullify ? "black" : "white";
    blackButton.style.color = nullify ? "white" : "black";
})


resetBtn.addEventListener('click', () => {
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach(cell => {
        if (cell.classList.contains('uneditable')) {
            cell.innerHTML = 0;
            return
        }
        cell.textContent = "";
    });
});


calculateBtn.addEventListener('click', () => {
    // do later
});





