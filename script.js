'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

const geolocationSuccess = function (position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  const coords = [latitude, longitude];

  const mapZoom = 13;
  map = L.map('map').setView(coords, mapZoom);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.on('click', handleMapClicks);
};

const handleMapClicks = function (mapE) {
  mapEvent = mapE;
  form.classList.remove('hidden');
  inputDistance.focus();
};

const clearInputFields = function () {
  inputCadence.value = '';
  inputDistance.value = '';
  inputDuration.value = '';
  inputElevation.value = '';
};

const displayMarker = function (event) {
  event.preventDefault();
  clearInputFields();
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
};

const geolocationError = function () {
  alert('Could not get your position');
};

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    geolocationSuccess,
    geolocationError
  );

form.addEventListener('submit', displayMarker);

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  clearInputFields();
});
