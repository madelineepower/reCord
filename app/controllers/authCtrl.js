"use strict";

//login, logout, register

app.controller("AuthCtrl", function($scope, $window, $location, AuthFactory, DataFactory){
    $scope.auth = {
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    };


    let logout = () => {
        console.log("NO ONE IS LOGGED IN");
        AuthFactory.logout()
          .then(function (data) {
            $window.location.url = "#!/";
          }, function (error) {
            console.log("error occured on logout");
          });
      };

      // when first loaded, make sure no one is logged in
      if (AuthFactory.isAuthenticated()) {
        logout();
      }


    $scope.registerUser = function(){
        AuthFactory.registerWithEmail({
          email: $scope.auth.email,
          password: $scope.auth.password,
        })
        .then(function(user){
          DataFactory.addUser({
            uid: user.uid,
            firstName: $scope.auth.firstName,
            lastName: $scope.auth.lastName
          })
          .then((userData) => {
            $scope.login();
            $('#newUser').modal('close');
          }, (error) => {
            console.log("Error creating user:", error);
          });
      });
    };

    $scope.login = function(){
      AuthFactory.login($scope.auth)
    .then(() => {
      $scope.$apply();
      $window.location.href = "#!/timer";
    });
};
});
