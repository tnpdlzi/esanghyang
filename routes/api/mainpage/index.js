const router = require('express').Router()
const controller = require('./mainpage.controller')

router.post('/ranking', controller.ranking)
router.get('/rankingAll', controller.rankingAll)
router.get('/search', controller.search)
router.get('/searchB', controller.searchB)

module.exports = router
