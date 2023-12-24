// Initial settings
let sessionMin = 0;
let sessionMax = 300;
const rangeMin = 1;
const range = document.querySelector('.range-selected');
const rangeInput = document.querySelectorAll('.range-input input');

rangeInput.forEach((input) => {
  input.addEventListener('input', (e) => {
      let minRange = parseInt(rangeInput[0].value);
      let maxRange = parseInt(rangeInput[1].value);
      if (maxRange - minRange < rangeMin) {     
          if (e.target.className === 'min') {
              rangeInput[0].value = maxRange - rangeMin;        
          } else {
              rangeInput[1].value = minRange + rangeMin;        
          }
      } else {
          range.style.left = (minRange / rangeInput[0].max) * 100 + '%';
          range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + '%';
      }
  });
});

// Listen for slider changes
d3.select('#session-min-slider').on('input', function() {
  sessionMin = +this.value;
  if (sessionMin < sessionMax) {
      d3.select('#slider-min-value').text(sessionMin);
  };
  ['g', 'rect', 'image', 'text'].forEach(item => {
      matrix_svg.selectAll(item).remove();
  });
  renderMatrix(data.filter(d => d.session >= sessionMin && d.session <= sessionMax));
});
d3.select('#session-max-slider').on('input', function() {
  sessionMax = +this.value;
  if (sessionMin < sessionMax) {
      d3.select('#slider-max-value').text(sessionMax);
  };
  ['g', 'rect', 'image', 'text'].forEach(item => {
      matrix_svg.selectAll(item).remove();
  });
  renderMatrix(data.filter(d => d.session >= sessionMin && d.session <= sessionMax));
});