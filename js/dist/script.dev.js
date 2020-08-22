"use strict";

var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
$start.addEventListener('click', startGame);

function startGame() {
  $start.classList.add('hide');
  $game.classList.add('show');
  renderBox();
}

function renderBox() {
  var box = document.createElement('div');
  box.style.height = box.style.width = '50px';
  box.style.position = 'absolute';
  box.style.backgroundColor = '#000000';
  $game.insertAdjacentElement('afterbegin', box);
}