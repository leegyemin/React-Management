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

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER where isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.use('/image', express.static('./upload')); // image라는 이름으로 upload 폴더를 공유한다(static),  즉 매핑한다.

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = "INSERT INTO CUSTOMER VALUES (null, ? ,? ,? ,? ,?, 0, now() )";
    let image = "/image/" + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 where id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fiedls) => {
            res.send(rows)
        })
});

app.get('/api/hello', (req, res) => {
    res.send({message: "Hello ~ "});
});

app.listen(port, () => console.log(`Listening on port ${port}`));

console.log('node server 구동 시작 ');
