import { Controller } from "stimulus";
export default class extends Controller {
  static targets = ["span"];

  connect() {
    console.log("hey")
  }

  switchTab(event) {
    console.log(event.currentTarget.id)
    const mainContent = document.getElementById('main_content')
    const secondaryContent = document.getElementById('secondary_content')
    const slider = document.getElementById('toggle-slider')

    if(event.currentTarget.id === "map-tab" ) {
      mainContent.classList.remove("d-none")
      secondaryContent.classList.add("d-none")
      slider.classList.remove("right");
    } else if(event.currentTarget.id === "stats-tab") {
      mainContent.classList.add("d-none");
      secondaryContent.classList.remove("d-none");
      slider.classList.add("right");
    }
  }
}
