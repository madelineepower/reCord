"use strict";

app.controller('ExercisesCtrl', function($scope, DataFactory, AuthFactory) {

var user = AuthFactory.getUser();
$scope.name = "";

$scope.getExerciseList = function() {
  console.log(user);
    DataFactory.getUserExerciseList(user)
    .then(function(data){
      $scope.exercises = data;
      console.log("all exercises", $scope.exercises);
    });
  };

$scope.getExerciseList(user);

$scope.getCurrentUser = function() {
  user = AuthFactory.getUser();
  DataFactory.getUser(user)
  .then(function(name){
    console.log("This is the full name", name);
    $scope.name = name;
  });
};

$scope.getCurrentUser();

$scope.deleteExercise = function (exerciseID) {
    DataFactory.deleteExercise(exerciseID)
    .then( () => {
      $scope.getExerciseList();
    });
  };

$scope.deleteAll = function () {
  user = AuthFactory.getUser();
  DataFactory.deleteAllExercises(user)
  .then( () => {
    $scope.getExerciseList();
  });
};

$scope.makePDF = function() {
  console.log("click makePDF");
  html2canvas(document.getElementById('export-this'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("Exercise_List.pdf");
            }
        });
};

});
