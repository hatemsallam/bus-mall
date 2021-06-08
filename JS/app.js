'use strict'


let leftImageElement = document.getElementById('left-image');
let rightImageElement = document.getElementById('right-image');
let middleImageElement = document.getElementById('middle-image')




let maxAttempts = 25;
let userAttemptsCounter = 0;


let leftImageIndex;


let rightImageIndex;

let middleImageIndex;


let productNames = [];
let votes = [];
let timesShown = [];

function Product(name, source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.timesShown = 0;
  productNames.push(this.name);

  Product.allProducts.push(this);
}



Product.allProducts = [];


new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg')
new Product('pen', 'img/pen.jpg')
new Product('pet-sweep', 'img/pet-sweep.jpg')
new Product('scissors', 'img/scissors.jpg')
new Product('shark', 'img/shark.jpg')
new Product('sweep', 'img/sweep.png')
new Product('tauntaun', 'img/tauntaun.jpg')
new Product('unicorn', 'img/unicorn.jpg')
new Product('usb', 'img/usb.gif')
new Product('water-can', 'img/water-can.jpg')
new Product('wine-glass', 'img/wine-glass.jpg')








function generateRandomIndex() {

  return Math.floor(Math.random() * Product.allProducts.length);
}




function renderThreeImages() {

  leftImageIndex = generateRandomIndex();
  middleImageIndex = generateRandomIndex();
  rightImageIndex = generateRandomIndex();


  

  let threeImages = [];
  while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex || threeImages.includes(leftImageIndex) || threeImages.includes(rightImageIndex) || threeImages.includes(middleImageIndex)) {

    rightImageIndex = generateRandomIndex();
    middleImageIndex = generateRandomIndex();
    leftImageIndex = generateRandomIndex();

  }

  threeImages.push(leftImageIndex, middleImageIndex, rightImageIndex)
  console.log(threeImages)
  

  leftImageElement.src = Product.allProducts[leftImageIndex].source;

  rightImageElement.src = Product.allProducts[rightImageIndex].source;

  middleImageElement.src = Product.allProducts[middleImageIndex].source;

  Product.allProducts[leftImageIndex].timesShown++
  Product.allProducts[middleImageIndex].timesShown++
  Product.allProducts[rightImageIndex].timesShown++

}
renderThreeImages();

// add event listner
// container

let container = document.getElementById('images-div');
container.addEventListener('click', handleUserClick);



function handleUserClick(event) {

  // console.log(event.target.id);


  userAttemptsCounter++;


  if (userAttemptsCounter <= maxAttempts) {


    if (event.target.id === 'left-image') {


      Product.allProducts[leftImageIndex].votes++

    } else if (event.target.id === 'right-image') {
      Product.allProducts[rightImageIndex].votes++
    } else {
      Product.allProducts[middleImageIndex].votes++

    }


    renderThreeImages()


  } else {
    let button = document.getElementById('button');
    button.addEventListener('click', viewResults);

    function viewResults(event) {
      let list = document.getElementById('results-list');
      for (let i = 0; i < Product.allProducts.length; i++) {
        let productResult = document.createElement('li');

        list.append(productResult);

        productResult.textContent = `${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes and ${Product.allProducts[i].timesShown} times shown`;

      }

    }
    container.removeEventListener('click', handleUserClick);

    for (let i = 0; i < Product.allProducts.length; i++) {

      votes.push(Product.allProducts[i].votes);
      timesShown.push(Product.allProducts[i].timesShown);
      updateStorage();
    }


    chart();
  }

}




function updateStorage() {
  console.log(Product.allProducts); 
  
  let arrayString=JSON.stringify(Product.allProducts);
 

  localStorage.setItem('product',arrayString);
}




function getProducts() {

  let data=localStorage.getItem('product');
  

 
  let productData=JSON.parse(data);
 

  
  if (productData!==null) {   
    Product.allProducts=productData;
  }

 

}

getProducts();




function chart() {
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: votes,
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
        label: '# of Shown',
        data: timesShown,
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
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}



