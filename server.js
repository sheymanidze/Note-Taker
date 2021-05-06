const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const db = require('./db/db.json');
const { dirname } = require('node:path');


// //root object
// var rootObj = { root: _dirname + '/public' };
// app.get('/', (req, res) => {
//   res.sendFile('/index.html, rootObj');

// });

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
  res.json(getJson());
})


// Listener
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
