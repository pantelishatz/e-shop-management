const express = require('express')
const router = express.Router()

const partnerController = require('../controllers/partner.controller')
router.get('/findAll', partnerController.findAll)
router.get('/findOne/:surname', partnerController.findOne)
router.post('/create', partnerController.create)
router.patch('/update/:surname', partnerController.update);
router.delete('/delete/:surname', partnerController.delete);

module.exports = router