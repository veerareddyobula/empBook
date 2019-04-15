angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state){
  $scope.data = {};
  $scope.login = function() {
      LoginService.loginUser($scope.data).then(function(snapshot){
        $state.go('tab.dash');
      }, function(error){
        $ionicPopup.alert({
          title: 'Login failed!',
          template: error.message
        });
      })
  }

  $scope.register = function() {
    $state.go('register');
  }
})
.controller('RegisterCtrl', function($scope, LoginService, $ionicPopup, $state){
  $scope.data = {};
  $scope.isInValied = function() {
    if($scope.data.password && ($scope.data.password === $scope.data.confirmPassword)){
      return false;
    }
    return true;
  }
  $scope.registerNewUser = function() {
    LoginService.registerNewUser($scope.data).then(function(snapshot){
      $state.go('login');
    }, function(error){
      $ionicPopup.alert({
        title: 'Login failed!',
        template: error.message
      });
    });
  }
});
