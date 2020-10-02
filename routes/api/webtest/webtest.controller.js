const fs = require('fs'); // 파일시스템. 파일 열고 읽고 할 때 쓰는 모듈
const data = fs.readFileSync('./database.json'); // app.js와 같은 폴더 안에 있는 database.json 파일을 열어서 읽어 data에 저장한다.
const conf = JSON.parse(data); // data에 json 형식으로 저장되어있는 것을 풀어서 conf에 저장한다.
const mysql = require('mysql'); // mysql모듈 선언


const connection = mysql.createConnection({ // mysql과 연결해주는 컨넥션을 생성.
// database.json에 있는걸 풀어서 data로, data를 풀어서 conf로 저장했으니 database.json안에 있는 정보를 가져다 연결해준다 라는 것.
// 호스트 (우리 ip) 유저 (사용자 이름) 비밀번호 (사용자 패스워드), 포트 (사용하는 포트), 데이타베이스 (사용하는 데이타베이스)
    host: conf.host,

    user: conf.user,

    password: conf.password,

    port: conf.port,

    database: conf.database

});

connection.connect(); // 생성한 컨넥션을 연결

exports.review = (req, res) => {

    let pID = req.body.pID;
    let uID = req.body.uID;
    let q1 = req.body.q1;
    let q2 = req.body.q2;
    let q3 = req.body.q3;
    let q4 = req.body.q4;
    let q5 = req.body.q5;
    let q6 = req.body.q6;
    let q7 = req.body.q7;
    let q8 = req.body.q8;

    let sql = 'INSERT INTO questiondata VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0);';
    let params = [pID, uID, q1, q2, q3, q4, q5, q6, q7, q8];

    connection.query(sql, params, // params가 ?에 들어간 상태로 쿼리문이 실행되게 된다.

            (err, rows, fields) => { // 리스폰스 해줄 애들.

                res.send(rows); // response 해줬다. rows를

            }
        )
}

// exports.results = (req, res) => {
//
//     let pID = req.body.pID;
//     let uID = req.body.uID;
//     let q1 = req.body.q1;
//     let q2 = req.body.q2;
//     let q3 = req.body.q3;
//     let q4 = req.body.q4;
//     let q5 = req.body.q5;
//     let q6 = req.body.q6;
//     let q7 = req.body.q7;
//     let q8 = req.body.q8;
//
//     let sql = 'SELECT questiondata VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 0);';
//     let params = [pID, uID, q1, q2, q3, q4, q5, q6, q7, q8];
//
//     connection.query(sql, params, // params가 ?에 들어간 상태로 쿼리문이 실행되게 된다.
//
//         (err, rows, fields) => { // 리스폰스 해줄 애들.
//
//             res.send(rows); // response 해줬다. rows를
//
//         }
//     )
// }
