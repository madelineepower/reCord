"use strict";

app.controller('TimerViewCtrl', function($scope, $interval, $timeout, DataFactory, AuthFactory, SelectedNoteData, $window) {
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
    $scope.UserVowel = {
        vowel: ""
    };

    //start the timer, create new date, calculate elapsed seconds
    $scope.start = function() {
        if (!timerPromise) {
            $scope.startTime = new Date();
            console.log("startTime", $scope.startTime);
            timerPromise = $interval(function() {
                $scope.timerStarted = true;
                var now = new Date();
                $scope.elapsedSeconds = now.getTime() - $scope.startTime.getTime();
                $scope.timerSeconds = ($scope.elapsedSeconds / 1000);
            }, 1);
        }
    };

    //stop timer, call function to get the totalElapsedTime
    $scope.stop = function() {
        if (timerPromise) {
            $scope.timerStarted = false;
            $scope.getElapsedTime();
            $interval.cancel(timerPromise);
            timerPromise = undefined;
            // $scope.elapsedSeconds = 0;
        }
    };

    //create new object to hold the elapsed seconds, date, note, and vowel
    $scope.getElapsedTime = function() {
        $scope.totalElapsedTime = $scope.elapsedSeconds;
        $scope.newExerciseObject.milliseconds = $scope.totalElapsedTime;
        $scope.newExerciseObject.dateOfExercise = $scope.startTime;
        $scope.newExerciseObject.note = $scope.selected.note.note;
        $scope.newExerciseObject.vowel = $scope.UserVowel.vowel;
        return $scope.newExerciseObject;
    };

    //resets the timer
    $scope.reset = function() {
        if (timerPromise) {
            $scope.timerStarted = false;
            $interval.cancel(timerPromise);
            timerPromise = undefined;
            $scope.elapsedSeconds = 0;
            $scope.timerSeconds = 0;
        }
        $scope.elapsedSeconds = 0;
        $scope.timerSeconds = 0;
    };

    //grabs new object and adds to the database, then resets the timer
    $scope.makeNewObj = function() {
        var newObj = $scope.getElapsedTime();
        DataFactory.addExercise(newObj)
            .then(function(newObj) {
                $scope.reset();
            });
    };

});
