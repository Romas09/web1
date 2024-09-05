import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, Col, Dropdown, Form, Row} from "react-bootstrap";
import {fetchOneBasket, fetchOneDevice} from "../http/deviceApi";
import {deleteAllBasket, getPromo} from "../http/Basket_Favourites_PromoApi"
import BasketItem, {deleteDevice} from "./BasketItem";
import {getBonusUser, updateBonus, updatecheck, userId} from "../http/userApi";
import {$authHost, $host} from "../http";
import {refresh} from "../pages/Auth";
import {Link, useNavigate} from "react-router-dom";
import SpaceBar from "./modals/SpaceBar";
import {createOrder} from "../http/orderApi";
import RecommendItem from "./RecommendItem";

export const deleteAllDevice =async (id) => {
    await  $authHost.delete(process.env.REACT_APP_API_URL+`api/basket/${id}`)
    refresh();
}


const BasketList = observer(()=> {
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const[tel, setTel] =useState('')
    const [delivery, setDelivery] = useState('')
    const [adres, setAdres] = useState('')
    const [Fio, setFio] = useState('')
    const [Promo, setPromo] = useState('')
    const [Bonus, setBonus] = useState(0)
    const [Bbonus, setBBonus] = useState(0)
    const [hide, setHide] = useState(false)
    const [isValid, setIsValid] = useState(false);
    const [PromoObject, setPromoObject] = useState(0)
    let [filteredDevicesSum, setfilteredDevicesSum] = useState(0);
    const [telValid, setTelValid] = useState(false);
    const [fioValid, setFioValid] = useState(false);
    const [deliveryAddressValid, setDeliveryAddressValid] = useState(true);

    let [summ, setSumm] = useState(0);
    const history = useNavigate()
    const addSum = () => {let totalSum = 0;
        device.baskets.forEach(basket => {
            totalSum += basket.sum;});
        return totalSum;};

    useEffect(() => {
        updatecheck(userId).then(data => {
            user.setUserOne(data);

        })
    }, [])


    async function DeviceArr() {
        let deviceArr = [];
        // Собираем все промисы в массив
        let promises = device.baskets.map(async basket => {
            let deviceIte = await fetchOneDevice(basket.device_id);
            let deviceItem=deviceIte.device
            if (deviceItem.id === basket.device_id) {
                let deviceIndex = deviceArr.findIndex(item => item.device_id === deviceItem.id);
                if (deviceIndex === -1) {
                    deviceArr.push({
                        device_id: deviceItem.id,
                        device_count: basket.count,
                        device_sum: basket.count * deviceItem.price
                    });
                } else {
                    deviceArr[deviceIndex].device_count += basket.count;
                    deviceArr[deviceIndex].device_sum += basket.count * deviceItem.price;
                }
            }
        });

        // Ждем, пока все промисы завершатся
        await Promise.all(promises);

        return deviceArr;
    }
    const updateValidity = () => {console.log(telValid);
        setIsValid(telValid && fioValid && deliveryAddressValid);
    };
    const handleTelChange = (event) => {
        const { value } = event.target;
        setTel(value)
        setTelValid(/^\d{11}$/.test(value));;updateValidity()
    };
    const handleFioChange = (e) => {
        const value = e.target.value;
        setFio(value);
        setFioValid(value.length >= 4);updateValidity()
    };
    const handleDeliveryAdressChange = (e) => {if(delivery==='Доставка Курьером'){
        const value = e.target.value;
        setAdres(value)
        setDeliveryAddressValid(value.length >= 4)
        updateValidity()}
    };

    const sendMail = async () => {if(delivery==''){return alert("доставка не указана")}
            const currentDate = new Date(Date.now()); // Создаем объект Date с текущим временем
            const year = currentDate.getFullYear(); // Получаем год
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Получаем месяц (плюс 1, так как месяцы нумеруются с 0)
            const day = String(currentDate.getDate()).padStart(2, '0'); // Получаем день
            const formattedDate = `${year}-${month}-${day}`;
            const data=await  DeviceArr()
            const dataB=await getBonusUser(userId)


          createOrder(formattedDate, delivery, adres, Fio, tel, user.UserOne.email, Promo, Bbonus, summ - filteredDevicesSum - Bbonus,userId, data)
        await updateBonus(userId,dataB[0].bonus-Bbonus)
        await updatecheck(userId)
            alert('Заказ был сделан ожидайте звонок')
           deleteAllDevice(userId)
          history('/profile', { state: { from: 'basket' } });

            //это только в не функции объявлять как export фнкцию
            /*const {data} =  await  $host.post(process.env.REACT_APP_API_URL+'api/basket/sendmail',{
                    name,count,price,sum,delivery,nomer,fio })*/}

    ////////////////////////////
    useEffect(() => {
        fetchOneBasket(userId).then(data => device.setBaskets(data))
    }, [])
    useEffect(() => {
        setSumm(addSum());
    }, [device.baskets]);

///////////////////////////////////////////////////
    const handlePromoClicc = () => {
        getPromo(Promo).then(data => {console.log(Promo);
            if (data.length === 0){alert("Промокод не найден");return;}
            else if (data.length > 0) {
                const promo = data[0];
                const currentDate = new Date();
                const startDate = new Date(promo.date_start);
                const endDate = new Date(promo.date_end);

                if (currentDate < startDate || currentDate > endDate) {
                    alert("Промокод не действителен так, как акция не началась или закончилась");return;
                } else if ( summ < promo.min_sum) {
                    alert("Минимальная сумма заказа не достигнута");return;}
                else {
                    if (promo.type_id===-1 && promo.band_id===-1){ setfilteredDevicesSum(Math.round((summ/100)*promo.procent));setPromoObject(promo);return;}
                    //type & band равны чему то
                    if (promo.type_id!==-1 && promo.band_id!==-1){
                        const filteredDevices = device.baskets.filter(dev => dev.type_id === promo.type_id && dev.band_id === promo.band_id);
                        setfilteredDevicesSum(Math.round((((filteredDevices.reduce((accumulator, currentDevice) => {return accumulator + currentDevice.sum;}, 0))/100)*promo.procent)))
                        if (filteredDevices.length === 0) {alert("Промокод не применим к текущим устройствам в корзине");return;}
                        else {setPromoObject(promo);return;}}
                    //только type равен чему то
                    if (promo.type_id!==-1 && promo.band_id===-1){
                        const filteredDevices = device.baskets.filter(dev => dev.type_id === promo.type_id);
                        setfilteredDevicesSum(Math.round((((filteredDevices.reduce((accumulator, currentDevice) => {return accumulator + currentDevice.sum;}, 0))/100)*promo.procent)))
                        if (filteredDevices.length === 0) {alert("Промокод не применим к текущим устройствам в корзине, не подходит тип");return;}
                        else {setPromoObject(promo);return;}}
                    //только band равен чему то
                    if (promo.type_id===-1 && promo.band_id!==-1){
                        const filteredDevices = device.baskets.filter(dev => dev.band_id === promo.band_id);
                        setfilteredDevicesSum(Math.round((((filteredDevices.reduce((accumulator, currentDevice) => {return accumulator + currentDevice.sum;}, 0))/100)*promo.procent)))
                        if (filteredDevices.length === 0) {alert("Промокод не применим к текущим устройствам в корзине, не подходит бренд");return;}
                        else {setPromoObject(promo);return;}}
                }
            }});};
  /////////////



    const handleBonusClic = () => {if(Bonus<=(summ - filteredDevicesSum-1)&&(summ - filteredDevicesSum)>100){
        setBBonus(Bonus)
    }else{alert('Бонусы не могут быть больше итоговой суммы и сумма меньше 100')}
        }

    const checks = () => {
        updatecheck(userId).then(data => {
            user.setUserOne(data);
        })};


    return (
        <Row className="d-flex">


            <Col md={9} >
            {device.baskets.map(basket =>(
                <BasketItem key={basket.id} basket={basket}/>)
            )}
                <Button  className={" mt-2 mb-3 p-2  btn-outline-danger butDel w-100"}
                         onClick={() => {deleteAllBasket(userId); refresh()} } >Удалить все из корзины</Button></Col>
            <Col md={3} >
                <Card style={{ width: '18rem' }} className=" text-center text-success p-0 mt-3 container d-flex justify-content-center align-items-center CardBasket ">
                    <Card.Body >
                        <Card.Title>Ваши Товары</Card.Title>
                            Введите номер телефона имеющий WhatsApp:
                            <Form.Control className="my-2 bg-dark border-success n Forms"
                                          placeholder="Введите через +7:"
                                          type="number"
                                          value={tel} onChange={handleTelChange}/>
                        ФИО:
                        <Form.Control className="my-2 bg-dark border-success n Forms"
                                      placeholder="Поле ввода:"
                                      value={Fio} onChange={ handleFioChange}/>
                        Rbonus доступно: {user.UserOne.bonus}
                        <div className="row">
                            <div className="col">
                                <Form.Control className="my-2 bg-dark border-success n Forms" placeholder="Поле ввода:" value={Bonus} onChange={e => setBonus(e.target.value)} />
                            </div>
                            <div className="col">
                                <Button style={{width: '100%', color: '#1ed93a'}} variant="primary" className="my-2 btn-dark rotate te" disabled={parseInt(Bonus) > user.UserOne.bonus} onClick={() => {handleBonusClic();}} >Списать</Button>
                            </div>
                        </div>
                        Промокод
                        <div className="row">
                            <div className="col">
                                <Form.Control className="my-2 bg-dark border-success n Forms" placeholder="Поле ввода:" value={Promo} onChange={e => setPromo(e.target.value)} />
                            </div>
                            <div className="col">
                                <Button style={{width: '100%', color: '#1ed93a'}} variant="primary" className="my-2 btn-dark rotate te" onClick={() => {handlePromoClicc();}} >Применить</Button>
                            </div>
                        </div>
                        <Card.Text className="my-2 text-danger ">
                                <span>Скидка: { PromoObject.procent !== undefined ? PromoObject.procent+"% "+filteredDevicesSum+"тг" : "нету промокода"} </span>
                        </Card.Text>

                        <Card.Text className="my-2" >
                           Сумма без скидки: {summ} тг
                        </Card.Text>
                        <Card.Text className="my-2" >
                            Итоговая Сумма: {summ-filteredDevicesSum-Bbonus} тг
                        </Card.Text>
                        <Card.Text className="mt-0 mb-0">
                            Доставка по городу Алматы:
                        </Card.Text>
                        <Dropdown className="mt-2 mb-2">
                            <Dropdown.Toggle style={{width: '100%',color: '#1ed93a'}} className="btn-dark bg-color-success" >{delivery || "Выберите тип доставки"}</Dropdown.Toggle>
                            <Dropdown.Menu className="bg-dark">
                                    <Dropdown.Item className={"w-100   bg-color-success"}   style={{color: '#1ed93a'}} onClick={() => {setDelivery('Доставка Курьером');setHide(true);setIsValid(false)}} > Доставка Курьером</Dropdown.Item>
                                <Dropdown.Item onClick={() => {setDelivery('Самовывоз');setHide(false);updateValidity()}}  className={"w-100   bg-color-success"}  style={{color: '#1ed93a'}}>Самовывоз</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {!hide ? (<a></a>):(
                            <Form.Control className="my-2 bg-dark border-success n Forms"
                                          placeholder="Укажите адрес:"
                                          value={adres} onChange={handleDeliveryAdressChange}/>
                        )}
                        <Button style={{width: '100%', color: '#1ed93a'}} variant="primary" className="mt-2 btn-dark rotate"
                                disabled={!isValid} onClick={() => {sendMail()} } > Заказать </Button>
                    </Card.Body>
                </Card>
            </Col>
            <div className={'mt-4'}>
            <RecommendItem/>
            </div>
        </Row>
    );
});

export default BasketList;//sendMail(DeviceName(), DeviceCount(), DevicePrice(),  summ-filteredDevicesSum-Bbonus, delivery, tel, Fio  )




