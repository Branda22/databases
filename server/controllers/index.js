var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(data){
        res.header('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(data));
      })
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('POST HAS BEEN FIRED');
      models.messages.post(req.body, function(err){
        res.sendStatus(err ? 401 : 200);
      })
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      models.users.post(req.body, function(err){
        res.sendStatus(err ? 401 : 200);
      });
    }
  }
};

