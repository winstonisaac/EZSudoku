var cells = document.querySelectorAll('div.gameCell');
for(const cell of cells) {
    cell.addEventListener('click', function(event) {
        if (document.querySelectorAll('div.gameCellActive').length){
            document.querySelector('div.gameCellActive').setAttribute('class', 'gameCell');
        }
        cell.setAttribute('class', 'gameCellActive');
    })
}
var inputs = document.querySelectorAll('button.numpad');
for(const input of inputs) {
    input.addEventListener('click', function(event) {
        console.log('hehe');
        if (document.querySelectorAll('div.gameCellActive').length){
            document.querySelector('div.gameCellActive').innerHTML = input.innerHTML;
        }
    })
}