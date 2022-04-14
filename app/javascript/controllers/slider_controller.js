import { Controller } from "stimulus";
export default class extends Controller {
  connect() {
    let mainContent = document.querySelector("#main_content");
    let secondaryContent = document.querySelector("#secondary_content");
    let slider = document.querySelector(".switch span");

    document.querySelector("#optionone").addEventListener("click", (e) => {
      mainContent.style.display = e.target.checked ? "block" : "none";
      secondaryContent.style.display = e.target.checked ? "none" : "block";
      slider.classList.remove("right");
    });

    document.querySelector("#optiontwo").addEventListener("click", (e) => {
      mainContent.style.display = e.target.checked ? "none" : "block";
      secondaryContent.style.display = e.target.checked ? "block" : "none";
      slider.classList.add("right");
    });
  }
}
