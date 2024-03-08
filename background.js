chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.type === 'reverseGeocode') {
    const { lat, long } = request;
    calc(lat, long);
    sendResponse({ success: true });
    return
  }
  });


function calc(lat, long) {
    const input = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`;

    fetch(input)
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
      const { continent, countryName, principalSubdivision, city, locality, latitude, longitude } = data;
      const geocodeData = { continent, countryName, principalSubdivision, city, locality, latitude, longitude };
      chrome.storage.local.set({ 'geocodeData': geocodeData }, function() {
        console.log('Reverse geocoding data saved to Chrome storage');
      });
    })
    .catch(error => {
        // Handle any errors
        console.error('There was a problem with the fetch operation:', error);
    });
  }
  