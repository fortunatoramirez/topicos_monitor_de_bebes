var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

/* Conexión a la base de datos */
/* var mysql = require('mysql');
var con = mysql.createConnection({
	host: "localhost",
	user: "topicos",
	password: "tec123", //colocar aquí la contraseña de su base de datos
	database: "topicos"

});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database.");
});*/
/********************************/

var messages = [{
	text: "Hola, bienvenidos...",
	author: "Administrador"
}];

app.use(express.static('public'));
app.get('/home', function(req, res){
	//res.status(200).send("Hola mundo");
	res.sendFile(path.join(__dirname + '/home.html'));
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
