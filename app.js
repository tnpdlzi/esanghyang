const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors 사용
app.use(cors());

/* use router class */
const user = require('./routes/api/user/index');
const webtest = require('./routes/api/webtest/index');
const qna = require('./routes/api/qna/index');
const mypick = require('./routes/api/mypick/index');
const mainpage = require('./routes/api/mainpage/index');
const pdetail = require('./routes/api/pdetail/index');

app.use('/users', user);
app.use('/webtest', webtest);
app.use('/qna', qna);
app.use('/mypick', mypick);
app.use('/mainpage', mainpage);
app.use('/pdetail', pdetail);

app.listen(port, () => console.log(`Listening on port ${port}`)); // 서버 가동시켜줌

module.exports = app;

