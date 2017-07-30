"use strict";

const app = angular.module('reCord', ["ngRoute", "ui.materialize", "angular-svg-round-progressbar", "angularMoment"]);

let isAuth = (AuthFactory) =>
  new Promise ((resolve, reject) => {
    AuthFactory.isAuthenticated()
    .then((userExists) => {
      if (userExists){
        console.log('Authenicated, go ahead');
        resolve();
      } else {
        console.log('Authenticated reject, GO AWAY');
        alert("Please login or create an account to use reCord!");
        reject();
      }
    });
});

app.config(function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/loginView.html',
    controller: 'AuthCtrl'
  }).
  when('/logout', {
    templateUrl: 'partials/loginView.html',
    controller: 'AuthCtrl'
  }).
  when('/timer', {
    templateUrl: 'partials/timerView.html',
    controller: 'TimerViewCtrl',
    resolve: {isAuth}
  }).
  when('/exercises', {
    templateUrl: 'partials/exercises.html',
    controller: 'ExercisesCtrl',
    resolve: {isAuth}
  }).
  when('/about', {
    templateUrl: 'partials/about.html',
    resolve: {isAuth}
  }).
  otherwise('/');
});


app.run(($location, FBCreds) => {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.apiKey,
    authDomain: creds.authDomain,
    databaseURL: creds.databaseURL
  };
  firebase.initializeApp(authConfig);
});
