"use strict";

app.controller('timeCircleCtrl', function($scope, $interval, $timeout) {
    $scope.format = '';
    $scope.startTime = "";
    $scope.new = "";
    var timerPromise;
    $scope.elapsedSeconds = 0;
    $scope.totalElapsedTime = 0;

  $scope.start = function() {
    if (!timerPromise) {
      $scope.startTime = new Date();
      console.log("startTime", $scope.startTime);
      timerPromise = $interval(function() {
        var now = new Date();
        $scope.elapsedSeconds = now.getTime() - $scope.startTime.getTime();
      }, 1);
    }
  };


  $scope.stop = function() {
    if (timerPromise) {
      $scope.getElapsedTime();
      $interval.cancel(timerPromise);
      timerPromise = undefined;
      // $scope.elapsedSeconds = 0;
    }
  };

  $scope.getElapsedTime = function() {
      $scope.totalElapsedTime = $scope.elapsedSeconds;
      console.log($scope.totalElapsedTime);
  };

});
