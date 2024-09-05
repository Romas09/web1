const Router = require('express')
const router = new Router()
const  deviceController =require('../controllers/deviceController')
const checkRole = require("../middleware/checkRoleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/',checkRole('ADMIN'), deviceController.create)
router.post('/rev/',authMiddleware, deviceController.createReview)
router.post('/protoinfo/',checkRole('ADMIN'), deviceController.createPrototypeInfo)
router.get('/', deviceController.getAll)
router.get('/rev/', deviceController.getAllreview)
router.get('/rev/user', deviceController.getAllreviewUser)
router.get('/:id', deviceController.getOne)
router.get('/protoinfo/:id', deviceController.getOnePrototypeInfo)
router.put('/rev/',checkRole('ADMIN'), deviceController.updateStatus)
router.put('/brands/:id/:name',checkRole('ADMIN'), deviceController.updateBrand)
router.put('/types/:id/:name',checkRole('ADMIN'), deviceController.updateType)
router.put('/deviced/:id/:name',checkRole('ADMIN'), deviceController.updateDevicename)
router.put('/deviced/:name/:count/:price',checkRole('ADMIN'), deviceController.updateDevice)
router.delete('/deviced/:name',checkRole('ADMIN'), deviceController.deleteDevice)
router.delete('/types/:name',checkRole('ADMIN'), deviceController.deleteType)
router.delete('/brands/:name',checkRole('ADMIN'), deviceController.deleteBrand)
router.delete('/brands/:name',checkRole('ADMIN'), deviceController.deleteBrand)
router.delete('/brands/:name',checkRole('ADMIN'), deviceController.deleteBrand)
router.delete('/protoinfo/:id',checkRole('ADMIN'), deviceController.delOnePrototypeInfo)
router.delete('/rev/:id',checkRole('ADMIN'), deviceController.deleteStatus)


module.exports = router