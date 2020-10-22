var board = [
    [4, 3, 0, 0],
    [1, 2, 3, 0],
    [0, 0, 2, 0],
    [2, 1, 0, 0]
]
function solver (board){
    var positionIndex = 0;
    var possibleEntries = [];
    for (let x = 0; x < Math.pow(board.length,2); x++) {
        possibleEntries[x] = new Array();
    }
    for (let x = 0; x < board.length; x++){
        for (let y = 0; y<board[x].length; y++){
            if (board[x][y]){
                possibleEntries[positionIndex][0] = board[x][y];
                positionIndex ++;
                continue;
        }else{
                for (let z = 0; z < board.length; z++){
                possibleEntries[positionIndex][z] = z + 1;
                }
                for (let sameRow = 0; sameRow <board.length; sameRow++){
                    if (board[x][sameRow]){
                        if (possibleEntries[positionIndex].length === 1){
                            continue;
                        }
                        if (possibleEntries[positionIndex].includes(board[x][sameRow])){
                            possibleEntries[positionIndex].splice(possibleEntries[positionIndex].indexOf(board[x][sameRow]), 1);
                        }
                    }
                }
                for (let sameColumn = 0; sameColumn <board.length; sameColumn++){
                    if (board[sameColumn][y]){
                        if (possibleEntries[positionIndex].length === 1){
                            continue;
                        }
                        if (possibleEntries[positionIndex].includes(board[sameColumn][y])){
                            possibleEntries[positionIndex].splice(possibleEntries[positionIndex].indexOf(board[sameColumn][y]), 1);
                        }
                    }
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
solver(board);
console.log(board);
solver(board);
console.log(board);
