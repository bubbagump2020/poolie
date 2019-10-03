let whoseTurn = "Player 1";

switchTurn = function() {
  if (whoseTurn === "Player 1") {
    whoseTurn = "Player 2";
    document.getElementById("turnHead").innerText = `It's ${whoseTurn}'s turn.`;
  }
  if (whoseTurn === "Player 2") {
    whoseTurn = "Player 1";
    document.getElementById("turnHead").innerText = `It's ${whoseTurn}'s turn.`;
  }
};
