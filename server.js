const express = require('express');
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
const cors = require('cors')
const cookieParser = require('cookie-parser');
const request = require('request');
const bodyParser = require('body-parser')
const axios = require('axios');

const app = express();

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

	console.log(req.body.grant_type, " <<<");
	console.log(req.body.client_id, " <<<");
	console.log(req.body.username, " <<<");
	console.log(req.body.password, " <<<");

	axios.post('https://api.sikayetvar.com/auth-member/auth/login', {
		headers: {
			'Content-Type': 'application/json',
            'Accept': 'application/json',
            'WithCredentials': true,
            'Access-Control-Allow-Origin': '*',
            'Cookie': "__cfduid=" + req.cookies.__cfduid
        }
	},{data : JSON.stringify({ 
				"grant_type" : req.body.grant_type,
				"client_id" : req.body.client_id,
				"username" : req.body.username,
				"password" : req.body.password,
			 })
		})
	  .then(response => {
	    console.log(response.data.url, " ∆ ");
	    console.log(response.data.explanation, " π ");
	  })
	  .catch(error => {
	  	if (error.response){
      		console.log(error.response.data);
	  	}else if (error.request) {
	      console.log(error.request);
	    } else {
	      console.log('Error', error.message);
	    }
	  });
	
	res.json({msg: 'This is CORS-enabled'})
})

app.listen(3000, ()=>{
	console.log("Server listening on port 3000");
})


