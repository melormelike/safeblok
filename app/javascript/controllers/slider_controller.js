
import { Controller } from "stimulus";
export default class extends Controller {
  connect() {

  }
}

console.log('hey yo');
let mainContent = document.querySelector('#main_content');
let secondaryContent = document.querySelector('#secondary_content');
let slider = document.querySelector('.switch span');

// document.querySelector('#index-toggle').addEventListener('change', e => {
//   mainContent.style.display = e.target.checked ? 'block' : 'none';
//   secondaryContent.style.display = e.target.checked ? 'none' : 'block';
// });

document.querySelector('#optionone').addEventListener('click', e => {
  mainContent.style.display = e.target.checked ? 'block' : 'none';
  secondaryContent.style.display = e.target.checked ? 'none' : 'block';
  slider.classList.remove('right');
});

document.querySelector('#optiontwo').addEventListener('click', e => {
  mainContent.style.display = e.target.checked ? 'none' : 'block';
  secondaryContent.style.display = e.target.checked ? 'block' : 'none';
  slider.classList.add('right');
});


// document.querySelectorAll('.switch label').forEach((label) =>  {
//   label.addEventListener("click", (event) => {
//     console.log(event.currentTarget)
//   });

// })
// $('.switch label').on('click', function(){
//   var indicator = $(this).parent('.switch').find('span');
//   if ( $(this).hasClass('right') ){
// 		$(indicator).addClass('right');
//   } else {
//     $(indicator).removeClass('right');
//   }
// });
