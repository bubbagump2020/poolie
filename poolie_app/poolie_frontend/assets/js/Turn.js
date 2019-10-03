function Turn() {}

Turn.prototype.switchTurn = function() {
  if (whoseTurn === "Player 1" && !ballPocketed) {
    whoseTurn = "Player 2";
    turnHead.innerText = `It's ${whoseTurn}'s turn.`;
  } else if (whoseTurn === "Player 2" && !ballPocketed) {
    whoseTurn = "Player 1";
    turnHead.innerText = `It's ${whoseTurn}'s turn.`;
  }
};

let turn = new Turn();
