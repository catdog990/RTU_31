
//schema for user table
module.exports = function(sequelize, Datatypes){
    var user = sequelize.define("User",{
        User: Datatypes.STRING,
        Job: Datatypes.STRING,
    })
}