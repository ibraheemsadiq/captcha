
var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var config = require('../config/config')();
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    "dialect": "mysql"

});
var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/src/uploads');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});
var upload = multer({ //multer settings
    storage: storage
}).single('file');

var captcha = sequelize.define('captchas', {
    object: Sequelize.STRING,
    src: Sequelize.STRING
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});
sequelize.sync();
/* GET users listing. */
router.get('/', function(req, res, next) {

    if(req.query.operation == 'add')
    {
        var data = JSON.parse(req.query.data);
        // force: true will drop the table if it already exists
        captcha.create(data).then(function(users) {
            res.send(JSON.stringify('ok'));
        });
    }

    if(req.query.operation == 'edit')
    {
        var data = JSON.parse(req.query.data);
        // console.log(req.query.data);
        // force: true will drop the table if it already exists
        captcha.update(data,
            {
                where: {id: data.id}
            }).then(function (msg) {
            console.log(msg);
            res.send(JSON.stringify('ok'));
        });
    }

    if(req.query.operation == 'del')
    {
        // force: true will drop the table if it already exists
        captcha.destroy({
            where: {id: req.query.id}
        }).then(function (msg) {
            res.send(JSON.stringify('ok'));
        });
    }

    if(req.query.operation == 'view')
    {
        captcha.findAll({
            order: [
                // Will escape username and validate DESC against a list of valid direction parameters
                ['id', 'DESC']
                ]
        }).then(function (captcha) {

            res.send(captcha);
        });
    }
        
});

router.post('/upload', function (req, res) {

    upload(req,res,function(err){
        console.log(req);

        if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            //console.log("insert into 3d_printer(userId, size, file) values('"+ req.body.username+"','"+req.body.size+"','"+req.file.filename+"')");

        var data = {
            object: req.body.object,
            src: req.file.filename
        };
        // force: true will drop the table if it already exists
        captcha.create(data).then(function(users) {
            res.send('ok');
        });


        });
})
module.exports = router;

