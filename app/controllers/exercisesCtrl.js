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
  var exerciseData = [];
  for (let item in $scope.exercises) {
          let currentItem = {};
          var time = moment($scope.exercises[item].dateOfExercise);
          currentItem.Date = time.format("MMMM Do YYYY, h:mm a");
          currentItem.Seconds = Math.floor(($scope.exercises[item].milliseconds)/1000);
          currentItem.Pitch = $scope.exercises[item].note;
          currentItem.Vowel = $scope.exercises[item].vowel;
          exerciseData.push(currentItem);
        }
  console.log("NEW DATA", exerciseData);

  function buildTableBody(data, columns) {
      var body = [];
      body.push(columns);
      data.forEach(function(row) {
          var dataRow = [];
          columns.forEach(function(column) {
              dataRow.push(row[column].toString());
          });
          body.push(dataRow);
      });
      return body;
  }

  function table(data, columns) {
      return {
          table: {
              headerRows: 1,
              body: buildTableBody(data, columns)
          }
      };
  }

  var dd = {
    content: [
      { text: `${$scope.name}`, style: 'header' }, {text: 'Exercise List', style: 'subheader'},
      table(exerciseData, ['Date', 'Seconds', 'Pitch', 'Vowel'])
    ],
    styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        },
        tableExample: {
			     margin: [0, 5, 0, 15]
		    },
		    tableHeader: {
      			bold: true,
      			fontSize: 13,
      			color: 'black'
		     }
      }
};

  pdfMake.createPdf(dd).download("Exercise_List.pdf");
};

});
