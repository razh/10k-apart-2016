/* eslint-env es6, browser */

const $ = document.querySelector.bind(document);

const svgContainer = $('.js-svg-container');

$('.js-svg-textarea')
  .addEventListener('input', (event) => {
    svgContainer.innerHTML = event.target.value;
  });
