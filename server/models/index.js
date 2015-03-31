var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      db.query('SELECT messages.ID, messages.message, messages.roomname, users.username FROM messages JOIN users ON users.ID = messages.username_id', function(err, rows, fields) {
        if (err) console.log(err);
        cb(JSON.stringify({'results': rows}));
      });
    }, // a function which produces all the messages
    post: function (data, cb) {

      var grabUser = function(cb){
        db.query('SELECT * FROM users WHERE username = ?', data.username, function(err, rows, fields){
          cb(rows);
        });
      };

      var writeMessage = function(cb){
        db.query('INSERT INTO messages (message, roomname, username_id) VALUES (?,?,?)', [data.message, data.roomname, data.username_id], function(err, result){
          cb();
        });
      };

      grabUser(function(rows){
        console.log(rows, typeof rows);
        if(rows.length === 0){
          //if we get here, there is no username in the database
          module.exports.users.post({username: data.username}, function(err, result){
            data.username_id = result.insertId;
            writeMessage(function(){
              cb(false);
            });
          })
        } else {
          data.username_id = rows[0].ID;
          writeMessage(function(){
            cb(false);
          })
        }
      });

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (data, cb) {
        db.query('INSERT INTO users (username) VALUES (?)', data.username, function(err, result){
          cb(err, result);
        });
    }
  }
};

