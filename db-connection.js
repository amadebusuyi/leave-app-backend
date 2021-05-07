// CREATE CONNECTION TO MYSQL DATABASE

const mysql = require("mysql");

// DATABASE INFORMATION GOES HERE
let host = "localhost";
let dbname = "leave";
let uname = "root";
let pass = "";
let port = "";

// CREATE POOL REQUEST
var pool = mysql.createPool({
    host     : host,
    user     : uname,
    password : pass,
    database : dbname,
    dateStrings: true,
    port     : port,
    // ssl      : true
});

const db = {
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1]; //last arg is callback
        pool.getConnection(function(err, connection) {
        if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
        connection.query(args[0], sql_args, function(err, results) {
          connection.release(); // always put connection back in pool after last query
          if(err){
                    console.log(err);
                    return callback(err);
                }
          callback(null, results);
        });
      });
    }
};

module.exports = db;