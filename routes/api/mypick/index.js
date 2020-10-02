const router = require('express').Router()
const controller = require('./mypick.controller')

router.post('/addP', controller.addP)
router.post('/addF', controller.addF)
router.post('/addB', controller.addB)

module.exports = router
