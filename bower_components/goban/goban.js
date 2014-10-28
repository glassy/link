// Generated by LiveScript 1.3.0
(function(){
  var toIndex, myHash, myGoban;
  toIndex = function(){
    return function(list){
      var i$, to$, results$ = [];
      for (i$ = 0, to$ = list.length - 1; i$ <= to$; ++i$) {
        results$.push(i$);
      }
      return results$;
    };
  };
  myHash = function(){
    return {
      data: location.hash,
      asArray: function(){
        return this.data.replace('#', '').split('&');
      },
      upDateFromArray: function(list){
        location.hash = '#' + list.join('&');
      }
    };
  };
  myGoban = function($http, $sce, $gobanPath, $gobanTitle, $hash, $gobanMax, $timeout){
    var goban, parseFromCSV, res$, i$, ridx$, goX, goY;
    goban = new Object;
    parseFromCSV = function(csv){
      var allTextLines, bodyLines, goodList, lastFolder, bestList;
      allTextLines = csv.split(/\r\n|\n/);
      goban.sectionTitle = allTextLines[1].split(',')[1];
      bodyLines = allTextLines.slice(2);
      goodList = bodyLines.map(function(text){
        text = text.replace(/(html|css|js|output),/g, '$1COMMA');
        return text.split(',').map(function(str){
          return str.replace(/COMMA/g, ',');
        });
      }).filter(function(list){
        return list[1];
      });
      lastFolder = {
        id: 0,
        set: function(n){
          this.id = n;
        }
      };
      bestList = goodList.map(function(list, index){
        var isClosed, isBlank, isIsolate, obj;
        isClosed = false;
        if (!list[0]) {
          lastFolder.set(index);
          if (list[2] && list[2].search(/expand(.+)true/ > -1)) {
            isClosed = false;
          }
          if (list[2] && list[2].search(/expand(.+)false/ > -1)) {
            isClosed = true;
          }
        } else {
          if (list[2] && list[2].search(/target(.+)_blank/ > -1)) {
            isBlank = true;
          }
          if (list[2] && list[2].search(/isolate(.+)true/ > -1)) {
            isIsolate = true;
          }
        }
        obj = (list[0] && {
          url: list[0].replace(/["\s]/g, ''),
          name: list[1].replace(/["\s]/g, ''),
          isFolder: false,
          pIndex: lastFolder.id,
          isBlank: isBlank,
          isIsolate: isIsolate
        }) || {
          name: list[1],
          isFolder: true,
          isClosed: isClosed
        };
        return obj;
      });
      return bestList;
    };
    goban.path = $gobanPath || '';
    goban.title = $hash.asArray()[0] || $gobanTitle;
    goban.myI = $hash.asArray()[1] || 0;
    goban.myJ = $hash.asArray()[2] || 0;
    goban.pageLoading = false;
    goban.animate = new Object;
    goban.colMax = $gobanMax || 3;
    res$ = [];
    for (i$ = 0; i$ <= $gobanMax; ++i$) {
      ridx$ = i$;
      res$.push(ridx$);
    }
    goban.myColumnIndex = res$;
    goban.setI = function(n){
      if (goban.myI !== n) {
        goban.loadPage();
        $timeout(function(){
          goban.myI = n;
          goban.updateHash();
          goban.load(goban.myI);
        }, 1000);
      }
    };
    goban.setJ = function(n){
      if (goban.myJ !== n) {
        goban.loadPage();
        $timeout(function(){
          goban.myJ = n;
          goban.updateHash();
        }, 1000);
      }
    };
    goban.loadPage = function(){
      goban.pageLoading = true;
      if (goban.animate.delay) {
        $timeout(function(){
          goban.pageLoading = false;
        }, goban.animate.delay);
      } else {
        goban.pageLoading = false;
      }
    };
    goban.updateHash = function(){
      $hash.upDateFromArray([goban.title, goban.myI, goban.myJ]);
    };
    goban.load = function(num){
      var folderName;
      folderName = goban.title + num;
      if (typeof goban.folderNames === 'array') {
        folderName = goban.folderNames[num];
      }
      $http({
        method: "GET",
        url: $gobanPath + folderName + '.csv',
        dataType: "text"
      }).success(function(data){
        goban.data = parseFromCSV(data);
      }).error(function(){
        goban.sectionTitle = undefined;
        goban.data = [];
      });
    };
    goban.keyDown = function($event){
      var code;
      console.log($event);
      $event.preventDefault();
      code = $event.keyCode;
      if (code === 40) {
        goban.dy(1);
      }
      if (code === 38) {
        goban.dy(-1);
      }
      if (code === 37) {
        goban.dx(-1);
      }
      if (code === 39) {
        goban.dx(1);
      }
      if (code === 32) {
        goban.data[goban.myJ].isClosed = !goban.data[goban.myJ].isClosed;
      }
    };
    goX = function(n){
      goban.myI = parseInt(goban.myI);
      goban.myI += n;
      if (goban.myI === -1) {
        goban.myI = goban.colMax;
      }
      if (goban.myI === goban.colMax + 1) {
        goban.myI = 0;
      }
      return goban.updateHash();
    };
    goY = function(n){
      goban.myJ = parseInt(goban.myJ);
      goban.myJ += n;
      if (goban.myJ === -1) {
        goban.myJ = goban.data.length - 1;
      }
      if (goban.myJ === goban.data.length) {
        goban.myJ = 0;
      }
      return goban.updateHash();
    };
    goban.dx = function(n){
      goban.loadPage();
      goban.load(parseInt(goban.myI) + n);
      if (goban.animate.delay) {
        $timeout(goX(n), goban.animate.delay);
      } else {
        goX(n);
      }
    };
    goban.dy = function(n){
      goban.loadPage();
      if (goban.animate.delay) {
        $timeout(goY(n), goban.animate.delay);
      } else {
        goY(n);
      }
    };
    goban.trust = function(url){
      return $sce.trustAsResourceUrl(url);
    };
    goban.getCurrentURL = function(){
      if (goban.data[goban.myJ] && goban.data[goban.myJ].isBlank) {
        return;
      }
      return goban.trust((goban.data[goban.myJ] && goban.data[goban.myJ].url) || (goban.data[goban.myJ + 1] && goban.data[goban.myJ + 1].url));
    };
    goban.backupAll = function(){
      var downloadURL, i$, ref$, len$, i;
      downloadURL = function(url, k){
        var hiddenIFrameID, iframe;
        hiddenIFrameID = 'hiddenDownloader' + k;
        iframe = document.getElementById(hiddenIFrameID);
        if (deepEq$(iframe, null, '===')) {
          iframe = document.createElement('iframe');
          iframe.id = hiddenIFrameID;
          iframe.name = url;
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
        }
        return iframe.src = url;
      };
      for (i$ = 0, len$ = (ref$ = (fn$())).length; i$ < len$; ++i$) {
        i = ref$[i$];
        downloadURL($gobanPath + $gobanTitle + i + '.csv', i);
      }
      function fn$(){
        var i$, to$, results$ = [];
        for (i$ = 0, to$ = $gobanMax; i$ <= to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }
    };
    return goban;
  };
  angular.module('goban', []).factory('$hash', myHash).factory('$goban', ['$http', '$sce', '$gobanPath', '$gobanTitle', '$hash', '$gobanMax', '$timeout', myGoban]).filter('toIndex', toIndex);
  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    var first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) { if (stack[length] == a) { return true; } }
      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) {
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
        if (result) {
          sizeB = 0;
          for (key in b) {
            if (has(b, key)) { ++sizeB; }
          }
          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);
