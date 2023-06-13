// Code goes here!
import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address") as HTMLInputElement;

// Add you own GOOGLE MAP API KEY HERE
const GOOGLE_API_KEY = "ABCDEFGHIJKLMNOPQRSTUVWXYZabc";
// const GOOGLE_URL_LINK =
//   "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=";

declare var google: any;

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // Send it to Google API
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      if (response.data.status !== "OK") {
        throw new Error("Counld not fetch location!");
      }
      const coordinates = response.data.results[0].geometry.location;

      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: coordinates,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.HYBRID,
        }
      );

      const marker = new google.maps.Marker({
        position: coordinates,
        map: map,
      });

      // Zoom to 9 when clicking on marker
      google.maps.event.addListener(marker, "click", function () {
        map.setZoom(16);
        map.setCenter(marker.getPosition());
      });
    })
    .catch((error) => {
      alert(error.message);
      console.log(error);
    });
}

form.addEventListener("submit", searchAddressHandler);
