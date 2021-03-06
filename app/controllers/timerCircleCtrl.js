"use strict";

app.controller('TimeCircleCtrl', ['$scope', '$interval', '$timeout', '$window', 'roundProgressService', function($scope, $interval, $timeout, $window, roundProgressService) {

//round progress attributes
    $scope.current = 0;
    $scope.max = 60;
    $scope.offset = 0;
    $scope.timerCurrent = 0;
    $scope.uploadCurrent = 0;
    $scope.stroke = 6;
    $scope.radius = 80;
    $scope.isSemi = false;
    $scope.rounded = true;
    $scope.responsive = false;
    $scope.clockwise = true;
    $scope.currentColor = '#1de9b6';
    $scope.bgColor = '#303f4f';
    $scope.duration = 800;
    $scope.currentAnimation = 'easeOutCubic';
    $scope.animationDelay = 0;

    if (window.matchMedia("(min-width: 415px)").matches) {
      $scope.radius = 120;
    } else {
      $scope.radius = 98;
    }

    $scope.increment = function(amount) {
        $scope.current += (amount || 1);
    };

    $scope.decrement = function(amount) {
        $scope.current -= (amount || 1);
    };

//apply style to the round progress
    $scope.getStyle = function() {
        var transform = ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

        return {
            'top': $scope.isSemi ? 'auto' : '50%',
            'bottom': $scope.isSemi ? '5%' : 'auto',
            'left': '50%',
            'transform': transform,
            '-moz-transform': transform,
            '-webkit-transform': transform,
            'font-size': $scope.radius / 3.5 + 'px'
        };
    };

}]);
