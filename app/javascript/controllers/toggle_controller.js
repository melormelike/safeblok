import { Controller } from "stimulus";
export default class extends Controller {
  static targets = ["span"];

  connect() {
  }

  switchTab(event) {
    console.log(event)
  }
}
