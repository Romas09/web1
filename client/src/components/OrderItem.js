import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { fetchOneDevice } from "../http/deviceApi";
import {customcard} from "../css/index.css"
import {userId} from "../http/userApi";
import addbasket from "../assets/addBasket1.png";//addbasket.png
import {check, checkFavourite} from "../pages/DevicePage";
import addfavourite from "../assets/favourites.png";
import {fetchOneOrder} from "../http/orderApi";
import {Context} from "../index";
import DeviceItem from "./DeviceItem";
import Portret from "../utils/CheckResolution";

const OrderItem = ({ order}) => {
    const { device } = useContext(Context);
    const [orders, setOrder] = useState({ orderdevice: [] });
    const [devices, setDevice] = useState([]);
    const [status, setStatus] = useState([]);
    const history = useNavigate();
    let isPortret =Portret()


    const FetchStatus = () => {
        if(order.status==='создан' || order.status==='принят' )
        {setStatus('bg-secondary ' )}
        else if(order.status==='ожидает оплаты'|| order.status==='отменён')
        {setStatus('bg-danger text-dark ' )}
        else if(order.status==='отправлен'|| order.status==='на тестировании')
        {setStatus('bg-info text-dark ' )}
        else if(order.status==='готов к выдаче')
        {setStatus('bg-warning text-dark ' )}
        else if(order.status==='выдан')
        {setStatus('bg-success text-dark ' )}
    }


    useEffect(() => {
        fetchOneOrder(order.id).then(data => {
            setOrder(data.order);
            setDevice(data.devices);
        });
    }, [order.id]);
    useEffect(() => {

        FetchStatus();

    }, [order.status]);




    return (
        <Accordion defaultActiveKey={['-1']} alwaysOpen className={"p-0 mt-3"}>
            <Accordion.Item >
                <Accordion.Header  > №Заказ: {order.id} <span style={{fontSize: '0.75em'}} className={'ms-3'}>Дата создания: {order.date} </span></Accordion.Header>
                <Accordion.Body style={{color: '#026507', fontFamily: 'Verdana'}}>

                    <Row>
                        <Col sm md>
                            <Row>
                                <p>№Заказ: {order.id}</p>
                            </Row>
                            <Row>
                                <p>Тип Доставки: {order.delivery}</p>
                            </Row>
                            <Row>
                                <p>Адрес: {order.adres|| 'г.Алматы Айнабулак-2 дом67'}</p>
                            </Row>
                        </Col>
                        {!isPortret ? (<div className="vr"></div>): (<div className="hr mt-1 mb-3"></div>)}
                        <Col sm md>
                            <Row>
                                <p  >Статус: <span className={ status+ ' p-1 rounded-2'}
                                                   style={{textTransform: 'uppercase', fontWeight: 'bold', color: '#024b02', fontSize: '0.9rem'}}>{order.status}</span></p>
                            </Row>
                            <Row>
                                <p>ФИО: {order.fio}</p>
                            </Row>
                            <Row>
                                <p>Email: {order.email}</p>
                            </Row>
                            <Row>
                                <p>Телефон: {order.tel}</p>
                            </Row>
                        </Col>
                        {!isPortret ? (<div className="vr"></div>): (<div className="hr mt-1 mb-3"></div>)}
                        <Col sm md>
                            <Row>
                                <p>Промокод: {order.promo || 'нету'}</p>
                            </Row>
                            <Row>
                                <p>Бонусы: {order.bonus || '0' }Rbonus</p>
                            </Row>
                            <Row>
                                <p>К оплате: {order.itog_sum}тг</p>
                            </Row>
                        </Col>

                    </Row>
                    <div className="hr hr1 mb-2"></div>
                    <Row>
                        <Col sm={12} md={12}>

                            <Accordion defaultActiveKey={['-1']} alwaysOpen className={"bg-dark text-success lineBottom"}>

                                {orders.orderdevice.map((orderItem,index) =>
                                    <Accordion.Item eventKey={index}>
                                        <Accordion.Header  > Товар {devices[index].name} <span style={{fontSize: '0.6em'}} className={'ms-3'}>артикул: {devices[index].id} </span></Accordion.Header>
                                        <Accordion.Body>
                                            <Row>
                                                <Col sm={4} md={4}>{!isPortret ?
                                                    (<Image style={{width: '7em', height: '7em'}}  className={'customcardImageKatalog rounded-4  p-0'}   src={process.env.REACT_APP_API_URL + devices[index].img} />
                                                    ):
                                                    (<Image style={{width: '7em', height: '7em'}}  className={'customcardImageKatalog rounded-4  mb-2 mt-1 p-0'}   src={process.env.REACT_APP_API_URL + devices[index].img} />)}

                                                </Col>
                                                <Col sm={4} md={4}>
                                                    <p>Кол-во: {orderItem.device_count}шт</p>
                                                    <p>Цена за штуку: {devices[index].price}тг</p>
                                                    <p>Сумма: {orderItem.device_sum}тг</p>
                                                </Col>
                                            </Row>
                                        </Accordion.Body>
                                    </Accordion.Item>


                                )}

                            </Accordion>

                        </Col>
                    </Row>

                </Accordion.Body>
            </Accordion.Item>




        </Accordion>



    );
};

