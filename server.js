const express = require('express');
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
const cors = require('cors')
const cookieParser = require('cookie-parser');
const request = require('request');

const app = express();

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(morgan('combined', { stream: accessLogStream }))
app.use(cookieParser());

app.get('/', (req,res)=>{
	res.render('login')
})

app.get('/logged', (req,res)=>{
	res.render('logged')
})

var corsOptions = {
  origin: 'https://api.sikayetvar.com/auth-member/auth/login',
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

app.post('/member', cors(corsOptions), function (req, res, next) {
	console.log(req.cookies);
	console.log(req.params," <<<");
	
	res.json({msg: 'This is CORS-enabled'})
})

app.listen(3000, ()=>{
	console.log("Server listening on port 3000");
})


