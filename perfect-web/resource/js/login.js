
var myApp = angular.module("myApp", []);
myApp.controller('loginCtrl', function($scope,$http) {
  $scope.firstName = '';
  $scope.LoginErr = '123123';
  $scope.show = false;
  $scope.login = function(e){
    $http({
      method: "POST",
      url: "/ajaxLogin",
      data:{'username':$scope._username,'password':$scope._password}
    }).
    success(function(data, status) {
      if(data.status){
        $scope.show = true;
        $scope.LoginErr = "用户名或密码错误";
      }
      else {
        window.location.href = '/';
      }
    }).
    error(function(data, status) {
      $scope.LoginErr = status;
    });
  };

});
