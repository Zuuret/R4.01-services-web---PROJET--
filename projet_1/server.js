const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


// Encodage
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.SECRET);

// Handlebars
const exphbs = require("express-handlebars");
app.set("views","./views");
app.set("view engine", ".hbs");
app.engine("hbs",exphbs.engine({extname: ".hbs"
    , defaultLayout:"",layoutsDir:""
}));

// Models
const models = require("./models");
models.sequelize.sync().then(()=> {
    console.log("BDD fonctionne bien");
}).catch((err)=> {
    console.log(err);
})

// Passport
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Mettre à `true` en production avec HTTPS
        httpOnly: true, // Empêche l'accès aux cookies via JavaScript côté client
        sameSite: "lax", // Permet d'envoyer les cookies avec les requêtes venant du front Vue.js
        maxAge: 1000 * 60 * 60 // 1 heure
    }
}));
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport/passport.js")(passport,models.user);
require('./routes/auth.js')(app,passport);

app.get("/",(req,res)=> {
    res.redirect("/home");
})

app.listen(3000,()=>{
    console.log("Serveur ecoute sur port 3000")});