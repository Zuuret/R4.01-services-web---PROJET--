const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
    const User = sequelize.define('user', {
        id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER,allowNull: false},
        firstname: { type: DataTypes.STRING,notEmpty: true},
        lastname: { type: DataTypes.STRING,notEmpty: true},
        emailid: { type:DataTypes.STRING, validate: {isEmail:true} },
        password : {type: DataTypes.STRING,allowNull: false },
    }, {
        tableName: 'users'
    });
    return User;
}