const express = require('express');
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const app = express();
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (req,res)=>{
	res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(3000, ()=>{
	console.log("Server listening on port 3000");
})