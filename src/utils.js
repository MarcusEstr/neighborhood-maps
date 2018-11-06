/* load_google_maps function via RyanWaite: https://github.com/ryanwaite28/script-store/blob/master/js/react_resolve_google_maps.js */

export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    }
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = 'AIzaSyAjhXB8E18pbk1cW3EpcC5HbCjMr5bowmU';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export function load_places() {
  let city = 'Santa Ana, CA';
  let query = 'Restaurant';
  let clientid = 'QSJC4DUQ42XJJ4VZU05A5BMAYR50MFE0MABEEMJRET4UNNGG';
  let clientsecret = 'H0RTLAEVSZXUFEKELIDQHM5PCS3CSKU5IE1WYKI5YVT1L1SF';
  var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=' + clientid + '&client_secret=' + clientsecret + '&v=20130815%20&limit=50&near=' + city + '&query=' + query + '';
  return fetch(apiURL).then(resp => resp.json())
}