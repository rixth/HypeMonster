(function () {
  var backgroundPage = chrome.extension.getBackgroundPage(),
      state = backgroundPage.state,
      audio = backgroundPage.audioElement,
      drawers = {};
      
  $('#player').live('playTrack', function (event, track) {
    audio.pause();
    audio.src = 'http://hypem.com/serve/f/509/' + track.id + '/' + track.key;
    audio.play();
    drawers.playButton();
  });
  
  drawers.playButton = (function () {
    $('#player .control.play').attr('src', audio.paused ? '../img/play.png' : '../img/pause.png');
    return arguments.callee;
  }())
  
  $('#player .control.play').live('click', function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    drawers.playButton();
  });
  
  $('#player .control.rewind').live('click', function () {
    audio.currentTime = 0;
  })
  
  $('#progress').live('click', function (event) {
    audio.currentTime = Math.round(event.layerX / $('#progress').width() * audio.duration);
  });
  
  $(audio).bind('timeupdate', function () {
    $('#progress>div').css({
      width: (audio.currentTime / audio.duration * 100) + '%'
    })
  });
}());