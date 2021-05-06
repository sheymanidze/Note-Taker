const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
//const bodyParser = require('body-parser');
const db = require('./db/db.json');


const { dirname } = require('node:path');
const { json } = require('express');


// //root object
// var rootObj = { root: _dirname + '/public' };
// app.get('/', (req, res) => {
//   res.sendFile('/index.html, rootObj');
// });
//app.use(bodyParser.urlencoded({extended: false}));

//access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(ecpress.json());


//access to public folder
app.use(express.static(path.join(_dirname, '/public')));


//to index.js
app.get('/assets/js/index.js'), function (req, res) {
  res.sendFile(path.join(_dirname, 'piblic/assets/js/index.js'))
};

//to index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(_dirnmae, 'public/index.html'))
});

//to notes.html
app.get('/notes', function (req, res) {
  res.sendFile(path.join(_dirname, 'public/notes.html'))
});

app.get('api/notes', (req, res) => {
  console.log('/api/notesget');
  let json = getJson();
  console.log(json);
  res.json(json);
})

app.post('api/notes', (req, res) => {
  console.log('/api/notespost');
  console.log(req.body);
  addNotes(req.body);
  res.json(getJson());
})

app.delete('/api/notes/:id', (req, res) => {
  console.log('/api/notes/:iddelete')
  deleteNotes(req.params.id);
  res.json(getJson());
})


// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

function getJson() {
  let data = fs.readFileSync(_dirname + db);
  let json = JSON.parse(data);
  return json;
};

function addNotes(notes) {
  let json = getJson();
  let newNotes = notesTemplate(notes);
  json.push(newNotes);
  saveNotes(json);
};

function saveNotes(jsonData) {
  let data = JSON.stringify(jsonData);
  json.push(newNotes);
  saveNotes(json);
};

function deleteNotes(id) {
  let json = getJson();
  json[id].hide = true;
  saveNotes(json);
};

function notesTemplate(data) {
  let obj = {
    title: data.title,
    text: data.text
  }
  return obj

};


