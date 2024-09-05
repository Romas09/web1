import React, { useEffect, useState } from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {DEVICE_ROUTE, News_ROUTE} from "../utils/consts";
import { fetchOneDevice } from "../http/deviceApi";
import {customcard} from "../css/index.css"
import {userId} from "../http/userApi";
import addbasket from "../assets/addBasket1.png";//addbasket.png
import {check, checkFavourite} from "../pages/DevicePage";
import addfavourite from "../assets/favourites.png";
import {fetchOneNews} from "../http/NewsandSalesApi";

const NewsItem = ({ news,blog }) => {
console.log(blog)

    const history = useNavigate();

    return (
        <Col  className=" justify-content-center d-flex p-1" >
            <Card style={{ width: '18rem' }} className={'mt-3  customcardNews  text-success'}
                  onClick={() => {history(News_ROUTE+ '/' + news.id, { state: { from: blog } });}}>
                <Image  src={process.env.REACT_APP_API_URL + '/'+ news.img_glav}
                        className={'rounded-5'} style={{width: '18rem',height:"10.125rem"}}/>
                <Card.Body>
                    <Card.Title>{news.title}</Card.Title>
                    <Card.Text>Дата публикации: {news.date}</Card.Text>
                    <div className={'text-center'}>
                    <Button variant="warning" className="btn-dark text-success ">Подробнее</Button>
                    </div>

                </Card.Body>
            </Card>


        </Col>
    );
};

export default NewsItem;
