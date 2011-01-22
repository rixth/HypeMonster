var HypeM = (function () {
  function genericParser(html, callback) {
    var htmlToParse = html,
        foundScriptOffset = htmlToParse.indexOf('<script'),
        scripts = [],
        tracks = [],
        currentPage = 0,
        hasNextPage = false,
        hasPrevPage = false,
        pageData;

    while(foundScriptOffset !== -1) {
      htmlToParse = htmlToParse.substr(foundScriptOffset);

      scripts.push(htmlToParse.substr(0, htmlToParse.indexOf('</script')));

      htmlToParse = htmlToParse.substr(scripts[scripts.length - 1].length);
      foundScriptOffset = htmlToParse.indexOf('<script');
    }

    scripts = scripts.filter(function (script) {
      return script.indexOf('trackList[document.location.href].push({') !== -1;
    });


    scripts.forEach(function (script) {
      tracks.push({
        song: script.match(/song: ?'(.*)',/)[1].replace(/\\'/g, "'"),
        artist: script.match(/artist: ?'(.*)',/)[1].replace(/\\'/g, "'"),
        id: script.match(/id: ?'(.+)',/)[1],
        key: script.match(/key: ?'(.+)',/)[1],
      })
    });

    currentPage = +$(html).find('.paginator>.this-page').html();
    pageData = $(html).find('.paginator').html().match(/>\d+?</g);
    if (pageData) {
      hasNextPage = currentPage < +pageData.join(',').replace(/>|</g, '').split(',').pop();
      hasPrevPage = currentPage > 1;
    }

    callback({
      tracks: tracks,
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage
    });
  }
  
  return {
    latest: function (page, callback) {
      $.get('http://hypem.com/latest/' + page + '?ax=1', function (d) {
        genericParser(d, callback)
      });
    }
  };
}());


