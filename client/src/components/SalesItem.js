import React, { useEffect, useState } from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {DEVICE_ROUTE, News_ROUTE, Sale_ROUTE} from "../utils/consts";
import { fetchOneDevice } from "../http/deviceApi";
import {customcard} from "../css/index.css"
import {userId} from "../http/userApi";
import addbasket from "../assets/addBasket1.png";//addbasket.png
import {check, checkFavourite} from "../pages/DevicePage";
import addfavourite from "../assets/favourites.png";
import {fetchOneNews} from "../http/NewsandSalesApi";
import * as url from "url";

const SalesItem = ({ sales }) => {

    const date = () => {
        var startDate = new Date;
        var endDate = new Date(sales.date_end);
        var startDate1 = new Date(sales.date_start);
        var timeDifferences = startDate1.getTime() - startDate.getTime();// Разница между датами в миллисекундах
        var daysDifferences = timeDifferences / (1000 * 3600 * 24);
        let setDatestart='';let date= Math.round(daysDifferences);
        if(date<0){ var timeDifference = endDate.getTime() - startDate.getTime();// Разница между датами в миллисекундах
            var daysDifference = timeDifference / (1000 * 3600 * 24);// Преобразование миллисекунд в дни
            setDatestart='Осталось: '+ Math.round(daysDifference);// Округление до целого числа
        }
        else{setDatestart=`Начнется через: ${date+1}`;}
        return setDatestart}



    const history = useNavigate();

    return (
        <Col  className="mt-3  justify-content-center d-flex  "  >
            <Card style={{ width: '20rem', cursor: "pointer" }} className={'customcardNews p-0 m-0 text-center text-success'}
                  onClick={() => history(Sale_ROUTE + '/' + sales.id)}>
                <div style={{
                    backgroundImage: `url(${process.env.REACT_APP_API_URL}/${sales.img_glav})`,
                    height: '12.25rem',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '20rem',
                    position: 'relative'
                }} className={'text-center mx-auto p-0 mt-2 rounded-4 '}>
                    <p style={{backgroundColor: 'rgba(17,17,17,0.71)',
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        marginBottom: '1.4rem' // Добавленный отступ между тегами <p>
                    }} >{sales.title}</p>
                    <p style={{backgroundColor: 'rgba(17,17,17,0.71)',
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        marginBottom: '0rem'
                    }} className="rb5">{date()} дней</p>

                </div>
                {/*<Image  style={{width: '20rem', height: '11.25rem'}} className={'text-center mx-auto p-0 mt-2 rounded-5'}*/}
                {/*        src={process.env.REACT_APP_API_URL+'/'+sales.img_glav} />*/}
                <Card.Body className={'customcardSales p-2 rounded-5'} style={{height: 'auto'}}>
                    {/*<Card.Title className={'m-0 '}>{sales.title}</Card.Title>*/}
                    {/*<Card.Text className={'m-0 mt-1'}>{date()}</Card.Text>*/}
                    {/*<Button variant="warning" className="btn-dark text-success m-0 mt-1">Подробнее</Button>*/}
                </Card.Body>
            </Card>


        </Col>
    );
};

export default SalesItem;
