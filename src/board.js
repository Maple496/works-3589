var Board = (function () {
  var cells = new Array(9).fill(0);
  var current = 1;
  var winner = 0;
  var winLine = null;
  var LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function reset() {
    cells = new Array(9).fill(0);
    current = 1;
    winner = 0;
    winLine = null;
  }
  function full() {
    for (var i = 0; i < 9; i++) { if (!cells[i]) return false; }
    return true;
  }
  function play(idx) {
    if (winner || cells[idx]) return false;
    cells[idx] = current;
    for (var i = 0; i < LINES.length; i++) {
      var L = LINES[i];
      if (cells[L[0]] && cells[L[0]] === cells[L[1]] && cells[L[1]] === cells[L[2]]) {
        winner = current;
        winLine = L;
        return true;
      }
    }
    if (full()) { winner = -1; return true; }
    current = current === 1 ? 2 : 1;
    return true;
  }
  function get(idx) { return cells[idx]; }
  function turn() { return current; }
  function result() { return winner; }
  function line() { return winLine; }
  function over() { return winner !== 0; }
  return { reset: reset, play: play, get: get, turn: turn, result: result, line: line, over: over };
})();
