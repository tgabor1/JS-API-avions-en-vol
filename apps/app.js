let latitude;
let longitude;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(posUsers);
} else {
    document.getElementById("demo").innerHTML =
    "Geolocation is not supported by this browser.";
}


function posUsers(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => sky(data, latitude, longitude));
}


function distance(lat1, lat2, lon1, lon2) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  let r = 6371;

  return c * r;
}




function sky(data, latitude, longitude) {
  let states = data.states;
  let tableData = "";
  let tabHtml = document.querySelector("#tabprod");

  states.forEach((state) => {
    let latitudeAvion = state[6];
    let longituteAvion = state[5];
    let calcule = distance(latitude, latitudeAvion, longitude, longituteAvion);

    if (calcule < 50) {
      tableData += `<tr>
              <td>${state[0]}</td>
              <td>${state[1]}</td>
              <td>${state[2]}</td>
              <td>${state[3]}</td>
              <td>${state[5]}</td>
              <td>${state[6]}</td>
              <td>${state[9]}</td>
              <td></td>
              </tr>`;
    }
  });
  tabHtml.innerHTML = tableData;
}




