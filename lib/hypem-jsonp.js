var HypeM = (function () {
  var cache = window.localStorage;
  
  function createJSONPcallback(callback) {
    var methodName = "__jsonpCallback"+((""+Math.random()).substr(2));
    window[methodName] = function (data) {
      callback(data);
      delete window[methodName];
    }
    return methodName;
  }
  
  return {
    latest: function (page, callback) {
      var scriptTag, jsonpCallbackName,
          cacheKey = 'latest-' + page,
          cachedData = cache.getItem(cacheKey);
      
      if (cachedData !== null) {
        // return callback(JSON.parse(cachedData));
      }
      
      jsonpCallbackName = createJSONPcallback(function (data) {
        cache.setItem(cacheKey, JSON.stringify(data));
        callback(data);
      });
      
      scriptTag = document.createElement('script');
      scriptTag.src = 'http://localhost:3000/latest/' + page + '?callback=' + jsonpCallbackName;
      scriptTag.type = 'text/javascript';
      document.body.appendChild(scriptTag);
    }
  };
}());