const Router = require('express')
const router = new Router()
const  sendmail =require('../mailer')
const authMiddleware = require("../middleware/authMiddleware");
const NewsController = require("../controllers/NewsController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/',checkRole('ADMIN'), NewsController.create )
router.get('/', NewsController.getAll)
router.get('/:id', NewsController.getOne)
router.delete('/del/:id', NewsController.deleteNews)
router.put('/', NewsController.updateNews)


module.exports = router