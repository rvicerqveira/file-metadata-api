var express = require('express')
var app = express()
var multer  = require('multer')
var path = require('path')
var fs = require('fs')
require('dotenv').config({silent: true})
var port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, './public')))
app.set('views', path.join(__dirname, "./templates"))
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index', { title: 'File Metadata Microservice' })
})

app.post('/', multer({ dest: 'uploads/' }).single('file'), function(req, res) {
  var fileSize
  var fileDetails={}
  if (req.file) { 
    fileDetails={bytes: req.file.size} 
    fs.unlinkSync(path.join(__dirname, "./uploads/" + req.file.filename))
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(fileDetails))
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})