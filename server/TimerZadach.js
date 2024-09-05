const uuid = require("uuid");
const path = require("path");
const ApiError = require("./error/ApiError");
const {Device, DeviceInfo, User, PromoCode, PrototypeDeviceInfo, Sales} = require('./models/models')
const db =require('./db1')
const { Op } = require('sequelize');
const UserController = require("./controllers/userController");

async function CheckDateBirthday(req, res) {
     // Преобразуем строку с датой пользователя в объект Date

    try {
        const user = await User.findAll();
        const today = new Date();
        const currentMonth = today.getMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
      /*  const bonuses = await Bonus.findAll();
        bonuses.map(async bonus => {console.log('i')
            const userDate = new Date(bonus.date);
            const userMonth = userDate.getMonth() + 1;
        })*/
        user.map(async users => {
            const userDate = new Date(users.date);
            const userMonth = userDate.getMonth() + 1;
            if (currentMonth === userMonth) {
                const currentDate = today.getDate(); // Текущий день месяца
                const userDay = userDate.getDate(); // День месяца дня рождения пользователя
                if (currentDate === userDay) {
                    const bonus = await db.query('UPDATE useris set  bonus= $1 WHERE id= $2 ', [users.bonus+1000,users.id])
                    //console.log(`Happy birthday, ${users.email}!`);
                }
            }
        });


    } catch (error) {
        console.error(error);
    }
}

async function date (req, res) {
    try {
        const sales = await Sales.findAll();
        var startDate = new Date;
        sales.map(async sale => {
    var endDate = new Date(sale.date_end);
    var timeDifference = endDate.getTime() - startDate.getTime();// Разница между датами в миллисекундах
    var daysDifference = timeDifference / (1000 * 3600 * 24);// Преобразование миллисекунд в дни
    let date= Math.round(daysDifference);// Округление до целого числа
    if(date<0){const result = await db.query('DELETE FROM sales WHERE id = $1', [sale.id]);

    }})}
    catch (error) {
        console.error(error);
    }}

module.exports = {
    CheckDateBirthday: CheckDateBirthday,
    date: date,
};