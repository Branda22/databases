var db = require('../db');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      db.Message.findAll({include: [db.User]}).complete(function(result){
        res.header('Content-Type', 'application/json');
        console.log(result);
        res.status(200).json(result);
      });
    },
    post: function (req, res) {
      console.log('REQ BODY', req.body)
      db.User.findOrCreate({
        username: req.body[username]
      }).complete(function(err, user){
        var params = {
          message: req.body[message],
          userid: user.id,
          roomname: req.body[rooname]
        };
        db.Message.create(params).complete(function(err, results){
          res.sendStatus(err ? 401 : 201);
        });
      });
    }
  },
  users: {
    get: function(req, res){},
    post: function (req, res) {
      /*models.users.post(req.body, function(err){
        res.sendStatus(err ? 401 : 200);
      });*/
    }
  }
};

