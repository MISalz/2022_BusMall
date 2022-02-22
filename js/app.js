'use strict';

let attempts = 5;
let allItems = [];

let content = document.getElementById('containers');
let option1 = document.getElementById('bm1');
let option2 = document.getElementById('bm2');
let option3 = document.getElementById('bm3');
let resultsBtn = document.getElementById('results-btn');
let results = document.getElementById('results');


function catalog(name, fileExtention = 'jpg'){
  this.name = name;
  this.view = 0;
  this.clicks = 0;
  this.src = `img/${name}.${fileExtention}`
  allItems.push(this);
}

new item('bag');
new item('banana');
new item('bathroom');
new item('boots');
new item('breakfast');
new item('bubblegum');
new item('chair');
new item('cthulhu');
new item('dog-duck');
new item('dragon');
new item('pen');
new item('pen');
new item('pet-sweep');
new item('scissors');
new item('shark');
new item('sweep', 'png');
new item('tauntaun');
new item('unicorn');
new item('water-can');
new item('wine-glass');

function randomizer(){
  return Math.floor(Math.random() * catalog.length);
}

function renderImgs(){
  let productOne = getRandomIndex();
  let productTwo = getRandomIndex();
  let productThree = getRandomIndex();



  while (productOne === productTwo === productThree){
    productTwo = getRandomIndex();
    productThree = getRandomIndex();
  }

  imgOne.src = allItems[productOne].src;
  imgOne.alt = allItems[productOne].name;
  allItems[productOne].views++;

  imgTwo.src = allItems[productTwo].src;
  imgTwo.alt = allItems[productTwo].name;
  allItems[productTwo].views++;

  imgThree.src = allItems[productThree].src;
  imgThree.alt = allItems[productThree].name;
  allItems[productThree].views++;
}

renderImgs();


function handleClick(event){
  attempts--;

  let imgClicked = event.target.alt;

  for (let i = 0; i < allItems.length; i++){
    if (imgClicked === allItems[i].name) {
      allItems[i].clicks++;
    }
  }

  renderImgs();

  if (attempts === 0){
    content.removeEventListener('click', handleClick);
  }
}

function handleShowResults(event){

  if (attempts === 0){
    for (let i = 0; i < allItems.length; i++){
      let li = document.createElement('li');
      li.textContent = `${allItems[i].name} was viewed ${allItems[i].views} times, and was voted for ${allItems[i].clicks} times.`;
      results.appendChild(li);
    }
  }
}

content.addEventListener('click', handleClick);

resultsBtn.addEventListener('click', handleShowResults);