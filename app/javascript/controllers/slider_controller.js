import { Controller } from "stimulus";
export default class extends Controller {
  connect() {
    console.log("hey yo");
    let mainContent = document.querySelector("#main_content");
    let secondaryContent = document.querySelector("#secondary_content");
    let slider = document.querySelector(".switch span");

    document.querySelector("#optionone").addEventListener("click", (e) => {
      // mainContent.style.display = e.target.checked ? 'block' : 'none';
      // secondaryContent.style.display = e.target.checked ? 'none' : 'block';
      mainContent.classList.remove("d-none");
      secondaryContent.classList.add("d-none");
      slider.classList.remove("right");
    });

    document.querySelector("#optiontwo").addEventListener("click", (e) => {
      // mainContent.style.display = e.target.checked ? 'none' : 'block';
      // secondaryContent.style.display = e.target.checked ? 'block' : 'none';
      mainContent.classList.add("d-none");
      secondaryContent.classList.remove("d-none");
      slider.classList.add("right");
    });
  }
}
