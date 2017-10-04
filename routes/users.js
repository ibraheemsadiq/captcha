var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var config = require('../config/config')();
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    "dialect": "mysql"

});
var users = sequelize.define('users', {
    userName: Sequelize.STRING,
    userEncryptedPassword: Sequelize.STRING,
    userEmail: Sequelize.STRING
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});
sequelize.sync();
/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('recieved');
    users.sync().then(function () {
        console.log('hiss');
        users.findOne({ where: {userName: req.query.username , userEncryptedPassword: req.query.password } }).then(function (users) {
            console.log('hi');

            res.send(users);
        });
    });
});

module.exports = router;

