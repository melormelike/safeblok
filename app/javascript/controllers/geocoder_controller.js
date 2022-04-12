import { Controller } from "@hotwired/stimulus"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {
  static values = { apiKey: String }

  static targets = ["address"]

  connect() {
    this.geocoder = new MapboxGeocoder({
      accessToken: this.apiKeyValue,
      types: "country,region,place,postcode,locality,neighborhood,address,district,poi",
      placeholder: this.addressTarget.value,
      bbox: [114.316311,-8.900893,115.736602,-7.998758], // Boundary for Bali
      proximity: {
        longitude: 115.028229,
        latitude: -8.451997
      }

      //defaultValue: "address"
    });
    //console.log(this.element)
    //this.element.innerHTML = this.addressTarget.value
    this.geocoder.addTo(this.element)

    this.geocoder.on("result", event => this.#setInputValue(event))
    this.geocoder.on("clear", () => this.#clearInputValue())
  }

  #setInputValue(event) {
    this.addressTarget.value = event.result["place_name"]
  }

  #clearInputValue() {
    this.addressTarget.value = ""
  }
}
