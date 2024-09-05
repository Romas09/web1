const Router = require('express')
const router = new Router()
const  basketController =require('../controllers/basketController')
const  sendmail =require('../mailer')
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");
const OrderController = require("../controllers/OrderController");

router.post('/',authMiddleware, OrderController.create)
router.get('/',checkRole('ADMIN'), OrderController.getAll)
router.get('/user',authMiddleware, OrderController.getAllforUser)
router.get('/:id', OrderController.getOne)
router.put('/status',checkRole('ADMIN'), OrderController.updateStatus)


module.exports = router

