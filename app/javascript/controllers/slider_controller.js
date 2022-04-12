
import { Controller } from "stimulus";
export default class extends Controller {
  connect() {

  }
}

console.log('hey yo');
let mainContent = document.querySelector('#main_content');
let secondaryContent = document.querySelector('#secondary_content');

document.querySelector('#index-toggle').addEventListener('change', e => {
  mainContent.style.display = e.target.checked ? 'block' : 'none';
  secondaryContent.style.display = e.target.checked ? 'none' : 'block';
});
