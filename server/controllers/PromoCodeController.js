const {PromoCode} =require('../models/models')
const db = require('../db1');

class PromoCodeController {
    async create(req, res) {
        const {name, procent, min_sum, type_id, band_id, date_start, date_end } = req.body;
        const promo = await PromoCode.create({ name, procent, min_sum, type_id, band_id, date_start, date_end });
        res.json(promo);
    }

    async getAll(req, res) {
        const promos = await PromoCode.findAll();
        return res.json(promos);
    }

    async getOne(req, res) {
        const promoId = req.params.name;
        const promo = await PromoCode.findAll({ where: { name: promoId } });
        return res.json(promo);
    }

    async delOnePromo(req, res) {
        const name = req.params.name;
        const promo = await PromoCode.destroy({ where: { name } });
        return res.json(promo);
    }

    async updatePromoDate(req, res) {
        const name = req.params.name;
        const date_ends = req.params.date_end;
        const promo = await db.query('UPDATE promocodes SET date_end = $1 WHERE name = $2', [date_ends, name]);
        res.json(promo);
    }
}

module.exports = new PromoCodeController();