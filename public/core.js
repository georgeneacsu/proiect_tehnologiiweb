angular.module('projectNotes',[]);

function mainController($scope, $http){
    $scope.formData = {};
    
    $http.get('/api/projects')
        .success(function(data){
            $scope.projects = data;
            $scope.showProjects = true;
            $scope.showNotes = false;
            console.log(data);
        })
        .error(function(data){
            console.log('Error: '+data);
        });
        
    $scope.addProject = function() {
        $http.post('/api/projects', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.projects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.deleteProject = function(id) {
        $http.delete('/api/projects/' + id)
            .success(function(data) {
                $scope.projects = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.viewProjectNotes = function(id) {
        $scope.formData.noteDescription = '';
        $http.get('/api/projects/'+id+'/notes')
            .success(function(data) {
                $scope.notes = data;
                console.log(data);
                $scope.showNotes = id;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
    $scope.addNote = function(id) {
        $http.post('/api/projects/'+id+'/notes', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.notes = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
     $scope.deleteNote = function(pid,nid) {
        $http.delete('/api/projects/'+pid+'/notes/'+nid)
            .success(function(data) {
                $scope.notes = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
}