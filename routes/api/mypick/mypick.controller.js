const fs = require('fs'); // 파일시스템. 파일 열고 읽고 할 때 쓰는 모듈
const data = fs.readFileSync('./database.json'); // app.js와 같은 폴더 안에 있는 database.json 파일을 열어서 읽어 data에 저장한다.
const conf = JSON.parse(data); // data에 json 형식으로 저장되어있는 것을 풀어서 conf에 저장한다.
const mysql = require('mysql'); // mysql모듈 선언

const connection = mysql.createConnection({

    host: conf.host,

    user: conf.user,

    password: conf.password,

    port: conf.port,

    database: conf.database

});

connection.connect(); // 생성한 컨넥션을 연결

exports.addP = (req, res) => {

    const uID = req.body.uID;
    const pID = req.body.pID;
    const fID = req.body.fID;

    let params = [uID, pID, fID];

    connection.query(
        'INSERT INTO mypick VALUES (NULL, ?, ?, ?, NOW(), 0);', params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}

exports.addF = (req, res) => {

    const uID = req.body.uID;
    const fName = req.body.fName;
    const infID = req.body.infID;

    let params = [uID, fName, infID];

    connection.query(
        'INSERT INTO folder VALUES (NULL, ?, ?, ?, NOW(), 0);', params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}

exports.addB = (req, res) => {

    const uID = req.body.uID;
    const bID = req.body.bID;

    let params = [uID, bID];

    connection.query(
        'INSERT INTO brandscrap VALUES (?, ?, NOW(), 0);', params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}
