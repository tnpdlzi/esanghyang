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

exports.product = (req, res) => {

    const pID = req.query.pID;

    connection.query(
        'SELECT pd.name, pd.price, pd.capacity, bd.bName, bd.bImage, bd.bIntro FROM product AS pd INNER JOIN brand AS bd ON pd.bID = bd.bID WHERE pd.pID = \'' + pID + '\';',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}

exports.material = (req, res) => {

    const pID = req.query.pID;

    connection.query(
        'SELECT m.mName, m.mIntro, m.mImage FROM material AS m INNER JOIN productmaterial AS pm ON m.mID = pm.mID WHERE pm.pID = \'' + pID + '\';',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}

exports.reviews = (req, res) => {

    const pID = req.query.pID;
    console.log(pID);
    connection.query(
        'SELECT u.nickname, tr.createdDate, tr.rating, tr.adv, tr.ddv, tr.helpful, (SELECT it.hashTag FROM imagetag AS it WHERE tr.tID = it.tID) AS hashs, (SELECT COUNT(tc.cID) FROM threecomment AS tc WHERE tr.tID = tc.tID) AS tcCount FROM threereview AS tr INNER JOIN user AS u ON tr.uID = u.uID INNER JOIN imagetag AS it ON it.tID = tr.tID INNER JOIN threecomment AS tc ON tc.tID = tr.tID WHERE tr.pID = \'' + pID + '\';',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}

exports.rating = (req, res) => {

    const pID = req.query.pID;

    connection.query(
        'SELECT (SELECT COUNT(mypick.uID) FROM mypick WHERE mypick.pID = \'' + pID + '\') AS picked, (SELECT COUNT(threereview.rating) FROM threereview WHERE threereview.pID = \'' + pID + '\') AS threeReviewCount, (SUM(threereview.rating) / (SELECT COUNT(threereview.rating) FROM threereview WHERE threereview.pID = \'' + pID + '\')) AS rating, (SELECT COUNT(threereview.rating) FROM threereview WHERE threereview.pID = \'' + pID + '\' AND threereview.rating = \'5\') AS five, (SELECT COUNT(threereview.rating) FROM threereview WHERE threereview.pID = \'' + pID + '\' AND threereview.rating = \'4\') AS four, (SELECT COUNT(threereview.rating) FROM threereview WHERE threereview.pID = \'' + pID + '\' AND threereview.rating = \'3\') AS three, (SELECT COUNT(threereview.rating) FROM threereview WHERE threereview.pID = \'' + pID + '\' AND threereview.rating = \'2\') AS two, (SELECT COUNT(threereview.rating) FROM threereview WHERE threereview.pID = \'' + pID + '\' AND threereview.rating = \'1\') AS one FROM threereview INNER JOIN mypick AS mypick ON mypick.pID = \'' + pID + '\' WHERE threereview.pID = \'' + pID + '\';',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}

exports.gender = (req, res) => {

    const pID = req.query.pID;

    connection.query(
        'SELECT (SELECT COUNT(u.uID) FROM user AS u INNER JOIN threereview AS tr ON tr.uID = u.uID WHERE u.gender = \'f\') AS female, (SELECT COUNT(u.uID) FROM user AS u INNER JOIN threereview AS tr ON tr.uID = u.uID WHERE u.gender = \'m\') AS male FROM threereview AS tr WHERE tr.pID = \'' + pID + '\';',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
}
