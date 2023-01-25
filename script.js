const gameboard = (() => {
    const _board = document.getElementById("game-board");
    const _tiles = [];
    
    function _addTiles() {
        let children = Array.from(_board.children);
        for (let i = 0; i < children.length; i++) {
            _tiles.push(children[i]);
        }
    }

    function getTiles() {
        return _tiles;
    }
    function getTile(index) {
        return _tiles[index];
    }
    function clearTiles() {
        _tiles.length = 0;
    }

    _addTiles();
    return {getTiles, getTile};
})();



const logic = (() => {
   const _state = {
    turnCount: 1,
    currentPlayer: "",
    winner: ""
    }
    function increaseTurnCount() {
        _state.turnCount += 1;
    }
    function getCurrentPlayer() {
        return _state.currentPlayer;
    }
    function setCurrentPlayer(Player) {
        _state.currentPlayer = Player;
    }
    function getWinner() {
        return _state.winner;
    }
    function setWinner(Player) {
        _state.winner = Player;
    }
    

    function getState() {
        return _state;
    }

    return {getState};
})();



const userInterface = (() => {
    const _userInput = "";
    
    function getInput(element) {
        _userInput = element.textContent;
    }
    function paintTile(tile, mark) {
        tile.textContent = mark;
    }
    return {getInput};
})();



const controller = (() => {
    const Player = (name) => {
        function getName() {
            return this.name;
        }
    }
})();
