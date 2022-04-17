// import { Controller } from "stimulus";
// export default class extends Controller {
//   connect() {
//     console.log("Connected")
//   }

//   switchTab(event) {
//     // const mainContent = document.getElementById('main_content')
//     // const secondaryContent = document.getElementById('secondary_content')
//     // const slider = document.getElementById('toggle-slider')

//     // console.log(mainContent, secondaryContent, slider)
//     // const url = `${this.formTarget.action}?query=${this.inputCategoryTarget.value}&date=${this.inputDateTarget.value}&time=${this.inputTimeTarget.value}&level=${this.inputLevelTarget.value}&list=${listButtonActive}&calendar=${calendarButtonActive}`

//     const url = `${window.location.origin}${event.currentTarget.getAttribute('href')}?tab=${event.currentTarget.id}`
//     console.log(url)

//     fetch(url, { headers: { "Accept": "text/plain" } })
//       .then(response => response.json)
//       .then((data) => {
//         this.viewTarget.outerHTML = data
//       }
//     )


//     // if(event.currentTarget.id === "map-tab" ) {
//     //   mainContent.classList.remove("d-none")
//     //   secondaryContent.classList.add("d-none")
//     //   slider.classList.remove("right");
//     // } else if(event.currentTarget.id === "stats-tab") {
//     //   mainContent.classList.add("d-none");
//     //   secondaryContent.classList.remove("d-none");
//     //   slider.classList.add("right");
//     // }
//   }
// }
