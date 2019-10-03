let whoseTurn = "Player 1";

let scoreDiv1 = document.createElement("div");
let player1Score = document.createElement("h1");
player1Score.setAttribute("id", "p1Score");
player1Score.innerText = "Player 1:";
scoreDiv1.append(player1Score);

let scoreDiv2 = document.createElement("div");
let player2Score = document.createElement("h1");
player2Score.setAttribute("id", "p2Score");
player2Score.innerText = "Player 2:";
scoreDiv2.append(player2Score);

let turnDiv = document.createElement('div');
let turnHead = document.createElement('h1');
turnHead.innerText = `It's ${whoseTurn}'s turn.`
turnHead.setAttribute('id','turnHead');
turnDiv.setAttribute('id', 'turnDiv')
turnDiv.append(turnHead);

document.body.append(scoreDiv1, scoreDiv2, turnDiv);
