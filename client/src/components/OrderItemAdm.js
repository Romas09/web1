import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Button, Card, Col, Container, Dropdown, Image, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { fetchOneDevice } from "../http/deviceApi";
import {customcard} from "../css/index.css"
import {userId} from "../http/userApi";
import addbasket from "../assets/addBasket1.png";//addbasket.png
import {check, checkFavourite} from "../pages/DevicePage";
import addfavourite from "../assets/favourites.png";
import {fetchOneOrder, updateOrder} from "../http/orderApi";
import {Context} from "../index";
import DeviceItem from "./DeviceItem";
import Portret from "../utils/CheckResolution";
import {refresh} from "../pages/Auth";

const OrderItemAdm = ({ order}) => {
    const { device } = useContext(Context);
    const [orders, setOrder] = useState({ orderdevice: [] });
    const [devices, setDevice] = useState([]);
    const [status, setStatus] = useState([]);
    const [sortBy, setSortBy] = useState();
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
    const Update = () => {if(sortBy){
        updateOrder(order.id,sortBy)
        refresh()
    }

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
                                                   style={{textTransform: 'uppercase', fontWeight: 'bold', color: '#024b02', fontSize: '0.9rem'}}>{order.status}</span> </p>
                                <Col md={6} xs={6} className={'mt-0 mb-2'}>
                                    <Dropdown className={ ''}>
                                        <Dropdown.Toggle variant="dark" id="sort-dropdown" className={"w-100 btn-dark bg-color-success but-dark-Adm"} style={{color: '#1ed93a'}}>
                                            {sortBy || "Изменить статус "}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className={"w-100  but-dark-Adm-list"} style={{color: '#1ed93a'}}>
                                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setSortBy('принят')}}>
                                                Принят</Dropdown.Item>
                                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setSortBy('ожидает оплаты');}}>
                                                Ожидает оплаты</Dropdown.Item>
                                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setSortBy('отправлен')}}>
                                                Отправлен</Dropdown.Item>
                                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setSortBy('на тестировании')}}>
                                                На тестировании</Dropdown.Item>
                                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setSortBy('готов к выдаче')}}>
                                                Готов к выдаче</Dropdown.Item>
                                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setSortBy('выдан')}}>
                                                Выдан</Dropdown.Item>
                                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setSortBy('отменён');}}>
                                                Отменен</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col md={6} xs={6}>
                                    <Button className={"  but-dark-Adm btn-dark  butMain "} style={{color: '#1ed93a'}}
                                            onClick={() => {Update()}}>Изменить</Button>
                                </Col>


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

export default OrderItemAdm;