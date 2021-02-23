const express = require('express')
const path = require('path');
const fs = require('fs')

const app = express()

const PORT = process.env.PORT || 4000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')))
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')))
app.get('/api/notes', (req, res) => fs.readFile(path.join(__dirname, '/db/db.json'), (err, data) => {
  if(err) throw err;
  res.send(data)
}))

app.post('/api/notes', (req, res) => {
  const newNote = req.body
  console.log(newNote)
  res.json(newNote)
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));