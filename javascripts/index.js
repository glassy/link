
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-26178243-7', 'auto');
ga('send', 'pageview');


(function(){
  var chainCtrl, myDummy;
  chainCtrl = function($window, $scope, $goban){
    $scope.goban = $goban.$default({
      path : 'https://ethercalc.org/',
      title : 'gl_news',
      colMax : 3
    });
    $scope.goban.init();

    $scope.navHeight = 50;
    $scope.countHeight = function(){
      return $window.innerHeight - 40;
    };

    $scope.myOpts = 
    ['gl_about',
    'gl_dialogue',
    'gl_history',
    'gl_herstory',
    'gl_market',
    'gl_news',
    'gl_parties',
    'gl_print',
    'gl_seminar'];
  };
  angular.module('chainApp', ['goban'])
  .controller('chainCtrl', chainCtrl);
}).call(this);
