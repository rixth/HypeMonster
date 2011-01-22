$(function () {
  var state = chrome.extension.getBackgroundPage().state,
      fetchData = function (page) {
        HypeM.latest(page, function (data) {
          $('body').trigger('trackDataLoaded', [data]);
        });
      };
  
  if (!state.dataObject) {
    setTimeout(function () {
      fetchData(state.currentPage);
    }, 100);
  } else {
    setTimeout(function () {
      $('body').trigger('trackDataLoaded', [state.dataObject]);
    }, 100);
  }
  
  $('body').bind('trackDataLoaded', function (event, data) {
    state.dataObject = data;
  });
  
  $('#player').live('playTrack', function (event, track) {
    state.currentTrackId = track.id;
  });

  $('.nextPage').live('click', function () {
    fetchData(++state.currentPage);
  });
  
  $('.prevPage').live('click', function () {
    state.currentPage = state.currentPage - 1 < 1 ? 1 : state.currentPage - 1;
    fetchData(state.currentPage);
  });
});