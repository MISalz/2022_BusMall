'use strict';

let attempts = 25;
let allItems = [];

let content = document.getElementById('container');
let option1 = document.getElementById('bm1');
let option2 = document.getElementById('bm2');
let option3 = document.getElementById('bm3');
let resultsContent = document.getElementById('resultsContainer');
let resultsBtn = document.getElementById('results-btn');
let results = document.getElementById('results');
const ctx = document.getElementById('myChart').getContext('2d');


function catalog(name, fileExtention = 'jpg') {
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
new catalog('pet-sweep');
new catalog('scissors');
new catalog('shark');
new catalog('sweep', 'png');
new catalog('tauntaun');
new catalog('unicorn');
new catalog('water-can');
new catalog('wine-glass');

function randomizer() {
  return Math.floor(Math.random() * allItems.length);
}

function renderImgs() {
  let productOne = randomizer();
  let productTwo = randomizer();
  let productThree = randomizer();

  while (productOne === productTwo || productTwo === productThree || productThree === productOne) {
    productTwo = randomizer();
    productThree = randomizer();
  }

  option1.src = allItems[productOne].src;
  option1.alt = allItems[productOne].name;
  allItems[productOne].view++;

  option2.src = allItems[productTwo].src;
  option2.alt = allItems[productTwo].name;
  allItems[productTwo].view++;

  option3.src = allItems[productThree].src;
  option3.alt = allItems[productThree].name;
  allItems[productThree].view++;
}

renderImgs();


function handleClick(event) {
  attempts--;

  let imgClicked = event.target.alt;

  for (let i = 0; i < allItems.length; i++) {
    if (imgClicked === allItems[i].name) {
      allItems[i].clicks++;
    }
  }

  renderImgs();

  if (attempts === 0) {
    content.removeEventListener('click', handleClick);
    //calls my chart function once voting has ended
    renderChart();
  }
}

// function handleShowResults() {

//   if (attempts === 0) {
//     for (let i = 0; i < allItems.length; i++) {
//       let li = document.createElement('li');
//       li.textContent = `${allItems[i].name} was viewed ${allItems[i].view} times, and was voted for ${allItems[i].clicks} times.`;
//       results.appendChild(li);
//     }
//   }
// }

function renderChart() {
  // array for all names in chart
  let items = []
  let itemClicks = []
  let itemViews = []
  for (let i = 0; i < allItems.length; i++) {
    items.push(allItems[i].name);
    itemClicks.push(allItems[i].clicks);
    itemViews.push(allItems[i].view);
  }
  

  let chartObject = {
    type: 'bar',
    data: {
      labels: items,
      datasets: [{
        label: '# of Views',
        data: itemViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: itemClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  new Chart(ctx, chartObject);
}
content.addEventListener('click', handleClick);

// resultsBtn.addEventListener('click', handleShowResults);


