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
  console.log("Connectado a la base de datos.");
});
/********************************/

app.use("/",express.static('public'));
app.use("/sen",express.static('public_sen'));

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
				response.redirect('/sen');
			} else {
				response.send('Usuario o contraseña incorrectos.');
			}			
			response.end();
		});
	} else {
		response.send('Por favor, introducir usuario y contraseña');
		response.end();
	}


});


io.on('connection',function(socket){
	socket.on('temperatura', function(msg){
		console.log(msg)
  		io.sockets.emit('temperatura',msg);
  	});

  	socket.on('carbono', function(msg){
		console.log(msg)
  		io.sockets.emit('carbono',msg);
  	});

});


server.listen(5001, function(){
	console.log("Servidor corriendo en http://localhost:5001");

});
