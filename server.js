const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;


//access to req.body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


//access to public folder
app.use(express.static(path.join(__dirname, '/public')));


//to index.js
app.get('/assets/js/index.js'), function (req, res) {
  res.sendFile(path.join(__dirname, 'piblic/assets/js/index.js'))
};


//to notes.html
app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/notes.html'))
});


//see clicked notes
app.get('/api/notes', (req, res) => {
  console.log('/api/notesget');
  let json = getJson();
  console.log(json);
  res.json(json);
})

app.post('/api/notes', (req, res) => {
  console.log('/api/notespost');
  console.log(req.body);
  addNotes(req.body);
  res.json(getJson());
})


//deleting/hiding notes
// app.delete('/api/notes/:id', (req, res) => {
//   console.log('/api/notes/:iddelete')
//   console.log(req.params.id)
//   deleteNotes(req.params.id);
//   res.json(getJson());
// })

app.delete('/api/notes/:id', (req, res) => {
  let notes = getJson();
  let newNotes = notes.filter((rmvNotes) => rmvNotes.id !== parseInt(req.params.id));
  saveNotes(newNotes);
  res.json(newNotes);
});

//access to index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});


// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

function getJson() {
  let data = fs.readFileSync(__dirname + '/db/db.json');
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
  fs.writeFileSync(__dirname + '/db/db.json', data);
};



// function deleteNotes(id) {
//   let json = getJson();
//   json[id].hide = true;
//   saveNotes(json);
// };

function notesTemplate(data) {
  const randomNumber = Math.floor((Math.random() * 50) + 1);
  let obj = {
    title: data.title,
    text: data.text,
    id: randomNumber
  }
  return obj

};


