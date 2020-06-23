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


app.use('/home', express.static(__dirname + '/private'));


/*
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		//response.send('Welcome back, ' + request.session.username + '!');
		//response.sendFile(path.join(__dirname + '/private/senales.html'));
	
		response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<h1>Product Manaager</h1><br /><br />To create product please enter: ... ');
        

        
        var html = fs.readFileSync(path.join(__dirname + '/private/senales.html'), 'utf8')
    	response.render('home', { html: html })
    

    	response.sendFile('/private/senales.html', {root: __dirname })

		
		fs.readFile(path.join(__dirname + '/private/senales.html'), function (error, pgResp) {
            if (error) {
                response.writeHead(404);
                response.write('Página no encontrada.');
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
*/

server.listen(5001, function(){
	console.log("Servidor corriendo en http://localhost:5001");

});
