angular.module('projectNotes',[]);

function mainController($scope, $http){
    $scope.formData = {};
    
    $http.get('/api/projects')
        .success(function(data){
            $scope.projects = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error: '+data);
        });
}