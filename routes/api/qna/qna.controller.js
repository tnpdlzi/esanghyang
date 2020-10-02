const fs = require('fs'); // 파일시스템. 파일 열고 읽고 할 때 쓰는 모듈
const data = fs.readFileSync('./database.json'); // app.js와 같은 폴더 안에 있는 database.json 파일을 열어서 읽어 data에 저장한다.
const conf = JSON.parse(data); // data에 json 형식으로 저장되어있는 것을 풀어서 conf에 저장한다.
const mysql = require('mysql'); // mysql모듈 선언
const crypto = require('crypto'); // 암호화 할 때 사용하는 모듈


const connection = mysql.createConnection({ // mysql과 연결해주는 컨넥션을 생성.
// database.json에 있는걸 풀어서 data로, data를 풀어서 conf로 저장했으니 database.json안에 있는 정보를 가져다 연결해준다 라는 것. 호스트 (우리 ip) 유저 (사용자 이름) 비밀번호 (사용자 패스워드), 포트 (사용하는 포트), 데이타베이스 (사용하는 데이타베이스)
    host: conf.host,

    user: conf.user,

    password: conf.password,

    port: conf.port,

    database: conf.database

});

connection.connect(); // 생성한 컨넥션을 연결

exports.qRegister = (req, res) => {

    const uID = req.body.uID;
    const type = req.body.type;
    const detail = req.body.detail;
    const email = req.body.email;

    let params = [uID, type, detail, email];

    connection.query(
        'INSERT INTO qna VALUES (NULL, ?, ? ,?, ?, NOW(), 0);', params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}

