"use strict";

app.controller('ExercisesCtrl', function($scope, DataFactory, AuthFactory, $q, $route) {

var user = AuthFactory.getUser();
$scope.name = "";
$scope.exercises = [];

$scope.getExerciseList = function() {
  console.log(user);
    DataFactory.getUserExerciseList(user)
    .then(function(data){
      $scope.exercises = data;
    });
  };

$scope.getExerciseList(user);

$scope.getCurrentUser = function() {
  user = AuthFactory.getUser();
  DataFactory.getUser(user)
  .then(function(name){
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
    var exerciseList = $scope.exercises;
    exerciseList.forEach(function(currVal){
          console.log(currVal);
          DataFactory.deleteExercise(currVal.id)
          .then(function(){
            $scope.getExerciseList();
          });
    });
};

$scope.makePDF = function() {
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

// $scope.deleteBoard = function(){
//         DataFactory.deleteBoard($scope.boardID)
//         .then ( (data) => {
//             $scope.pinsForBoard.forEach(function(currVal){
//                 console.log(“currVal”, currVal);
//                 DataFactory.deletePin(currVal.pinID);
//             });
//             $location.path(‘/profile’);
//         });
//     };
