var cells = document.querySelectorAll('div.gameCell');
for(const cell of cells) {
    cell.addEventListener('click', function() {
        if (document.querySelectorAll('div.gameCellActive').length){
            document.querySelector('div.gameCellActive').className = 'gameCell';
        }
        cell.className = 'gameCellActive';
    })
}
var inputs = document.querySelectorAll('button.numpad');
for(const input of inputs) {
    input.addEventListener('click', function() {
        if (document.querySelectorAll('div.gameCellActive').length){
            if(input.id === 'delpad'){
                document.querySelector('div.gameCellActive').innerHTML = '&nbsp;';
            } else{
                document.querySelector('div.gameCellActive').textContent = input.textContent;
            }
        }
    })
}w