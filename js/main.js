const startGameBtn = document.querySelector('.startGameBtn');
const startingMove = document.querySelector('.nextMove span');
const message = document.querySelector('.messageWrapper div');

const xName = document.querySelector('.scoreX input');
const oName = document.querySelector('.scoreO input');

let cells = document.querySelectorAll('.boardCell');
let nextMove;
let numOfMoves = 0;
let boardArr = [
   '', '', '',
   '', '', '',
   '', '', ''
];

// Begin Game
startGameBtn.addEventListener('click', () => {
   restartGame();
})

function restartGame(){
   const moveStart = startingPlayer();
   nextMove = '';
   boardArr = [
      '', '', '',
      '', '', '',
      '', '', ''
   ];
   cells.forEach(cell => {
      cell.innerHTML = '';
      cell.style.pointerEvents = 'all';
   });
   deleteMessage();
   startingMove.innerHTML = moveStart;
   moveStart === 'X' ? nextMove = 'X' : nextMove = 'O';
}

function startingPlayer(){
   const num = Math.random();
   return num < 0.5 ? 'X' : 'O';
}

function fillCell(e){
   checkNames();
   if(e.innerHTML === ''){
      boardArr[e.getAttribute('data-spot')] = nextMove;
      e.innerHTML = nextMove;
      if(nextMove === 'X'){
         e.style.color = '#1047b3';
         nextMove = 'O';
      } else {
         e.style.color = '#ffa100';
         nextMove = 'X';
      }
      startingMove.innerHTML = nextMove;
      numOfMoves++;
      checkGameWinner(boardArr);
   } else {
      message.innerHTML = `Cell already played! \nChoose Another Cell to Play.`;
      message.classList.add('message', 'warning');
   }
}

function checkGameWinner(arr){
   if(
      arr[0] === 'X' && arr[1] === 'X' && arr[2] === 'X' || //
      arr[3] === 'X' && arr[4] === 'X' && arr[5] === 'X' || // CHECK Xs HORIZONTALS
      arr[6] === 'X' && arr[7] === 'X' && arr[8] === 'X' || //

      arr[0] === 'X' && arr[3] === 'X' && arr[6] === 'X' || //
      arr[1] === 'X' && arr[4] === 'X' && arr[7] === 'X' || // CHECK Xs VERTICALS
      arr[2] === 'X' && arr[5] === 'X' && arr[8] === 'X' || //

      arr[0] === 'X' && arr[4] === 'X' && arr[8] === 'X' || //
      arr[2] === 'X' && arr[4] === 'X' && arr[6] === 'X'    // CHECK Xs DIAGONALS
   ){
      endGame('X');
   } else if (
      arr[0] === 'O' && arr[1] === 'O' && arr[2] === 'O' || //
      arr[3] === 'O' && arr[4] === 'O' && arr[5] === 'O' || // CHECK Os HORIZONTALS
      arr[6] === 'O' && arr[7] === 'O' && arr[8] === 'O' || //

      arr[0] === 'O' && arr[3] === 'O' && arr[6] === 'O' || //
      arr[1] === 'O' && arr[4] === 'O' && arr[7] === 'O' || // CHECK Os VERTICALS
      arr[2] === 'O' && arr[5] === 'O' && arr[8] === 'O' || //

      arr[0] === 'O' && arr[4] === 'O' && arr[8] === 'O' || //
      arr[2] === 'O' && arr[4] === 'O' && arr[6] === 'O'    // CHECK Os DIAGONALS
   ) {
      endGame('O');
   } else {
      if( numOfMoves === 9 ) {
         endGame('');
      }
   }
}

// End Game - Show winner message
function endGame(winner){
   if( winner === '' ){
      message.innerHTML = `It's a Draw! \nPlay again!`;
      message.classList.add('message');
   } else {
      const score = document.querySelector(`.score${winner} .boardScores`);
      const name = document.querySelector(`.score${winner} input`).value;
      message.innerHTML = `Winner Winner Chicken Dinner! \n${name} Won this Match!`;
      message.classList.add('message', 'success');
      score.innerHTML = parseFloat(score.innerHTML) + 1;
   }
   saveScrores();    // Save scores to LocalStorage
   numOfMoves = 0;   // Reset moves counter
   freezeBoard();    // Disable clicking on Cells
}

// Freeze all clicks to board cells
function freezeBoard(){
   cells.forEach(cell => cell.style.pointerEvents = 'none' );
}

// Save Scores to LocalStorage
function saveScrores() {
   const xScore = document.querySelector('.scoreX .boardScores').innerHTML;
   const oScore = document.querySelector('.scoreO .boardScores').innerHTML;

   localStorage.setItem( 'scores', JSON.stringify(
      {
         'X': {
            'Name': xName.value,
            'Score': xScore
         },
         'O': {
            'Name': oName.value,
            'Score': oScore
         }
      }
   ));
}

// Load Scores
function loadScores(){
   const scores = JSON.parse( localStorage.getItem('scores') );
   if(scores != null){
      document.querySelector('.scoreX .boardScores').innerHTML = scores.X.Score;
      document.querySelector('.scoreO .boardScores').innerHTML = scores.O.Score;
      xName.value = scores.X.Name;
      oName.value = scores.O.Name;
   }
}

// Reset Scrores to 00
function resetScores(){
   let conf = confirm('Are you sure you want to delete all information about this game and start over?');
   if(conf){
      const scores = document.querySelectorAll('.boardScores');
      const inputs = document.querySelectorAll('.scoreWrapper input');
      inputs.forEach(inp => inp.value = '');
      scores.forEach(score => score.innerHTML = '0');
      localStorage.removeItem('scores');
      restartGame();
   } else {
      return;
   }
}

// Check if name fields are filled out
function checkNames(){
   xName.value === '' ? xName.value = 'Player X' : xName.value = xName.value;
   oName.value === '' ? oName.value = 'Player O' : oName.value = oName.value;
}

// Delete Current Message on Screen
function deleteMessage(){
   message.innerHTML = '';
   message.classList.remove('message', 'success', 'warning');
}

// Start Game on load
restartGame();

// Load Acores Saved in Local Storage
loadScores();
