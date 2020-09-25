const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
  const controller = this;

//CREATE TODOS
    this.createTodo = function(){
        $http({
            method:'POST',
            url:'/todos',
            data: {
                description: this.description,
                complete: this.complete
            }
        }).then(function(response){
            controller.getTodos(); //updates list on submit
            console.log(response);
        }, function(error){
            console.log(error);
        });
    }

//GET ALL TODOS
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

// TOGGLE TODOS
    this.toggleTodoComplete = function(todo){
        let newCompleteValue;
        if(todo.complete === true){
            newCompleteValue = false;
        } else {
            newCompleteValue = true;
        }

        $http({
            method:'PUT',
            url: '/todos/' + todo._id,
            data: {
                description: todo.description,
                complete: newCompleteValue
            }
        }).then(function(response){
            controller.getTodos();
        }, function(){
            console.log('error');
        });
    }

// DELETE TODOS
    this.deleteTodo = function(todo) {
      $http({
        method: 'DELETE',
        url: '/todos/' + todo._id,
      }).then(function(response) {
        controller.getTodos();
      },function(error) {
        console.log(error);
      });
    }


}]);
