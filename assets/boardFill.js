let cells = document.getElementsByTagName('td');    
for(let cell of cells) {
    cell.onclick = () => {};
    cell.onclick = function() {
        let activeCell = document.getElementById('gameCellActive');
        if (activeCell)
            activeCell.id = '';
        this.id = 'gameCellActive';
    };
}
let inputs = document.querySelectorAll('button.numpad');
for(let input of inputs) {
    input.onclick = () => {};
    input.onclick = function() {
        let activeCell = document.getElementById('gameCellActive');
        if (activeCell){
            if(input.id === 'delpad')
                activeCell.textContent = '';
            else
                activeCell.textContent = input.textContent;
        }
    };
}