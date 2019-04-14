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
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $firebaseAuth){
  var auth = $firebaseAuth();

  $scope.data = {};
  $scope.login = function() {
      console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
      auth.$signInWithEmailAndPassword($scope.data.username, $scope.data.password).then(function(snapshot){
        console.log('--- addNewUser snapshot --==> ', snapshot);
        $state.go('tab.dash');
      }, function(error){
        console.log('--- addNewUser error    --==> ', error);
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
.controller('RegisterCtrl', function($scope, LoginService, $ionicPopup, $state, $firebaseAuth){
  var auth = $firebaseAuth();
  console.log('--=== This is RegisterCtrl ===---')
  $scope.data = {};
  $scope.isInValied = function() {
    if($scope.data.password && ($scope.data.password === $scope.data.confirmPassword)){
      return false;
    }
    return true;
  }
  $scope.registerNewUser = function() {
      console.log("register New-User : ", $scope.data);
      auth.$createUserWithEmailAndPassword($scope.data.username, $scope.data.password).then(function(snapshot){
        console.log('--- addNewUser snapshot --==> ', snapshot);
        $state.go('login');
      }, function(error){
        console.log('--- addNewUser error --==> ', error);
        $ionicPopup.alert({
          title: 'Login failed!',
          template: error.message
        });
      });
  }
});
