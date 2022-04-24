import { Controller } from "@hotwired/stimulus";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array,
  };

  connect() {
    mapboxgl.accessToken = this.apiKeyValue;

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/gundogdumel/cl1k62p6j005916t2hkzd4n4y",
    });

    this.#addClustersToMap();
    // this.#addMarkersToMap()
    this.#fitMapToMarkers();

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        bbox: [114.316311, -8.900893, 115.736602, -7.998758], // Boundary for Bali
        proximity: {
          longitude: 115.028229,
          latitude: -8.451997,
        },
      })
    );
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup({
        className: "popups",
        anchor: "bottom",
      }).setHTML(marker.info_window);
      // custom marker
      // const customMarker = document.createElement("div")
      // customMarker.className = "marker"
      // customMarker.style.backgroundImage = `url('${marker.image_url}')`
      // customMarker.style.backgroundSize = "contain"
      // customMarker.style.width = "25px"
      // customMarker.style.height = "25px"
      // new marker
      new mapboxgl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(this.map);
    });
  }

  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds();
    this.markersValue.forEach((marker) =>
      bounds.extend([marker.lng, marker.lat])
    );
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 2000 });
  }

  #addClustersToMap() {
    // function toArray(el) {
    //   console.log(el)
    //   return el[lat], el[lng]
    // }

    this.map.on("load", () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      function convertMarkers(marker) {
        return {
          properties: marker,
          geometry: {
            coordinates: [marker.lng, marker.lat],
          },
        };
      }

      const markersArray = this.markersValue.map(convertMarkers);

      this.map.addSource("incidents", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ incidents
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        // data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
        data: {
          type: "FeatureCollection",
          features: markersArray,
        },
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      });

      this.map.addLayer({
        id: "clusters",
        type: "circle",
        source: "incidents",
        filter: ["has", "point_count"],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#F7CBA1",
            3,
            "#F09D51",
            10,
            "#F06543",
          ],
          "circle-radius": ["step", ["get", "point_count"], 20, 3, 25, 10, 30],
        },
      });

      this.map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "incidents",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 14,
        },
      });

      this.map.loadImage(
        "https://cdn-icons-png.flaticon.com/512/6725/6725430.png",
        (err, img) => {
          this.map.addImage("custom-marker", img);
        }
      );

      this.map.addLayer({
        id: "unclustered-point",
        type: "symbol", //'symbol',
        source: "incidents",
        filter: ["!", ["has", "point_count"]],
        layout: {
          "icon-image": "custom-marker",
          "icon-size": 0.075,
        },
        // 'paint': {
        //   'icon-opacity': [
        //     'interpolate',
        //     ['linear'],
        //     ['date'],
        //     0,
        //     0.3,
        //     6,
        //     1
        //   ]
        // }
      });

      // inspect a cluster on click
      this.map.on("click", "clusters", (e) => {
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        this.map
          .getSource("incidents")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            this.map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      this.map.on("click", "unclustered-point", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        // console.log(e.features[0].properties);
        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // const popup = new mapboxgl.Popup({ className: 'popups', anchor: "bottom"}).setHTML(marker.info_window)
        new mapboxgl.Popup({ className: "popups", anchor: "bottom" })
          .setLngLat(coordinates)
          .setHTML(e.features[0].properties.info_window)
          .addTo(this.map);
      });

      this.map.on("mouseenter", "clusters", () => {
        this.map.getCanvas().style.cursor = "pointer";
      });
      this.map.on("mouseleave", "clusters", () => {
        this.map.getCanvas().style.cursor = "";
      });
    });
  }
}
