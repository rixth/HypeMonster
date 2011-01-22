$(function () {
  var fetchData = function (page) {
        HypeM.latest(page, function (data) {
          $('body').trigger('trackDataLoaded', [data]);
        });
      };
      currentPage = 1;

  setTimeout(function () {
    fetchData(currentPage);
  }, 100);
  
  $('#trackList>li').live('click', function () {
    var el = $(this);
    if (el.data('track')) {
      $('#player').trigger('playTrack', [el.data('track')]);
    }
  });
  
  $('.nextPage').live('click', function () {
    fetchData(++currentPage);
  });
  $('.prevPage').live('click', function () {
    currentPage = currentPage - 1 < 1 ? 1 : currentPage - 1;
    fetchData(currentPage);
  });
});