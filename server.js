const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


console.log(conf);

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fiedls) => {
            console.log(err);
            console.log(rows);
            res.send(rows);
        }
    )
});

app.get('/api/hello', (req, res) => {
    res.send({message: "Hello ~ "});
});

app.listen(port, () => console.log(`Listening on port ${port}`));

console.log('node server 구동 시작 ');
