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

exports.ranking = (req, res) => {

    const age = req.body.age;
    const kind = req.body.kind;

    connection.query(
        'SELECT pd.name, bd.bName, pdd.image, rank() over(order by COUNT((SELECT mypick.pID FROM mypick WHERE mypick.createdDate BETWEEN DATE_ADD(NOW(), INTERVAL -1 MONTH) AND NOW())) DESC) FROM product AS pd INNER JOIN user ON (user.age / 10) = \'' + Math.floor(age / 10) + '\' INNER JOIN mypick AS mp ON mp.pID = pd.pID AND user.uID = mp.uID INNER JOIN productdetail AS pdd ON pdd.pID = pd.pID INNER JOIN brand AS bd ON pd.bID = bd.bID WHERE mp.pID = pd.pID AND pd.kind = \'' + kind + '\';',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}

exports.rankingAll = (req, res) => {

    const kind = req.body.kind;

    connection.query(
        'SELECT pd.name, bd.bName, pdd.image, rank() over(order by COUNT((SELECT mypick.pID FROM mypick WHERE mypick.createdDate BETWEEN DATE_ADD(NOW(), INTERVAL -1 MONTH) AND NOW())) DESC) FROM product AS pd INNER JOIN user INNER JOIN mypick AS mp ON mp.pID = pd.pID AND user.uID = mp.uID INNER JOIN productdetail AS pdd ON pdd.pID = pd.pID INNER JOIN brand AS bd ON pd.bID = bd.bID WHERE mp.pID = pd.pID AND pd.kind = \'' + kind + '\';',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}

exports.search = (req, res) => {

    const kind = req.body.kind;
    const price = req.body.price;
    const series = req.body.series;
    const topNote = req.body.topNote;
    const age = req.body.age;
    const sQuery = req.body.sQuery;

    let sql1, sql2, sql3, sql4, sql5;

    if(kind != null){
        sql1 = 'pd.kind = ' + kind + ', ';
    } else {
        sql1 = '';
    };

    if(price != null){
        sql2 = 'pd.price = ' + price + ', ';
    } else {
        sql2 = '';
    }

    if(series != null){
        sql3 = 'pdd.series = ' + series + ', ';
    } else {
        sql3 = '';
    }

    if(topNote != null){
        sql4 = 'pdd.topNote = ' + topNote + ', ';
    } else {
        sql4 = '';
    }

    if(age != null){
        sql5 = 'pdd.ageGroup = ' + age + ', ';
    } else {
        sql5 = '';
    }

    connection.query(
        'SELECT pd.name, pd.capacity, pd.price, bd.bName, pdd.image, COUNT((SELECT mp.uID FROM mp WHERE mp.pID = pd.pID)) AS picked, COUNT((SELECT tr.rating FROM threereview AS tr WHERE tr.pID = pd.pID)) AS threeReviewCount, (SUM(tr.rating) / COUNT((SELECT tr.rating FROM tr WHERE tr.pID = pd.pID))) AS rating FROM product AS pd INNER JOIN user INNER JOIN mypick AS mp ON mp.pID = pd.pID AND user.uID = mp.uID INNER JOIN productdetail AS pdd ON pdd.pID = pd.pID INNER JOIN brand AS bd ON pd.bID = bd.bID WHERE ' + sql1 + sql2 + sql3 + sql4 + sql5 + 'pd.name LIKE \'%' + sQuery + '%\';',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}


exports.searchB = (req, res) => {

    const sQuery = req.body.sQuery;

    connection.query(
        'SELECT bName, bImage, bIntro FROM brand WHERE bName LIKE \'%' + sQuery + '%\';',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}


