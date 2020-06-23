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
app.use(entry)
app.use("/private",express.static('private'));

function entry(req, res, next) {
    var user = "uuu";
    if (user !== "john") {
        res.set("WWW-Authenticate", "Basic realm=Authorization Required")
        res.status(401).end()
    } 
    else { next() }
}




server.listen(5001, function(){
	console.log("Servidor corriendo en http://localhost:5001");

});
