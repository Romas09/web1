const Router = require('express')
const router = new Router();
const PromoController = require('../controllers/PromoCodeController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), PromoController.create);
router.get('/', PromoController.getAll);
router.get('/one/:name', PromoController.getOne);
router.put('/:name/:date_end', PromoController.updatePromoDate);
router.delete('/del/:name', PromoController.delOnePromo);


module.exports = router