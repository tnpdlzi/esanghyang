const router = require('express').Router()
const controller = require('./pdetail.controller')

router.get('/product', controller.product);
router.get('/material', controller.material);
router.get('/rating', controller.rating);
router.get('/reviews', controller.reviews);
router.get('/gender', controller.gender);

module.exports = router
