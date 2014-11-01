
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-26178243-7', 'auto');
ga('send', 'pageview');


(function(){
  var chainCtrl, myDummy;
  chainCtrl = function($window, $scope, $dummy, $goban){
    $scope.goban = $goban;
    $scope.goban.data = $dummy;
    $scope.goban.load($goban.myI);
    $scope.navHeight = 50;
    $scope.countHeight = function(){
      return $window.innerHeight - 40;
    };
    $scope.countWidth = function(){
      $window.innerWidth - 220;
      return $scope.myOpts = ['gl_about','gl_dialogue','gl_herstory','gl_market','gl_news','gl_print','gl_seminar'];
    };
  };
  myDummy = {
    name: 'know',
    isFolder: false,
    url: 'https://glassy.hackpad.com'
  };
  angular.module('chainApp', ['goban']).constant('$gobanPath', 'https://ethercalc.org/')
  .value('$gobanTitle', 'gl_news').constant('$gobanMax', 3)
  .constant('$dummy', myDummy)
  .controller('chainCtrl', chainCtrl);
}).call(this);
