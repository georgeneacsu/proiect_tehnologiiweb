$(document).ready(function(){
    //hide forms
    $('#addProjectForm, #addNoteForm').hide();
    
    //show add project form
    $('#addProject').click(function(){
        $('#addProjectForm').toggle();
    })
    
    //show add note form
    $('#addNote').click(function(){
        $('#addNoteForm').toggle();
    })
})