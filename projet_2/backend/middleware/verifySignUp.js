const db = require("../models");
const User = db.user;
checkDuplicateUsername = (req, res, next) => {
    //Username
    User.findOne({
        where: {
            emailid: req.body.emailid
        }
    }).then(user => {
    if (user) {
        res.status(400).send({
            message: "Échoué! Nom d'utilisateur est déjà utilisé!"
        });
        return;
    }
    next();
});
};

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
};

module.exports = verifySignUp;