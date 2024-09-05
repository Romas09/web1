const Router = require('express')
const router = new Router()
const  sendmail =require('../mailer')
const authMiddleware = require("../middleware/authMiddleware");
const SalesController = require("../controllers/SalesController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/',checkRole('ADMIN'), SalesController.create )
router.get('/', SalesController.getAll)
router.get('/:id', SalesController.getOne)
router.delete('/del/:id', SalesController.deleteSales)
router.put('/', SalesController.updateSales)


module.exports = router
