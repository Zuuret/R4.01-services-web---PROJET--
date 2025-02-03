// auth.js
const authController = require('../controllers/authController');
module.exports = function (app,passport){
    function isLoggedIn(req,res,next) {
        if(req.isAuthenticated())
            return next();
        res.redirect("/signin");
    }
    app.get('/signup',authController.signup);
    app.get('/signin',authController.signin);
    app.get("/logout",authController.logout);
    app.get("/home",isLoggedIn,authController.home);
    app.get("/me", (req, res) => {
        if (req.isAuthenticated()) {
            res.json({ user: req.user });
        } else {
            res.status(401).json({ message: "Non authentifié" });
        }
    });   
    app.post("/signup", passport.authenticate('local-signup',
        {successRedirect: '/home', failureRedirect: '/signup'}
    ));
    app.post("/signin", passport.authenticate('local-signin',
        {successRedirect: '/home', failureRedirect: '/signin'}
    ));
    app.post("/logout", (req, res) => {
        req.logout((err) => {
            if (err) return res.status(500).json({ message: "Erreur lors de la déconnexion" });
            res.json({ message: "Déconnecté avec succès" });
        });
    });    
}