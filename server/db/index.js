var Sequelize = require('sequelize');
var orm = new Sequelize('chat', 'root', '');

var User = orm.define('User', {
  username: Sequelize.TEXT
}, {
  timestamps: false
});

var Message = orm.define('Message', {
  message: Sequelize.TEXT,
  roomname: Sequelize.TEXT,
  userid: Sequelize.INTEGER
}, {
  timestamps: false
});

User.hasMany(Message);
Message.belongsTo(User);

User.sync();
Message.sync();

exports.User = User;
exports.Message = Message;