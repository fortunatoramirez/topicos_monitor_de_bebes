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

app.use(express.static('public'));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/*
app.get('/home', function(req, res){
	//res.status(200).send("Hola mundo");
	//res.sendFile(path.join(__dirname + '/home.html'));
});
*/

/* inicio de sesión */
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		con.query('SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
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


app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		//response.send('Welcome back, ' + request.session.username + '!');
		response.sendFile(path.join(__dirname + '/private/senales.html'));

		fs.readFile("private/senales.html", function (error, pgResp) {
            if (error) {
                response.writeHead(404);
                response.write('Contents you are looking are Not Found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(pgResp);
            }
        });

	} else {
		response.send('Por favor, iniciar sesión para ver esta página');
	}
	response.end();
});




io.on('connection',function(socket){
	socket.emit('messages',messages);
	socket.on('new-message', function(msg){
		messages.push(msg);
		var sql = `INSERT INTO messages_2(nickname, text) VALUES ('${msg.author}', '${msg.text}')`;
  		con.query(sql, function (err, result) {
    		if (err) throw err;
    		console.log("record inserted");
		});
  		io.sockets.emit('messages',messages);
	});

	socket.on('inicio_sesion', function(msg){
		console.log(msg.usuario);
		console.log(msg.contrasena);
		var sql = `SELECT * FROM usuarios WHERE usuario = '${msg.usuario}' and contrasena = '${msg.contrasena}'`;
		con.query(sql, function (err, result) {
			if (err) throw err;
               // console.log("datos");
    	//	console.log(result);
                if(result.length>0){
                console.log("iniciando sesion correctamente");
                 }
    		io.sockets.emit('iniciar_sesion',result);
		});
	});

	/*
	socket.on("show-history", function(){
		con.query("SELECT * FROM messages", function (err, result, fields) {
    		if (err) throw err;
    		//console.log(result);
    		io.sockets.emit('messages',result);
  		});
	});
	*/
});

server.listen(5001, function(){
	console.log("Servidor corriendo en http://localhost:5001");

});
