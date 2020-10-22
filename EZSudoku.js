var board = [
    [4, 3, 0, 0],
    [1, 2, 3, 0],
    [0, 0, 2, 0],
    [2, 1, 0, 0]
]
var possibleEntries = [];
var positionIndex = 0;
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
                    let elim = possibleEntries[positionIndex].indexOf(board[x][sameRow]);
                    possibleEntries[positionIndex].splice(elim, 1);
                }
            }
            for (let sameColumn = 0; sameColumn <board.length; sameColumn++){
                if (board[sameColumn][y]){
                    let elim = possibleEntries[positionIndex].indexOf(board[sameColumn][y]);
                    possibleEntries[positionIndex].splice(elim, 1);
                }
            }
        }
        positionIndex ++;
    }    
}
