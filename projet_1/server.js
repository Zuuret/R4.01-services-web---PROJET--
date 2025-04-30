const express = require('express');
const app = express();
app.get('/', function(req, res) {
res.send('Welcome to Passport with Sequelize');
});
app.listen(3000, function(err) {
if (!err)
console.log("Le serveur ecoute sur le port 3000");
else console.log(err)
});
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
//Pour BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Pour Passport
app.use(session({ secret: 'butinfo',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
//Pour dotenv
const dotenv = require("dotenv");
dotenv.config()
//Models
const models = require("./models");
const authRoute = require('./routes/auth.js')(app,passport);
//charger les stratégies passport
require('./config/passport/passport.js')(passport,models.user);
//Sync Database
models.sequelize.sync().then(function() {
console.log('La base de données fonctionne bien')
}).catch(function(err) {
console.log(err, "Quelque chose s'est mal passé avec la mise à jour de la base de données!")
});
const exphbs = require('express-handlebars')
//Pour Handlebars
app.set('views', './views')
app.set('view engine', '.hbs');
app.engine(
'hbs',
exphbs.engine({
extname: ".hbs",
defaultLayout: "",
layoutsDir: "",
})
);
