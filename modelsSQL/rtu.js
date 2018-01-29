
//schema for user table
module.exports = function(sequelize, Datatypes){
    var User = sequelize.define("User",{
        User: Datatypes.STRING,
        Job: Datatypes.STRING,
    });
    return User;
};