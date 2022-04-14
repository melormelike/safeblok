import { Controller } from "stimulus";
export default class extends Controller {
  static targets = ["span"];

  connect() {
    console.log("Hello from toggle.js")
  }

  switchTab() {
    console.log("click")
  }
}
