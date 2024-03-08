chrome.storage.local.get('geocodeData', function(data) {
    if (data.geocodeData) {
      const { continent, countryName, principalSubdivision, city, locality, latitude, longitude } = data.geocodeData;
      document.getElementById('continent').textContent = continent;
      document.getElementById('country').textContent = countryName;
      document.getElementById('state').textContent = principalSubdivision;
      document.getElementById('city').textContent = city;
      document.getElementById('locality').textContent = locality;
      document.getElementById('latitude').textContent = latitude;
      document.getElementById('longitude').textContent = longitude;

      const mapLink = `https://www.google.com/maps/@${latitude},${longitude},15z?entry=ttu&q=${latitude},${longitude}&z=15&t=m`;
      
      document.getElementById('mapLink').setAttribute('href', mapLink);
    } else {
      console.log('No reverse geocoding data found in Chrome storage');
    }
  });
