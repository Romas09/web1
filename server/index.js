// noinspection JSCheckFunctionSignatures
require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors= require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler =require('./middleware/ErrorHandlingMiddleWare')
const PORT = process.env.PORT || 5500
const path =require('path')
const cron = require('node-cron');
const { exec } = require('child_process');
const {CheckDateBirthday,date} = require("./TimerZadach");

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static/device')))
app.use(express.static(path.resolve(__dirname, 'static/device/Gallery')))
app.use(express.static(path.resolve(__dirname, 'static/news')))
app.use(express.static(path.resolve(__dirname, 'static/review')))
app.use(express.static(path.resolve(__dirname, 'static/html_image')))
app.use(express.static(path.resolve(__dirname, 'static/sales')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)//обязательно только в конце всех апп так как обработка ошибок
// и сразу идет возрат ошибки клиенту
CheckDateBirthday()
date()
setInterval(() => {
    CheckDateBirthday()
    date()
    }, 24 * 60 * 60 * 1000);//24 * 60 * 60 * 1000
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log('Server started on port ${5000}'))
    } catch (e) {
        console.log(e)
    }
}

start()


