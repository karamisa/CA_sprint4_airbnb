const API_KEY = 'AIzaSyDtEZPZQVhbBbBXB3F9H93wLdqeTBr9dF0'
export const mapService = {
  //   initMap,
  //   addMarker,
  //   panTo,
  getLocationName,
  getLocationCoords,
  connectGoogleApi,
}

// Var that is used throughout this Module (not global)
var gMap
var gMarker

// function initMap(elMap, lat = 32.0749831, lng = 34.9120554) {
//   console.log('InitMap')
//   return _connectGoogleApi().then(() => {
//     console.log('google available')
//     gMap = new google.maps.Map(elMap, {
//       center: { lat, lng },
//       zoom: 15,
//     })
//     gMarker = new google.maps.Marker({
//       position: { lat, lng },
//       gMap,
//       title: 'click to zoom',
//     })
//     return gMap
//   })
// }

// function addMarker(loc) {
//   var marker = new google.maps.Marker({
//     position: loc,
//     map: gMap,
//     icon: 'https://img.icons8.com/ios-glyphs/32/cat-head.png',
//     title: 'Hello World!',
//   })
//   return marker
// }

// function panTo(lat, lng) {
//   var laLatLng = new google.maps.LatLng(lat, lng)
//   gMap.panTo(laLatLng)
// }

function connectGoogleApi() {
  if (window.google) return Promise.resolve()

  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}

function getLocationName(lat, lng) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
  )
    .then((value) => value.json())
    .then((res) => res.results[0].formatted_address)
}

function getLocationCoords(locationName) {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${API_KEY}`
  )
    .then((value) => value.json())
    .then((res) => res.results[0].geometry.location)
}
