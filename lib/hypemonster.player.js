(function () {
  var audio = new Audio();
  $('#player').live('playTrack', function (event, track) {
    audio.pause();
    audio.src = 'http://hypem.com/serve/f/509/' + track.id + '/' + track.key;
    audio.play();
  }); 
}());