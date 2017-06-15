"use strict";

app.controller('TimerViewCtrl', function($scope, $interval, $timeout, DataFactory, AuthFactory, SelectedNoteData) {
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
      note: "",
      uid: user
    };
    $scope.timerSeconds = 0;
    $scope.selected = SelectedNoteData;
    $scope.timerStarted = false;

  $scope.start = function() {
    if (!timerPromise) {
      $scope.startTime = new Date();
      console.log("startTime", $scope.startTime);
      timerPromise = $interval(function() {
        $scope.timerStarted = true;
        var now = new Date();
        $scope.elapsedSeconds = now.getTime() - $scope.startTime.getTime();
        $scope.timerSeconds = ($scope.elapsedSeconds/1000);
      }, 1);
    }
  };

  $scope.stop = function() {
    if (timerPromise) {
      $scope.timerStarted = false;
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
      $scope.newExerciseObject.note = $scope.selected.note.note;
      return $scope.newExerciseObject;
  };

  $scope.reset = function() {
    if (timerPromise) {
      $scope.timerStarted = false;
      $interval.cancel(timerPromise);
      timerPromise = undefined;
      $scope.elapsedSeconds = 0;
      $scope.timerSeconds = 0;
    }
  };

  $scope.makeNewObj = function() {
      var newObj = $scope.getElapsedTime();
      DataFactory.addExercise(newObj)
      .then(function(newObj){
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
