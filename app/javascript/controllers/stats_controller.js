// Visit The Stimulus Handbook for more details
// https://stimulusjs.org/handbook/introduction
//
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["time", "date", "location"];

  connect() {
    this.#timeChart();
    this.#dateChart();
    this.#locationChart();
  }

  #locationChart() {
    function grabInnerText(x) {
      return x.innerText;
    }

    let arrLocationKey = Array.from(
      document.querySelectorAll(".card-incident-location-key")
    );
    let locationKey = arrLocationKey.map(grabInnerText);
    let arrLocationValue = Array.from(
      document.querySelectorAll(".card-incident-location-value")
    );
    let locationValue = arrLocationValue.map(grabInnerText);

    const labels2 = locationKey;

    const data2 = {
      labels: labels2,
      datasets: [
        {
          label: "Incidents per location",
          backgroundColor: ["#F06543", "#F09D51", "#F7CBA1"],
          borderColor: ["rgb(255, 99, 132)", "blue"],
          data: locationValue,
        },
      ],
    };

    const config2 = {
      type: "bar",
      data: data2,
      options: {
        indexAxis: "y",
        scales: {
          y: {
            grid: {
              drawBorder: false,
              color: "#0023660a",
            },
          },
          x: {
            grid: {
              drawBorder: false,
              color: "#0023660a",
            },
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Incidents per location",
            color: "#002366",
            font: {
              family: "Montserrat",
              size: 16,
              lineHeight: 1.2,
            },
            padding: { top: 0, left: 0, right: 0, bottom: 25 },
          },
        },
      },
    };
    const locationChart = new Chart(
      document.getElementById("locationChart"),
      config2
    );
  }

  #timeChart() {
    function compare(a, b) {
      return a[0] - b[0];
    }

    function grabInnerText(x) {
      return x.innerText;
    }

    let arrTimeKey = Array.from(
      document.querySelectorAll(".card-incident-time-key")
    );
    let timeKey = arrTimeKey.map(grabInnerText).map((x) => parseInt(x));
    let arrTimeValue = Array.from(
      document.querySelectorAll(".card-incident-time-value")
    );
    let timeValue = arrTimeValue.map(grabInnerText);

    let result = timeKey
      .map(function (value, index) {
        return [timeKey[index], timeValue[index]];
      })
      .sort(compare);

    timeKey = result.map((array) => array[0]);
    timeValue = result.map((array) => array[1]);

    const labels3 = timeKey;

    const data3 = {
      labels: labels3,
      datasets: [
        {
          label: "Incidents per time of the day",
          backgroundColor: ["#758ECD"],
          borderColor: ["#758ECD"],
          data: timeValue,
        },
      ],
    };

    const config3 = {
      type: "line",
      data: data3,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
            grid: {
              drawBorder: false,
              color: "#0023660a",
            },
          },
          x: {
            grid: {
              drawBorder: false,
              color: "#0023660a",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Incidents per time",
            color: "#002366",
            font: {
              family: "Montserrat",
              size: 16,
              lineHeight: 1.2,
            },
            padding: { top: 0, left: 0, right: 0, bottom: 25 },
          },
        },
      },
    };

    const timeChart = new Chart(this.timeTarget, config3);
  }

  #dateChart() {
    function grabInnerText(x) {
      return x.innerText;
    }

    let arrDateKey = Array.from(
      document.querySelectorAll(".card-incident-date-key")
    );
    let dateKey = arrDateKey
      .map(grabInnerText)
      .map((x) => x.split("-")[1] + "/" + x.split("-")[2]);
    let arrDateValue = Array.from(
      document.querySelectorAll(".card-incident-date-value")
    );
    let dateValue = arrDateValue.map(grabInnerText);

    let resultDate = dateKey
      .map(function (value, index) {
        return [dateKey[index], dateValue[index]];
      })
      .sort();

    dateKey = resultDate.map((array) => array[0]);
    dateValue = resultDate.map((array) => array[1]);

    const labels4 = dateKey;

    const data4 = {
      labels: labels4,
      datasets: [
        {
          label: "Incidents",
          backgroundColor: ["#32A287"],
          borderColor: ["#32A287"],
          data: dateValue,
        },
      ],
    };

    const config4 = {
      type: "line",
      data: data4,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
            grid: {
              drawBorder: false,
              color: "#0023660a",
            },
          },
          x: {
            grid: {
              drawBorder: false,
              color: "#0023660a",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Incidents per date",
            color: "#002366",
            font: {
              family: "Montserrat",
              size: 16,
              lineHeight: 1.2,
            },
            padding: { top: 0, left: 0, right: 0, bottom: 25 },
          },
        },
      },
    };

    const dateChart = new Chart(document.getElementById("dateChart"), config4);
  }
}
