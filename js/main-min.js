const startGameBtn=document.querySelector(".startGameBtn"),startingMove=document.querySelector(".nextMove span"),message=document.querySelector(".messageWrapper div"),xName=document.querySelector(".scoreX input"),oName=document.querySelector(".scoreO input");let nextMove,cells=document.querySelectorAll(".boardCell"),numOfMoves=0,boardArr=["","","","","","","","",""];function restartGame(){const e=startingPlayer();nextMove="",boardArr=["","","","","","","","",""],cells.forEach(e=>{e.innerHTML="",e.style.pointerEvents="all"}),deleteMessage(),startingMove.innerHTML=e,nextMove="X"===e?"X":"O"}function startingPlayer(){return Math.random()<.5?"X":"O"}function fillCell(e){checkNames(),""===e.innerHTML?(boardArr[e.getAttribute("data-spot")]=nextMove,e.innerHTML=nextMove,"X"===nextMove?(e.style.color="#1047b3",nextMove="O"):(e.style.color="#ffa100",nextMove="X"),startingMove.innerHTML=nextMove,numOfMoves++,checkGameWinner(boardArr)):(message.innerHTML="Cell already played! \nChoose Another Cell to Play.",message.classList.add("message","warning"))}function checkGameWinner(e){"X"===e[0]&&"X"===e[1]&&"X"===e[2]||"X"===e[3]&&"X"===e[4]&&"X"===e[5]||"X"===e[6]&&"X"===e[7]&&"X"===e[8]||"X"===e[0]&&"X"===e[3]&&"X"===e[6]||"X"===e[1]&&"X"===e[4]&&"X"===e[7]||"X"===e[2]&&"X"===e[5]&&"X"===e[8]||"X"===e[0]&&"X"===e[4]&&"X"===e[8]||"X"===e[2]&&"X"===e[4]&&"X"===e[6]?endGame("X"):"O"===e[0]&&"O"===e[1]&&"O"===e[2]||"O"===e[3]&&"O"===e[4]&&"O"===e[5]||"O"===e[6]&&"O"===e[7]&&"O"===e[8]||"O"===e[0]&&"O"===e[3]&&"O"===e[6]||"O"===e[1]&&"O"===e[4]&&"O"===e[7]||"O"===e[2]&&"O"===e[5]&&"O"===e[8]||"O"===e[0]&&"O"===e[4]&&"O"===e[8]||"O"===e[2]&&"O"===e[4]&&"O"===e[6]?endGame("O"):9===numOfMoves&&endGame("")}function endGame(e){if(""===e)message.innerHTML="It's a Draw! \nPlay again!",message.classList.add("message");else{const r=document.querySelector(`.score${e} .boardScores`),o=document.querySelector(`.score${e} input`).value;message.innerHTML=`Winner Winner Chicken Dinner! \n${o} Won this Match!`,message.classList.add("message","success"),r.innerHTML=parseFloat(r.innerHTML)+1}saveScrores(),numOfMoves=0,freezeBoard()}function freezeBoard(){cells.forEach(e=>e.style.pointerEvents="none")}function saveScrores(){const e=document.querySelector(".scoreX .boardScores").innerHTML,r=document.querySelector(".scoreO .boardScores").innerHTML;localStorage.setItem("scores",JSON.stringify({X:{Name:xName.value,Score:e},O:{Name:oName.value,Score:r}}))}function loadScores(){const e=JSON.parse(localStorage.getItem("scores"));null!=e&&(document.querySelector(".scoreX .boardScores").innerHTML=e.X.Score,document.querySelector(".scoreO .boardScores").innerHTML=e.O.Score,xName.value=e.X.Name,oName.value=e.O.Name)}function resetScores(){if(confirm("Are you sure you want to delete all information about this game and start over?")){const e=document.querySelectorAll(".boardScores");document.querySelectorAll(".scoreWrapper input").forEach(e=>e.value=""),e.forEach(e=>e.innerHTML="0"),localStorage.removeItem("scores"),restartGame()}}function checkNames(){""===xName.value?xName.value="Player X":xName.value=xName.value,""===oName.value?oName.value="Player O":oName.value=oName.value}function deleteMessage(){message.innerHTML="",message.classList.remove("message","success","warning")}startGameBtn.addEventListener("click",()=>{restartGame()}),restartGame(),loadScores();