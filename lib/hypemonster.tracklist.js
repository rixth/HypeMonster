$(function () {
  $('body').bind('trackDataLoaded', function (event, data) {
    // Render track list
    var trackList = $('#trackList');
    trackList.empty();

    if (data.hasPrevPage) {
      trackList.append($('<li class="prevPage">Previous page</li>'));
    }
    
    data.tracks.forEach(function (track) {
      var listItem = $('<li>' + track.song + ' - ' + track.artist + '</li>');
      listItem.data('track', track);
      trackList.append(listItem);
    });

    if (data.hasNextPage) {
      trackList.append($('<li class="nextPage">Next page</li>'));
    }
    
    $('#viewport').get(0).scrollByPages(-100);
  });
})