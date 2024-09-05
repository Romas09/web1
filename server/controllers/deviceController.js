const uuid = require('uuid')
const path =require('path');
const {Device, DeviceInfo, Review, PromoCode, PrototypeDeviceInfo, BasketDevice, ImageGallery} = require('../models/models')
const ApiError =require('../error/ApiError')
const db =require('../db1')
const { Op } = require('sequelize');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, count, rating, brandId, typeId, info,description}= req.body
            const {img} =req.files
           let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static/device', fileName))
            const device = await Device.create({name, price, count, rating, brandId, typeId, img: fileName,description})
            if (info){
                info = JSON.parse(info)
                info.forEach( i =>
                DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                }))}
            const {img_all} =req.files
            console.log(req.files)
            if(img_all){console.log(img_all)
                try {let fileName = uuid.v4() + ".jpg"
                    img_all.mv(path.resolve(__dirname, '..', 'static/device/Gallery', fileName))
                    ImageGallery.create({
                        img: fileName,
                        deviceId: device.id
                    })
                    console.log("img_all")
                }catch(e)
                {img_all.map(img => {let fileName = uuid.v4() + ".jpg"
                    img.mv(path.resolve(__dirname, '..', 'static/device/Gallery', fileName))
                    ImageGallery.create({
                        img: fileName,
                        deviceId: device.id
                    })})
                    console.log("img_all22")
                }}
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }}




