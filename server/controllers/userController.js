const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, Device, Bonus}= require('../models/models')
const db = require("../db1");

const generateJwt = (id, email,tel,fio,date,bonus, role) => {
    return jwt.sign(
        {id, email,tel,fio,date,bonus, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}


class UserController {
    async registration(req, res, next) {
        const {email, password, role}= req.body
       if(!email || !password) {
           return next(ApiError.badRequest('Некорректный почта или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с такой почтой существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword })
        //const basket =await Basket.create({userId: user.id })
        const token = generateJwt(user.id, user.email,user.tel,user.fio,user.date,user.bonus, user.role)
        return res.json( {token})}

        async login (req, res, next) {
        const {email, password} =req.body
        const user = await  User.findOne({where: {email}})
            if(!user){
                return next(ApiError.internal('пользователь с таким именем не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if(!comparePassword) {
                return next(ApiError.internal('пользователь с таким паролем не найден'))
            }
            const token= generateJwt(user.id, user.email,user.tel,user.fio,user.date,user.bonus, user.role)
            return res.json({token})
        }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email,req.user.tel,req.user.fio,req.user.date,req.user.bonus, req.user.role)
        return res.json({token})

      //res.json({message: "all work"})

        /*  const  {id} = req.query
       if(!id){
           return next(ApiError.badRequest(' не задан ID '))
       }
        res.json(id)*/
    }

    async updatePassword(req, res, next) {
        const {email, password}= req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный почта или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.update(
                { password: hashPassword },
                { where: { email: email } }
            );
        }
       return res.json('sd')}

    async updatecheck(req, res) {const id =req.params.id
        const user = await  User.findOne({where: {id}})
        const token = generateJwt(user.id, user.email,user.tel,user.fio,user.date,user.bonus,user.role)
        return res.json({token})}

    async update(req, res) {
        const id=req.body.id
        const tel=req.body.tel
        const fio=req.body.fio
        const date=req.body.date//useris нa users
        const device = await db.query('UPDATE users set tel = $1, fio = $2, date= $3 WHERE id= $4 ', [tel, fio, date,id])
        return res.json(device)}

    async updatePas(req, res,next) {
        const {email, password,newpass} =req.body
        const user = await  User.findOne({where: {email}})
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('пароли не совпадают'))
        }const hashPassword = await bcrypt.hash(newpass, 5)
        const device = await db.query('UPDATE users set password= $1 WHERE email= $2 ', [hashPassword,email])
        return res.json(device)}

    async createBonus(req, res) {
        const iduser=req.body.iduser
        const bonus=req.body.bonus
        const date=req.body.date
        const bonuss = await Bonus.create({iduser,bonus,date})
        return res.json(bonuss)}

    async updateBonus(req, res) {
        const id=req.body.id
        const bonus=req.body.bonus
        let device
        if(!isNaN(parseInt(id))){ device = await db.query('UPDATE users set  bonus= $1 WHERE id= $2 ', [bonus,id])}
       else{  device = await db.query('UPDATE users set  bonus= $1 WHERE email= $2 ', [bonus,id])}
        return res.json(device)}

    async getBonusUser(req, res) {
        const idusers=req.params.iduser
        let device
        if(!isNaN(parseInt(idusers))){ device = await User.findAll({ where: { id: idusers } });}
        else{  device = await User.findAll({ where: { email: idusers } });}
        return res.json(device)}

    async getBonus(req, res) {
        const idusers=req.params.iduser
        console.log(idusers)
        const device = await Bonus.findAll({ where: { iduser: idusers } });
       return res.json(device)}

    async delBonus(req, res) {//доделать
        const id=req.body.id
        const device = await db.query('DELETE FROM bonuses WHERE id =$1', [id])
        return res.json(device)}

   async allUser(req, res){
        const device = await User.findAll();
        res.json(device)
    }

}

module.exports = new UserController()