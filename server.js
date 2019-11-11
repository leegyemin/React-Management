const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'birthday': '870128',
            'gender': '남',
            'job': '대학생'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '이계민',
            'birthday': '111111',
            'gender': '남',
            'job': '프로그래머'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '김성남',
            'birthday': '888888',
            'gender': '여',
            'job': '디자이너'
        }
    ])
});

app.get('/api/hello', (req, res) => {
    res.send({message: "Hello ~ "});
});

app.listen(port, () => console.log(`Listening on port ${port}`));

console.log('node server 구동 시작 ');
