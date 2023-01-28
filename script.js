const gameboard = (() => {
    const _board = document.getElementById("game-board");
    const _tiles = [];
    
    function _addTiles() {
        let children = Array.from(_board.children);
        for (let i = 0; i < children.length; i++) {
            _tiles.push(children[i]);
        }
    }
    function _clearTiles() {
        _tiles.length = 0;
    }

    function initialise() {
        _clearTiles();
        _addTiles();
    }
    function getTiles() {
        return _tiles;
    }
    function getTile(index) {
        return _tiles[index];
    }

    return {initialise, getTiles, getTile};
})();



const logic = (() => {
    /**
     * Inner factory function.
     */
     const Player = (name, mark) => {
        const getName = () => name;
        const getMark = () => mark;
        return {getMark, getName};
    }
    const playerCross = Player("Player One", "x");
    const playerNought = Player("Player Two", "o");

    const _state = {
        currentPlayer: playerCross,
        winner: "",
        playerCross: playerCross,
        playerNought: playerNought
    }

    function _setCurrentPlayer(Player) {
        _state.currentPlayer = Player;
    }
    function _setWinner(Player) {
        _state.winner = Player;
    }

    function initialise() {
        _setCurrentPlayer(playerCross);
        _setWinner("");
    }
    function getCurrentPlayer() {
        return _state.currentPlayer;
    }
    function switchCurrentPlayer() {
        getCurrentPlayer() === playerCross ? _setCurrentPlayer(playerNought) : _setCurrentPlayer(playerCross);
    }
    function getWinner() {
        return _state.winner.getName();
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

    return {initialise, getCurrentPlayer, switchCurrentPlayer, isWin, getWinner};
})();



const userInterface = (() => {
    // const _userInput = "";
    const _winScreen = document.getElementById("win-screen");
    const _winMessage = document.getElementById("win-message");
    const _replayButton = document.getElementById("replay-btn");
    
    // function getInput(element) {
    //     _userInput = element.textContent;
    // }
    function initialise() {
        gameboard.getTiles().forEach(tile => {
            paintTile(tile, "");
        })
        _hideWinScreen();
    }
    function paintTile(tile, mark) {
        tile.textContent = mark;
    }
    function showWinScreen() {
        _winScreen.style.display = "block";
    }
    function _hideWinScreen() {
        _winScreen.style.display = "none";
    }
    function changeWinMessage(playerName) {
     _winMessage.textContent = `Congratulations ${playerName}, you are the winner!`;
    }
    function getReplayButton() {
        return _replayButton;
    }
    return {initialise, paintTile, showWinScreen, changeWinMessage, getReplayButton};
})();



const controller = (() => {
    function _initialise() {
        gameboard.initialise();
        logic.initialise();
        userInterface.initialise();


        gameboard.getTiles().forEach(element => {
            element.addEventListener("click", _playRound, {once: true})
        });
        userInterface.getReplayButton().addEventListener("click", _initialise, {once: true});
    }
    function _playRound(e) {
        userInterface.paintTile(e.target, logic.getCurrentPlayer().getMark());
        
        if (logic.isWin()) {
            gameboard.getTiles().forEach(element => {
                element.removeEventListener("click", _playRound);
                });
                userInterface.changeWinMessage(logic.getWinner());
                userInterface.showWinScreen();
            }
        logic.switchCurrentPlayer();
    }
    
    _initialise();
   
})();