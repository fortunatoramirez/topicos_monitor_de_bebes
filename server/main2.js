var express = require('express');
var app = express();
var server = require('http').Server(app);
var session = require('express-session');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var path = require('path');
var fs = require('fs');

/* Conexión a la base de datos */
var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "topicos",
	password: "tec123", //colocar aquí la contraseña de su base de datos
	database: "topicos"

});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database.");
});
/********************************/



app.use("/",express.static('public'));


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		con.query('SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				//response.redirect('/home');
				app.next();
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}


});

app.use("/private",express.static('private'));




server.listen(5001, function(){
	console.log("Servidor corriendo en http://localhost:5001");

});
