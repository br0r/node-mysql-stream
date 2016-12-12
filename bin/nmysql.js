#!/usr/bin/env node
var os = require('os');
var mysql = require('mysql');
var Transform = require('stream').Transform;

function exit(msg) {
  console.error(msg);
  process.exit(1);
}

if (process.argv.length <= 3) {
  exit('Too few arguments, should be `nsql dburl query`');
}

if (process.argv.length > 4) {
  exit('Too many arguments');
}

var dburl = process.argv[2];
var m = dburl.match(/([^:]+):([^@]+)@([^\/]+)\/(.+)/);
var user = m[1] || exit('No user');
var password = m[2] || exit('No password');
var host = m[3] || exit('No host');

var db = m[4] || null;

var query = process.argv[3];

var config = {
  host: host,
  user: user,
  password: password,
  database: db
};

var toString = new Transform({
  objectMode: true,
  transform(chunk, enc, next) {
    this.push(JSON.stringify(chunk) + os.EOL);
    next();
  }
});

var conn = mysql.createConnection(config);
conn.connect(function(err) {
  if (err) exit('Could not connect ' + err);

  conn.query(query)
  .stream({highWaterMark: 5})
  .pipe(toString)
  .on('finish', function() {
    conn.end(function(err) {
      if (err) exit('Error when closing ' + err);
      setTimeout(function() {
        process.exit(0);
      }, 500);
    });
  })
  .pipe(process.stdout);
});
