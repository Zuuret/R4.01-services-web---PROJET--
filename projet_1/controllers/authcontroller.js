exports.signup = function (req,res) {
    res.render('signup');
}

exports.signin = function (req,res) {
    res.render('signin');
}
exports.home = function (req,res) {
    res.render('home');
}
exports.logout = (req,res)=>{
    req.session.destroy((err)=>{
        if(!err){
            res.redirect('/signin');
        }
    });
}