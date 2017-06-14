"use strict";

app.controller('ExercisesCtrl', function($scope, DataFactory) {

  var user = "abc";

$scope.getExerciseList = function() {
    DataFactory.getUserExerciseList(user)
    .then(function(data){
      console.log(data);
    });
  };

  $scope.getExerciseList(user);
});
