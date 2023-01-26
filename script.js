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
    /**
     * Inner factory function.
     */
     const Player = (mark) => {
        const getMark = () => mark;
        return {getMark};
    }
    const playerCross = Player("x");
    const playerNought = Player("o");

   const _state = {
    turnCount: 1,
    currentPlayer: "",
    winner: "",
    playerCross: playerCross,
    playerNought: playerNought
    }
    
    function increaseTurnCount() {
        _state.turnCount += 1;
    }
    function getCurrentPlayer() {
        return _state.currentPlayer;
    }
    function _setCurrentPlayer(Player) {
        _state.currentPlayer = Player;
    }
    function switchCurrentPlayer() {
        _state.currentPlayer === playerCross ? _state.currentPlayer = playerNought : _state.currentPlayer = playerCross;
    }
    function getWinner() {
        return _state.winner;
    }
    function _setWinner(Player) {
        _state.winner = Player;
    }
    function printState() {
        console.log(_state);
    }
    function isWin() {
        let currentMark = getCurrentPlayer().getMark();
        switch (true) {
            /*vertical win conditions*/
        case gameboard.getTile(0).textContent === currentMark && gameboard.getTile(3).textContent === currentMark && gameboard.getTile(6).textContent === currentMark:
        case gameboard.getTile(1).textContent === currentMark && gameboard.getTile(4).textContent === currentMark && gameboard.getTile(7).textContent === currentMark:
        case gameboard.getTile(2).textContent === currentMark && gameboard.getTile(5).textContent === currentMark && gameboard.getTile(8).textContent === currentMark:
            /*horizontal win conditions*/
        case gameboard.getTile(0).textContent === currentMark && gameboard.getTile(1).textContent === currentMark && gameboard.getTile(2).textContent === currentMark: 
        case gameboard.getTile(3).textContent === currentMark && gameboard.getTile(4).textContent === currentMark && gameboard.getTile(5).textContent === currentMark:
        case gameboard.getTile(6).textContent === currentMark && gameboard.getTile(7).textContent === currentMark && gameboard.getTile(8).textContent === currentMark:
            /*diagonal win conditions*/
        case gameboard.getTile(0).textContent === currentMark && gameboard.getTile(4).textContent === currentMark && gameboard.getTile(8).textContent === currentMark:
        case gameboard.getTile(2).textContent === currentMark && gameboard.getTile(4).textContent === currentMark && gameboard.getTile(6).textContent === currentMark:
            _setWinner(getCurrentPlayer());
            return true;
        default:
            return false;
        }
    }

    _setCurrentPlayer(playerCross);

    return {printState, getCurrentPlayer, switchCurrentPlayer, increaseTurnCount, isWin};
})();



const userInterface = (() => {
    const _userInput = "";
    
    function getInput(element) {
        _userInput = element.textContent;
    }
    function paintTile(tile, mark) {
        tile.textContent = mark;
    }
    return {getInput, paintTile};
})();



const controller = (() => {
   


    gameboard.getTiles().forEach(element => {
        element.addEventListener("click", (e) => {
            userInterface.paintTile(e.target, logic.getCurrentPlayer().getMark());
            logic.increaseTurnCount();
            logic.switchCurrentPlayer();
        },{once: true})
    });
})();
