var cells = document.getElementsByTagName('td');
for(const cell of cells) {
    cell.onclick = function() {
        if (document.getElementById('gameCellActive'))
            document.getElementById('gameCellActive').id = '';
        this.id = 'gameCellActive';
    };
}
var inputs = document.querySelectorAll('button.numpad');
for(const input of inputs) {
    input.onclick = function() {
        if (document.getElementById('gameCellActive')){
            if(input.id === 'delpad'){
                document.getElementById('gameCellActive').textContent = '';
            } else{
                document.getElementById('gameCellActive').textContent = input.textContent;
            }
        }
    };
}