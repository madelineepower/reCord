"use strict";

const app = angular.module('reCord', ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/loginView.html',
  }).
  when('/logout', {
    templateUrl: 'partials/loginView.html',
  }).
  when('/timer', {
    templateUrl: 'partials/timerView.html',
  }).
  when('/exercises', {
    templateUrl: 'partials/exercises.html',
  }).
  otherwise('/');
});
