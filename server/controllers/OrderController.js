const {BasketDevice, Device, DeviceInfo, Review, OrderDevice, Order} =require('../models/models')
const db = require("../db1");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const {Op} = require("sequelize");

class OrderController {
    async create(req, res, next) {
        try {
            let {date, delivery, adres, fio, tel, email, promo,bonus,itog_sum,devicearr,user_id } = req.body
            let status = 'создан';
            const order = await Order.create({date, delivery, adres, fio, tel, email, promo,bonus,itog_sum,status,user_id})
            if (devicearr) {
               // devicearr = JSON.parse(devicearr)
                devicearr.forEach(i =>
                    OrderDevice.create({
                        device_id: i.device_id,
                        device_count: i.device_count,
                        device_sum: i.device_sum,
                        orderId: order.id,
                    }))
            }
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { limit, page, sortBy, sortOrder, search } = req.query;
        page = page || 1;
        limit = limit || 8;
        sortBy = sortBy || 'createdAt';
        sortOrder = sortOrder || 'DESC';
        search = search || ''; // Пустая строка, если поиск не задан

        let offset = page * limit - limit;
        let devices;
        const orderOptions = [[sortBy,sortOrder]];
        const whereOptions = {};

        if (search) {
            if (!isNaN(parseInt(search))) { // Если search - число
                whereOptions[Op.or] = [ // Поиск по ID или имени
                    { id: parseInt(search) }
                ];
            } else {
                // Поиск по столбцу 'status'
                whereOptions.status = { [Op.like]: `%${search}%` };
                sortBy = 'createdAt';
                sortOrder = 'ASC';
            }
        }

        try {
            devices = await Order.findAndCountAll({
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

    async getAllforUser(req, res) {
        let { limit, page, sortBy, sortOrder, search, user_id } = req.query;
        page = page || 1;
        limit = limit || 8;
        sortBy = sortBy || 'createdAt';
        sortOrder = sortOrder || 'DESC';
        search = search || ''; // Пустая строка, если поиск не задан

        let offset = page * limit - limit;
        let devices;
        const orderOptions = [[sortBy, sortOrder]];
        const whereOptions = {
            user_id: user_id // Условие для поиска по user_id
        };

        if (search) {
            if (!isNaN(parseInt(search))) { // Если search - число
                whereOptions[Op.or] = [ // Поиск по ID или имени
                    { id: parseInt(search) }
                ];
            } else {
                // Поиск по столбцу 'status'
                whereOptions.status = { [Op.like]: `%${search}%` };
            }
        }

        try {
            devices = await Order.findAndCountAll({
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


    /*async  getOne(req, res){
        const {id} =req.params
        const device = await  Order.findOne(
            { where: {id},
                include: [{model: OrderDevice, as:'orderdevice'}]
            },
        )
        const devicec = await  Device.findOne(
            { where: {id : 24}},
        )
        return res.json({ devicec, device });}*/
    async getOne(req, res) {
        try {
            const { id } = req.params;

            const order = await Order.findOne({
                where: { id },
                include: [{ model: OrderDevice, as: 'orderdevice' }]
            });

            // Инициализируем массив для хранения результатов запросов к таблице Device
            const devices = [];

            // Итерируемся по каждому элементу в свойстве order.orderdevice и получаем device_id
            for (const orderDevice of order.orderdevice) {
                const { device_id } = orderDevice;

                // Выполняем запрос к таблице Device для каждого device_id
                const device = await Device.findOne({ where: { id: device_id } });

                // Добавляем найденное устройство в массив devices
                devices.push(device);
            }

            // Возвращаем результаты запросов вместе с информацией о заказе
            return res.json({ order, devices });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


    async updateStatus(req, res) {
        const id=req.body.id
        const status=req.body.status
        const device = await db.query('UPDATE orders set  status= $1 WHERE id= $2 ', [status,id])
        return res.json(device)}


}

module.exports = new OrderController()