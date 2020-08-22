"use strict";

var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var $time = document.querySelector('#time');
var $result = document.querySelector('#result');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $gameTime = document.querySelector('#game-time');
var score = 0;
var isGameStarted = false;
$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute('disabled', 'true');
  isGameStarted = true; // $timeHeader.classList.remove('hide');
  // $resultHeader.classList.add('hide');
  // show($timeHeader);
  // hide($resultHeader);
  // $start.classList.add('hide');
  // $game.classList.add('show');

  show($game);
  hide($start);
  var interval = setInterval(function () {
    var time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $gameTime.removeAttribute('disabled'); // $start.classList.remove('hide');
  // $game.classList.remove('show');

  show($start);
  hide($game);
  $game.innerHTML = ''; // $game.style.backgroundColor = '#CCCCCC';
  // $timeHeader.classList.add('hide');
  // $resultHeader.classList.remove('hide');

  hide($timeHeader);
  show($resultHeader);
}

function setGameScore() {
  $result.textContent = score.toString();
}

function setGameTime() {
  var time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  show($timeHeader);
  hide($resultHeader);
}

function show($el) {
  $el.classList.remove('hide');
}

function hide($el) {
  $el.classList.add('hide');
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = '';
  var box = document.createElement('div');
  var boxSize = getRandom(30, 100);
  var gameFieldSize = $game.getBoundingClientRect();
  var maxTop = gameFieldSize.height - boxSize;
  var maxLeft = gameFieldSize.width - boxSize;
  box.setAttribute('data-box', 'true');
  box.style.cursor = 'pointer';
  box.style.position = 'absolute';
  box.style.border = '1px solid #000000'; // box.style.borderRadius = '50%';

  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.width = box.style.height = boxSize + 'px';
  box.style.backgroundColor = '#000000'; // box.style.backgroundColor = 'rgb(' + getRandomRGBColor() + ')'

  box.style.backgroundColor = getRandomRGBColor();
  $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomRGBColor() {
  var rgb_R = getRandom(0, 255);
  var rgb_G = getRandom(0, 255);
  var rgb_B = getRandom(0, 255); // return rgb_R + ',' + rgb_G + ',' + rgb_B;

  return 'rgb(' + rgb_R + ',' + rgb_G + ',' + rgb_B + ')';
}