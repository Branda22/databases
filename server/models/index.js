var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.query('SELECT messages.id, messages.message, messages.roomname, users.username FROM messages JOIN users ON users.ID = messages.username_id', function(err, rows, fields) {
        if (err) console.log(err);
        cb(JSON.stringify({'results': rows}));
      });
    }, // a function which produces all the messages
    post: function (data, cb) {
      db.query('SELECT * FROM from users WHERE username = ?', data.username, function(err, rows, fields){
        data.username_id = rows[0].id;
        db.query('INSERT INTO messages (message, roomname, username_id) VALUES (?)', data, function(err, result){
          cb(err);
        });
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (data, cb) {
      console.log("user post data: ",data); //make sure it has properties "message, roomname, username_id"
        db.query('INSERT INTO users VALUES ?', {'username': data.username}, function(err, result){
          cb(err);
        });
    }
  }
};

