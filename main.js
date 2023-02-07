const buttons = document.querySelectorAll('button');
const startBlock = document.querySelector('.start-block');
const fieldSizes = document.querySelectorAll('.fieldSize_btn');
const gameField = document.querySelector('.field-block')
const winnerBlock = document.querySelector('.winner-block');
const players  = document.querySelectorAll('.players_btn');
const play = document.querySelector('#play');
const startPlay = document.querySelector('.start-play');
const grid = document.querySelector('#grid');
const newCell = document.getElementsByClassName('newCell');
const nowTurn = document.querySelector('#player');
const winnerHeader = document.querySelector('.winner__header');
const winner = document.querySelector('.winner');
const winnerIMG = document.querySelector('.winner-img');
const replay = document.querySelector('.replay');
const menu = document.querySelector('.menu');
let h;
let player1;
let player2;
let player;
let winIndex;

fieldSizes.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    for (let i = 0; i < fieldSizes.length; i++) {
      fieldSizes[i].classList.remove('checked');
    }
    e.target.classList.add('checked');
    for (let i = 0; i < players.length; i++) {
      if (players[i].classList.contains('checked'))
        play.removeAttribute('disabled');
    }
  })
})

players.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    for (let i = 0; i < players.length; i++) {
      players[i].classList.remove('checked');
    }
    e.target.classList.add('checked');
    for (let i = 0; i < fieldSizes.length; i++) {
      if (fieldSizes[i].classList.contains('checked'))
        play.removeAttribute('disabled');
    }
  })
})

play.addEventListener("click", newGame, false);

replay.addEventListener("click", function () {
  winnerBlock.classList.add('hide');
  removeCells();
  newGame();
});

menu.addEventListener("click", () => {
  removeCells();
  winnerBlock.classList.add('hide');
  gameField.classList.add('hide');
  startBlock.classList.remove('hide');
});

function removeCells() {
  if (!h) return;
  else {
    for (let i = 0; i < h * h; i++) {
      grid.innerHTML = '';
    }
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('checked');
    }
    nowTurn.innerHTML = player;
    grid.classList.remove('area3');
    grid.classList.remove('area4');
    grid.classList.remove('area5');
    play.setAttribute('disabled', 'disabled');
  }
}

function newGame() {
  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains("checked")) {
      player1 = players[i].getAttribute("value1");
      player2 = players[i].getAttribute("value2");
      player = player1;
      nowTurn.innerHTML = player;
      // players[i].classList.remove("checked")
    }
  }

  for (let i = 0; i < fieldSizes.length; i++) {
    if (fieldSizes[i].classList.contains("checked")) {
      h = Number(fieldSizes[i].getAttribute("value"));
      // fieldSizes[i].classList.remove("checked")
    }
  }

  startBlock.classList.add("hide");
  gameField.classList.remove("hide");

  renderArea(h);

  for (let k = 0; k < newCell.length; k++) {
    newCell[k].addEventListener("click", cellClick, false);
  }
}

function renderArea(h) {
  if (!h) return;
  else {
    for (let i = 0; i < h * h; i++) {
      grid.innerHTML += `<div class='newCell' pos='${i + 1}'></div>`;
    }

    switch (h) {
      case 3:
        grid.classList.add('area3');

        winIndex = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [1, 4, 7],
          [2, 5, 8],
          [3, 6, 9],
          [1, 5, 9],
          [3, 5, 7]
        ];
        break;

      case 4:
        grid.classList.add('area4');

        winIndex = [
          [1, 2, 3, 4],
          [5, 6, 7, 8,],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
          [1, 5, 9, 13],
          [2, 6, 10, 14],
          [3, 7, 11, 15],
          [4, 8, 12, 16],
          [1, 6, 11, 16],
          [4, 7, 10, 13]
        ];
        break;

      case 5:
        grid.classList.add('area5');

        winIndex = [
          [1, 2, 3, 4, 5],
          [6, 7, 8, 9, 10],
          [11, 12, 13, 14, 15],
          [16, 17, 18, 19, 20],
          [21, 22, 23, 24, 25],
          [1, 6, 11, 16, 21],
          [2, 7, 12, 17, 22],
          [3, 8, 13, 18, 23],
          [4, 9, 14, 19, 24],
          [5, 10, 15, 20, 25],
          [1, 7, 13, 19, 25],
          [5, 9, 13, 17, 21],
        ];
        break;
    }
  }

  return winIndex;
}

function cellClick() {
  let data = [];

  //!!!WORKS
  if (this.innerHTML) {
    return;
  } else if (player == player1) {
    this.classList.add("cross");
    this.innerHTML = player1;
    nowTurn.innerHTML = player2;
  } else if (player == player2) {
    this.classList.add("circle");
    this.innerHTML = player2;
    nowTurn.innerHTML = player1;
  }
  //!!!WORKS

  for (let k in newCell) {
    if (newCell[k].innerHTML == player) {
      data.push(parseInt(newCell[k].getAttribute("pos")));
    }
  }
  // console.log(`${player} - ${data}`);

  if (detectWinner(data)) {
    setTimeout(() => {
      gameField.classList.add("hide");
      winnerHeader.classList.remove('hide')
      winnerBlock.classList.remove("hide");
      winner.innerHTML = player.toUpperCase();
    }, 100);

  }
  else if (checkDraw(newCell)) {
    gameField.classList.add("hide");
    winnerBlock.classList.remove("hide");
    winnerHeader.classList.add('hide');
    winner.innerHTML = "НИЧЬЯ!";
  }
  else{
    player = player == player1 ? player2 : player1;
  }
}

function detectWinner(data) {
  for (let i in winIndex) {
    let win = true;
    for (let j in winIndex[i]) {
      let id = winIndex[i][j];
      let ind = data.indexOf(id);
      if (ind == -1) {
        win = false;
      }
    }
    if (win) {
      return true;
    }
  }
  return false;
}

function checkDraw(newCell){
  let amount = 0;
  for (let i = 0; i < newCell.length; i++) {
    if (newCell[i].innerHTML) amount += 1;
  }
  if (amount == newCell.length) return true;
}