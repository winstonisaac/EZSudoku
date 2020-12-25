var board = [];
var row = 0;
var column = 0;
var sameQuad = 0;
var timeout = 0;
var entries = 0;
var brute = false;
var quadrants;
var positionIndex = 0;
var possibleEntries = [];
document.querySelector('#solve').addEventListener('click', function() {
    if (document.querySelectorAll('div.gameCellActive').length){
        document.querySelector('div.gameCellActive').setAttribute('class', 'gameCell');
    }
    if (Math.sqrt(document.querySelectorAll('div.gameCell').length) === 9){
        board = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
        var cells = document.querySelectorAll('div.gameCell');
        for(const cell of cells) {
            if (column === 9){
                column = 0;
                row ++;
            }
            if (row === 9 && column === 9){
                break;
            }
            if (cell.innerHTML === '&nbsp;'){
                entries ++;
                board[row][column] = 0;
            } else {
                board[row][column] = parseFloat(cell.innerHTML);
            }
            column ++;
        }
    }
    row = 0;
    column = 0;
    positionIndex = 0;
    possibleEntries = [];
    if (entries > 64){              //error handling for less than 17 entries
        document.querySelector('#errorContainer').style.display = 'initial';
        if (entries === 81){
            document.querySelector('#errorMessage').textContent = 'The board has no entries.';
        }else {
            document.querySelector('#errorMessage').textContent = 'The board has too few entries.';
        }
        document.querySelector('body').style.overflow = 'hidden';
        document.querySelector('#errorOkay').addEventListener('click', function() {
            document.querySelector('#errorContainer').style.display = 'none';
            document.querySelector('body').style.overflow = 'initial';
        })
        entries = 0;
        return;
    }
    for (let x = 0; x < Math.pow(board.length,2); x++) {        //instantiating an array with board.length^2 length to store possible entries for each cell
        possibleEntries[x] = new Array();
    }
    for (let x = 0; x < board.length; x++){         //for loop for the rows
        for (let y = 0; y< board.length; y++){      //for loop for the columns
            if (board[x][y]){                       //goes here if cell is a given
                possibleEntries[positionIndex][0] = board[x][y];
                positionIndex ++;
                continue;
            }else{
                for (let z = 0; z < board.length; z++){         //filling the possibleEntries array with all possible entries at positionIndex cell
                    possibleEntries[positionIndex][z] = z+1;
                }
                positionIndex ++;
            }
        }
    }
    quadrants = new Array (board.length);
    for (let x = 0, points = 0; x < board.length; x++){         //group cell indexes that belong to each quadrant
        quadrants[x] = new Array (board.length);
        for (let y = 0, pointsInside = points; y < board.length; y++){
            if(!(y)){
                quadrants[x][y] = pointsInside;
                continue;
            }
                if((pointsInside + 1) % Math.sqrt(board.length) === 0){

                    pointsInside += ((Math.sqrt(board.length)) * (Math.sqrt(board.length) - 1) + 1);
                }else {
                    pointsInside++;
                }
                quadrants[x][y] = pointsInside;
        }
        if((x + 1) % Math.sqrt(board.length) === 0){
            points += ((Math.pow(Math.sqrt(board.length),3)) - ((Math.sqrt(board.length)) * (Math.sqrt(board.length) - 1)));
            continue;
        }
        points += Math.sqrt(board.length);
    }
    while (stillIncomplete(board, 0)){
        solver(board);
        timeout ++;
        if(timeout === 30){
            solverFallback(board);
            brute = true;
            break;
        }
    }
    console.log(board);
    for(const cell of cells) {
        if (column === 9){
            column = 0;
            row ++;
        }
        if (row === 9 && column === 9){
            break;
        }
        cell.innerHTML = board[row][column];
        column ++;
    }
    entries = 0;
    timeout = 0;
})
function subtractTwoArrays(arr1,arr2){
    for(x = 0; x < arr2.length; x++){
        if(arr1.includes(arr2[x])){
        arr1.splice(arr1.indexOf(arr2[x]),1);
        }
    }
    return arr1;
}
function solver (board){
    var positionIndex = 0;
    for (let x = 0; x < board.length; x++){         //for loop for the rows
        for (let y = 0; y< board.length; y++){      //for loop for the columns
            if (board[x][y]){                       //goes here if cell is a given
                possibleEntries[positionIndex][0] = board[x][y];
                positionIndex ++;
                continue;
            }else{
                var possibleValues = Array.from(Array(board.length).keys());
                possibleValues = possibleValues.map(function(item){
                    return item +1;
                });
                for (let sameRow = 0; sameRow < board.length; sameRow++){       //check cells with the same row as positionIndex for their values,
                    if (board[x][sameRow]){                                     //and if found, remove them from possibleEntries of that cell
                        if (possibleEntries[positionIndex].length === 1){
                            break;
                        }
                        if (possibleEntries[positionIndex].includes(board[x][sameRow])){
                            possibleEntries[positionIndex].splice(possibleEntries[positionIndex].indexOf(board[x][sameRow]), 1);
                        }
                    }
                }
                for (let sameColumn = 0; sameColumn < board.length; sameColumn++){      //same as above but columns
                    if (board[sameColumn][y]){
                        if (possibleEntries[positionIndex].length === 1){
                            break;
                        }
                        if (possibleEntries[positionIndex].includes(board[sameColumn][y])){
                            possibleEntries[positionIndex].splice(possibleEntries[positionIndex].indexOf(board[sameColumn][y]), 1);
                        }
                    }
                }
                for(let square = 0; square < board.length; square++){       //check which quadrant current cell belongs to
                    if(quadrants[square].includes(positionIndex)){
                        sameQuad = square;
                        break;
                    }
                }
                for (let sameSquare = 0; sameSquare < board.length; sameSquare++){      //same as two above but for same quadrant
                    if (possibleEntries[positionIndex].length === 1){
                        break;
                    }
                    if (possibleEntries[positionIndex].includes(board[Math.floor(quadrants[sameQuad][sameSquare] / board.length)][Math.floor(quadrants[sameQuad][sameSquare] % board.length)])){
                        possibleEntries[positionIndex].splice(possibleEntries[positionIndex].indexOf(board[Math.floor(quadrants[sameQuad][sameSquare] / board.length)][Math.floor(quadrants[sameQuad][sameSquare] % board.length)]), 1);
                    }
                }
               if(possibleEntries[positionIndex].length != 1){
                    for (let sameSquare = 0; sameSquare < board.length; sameSquare++){
                        if (quadrants[sameQuad][sameSquare] === positionIndex){
                            continue;
                        }
                        possibleValues = subtractTwoArrays(possibleValues,possibleEntries[quadrants[sameQuad][sameSquare]]);
                    }
                    if(possibleValues.length === 1){
                        possibleEntries[positionIndex] = possibleValues;
                    }
                    var possibleValues = Array.from(Array(board.length).keys());
                    possibleValues = possibleValues.map(function(item){
                        return item +1;
                    });
                    for (let sameColumn = 0; sameColumn < board.length; sameColumn++){
                        if (sameColumn * board.length + y === positionIndex){
                            continue;  
                        }
                        possibleValues = subtractTwoArrays(possibleValues,possibleEntries[sameColumn * board.length + y]);
                    }
                    if(possibleValues.length === 1){
                        possibleEntries[positionIndex] = possibleValues;
                    }
                    var possibleValues = Array.from(Array(board.length).keys());
                    possibleValues = possibleValues.map(function(item){
                        return item +1;
                    });
                    for (let sameRow = 0; sameRow < board.length; sameRow++){
    
                        if (x * board.length + sameRow === positionIndex){
                            continue;  
                        }
                        possibleValues = subtractTwoArrays(possibleValues,possibleEntries[x * board.length + sameRow]);
                    }
                    if(possibleValues.length === 1){
                        possibleEntries[positionIndex] = possibleValues;
                    }
                }
                positionIndex ++;
            }    
        }
        for (let a = 0; a < Math.pow(board.length,2); a++){
            if (possibleEntries[a].length === 1){
                board[Math.floor(a / board.length)][a % board.length] = possibleEntries[a][0];
            }
        }
    }
}
function stillIncomplete(board, blank) {
    return board.some(board => board.includes(blank));
}
function isValid(board, row, col, k) {      // this is the backtracking method by M. Ramezani of Stack Overflow
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
          return false;
        }
    }
    return true;
}
function solverFallback(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(board, i, j, k)) {
                        board[i][j] = k;
                        if (solverFallback(board)) {
                            return true;
                        }else{
                            board[i][j] = 0;
                        }
                    }
                }
            return false;
            }  
        }
    }
return true;
}       // backtracking method ends here
if (brute){
    console.log("Solved using backtracking.")
}