async  getAll(req, res) {
    let { brandId, typeId, limit, page, sortBy, sortOrder, search } = req.query;
    page = page || 1;
    if (limit === '0') {
        limit = null; // Если limit=0, устанавливаем limit в null для получения всех результатов
    } else {
        limit = limit || 8;
    }
    sortBy = sortBy || 'createdAt'; // сортировка и нужно указывать именно имена сьтолюцов price name createdAt
    sortOrder = sortOrder || 'DESC';//DESC по убыванию, ASC по возрастанию
    search = search || ''; // Пустая строка, если поиск не задан

    let offset = page * limit - limit;
    let devices;
    const orderOptions = [[sortBy, sortOrder]];
    const whereOptions = {};

    if (search) {
        if (!isNaN(parseInt(search))) { // Если search - число
            whereOptions[Op.or] = [ // Поиск по ID или имени
                {
                    id: parseInt(search)
                },
                {
                    name: {
                        [Op.iLike]: `%${search}%` // Искать по имени, игнорируя регистр
                    }
                }
            ];
        } else { // Если search - не число
            whereOptions.name = {
                [Op.iLike]: `%${search}%` // Искать по имени, игнорируя регистр
            };
        }
    }

    try {
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where:{
                    ...whereOptions,
                    count: { [Op.gt]: 0 }},
                limit,
                offset,
                order: orderOptions
            });
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({
                where: { brandId, ...whereOptions,count: { [Op.gt]: 0 }}, // Используем объект расширения для объединения условий
                limit,
                offset,
                order: orderOptions
            });
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: { typeId, ...whereOptions,count: { [Op.gt]: 0 }}, // Используем объект расширения для объединения условий
                limit,
                offset,
                order: orderOptions
            });
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({
                where: { typeId, brandId, ...whereOptions,count: { [Op.gt]: 0 }}, // Используем объект расширения для объединения условий
                limit,
                offset,
                order: orderOptions
            });
        }

        return res.json(devices);
    } catch (error) {
        console.error("Error occurred while fetching devices:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}




   /* async  getOne(req, res){
        const {id} =req.params
        const device = await  Device.findOne(
            { where: {id},
                include: [{model: DeviceInfo, as:'info'},
                    { model: Review, as: 'review'}]
            },
        )
        return res.json(device)}*/
    async getOne(req, res) {
        const { id } = req.params;
        let { reviewPage, reviewLimit, rating } = req.query;
        let sort ;let sortBy
        reviewPage = reviewPage || 1;
        reviewLimit = reviewLimit || 5; // Change the limit as needed
        let offset = reviewPage * reviewLimit - reviewLimit;
        const totalReviews = await Review.count({ where: { deviceId: id, status: 'одобрен' } });
        if (rating==='beter') {
            sort ='rating'; sortBy='DESC'
        }else if (rating==='bad') {
            sort ='rating'; sortBy='ASC'
        }else{sort ='createdAt';sortBy='DESC'}
        try {
            const device = await Device.findOne({
                where: { id },
                include: [
                    { model: DeviceInfo, as: 'info' },
                    { model: ImageGallery, as: 'gallery' },
                    {
                        model: Review,
                        as: 'review',
                        limit: reviewLimit,
                        offset,
                        order: [[sort, sortBy]],
                    },
                ],
            });
            return res.json({ device, totalReviews});
        } catch (error) {
            console.error("Error occurred while fetching device:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }


    async createReview(req, res, next) {
        try {
            let  {name,plus,minus,description,rating,date_use,date,recomend,email,deviceId}= req.body
            let status= 'создан'
            let bonus=0
            const review = await Review.create({name,plus,minus,description,rating,date_use,date,recomend,status,email,bonus,deviceId})
            return res.json(review)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }}
    async updateStatus(req, res) {
        const id=req.body.id
        const iddevice=req.body.iddevice
        const status=req.body.status
        const bonus=req.body.bonus
        const device = await db.query('UPDATE reviews set  status= $1, bonus = $3 WHERE id= $2 ', [status,id,bonus])
        const review= await Review.findAll({ where: { deviceId: iddevice, status: 'одобрен' } });
        let c=0
        review.map((reviews, index) => {console.log(reviews.rating);c=c+reviews.rating})
        c=parseFloat(c/review.length).toFixed(1)
        const d = await db.query('UPDATE devices set rating=$2 WHERE id= $1 ', [iddevice,c])

        return res.json(device)}
    async deleteStatus(req, res){
        const id =req.params.id
        const device = await db.query('DELETE FROM reviews WHERE id =$1', [id])
        res.json(device.rows[0])
    }
    async  getAllreview(req, res) {
        let { limit, page, search, status } = req.query;
        page = page || 1;
        limit = limit || 8;
        let sortBy = 'createdAt'; // сортировка и нужно указывать именно имена сьтолюцов price name createdAt
        let sortOrder = 'DESC';//DESC по убыванию, ASC по возрастанию
        search = search || ''; // Пустая строка, если поиск не задан
        status = status || 'создан'

        let offset = page * limit - limit;
        let devices;
        const orderOptions = [[sortBy, sortOrder]];
        const whereOptions = {};

        if (search) {
                whereOptions.email = {
                    [Op.iLike]: `%${search}%` // Искать по имени, игнорируя регистр
                };
            }
        if (status) {
            whereOptions.status = status; // Добавление условия по рейтингу
        }

        try {
                devices = await Review.findAndCountAll({
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

    async  getAllreviewUser(req, res) {
        let { limit, page, email } = req.query;
        page = page || 1;
        limit = limit || 8;
        let sortBy = 'createdAt'; // сортировка и нужно указывать именно имена сьтолюцов price name createdAt
        let sortOrder = 'DESC';//DESC по убыванию, ASC по возрастанию

        let offset = page * limit - limit;
        let devices;
        const orderOptions = [[sortBy, sortOrder]];
        const whereOptions = {};

            whereOptions.status = 'одобрен';
        whereOptions.email = email;


        try {
            devices = await Review.findAndCountAll({
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




    async createPrototypeInfo(req, res, next) {
        try {
            let  {info,type_id}= req.body
            if (info){
                info = JSON.parse(info)
                info.forEach( i =>
                    PrototypeDeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        type_id: type_id
                    }))}
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }}


    async getOnePrototypeInfo(req, res) {
        const type_id = req.params.id;
        const info = await PrototypeDeviceInfo.findAll({ where: { type_id } });
        return res.json(info);
    }

    async delOnePrototypeInfo(req, res) {
        const type_id = req.params.id;
        const info = await PrototypeDeviceInfo.destroy({ where: {type_id  } });
        return res.json(info);
    }

    async deleteDevice(req, res){
        const name =req.params.name
        const device = await db.query('DELETE FROM devices WHERE name =$1', [name])
        res.json(device.rows[0])

    }

    async deleteType(req, res){
        const name =req.params.name
        const device = await db.query('DELETE FROM types WHERE name =$1', [name])
        res.json(device.rows[0])

    }

    async deleteBrand(req, res){
        const name =req.params.name
        const device = await db.query('DELETE FROM brands WHERE name =$1', [name])
        res.json(device.rows[0])
    }

    async updateBrand(req, res){
        const id=req.params.id
        const name=req.params.name
        const device = await db.query('UPDATE brands set name = $1 WHERE id= $2 ', [name, id])
        res.json(device.rows[0])
    }

    async updateType(req, res){
        const id=req.params.id
        const name=req.params.name
        const device = await db.query('UPDATE types set name = $1 WHERE id= $2 ', [name, id])
        res.json(device.rows[0])
    }

    async updateDevicename(req, res){
        const id=req.params.id
        const name=req.params.name
        const device = await db.query('UPDATE devices set name = $1 WHERE id= $2 ', [name, id])
        res.json(device)
    }

    async updateDevice(req, res){
        const name=req.params.name
        const count=req.params.count
        const price=req.params.price
        const device = await db.query('UPDATE devices set count = $1 , price = $2 WHERE name = $3 ', [count,price,name])
        res.json(device)
    }

}

module.exports = new DeviceController()