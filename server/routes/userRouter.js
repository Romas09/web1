const Router = require('express')
const router = new Router()
const UserController =require('../controllers/userController')
const  authMiddleware = require ('../middleware/authMiddleware')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/bonus',checkRole('ADMIN'), UserController.createBonus)
router.get('/auth',authMiddleware, UserController.check)
router.get('/auth/:id',authMiddleware, UserController.updatecheck)
router.get('/all',checkRole('ADMIN'), UserController.allUser)
router.put('/update',authMiddleware, UserController.update)
router.put('/updatep',authMiddleware, UserController.updatePas)
router.get('/bonus/:iduser',authMiddleware, UserController.getBonus)
router.get('/bonususer/:iduser',authMiddleware, UserController.getBonusUser)
router.put('/bonus',checkRole('ADMIN'), UserController.updateBonus)
router.put('/password', UserController.updatePassword)


module.exports = router