const {BasketDevice} =require('../models/models')
const db = require("../db1");

class BasketController{
    async create(req, res) {
        const {count,sum,device_id,basket_id,deviceId,basketId,type_id,band_id}= req.body
        const device = await BasketDevice.create({count,sum,device_id,basket_id,type_id,band_id})
        res.json(device)
    }

async getAll (req,res){
        const basket = await BasketDevice.findAll()
    return res.json(basket)
}
    async getOne (req,res){
        const basketId =req.params.id
        const basket =await BasketDevice.findAll({where: {basket_id:basketId}})
        return res.json(basket)
    }
    async checkOne (req,res){
        const did =req.params.did
        const bid =req.params.bid
        const basket = await db.query('SELECT * FROM basket_devices WHERE device_id=$1 AND basket_id=$2', [did,bid])
        return res.json(basket.rows[0])
    }
    async delAllDevice (req,res){
        const basketId =req.params.id
        const basket =await BasketDevice.destroy({where: {basket_id:basketId}})
        return res.json(basket)
    }
    async delOneDevice (req,res){
        const id=req.params.id
        const basket =await BasketDevice.destroy({where: {id}})
        return res.json(basket)
    }
    async updateDevicecount(req, res){
        const id=req.params.id
        const count=req.params.count
        const sum=req.params.summ
        const device = await db.query('UPDATE basket_devices set count = $1, sum = $3 WHERE id= $2 ', [count, id, sum])
        res.json(device)
    }
}

module.exports = new BasketController()