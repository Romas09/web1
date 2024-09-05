const Router = require('express')
const router = new Router()
const  basketController =require('../controllers/basketController')
const  sendmail =require('../mailer')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',authMiddleware, basketController.create )
router.post('/sendmail', sendmail.create)
router.post('/sendmailcheck', sendmail.check)
router.post('/sendmailsponsor', sendmail.sponsor)
router.get('/', basketController.getAll)
router.get('/:did/:bid', basketController.checkOne)
router.get('/:id', basketController.getOne)
router.put('/:id/:count/:summ', basketController.updateDevicecount)
router.delete('/:id', basketController.delAllDevice)
router.delete('/device/:id', basketController.delOneDevice)


module.exports = router