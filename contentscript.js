//main script
var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

document.addEventListener('yourCustomEvent', function (e) {
  var data = e.detail;
  if(data != null && data[2] == '0'){
    const regex = /-?\d+\.\d+/g;
    const matches = data.match(regex);
    const [lat, long] = matches.slice(0, 2);


chrome.runtime.sendMessage({ type: 'reverseGeocode', lat, long }, function (response) {
      if (response && response.error) {
        console.error('Error:', response.error);
      }
    });
}
});

