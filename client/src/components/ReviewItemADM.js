import React, {useContext, useEffect, useState} from 'react';
import {Accordion, Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import {delReview, fetchOneDevice, updateReview} from "../http/deviceApi";
import {customcard} from "../css/index.css"
import {getBonusUser, updateBonus, userId} from "../http/userApi";
import addbasket from "../assets/addBasket1.png";//addbasket.png
import {check, checkFavourite} from "../pages/DevicePage";
import addfavourite from "../assets/favourites.png";
import {fetchOneOrder} from "../http/orderApi";
import {Context} from "../index";
import DeviceItem from "./DeviceItem";
import Portret from "../utils/CheckResolution";
import {deleteOneDevice} from "../http/FavouritesApi";
import {refresh} from "../pages/Auth";

const ReviewtemADM = ({ review}) => {
    console.log('order', review)
    const [orders, setOrder] = useState({ orderdevice: [] });
    const [Bbonus, setBbonus] = useState(0);
    let isPortret =Portret()

    const Bonusupdate = async () => {
        const dataB=await getBonusUser(review.email)
        updateReview('одобрен',review.id,Bbonus,review.deviceId)
        let c=parseInt(dataB[0].bonus)+parseInt(Bbonus)
        await updateBonus(review.email,c)

        refresh()
    }


        return (
            <Container className='mt-2 customcardMain ' style={{color: '#0da617'}}>
            <Row className={'mt-2 d-flex justify-content-center align-items-center mx-auto'}>
                <Col sm md={3} className='mt-3'>
                    <p ><span className='text-uppercase fw-bold'>Имя:</span> {review.name}</p>
                </Col>
                <Col sm md={4} className='mt-3'>
                    <p>Время использования: {review.date_use}</p>
                </Col>
                <Col sm md={3} className='mt-3'>
                    <p className='text-uppercase'>{review.status}: {review.date}</p>
                </Col>
            </Row>
            <hr className={'mt-0'}/>
            <Row className={'ms-3'}>
                <Col sm={3} md={2} >
                    <p className='text-uppercase fw-bold'>Плюс:</p>
                </Col>
                <Col sm={9} md={9}>
                    <p style={{whiteSpace: 'pre-wrap' }}>{review.plus}</p>
                </Col>
            </Row>
            <Row className={'ms-3'}>
                <Col sm={3} md={2}>
                    <p className='text-uppercase fw-bold'>Минус:</p>
                </Col>
                <Col sm={9} md={9}>
                    <p style={{whiteSpace: 'pre-wrap' }}>{review.minus}</p>
                </Col>
            </Row>
            <Row className={'ms-3'}>
                <Col sm={3} md={2}>
                    <p className='text-uppercase fw-bold'>Описание:</p>
                </Col>
                <Col sm={9} md={9}>
                    <p  style={{whiteSpace: 'pre-wrap' }}>{review.description}</p>
                </Col>
            </Row>
            <hr className={'mt-0'}/>
            <Row className={'mb-2 ms-2 justify-content-center align-items-center mx-auto'}>
                <Col sm md={3}>
                    <p >Рекомендует: {review.recomend}</p>
                </Col>
                <Col sm md={3}>
                    <p>Оценка: {review.rating}</p>
                </Col>
            </Row>
            <hr/>
            <Row className={'mb-2 ms-2 justify-content-center align-items-center mx-auto'}>
                <Col sm md={4} className={'mb-3'}>
                    <Button  className="  p-1 ms-2 btn-outline-danger butDel " style={{width: '90%'}}
                             onClick={() => { delReview(review.id);refresh()} } >Удалить отзыв</Button>
                </Col>
                <Col sm md={8} className={'mb-3'}>
                    <Form className="d-flex justify-content-center align-items-center  " style={{ borderRadius: '5px' }}>
                        <Form.Control type="number" placeholder="Введите кол-во бонусов" className="n me-1 bg-dark text-success border-success"
                                      style={{minWidth: '110px', width: '600px' }} aria-label="Search" defaultValue={Bbonus}
                                      onChange={e => setBbonus(e.target.value)}
                                     />
                        <Button  className="ms-1  btn btn-outline-success but1 p-1 "style={{width: '90%'}}
                                 onClick={() => {Bonusupdate(); }}>
                            Опубликовать</Button>
                   </Form>


                </Col>
            </Row>
            <hr/>
            <Row className={'mb-2 ms-2 justify-content-center align-items-center mx-auto'}>
                <Col sm md={4} className={'mb-3'}>
                    <p ><span className='text-uppercase fw-bold'>email:</span> {review.email}</p>
                </Col>
                <Col sm md={8} className={'mb-3'}>
                    <p ><span className='text-uppercase fw-bold'>Rbonus начислено:</span> {review.bonus}</p>


                </Col>
            </Row>


        </Container>


    );
};

export default ReviewtemADM;