export default OrderItem;

/*<Accordion defaultActiveKey={['0']} alwaysOpen>
    <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
    </Accordion.Item>
</Accordion>
/* <Col xs={6} md={6} className='mt-2'>
            {orders.orderdevice.map((orderItem,index) =>
                <Row  >
                    <Image style={{width: '170px', height: '170px'}}  className={'customcardImageKatalog rounded-4 my-2 ms-4 mx-auto p-0'}   src={process.env.REACT_APP_API_URL + devices[index].img} />
                    <h1>{orderItem.device_id}</h1><h2>
                    {order.tel}
                </h2>
                </Row>)}

        </Col>

/*<Col md={6} className="mt-3 devicebody " onClick={() => history(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{ cursor: 'pointer', width: "100%"  }} className="customcardKatalog rounded-4 bg-dark " border={"success"} >
                <Row>
                    <Col xs={6} md={6} className='mt-2'>
                        <Row>
                            <Image style={{width: '170px', height: '170px'}} className={'customcardImageKatalog rounded-4 my-2 ms-4 mx-auto p-0'}   src={process.env.REACT_APP_API_URL + device.img} />
                        </Row>
                    </Col>

                    <Row className={"mx-1  mb-3 p-0"}>
                        <Col md={6} className="text-center"> {/* Половина ширины для каждой кнопки *//*}
<Button  className={"rotate mt-2 btn btn-outline-success but1 p-2"}
         onClick={(e) => {e.stopPropagation();checkFavourite(device.id,userId)}}>
    Добавить в избранное <Image className="" src={addfavourite} width={25} height={25} style={{fontSize: '0.5em'}}/></Button>
</Col>
<Col md={6} className="text-center"> {/* Половина ширины для каждой кнопки *//*}
    <Button  className={"rotate mt-2 btn btn-outline-success but1 p-2"}
             onClick={(e) => { e.stopPropagation(); check(device.id, userId, 1, device.price, device.id, userId, device.id, userId, device.typeId, device.brandId); }}>
        Добавить в корзину <Image className=" " src={addbasket} width={25} height={25} style={{fontSize: '0.7em'}}/></Button>
</Col>

</Row>

</Row>
<p className=" m-auto d-inline-block fw-bold  " style={{fontSize: '0.7em',color: '#019b18'}}>артикул: {device.id}</p>
<p className="m-auto mb-2 d-inline-block fw-bold fs-5 text-uppercase text-success ">{device.name} <span style={{color: '#026507'}}>{device.price}tg</span></p>





</Card>
</Col>
*/