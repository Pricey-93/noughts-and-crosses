const gameboard = (() => {
    const _tiles = [];

    function getTiles() {
        return _tiles;
    }
    function getTile(index) {
        return _tiles[index];
    }
    function paintTile(tile, mark) {
        tile.textContent = mark;
    }

    return {getTiles};
})();

const logic = (() => {
   const _state = {
    turnCount: 1,
    winner: "",

    }
    
    function getState() {
        return _state;
    }

    return {getState};
})();

const userInterface = (() => {
    
    
})();

const controller = (() => {
    const _gameboard = gameboard;
    const _logic = logic;
    const _userInterface = userInterface;


})();

