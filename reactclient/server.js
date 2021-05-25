const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});
const path = require('path');
const express = require('express');
 
const app = express();
 
app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 3000);
 
const server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});

//Esse arquivo é necessário para que o app rode no heroku.
//Além disso, é necessário instalar o express, e, no 
//package.json precisa, na seção de scripts, ter os seguintes:
//"dev": "webpack serve",
//    "start": "node server.js",
//    "build": "webpack --mode production"
//para mais info: https://www.luiztools.com.br/post/como-publicar-aplicacao-reactjs-na-heroku/#:~:text=Depois%20de%20autenticado%2C%20inicialize%20um,ser%20utilizado%20para%20o%20deploy.&text=Ou%20seja%2C%20quando%20voc%C3%AA%20der,aplica%C3%A7%C3%A3o%20vai%20subir%20em%20produ%C3%A7%C3%A3o.