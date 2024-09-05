const nodemailer = require('nodemailer')

class sendMailer{

    async create(req, res) {
        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "ichetovkin0907@yandex.kz", // generated ethereal user
                pass: "Marusya0" // generated ethereal password
                    /* service: "gmail",
            auth: {
                user: "notroman297@gmail.com", // generated ethereal user
                pass: "thnmoakgyyylusqc"// generated ethereal password*/
            }})

        await transporter.sendMail({
            from: 'ichetovkin0907@yandex.kz',
            to: 'ichetovkin2004@gmail.com',
            subject: 'Заявка',
            html: `<h2>Сообщение с сайта</h2>
        <h3 >Детали</h3>
        <h3 >Имя: ${req.body.name}</h3>
        <h3 >Кол-во: ${req.body.count}</h3>
        <h3 >Цена: ${req.body.price}</h3>
        <h3 >Сумма: ${req.body.sum}</h3>
        <h3 >Тип доставки: ${req.body.delivery}</h3>
        <h3 >Номер: ${req.body.nomer}</h3>
        <h3 >ФИО: ${req.body.fio}</h3>
        
`
        })}

        /*  host: "smtp.yandex.ru",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
              user: "ichetovkin0907@yandex.kz", // generated ethereal user
              pass: "Marusya097" // generated ethereal password
          }*/

    async check(req, res) {
        try{console.log(req.body.email)
        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "ichetovkin0907@yandex.kz", // generated ethereal user
                pass: "Marusya0" // generated ethereal password
                /* service: "gmail",
        auth: {
            user: "notroman297@gmail.com", // generated ethereal user
            pass: "thnmoakgyyylusqc"// generated ethereal password*/
            }})
        await transporter.sendMail({
            from: 'ichetovkin0907@yandex.kz',
            to: req.body.email,
            subject: 'Заявка',
            html: `<h2>${req.body.kod}</h2>
        <h3 >Детали</h3>
        <h3 >"Выше указанный код нужен для подтверждения вашей почты на сайте rsi.com, если"+"вы не пытались зарегестрироваться, то кто то хочет воспользоваться вашей почтой для регистрации, можете не обращать внимание на данное письмо. А лучше всего перейдите на наш сайт"+"rsi.com и ознакомьтесь с товаром."</h3>
        <h3 >"Еще раз если вы не пытались за регистрироваться просто игнорируйте письмо"</h3>
`
        })

    }catch {}}

async sponsor(req, res) {
    try{console.log(req.body.email)
        let transporter = nodemailer.createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "ichetovkin0907@yandex.kz", // generated ethereal user
                pass: "Marusya0" // generated ethereal password
                /* service: "gmail",
        auth: {
            user: "notroman297@gmail.com", // generated ethereal user
            pass: "thnmoakgyyylusqc"// generated ethereal password*/
            }})
        await transporter.sendMail({
            from: 'ichetovkin0907@yandex.kz',
            to: req.body.email,
            subject: 'Заявка',
            html: `<h2>Сотрудничесвто</h2>
        <h3 >${req.body.email}</h3>
        <h3 >${req.body.fio}</h3>
        <h3 >${req.body.tel}</h3>
        <p >${req.body.opys}</p>
`
        })

    }catch {}}
}


module.exports = new sendMailer()