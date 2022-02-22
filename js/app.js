'use strict';

let attempts = 15;
let allItems = [];

let content = document.getElementById('container');
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

new catalog('bag');
new catalog('banana');
new catalog('bathroom');
new catalog('boots');
new catalog('breakfast');
new catalog('bubblegum');
new catalog('chair');
new catalog('cthulhu');
new catalog('dog-duck');
new catalog('dragon');
new catalog('pen');
new catalog('pen');
new catalog('pet-sweep');
new catalog('scissors');
new catalog('shark');
new catalog('sweep', 'png');
new catalog('tauntaun');
new catalog('unicorn');
new catalog('water-can');
new catalog('wine-glass');

function randomizer(){
  return Math.floor(Math.random()* allItems.length);
}

function renderImgs(){
  let productOne = randomizer();
  let productTwo = randomizer();
  let productThree = randomizer();

  while (productOne === productTwo === productThree){
    productTwo = randomizer();
    productThree = randomizer();
  }

  option1.src = allItems[productOne].src;
  option1.alt = allItems[productOne].name;
  allItems[productOne].views++;

  option2.src = allItems[productTwo].src;
  option2.alt = allItems[productTwo].name;
  allItems[productTwo].views++;

  option3.src = allItems[productThree].src;
  option3.alt = allItems[productThree].name;
  allItems[productThree].views++;
}

renderImgs();


function handleClick(event){
  attempts--;

  let imgClicked = event.target.alt;

  for(let i = 0; i < allItems.length; i++){
    if(imgClicked === allItems[i].name) {
      allItems[i].clicks++;
    }
  }

  renderImgs();

  if(attempts === 0){
    content.removeEventListener('click', handleClick);
  }
}

function handleShowResults(event){

  if(attempts === 0){
    for(let i = 0; i < allItems.length; i++){
      let li = document.createElement('li');
      li.textContent = `${allItems[i].name} was viewed ${allItems[i].views} times, and was voted for ${allItems[i].clicks} times.`;
      results.appendChild(li);
    }
  }
}

content.addEventListener('click', handleClick);

resultsBtn.addEventListener('click', handleShowResults);