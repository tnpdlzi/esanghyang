const router = require('express').Router()
const controller = require('./qna.controller')

router.post('/qRegister', controller.qRegister)

module.exports = router
