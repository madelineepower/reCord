"use strict";

app.controller('TimerViewCtrl', function($scope, $interval, $timeout, DataFactory, AuthFactory) {
    $scope.format = '';
    $scope.startTime = "";
    $scope.new = "";
    var timerPromise;
    var user = AuthFactory.getUser();
    $scope.elapsedSeconds = 0;
    $scope.totalElapsedTime = 0;
    $scope.newExerciseObject = {
      milliseconds: "",
      dateOfExercise: "",
      uid: user
    };
    $scope.timerSeconds = 0;
  $scope.start = function() {
    if (!timerPromise) {
      $scope.startTime = new Date();
      console.log("startTime", $scope.startTime);
      timerPromise = $interval(function() {
        var now = new Date();
        $scope.elapsedSeconds = now.getTime() - $scope.startTime.getTime();
        $scope.timerSeconds = ($scope.elapsedSeconds/1000);
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
      $scope.newExerciseObject.milliseconds = $scope.totalElapsedTime;
      $scope.newExerciseObject.dateOfExercise = $scope.startTime;
      return $scope.newExerciseObject;
  };

  $scope.reset = function() {
    $scope.elapsedSeconds = 0;
    $scope.timerSeconds = 0;
  };

  $scope.makeNewObj = function() {
      var newObj = $scope.getElapsedTime();
      console.log('Saved Object', newObj);
      DataFactory.addExercise(newObj)
      .then(function(newObj){
        console.log("this was added to firebase", newObj);
        $scope.reset();
      });
  };

});




//makeNewObj function
// grabs current date and totalElapsedTime
// creates new object to push to firebase
// calls data factory

//saveExercise (closes modal)

//resetTimer (closes modal and resets timer)
