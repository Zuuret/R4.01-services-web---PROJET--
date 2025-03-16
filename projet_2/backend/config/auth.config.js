require('dotenv').config();

module.exports = {
    //vous pouvez modifier cette valeur
    secret: process.env.AUTH_SECRET || "darth-vader",
    jwtExpiration: 60, // 1 minute
    jwtRefreshExpiration: 120, // 2 minutes
};