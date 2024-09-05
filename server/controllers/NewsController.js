const uuid = require('uuid')
const path =require('path');
const {Device, DeviceInfo, Review, PromoCode, PrototypeDeviceInfo, BasketDevice, News} = require('../models/models')
const ApiError =require('../error/ApiError')
const db =require('../db1')
const { Op } = require('sequelize');

class NewsController {
    async create(req, res, next) {
        console.log('/////','yes')
        try {
            let {title,text,description,date,type}= req.body

            const {img_glav} =req.files
             const {img_font} =req.files
            const {img_html} =req.files
            let fileName = uuid.v4() + ".jpg"
            let fileName1 = uuid.v4() + ".jpg"
            if(img_html){
                try {
                    img_html.mv(path.resolve(__dirname, '..', 'static/html_image', img_html.name))
                    console.log("false")
                }catch(e)
                {img_html.map(img => {img.mv(path.resolve(__dirname, '..', 'static/html_image', img.name))})
                    console.log("falsesada")}}

            img_glav.mv(path.resolve(__dirname, '..', 'static/news', fileName))
            img_font.mv(path.resolve(__dirname, '..', 'static/news', fileName1))
            const device = await News.create({title,text,description,img_glav: fileName, img_font: fileName1,date,type })
            console.log(img_html)
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
                devices = await News.findAndCountAll({
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
            const device = await News.findOne({where: { id },});
            return res.json( device);
        } catch (error) {
            console.error("Error occurred while fetching device:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }


    async deleteNews(req, res){
        const id =req.params.id
        const device = await db.query('DELETE FROM news WHERE id =$1', [id])
        res.json(device.rows[0])
    }


    async updateNews(req, res){console.log('//////////sdfsdsd')
        const id=req.body.id
        const title=req.body.title
        const text=req.body.text
        const description=req.body.description
        const type=req.body.type
        console.log(title,description,type,id,text)
        const device = await db.query('UPDATE news set title = $1 ,text=$5, description = $2 , type= $3 WHERE id = $4 ', [title,description,type,id,text])
        res.json(device)
    }

}

module.exports = new NewsController()