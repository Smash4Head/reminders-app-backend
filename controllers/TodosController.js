const asyncHandler = require("express-async-handler");

const mysql = require('mysql');
const con = mysql.createPool({
    connectioLimit : 20,
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASS,
    database : process.env.DB
});

// desc - get by id
// route - GET /api/todos
const getTodos = asyncHandler(async (req, res) => {

    if(!req.params.id) res.status(404).send("Not found");
  
    const query = `SELECT * FROM reminders WHERE account_id = ${req.params.id}`;
    
    con.query(query, (err, results) => {
        if (err) return console.log(err.message); res.status(400);
        res.status(200).json(results);
    });
});

const closeCon = asyncHandler(async (req, res) => {

    con.end(function (err) {
        if (err) return console.log(err.message); res.status(400);
        console.log("connection pool closed")
        res.status(200).send("done");
      });
});

module.exports = {
    getTodos, 
    closeCon,
};