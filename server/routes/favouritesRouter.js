const Router = require('express')
const router = new Router()
const  favouritesController =require('../controllers/favouritesController')
const  sendmail =require('../mailer')
const authMiddleware = require("../middleware/authMiddleware");
const basketController = require("../controllers/basketController");

router.post('/',authMiddleware, favouritesController.create )
router.get('/:id', favouritesController.getAll)
router.get('/:did/:bid', favouritesController.getOne)
router.delete('/del/:id', favouritesController.delAllDevice)
router.delete('/device/:did/:bid', favouritesController.delOneDevice)


module.exports = router