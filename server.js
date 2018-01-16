//setup server and required node packages
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

//setup sequelize
const sequelize = new Sequelize('projectNotes','root','',{
    dialect : 'mysql'
})

//define model
let Project = sequelize.define('project', {
    projectName : Sequelize.STRING,
    projectDescription : Sequelize.STRING(1000)
})

let Note = sequelize.define('note',{
    noteDescription: Sequelize.STRING(1000)
})

Project.hasMany(Note);

let app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
//create db
app.get('/api/create', (req, res) => {
    sequelize.sync()
    .then(() => res.status(201).json({message: 'Tables created'}))
    .catch((error) => {
        console.warn(error)
        res.status(500).json({message: 'generic error'})
    })
})

//define routes
//get all projects
app.get('/api/projects', (req, res) => {
     Project.findAll()
     .then((projects) => res.status(200).json(projects))
     .catch((error) => {
         res.status(500).json({message: 'Generic error!'})
     })
})

//add project
app.post('/api/projects', (req, res) => {
    Project.create(req.body)
    .then(() => res.status(201).json({message: 'Project created'}))
    .catch((error) => {
        console.warn(error)
        res.status(500).json({message: 'generic error'})
    })
})

//delete a project
app.delete('/api/projects/:pid', (req, res) => {
    Project.destroy({
        where : {id : req.params.pid}
    })
    .then(() => res.status(200).json({message: 'deleted'}))
    .catch((error) => {
        console.warn(error)
        res.status(500).json({message: 'generic error'})
    })
})

//get all notes for project
app.get('/api/projects/:pid/notes', (req, res) => {
	Project.findById(req.params.pid)
		.then((result) => {
			if (result){
				return result.getNotes()
			}
			else{
				res.status(404).send('Project not found')	
			}
		})
		.then((results) => {
			res.status(200).json(results)
		})
		.catch(() => res.status(500).send('Generic error!'))
})

//add note for project
app.post('/api/projects/:pid/notes', (req, res) => {
	Project.findById(req.params.pid)
		.then((result) => {
			if (result){
				let note = req.body
				note.project_id = result.id
				return Note.create(note)
			}
			else{
				res.status(404).send('Project not found')	
			}
		})
		.then(() => {
			res.status(201).json('Note created')
		})
		.catch(() => res.status(500).send('Generic error!'))
})

//delete a note
app.delete('/api/projects/:pid/notes/:nid', (req, res) => {
	Note.findById(req.params.nid)
		.then((result) => {
			if (result){
				return result.destroy()
			}
			else{
				res.status(404).send('Project not found')	
			}
		})
		.then(() => {
			res.status(201).send('Note removed')
		})
		.catch(() => res.status(500).send('Generic error!'))
})

//application
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
})

app.listen(8080);
console.log("App started on port 8080");
