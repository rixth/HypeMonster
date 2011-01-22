$(function () {
  var backgroundPage = chrome.extension.getBackgroundPage(),
      state = backgroundPage.state,
      audioElement = backgroundPage.audioElement;
  
  $('body').bind('trackDataLoaded', function (event, data) {
    var trackList = $('#trackList');
    trackList.empty();

    if (data.hasPrevPage) {
      trackList.append($('<li class="prevPage">Previous page</li>'));
    }
    
    data.tracks.forEach(function (track) {
      var listItem = $('<li>' + track.song + ' - ' + track.artist + '</li>');
      listItem.data('track', track);
      if (state.currentTrackId && state.currentTrackId === track.id) {
        listItem.addClass('selected');
      }
      trackList.append(listItem);
    });

    if (data.hasNextPage) {
      trackList.append($('<li class="nextPage">Next page</li>'));
    }
    
    $('#viewport').get(0).scrollByPages(-100);
  });
  
  $('#trackList>li').live('click', function () {
    var trackData = $(this).data('track');
    if (trackData) {
      $('#player').trigger('playTrack', [trackData, this]);
    }
  });
  
  $('#player').live('playTrack', function (event, track, node) {
    if (node) {
      $(node).parent().find('li').removeClass('selected');
      $(node).addClass('selected');
    }
  });
  
  // audioElement.
})