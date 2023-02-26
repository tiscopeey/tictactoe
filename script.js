

var playerRed = "R";
var playerYellow = "Y";
var currentPlayer = playerRed;

var gameOver = false;
var board;
var currentColumn;

var rows = 6;
var columns = 7;

window.onload = function(){
	setGame();
}



function setGame(){
	board = [];
	currentColumn = [5, 5, 5, 5, 5, 5, 5];
	
	for (let r = 0; r < rows; r++){
		let row = [];
		for (let c = 0; c < columns; c++){
			//JS
			row.push("");
		
			//HTML
			//<div id=r-c class="tile">
			let tile = document.createElement("div");
			tile.id = r.toString() + "-" + c.toString();
			tile.classList.add("tile");
			tile.addEventListener("click", setPiece);
			document.getElementById("board").append(tile);
		}
		board.push(row);
	}
}

function setPiece(){
	if (gameOver){
		return;
	}
	
	let coords = this.id.split("-"); //split to be a 2d array
	let r = parseInt(coords[0]);
	let c = parseInt(coords[1]);
	
	r = currentColumn[c];
	if (r < 0){
		return;
	}
	
	board[r][c] = currentPlayer;
	let tile = document.getElementById(r.toString() + "-" + c.toString());
	if (currentPlayer == playerRed){
		tile.classList.add("redpiece");
		currentPlayer = playerYellow;
	} else {
		tile.classList.add("yellowpiece");
		currentPlayer = playerRed;
	}
	
	r -= 1; // update column height
	currentColumn[c] = r; // update column array
	
	checkWinner();
}

function checkWinner(){
	//horizontal
	
	for (let r = 0; r < rows; r++){
		for (let c = 0; c < columns - 3; c++){
			if (board[r][c] != ''){
				if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
					setWinner(r, c);
					return;
				}
			}
		}
	}
	
	//vertical
	
	for (let c = 0; c < columns; c++){
		for (let r = 0; r < rows - 3; r++){
			if (board[r][c] != ''){
				if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
					setWinner(r, c);
					return;
				}
			}
		}
	}
	
	//anti diagonal
	
	for (let r = 0; r < rows - 3; r++){
		for (let c = 0; c < columns - 3; c++){
			if (board[r][c] != ''){
				if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] ==  board[r+3][c+3] ){
					setWinner(r, c);
					return;
				}
			}
		}
	}
	
	//diagonal
	
	for (let r = 3; r < rows; r++){
		for (let c = 0; c < columns - 3; c++){
			if (board[r][c] != ''){
				if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
					setWinner(r, c);
					return;
				}
			}
		}
	}
	
	
}

function setWinner(r, c){
	let winner = document.getElementById("winner");
	if (board[r][c] == playerRed){
		winner.innerText = "Red Wins!";
	} else {
		winner.innerText = "Yellow Wins!";
	}
	
	gameOver = true;
}




