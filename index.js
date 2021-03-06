
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-26178243-7', 'auto');
ga('send', 'pageview');


(function(){
  var chainCtrl;
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
   

    $scope.myOptsNew = [{h:'gl_news', n:'透明新聞'},
      {h:'gl_about', n:'透明簡介'},
      {h:'gl_dialogue', n:'透明會晤'},
      {h:'gl_seminar', n:'透明講座'},
      {h:'gl_market', n:'透明市集'},
      {h:'gl_parties', n:'小黨聯播'},
      {h:'gl_mobile', n:'現象行動工具'},
      {h:'gl_print', n:'即印工具'},
      {h:'gl_energy', n:'能源'}
    ];
}

  angular.module('chainApp', ['goban'])
  .controller('chainCtrl', chainCtrl);
}).call(this);
