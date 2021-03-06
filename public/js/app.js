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
            controller.description = null; //resets text field
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
        } // with html and css toggles line-through if completed, no line if incomplete

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

// EDIT TODOS
    this.editTodo = function(todo){
        $http({
            method:'PUT',
            url: '/todos/' + todo._id,
            data: {
                description: this.updatedDescription,
                complete: todo.complete
            }
        }).then(
            function(response){
                controller.getTodos();
                controller.indexOfEditFormToShow = null; // hides form
                controller.updatedDescription = null; //resets text field
            },
            function(error){
              console.log(error);
            }
        );
    }


}]);
