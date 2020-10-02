const router = require('express').Router() // express의 라우터 함수 사용. controller에서 작성한 모듈들을 한번에 export 해줄 수 있음
const controller = require('./webtest.controller') // user.controller에 있는 exports 된 모듈들을 쓰겠다는 뜻

router.post('/review', controller.review)

module.exports = router; // 위의 애들 한번에 exports
