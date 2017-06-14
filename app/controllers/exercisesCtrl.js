"use strict";

app.controller('ExercisesCtrl', function($scope, DataFactory) {

  var user = "abc";

$scope.getExerciseList = function() {
    DataFactory.getUserExerciseList(user)
    .then(function(data){
      $scope.exercises = data;
      console.log("all exercises", $scope.exercises);
    });
  };

$scope.getExerciseList(user);

$scope.deleteExercise = function (exerciseID) {
    DataFactory.deleteExercise(exerciseID)
    .then( () => {
      $scope.getExerciseList();
    });
  };

});
