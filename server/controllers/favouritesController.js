const {FavouritesDevice} =require('../models/models')
const db = require("../db1");

class FavouritesController{
    async create(req, res) {
        const {device_id,user_id}= req.body
        const device = await FavouritesDevice.create({device_id,user_id})
        res.json(device)
    }

    async getAll (req,res){
        const user_id =req.params.id
        const favourites =await FavouritesDevice.findAll({where: {user_id}})
        return res.json(favourites)
    }

    async getOne (req,res){
        const did =req.params.did
        const bid =req.params.bid
        const basket = await db.query('SELECT * FROM favourites_devices WHERE device_id=$1 AND user_id=$2', [did,bid])
        return res.json(basket.rows[0])
    }

    async delAllDevice (req,res){
        const user_id =req.params.id
        const favourites =await FavouritesDevice.destroy({where: {user_id}})
        return res.json(favourites)
    }
    async delOneDevice (req,res){
        const device_id=req.params.did
        const user_id =req.params.bid
        const favourites = await FavouritesDevice.destroy({ where: { device_id: device_id, user_id: user_id }});
        return res.json(favourites)
    }

}

module.exports = new FavouritesController()