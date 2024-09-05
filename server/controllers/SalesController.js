const uuid = require('uuid')
const path =require('path');
const {Device, DeviceInfo, Review, PromoCode, PrototypeDeviceInfo, BasketDevice, News, Sales} = require('../models/models')
const ApiError =require('../error/ApiError')
const db =require('../db1')
const { Op } = require('sequelize');

class SalesController {
    async create(req, res, next) {
        console.log('/////','yes')
        try {
            let {title,text,description,date_start,date_end,type}= req.body
            const {img_glav} =req.files
            const {img_font} =req.files
            let fileName = uuid.v4() + ".jpg"
            let fileName1 = uuid.v4() + ".jpg"
            img_glav.mv(path.resolve(__dirname, '..', 'static/sales', fileName))
            img_font.mv(path.resolve(__dirname, '..', 'static/sales', fileName1))
            const device = await Sales.create({title,text,description,img_glav: fileName, img_font: fileName1,date_start,date_end,type })
            console.log(device)
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }}



    async  getAll(req, res) {
        let { limit, page, search } = req.query;
        page = page || 1;
        limit = limit || 9;
        let sortBy = 'createdAt'; // сортировка и нужно указывать именно имена сьтолюцов price name createdAt
        let sortOrder =  'DESC';//DESC по убыванию, ASC по возрастанию
        search = search || ''; // Пустая строка, если поиск не задан

        let offset = page * limit - limit;
        let devices;
        const orderOptions = [[sortBy, sortOrder]];
        const whereOptions = {};
        if (search) {
            if(search!='Блог'){
                whereOptions[Op.and] = [
                    {
                        type: {
                            [Op.notILike]: '%Блог%' // Исключение типа "блог"
                        }
                    },
                    {
                        [Op.or]: [
                            {type: {
                                    [Op.iLike]: `%${search}%` // Искать по имени, игнорируя регистр
                                }
                            }]
                    }];
            }else if(search==='Блог') {
                whereOptions.type = {
                    [Op.iLike]: '%Блог%' // Если поиск не задан, исключаем тип "блог"
                };
            }}else  {
            whereOptions.type = {
                [Op.notILike]: '%Блог%' // Если поиск не задан, исключаем тип "блог"
            };
        }
        try {
            devices = await Sales.findAndCountAll({
                where: whereOptions,
                limit,
                offset,
                order: orderOptions
            });
            return res.json(devices);
        } catch (error) {
            console.error("Error occurred while fetching devices:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }


    async getOne(req, res) {
        const { id } = req.params;

        try {
            const device = await Sales.findOne({where: { id },});
            return res.json( device);
        } catch (error) {
            console.error("Error occurred while fetching device:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }


    async deleteSales(req, res){
        const id =req.params.id
        const device = await db.query('DELETE FROM sales WHERE id =$1', [id])
        res.json(device.rows[0])
    }


    async updateSales(req, res){
        const id=req.body.id
        const title=req.body.title
        const text=req.body.text
        const description=req.body.description
        const type=req.body.type
        const date_start=req.body.date_start
        const date_end=req.body.date_end
        console.log(title,description,type,id,text)
        const device = await db.query('UPDATE sales set title = $1 ,text=$5, description = $2 , type= $3, date_start=$6,date_end=$7 WHERE id = $4 ', [title,description,type,id,text,date_start,date_end])
        res.json(device)
    }

}

module.exports = new SalesController()