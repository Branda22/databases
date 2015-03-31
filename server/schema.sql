CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  ID INT(11) NOT NULL auto_increment,
  message TEXT,
  roomname TEXT,
  username_id INT(11),
  PRIMARY KEY (ID)
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  ID int(11) NOT NULL auto_increment,
  username TEXT,
  PRIMARY KEY (ID)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

