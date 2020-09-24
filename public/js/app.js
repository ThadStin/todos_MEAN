const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
  const controller = this;

    this.createTodo = function(){
        $http({
            method:'POST',
            url:'/todos',
            data: {
                description: this.description,
                complete: this.complete
            }
        }).then(function(response){
            console.log(response);
        }, function(error){
            console.log(error);
        });
    }

    this.getTodos = function(){
        $http({
            method:'GET',
            url: '/todos',
        }).then(function(response){
            controller.todos = response.data; //set value on success
        }, function(){
            console.log('error');
        });
    };

    this.getTodos();
}]);
