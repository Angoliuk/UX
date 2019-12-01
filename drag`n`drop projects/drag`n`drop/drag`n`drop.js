let fruits = document.querySelectorAll('.draggable-fruit');
let baskets = document.querySelectorAll('.basket');
let current;

fruits.forEach(function(fruits) {
  fruits.addEventListener('dragstart', function() {
    current = this;
  });
});

baskets.forEach(function(baskets) {

  baskets.addEventListener('dragover', function(event) {
    event.preventDefault();
  });

  baskets.addEventListener('drop', function() {
    baskets.appendChild(current);
  });
})