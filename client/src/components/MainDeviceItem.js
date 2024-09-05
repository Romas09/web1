import React, { useEffect, useState } from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { fetchOneDevice } from "../http/deviceApi";
import {customcard} from "../css/index.css"
import {userId} from "../http/userApi";
import addbasket from "../assets/addBasket1.png";//addbasket.png
import addfavourite from "../assets/favourites.png";
import {check, checkFavourite} from "../pages/DevicePage";

const MainDeviceItem = ({ device }) => {
    const [devicec, setDevice] = useState({ info: [] });
    useEffect(() => {
        fetchOneDevice(device.id).then(data => setDevice(data));
    }, []);

    const history = useNavigate();

    return (
        <Col md={6} className="mt-3 devicebodyMain " onClick={() => history(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{ cursor: 'pointer', width: "100%"  }} className="customcardMain rounded-4 bg-dark " border={"success"} >
            <Image style={{width: '170px', height: '170px'}} className={'p-0 rounded-4 my-4 mx-auto customcardImageMain '}   src={process.env.REACT_APP_API_URL + device.img} />
                <hr className={"hr"}/>
                <p className="m-auto mb-3 d-inline-block fw-bold  text-uppercase " style={{color: '#019b18', fontSize: '2em'}}>{device.name}</p>
                <p className="m-auto mb-3 d-inline-block fw-bold  text-uppercase " style={{color: '#019b18', fontSize: '0.5em'}}>артикул: {device.id}</p>
                <p className=" m-auto  d-inline-block fw-bold  text-success" style={{color: '#019b18', fontSize: '1.2em'}}>{device.price}tg</p>
                <hr className={"hr"}/>
                <Row className={"mx-2  "}>
                    <Col md={6} className="text-center"> {/* Половина ширины для каждой кнопки */}
                        <Button  className={"rotate mt-2 mb-3 btn btn-outline-success but1"}
                                onClick={(e) => { e.stopPropagation(); check(device.id, userId, 1, device.price, device.id, userId, device.id, userId, device.typeId, device.brandId); }}>
                            Добавить в корзину<Image className="ms-2 my-1" src={addbasket} width={40} height={40}/></Button>
                    </Col>
                    <Col md={6} className="text-center"> {/* Половина ширины для каждой кнопки */}
                        <Button  className={"rotate mt-2 mb-3 btn btn-outline-success but1"}
                                onClick={(e) => {e.stopPropagation();checkFavourite(device.id,userId)}}>
                            Добавить в избранное<Image className="ms-2 my-1" src={addfavourite} width={40} height={40}/></Button>
                    </Col>
                </Row>





            </Card></Col>

    );
};

export default MainDeviceItem;
