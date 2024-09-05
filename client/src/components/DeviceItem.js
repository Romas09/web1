import React, { useEffect, useState } from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { fetchOneDevice } from "../http/deviceApi";
import {customcard} from "../css/index.css"
import {userId} from "../http/userApi";
import addbasket from "../assets/addBasket1.png";//addbasket.png
import {check, checkFavourite} from "../pages/DevicePage";
import addfavourite from "../assets/favourites.png";

const DeviceItem = ({ device }) => {
    const [devicec, setDevice] = useState({ info: [] });
    const [bool, setBool] = useState(true)

    useEffect(() => {
        fetchOneDevice(device.id).then(data => {setDevice(data.device)
            if(data.device.count<=0){setBool(!bool)}})
    }, [])

    const history = useNavigate();


    return (
        <Col md={6} className="mt-3 devicebody " onClick={() => history(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{ cursor: 'pointer', width: "100%"  }} className="customcardKatalog rounded-4 bg-dark " border={"success"} >
                <Row>
                    <Col xs={6} md={6} className='mt-2'>
                        <Row>
                            <Image style={{width: '170px', height: '170px'}} className={'customcardImageKatalog rounded-4 my-2 ms-4 mx-auto p-0'}   src={`${process.env.REACT_APP_API_URL}/${device.img}?ngrok-skip-browser-warning=true`} />
                        </Row>
                    </Col>
                    <Col xs={6} md={6} className='mt-2'>
                        {devicec.info.slice(0, 4).map((info, index) => (
                            <Row key={info.id} className='m-2 rounded-4 ' style={{ fontSize: '16px',fontWeight:600, background: index % 2 === 0 ? 'darkgreen ' : "black", color: index % 2 === 0 ? 'black' : "#019b18", padding: 5 }}>
                                <Col>{info.title}</Col>
                                <Col>{info.description}</Col>
                            </Row>
                        ))}
                    </Col>
                    <Row className={"mx-1  mb-3 p-0"}>
                        <Col md={6} className="text-center"> {/* Половина ширины для каждой кнопки */}
                            <Button  className={"rotate mt-2 btn btn-outline-success but1 p-2"}
                                     onClick={(e) => {e.stopPropagation();checkFavourite(device.id,userId)}}>
                                Добавить в избранное <Image className="" src={addfavourite} width={25} height={25} style={{fontSize: '0.5em'}}/></Button>
                        </Col>
                        <Col md={6} className="text-center"> {/* Половина ширины для каждой кнопки */}
                            {bool ? (<Button  className={"rotate mt-2 btn btn-outline-success but1 p-2"}
                                              onClick={(e) => { e.stopPropagation(); check(device.id, userId, 1, device.price, device.id, userId, device.id, userId, device.typeId, device.brandId); }}>
                                        Добавить в корзину <Image className=" " src={addbasket} width={25} height={25} style={{fontSize: '0.7em'}}/></Button>
                                ):
                                (<Button  className=" mt-2 mb-3 p-2  btn-outline-danger butDel " >Нет в Наличии</Button>)}

                        </Col>

                    </Row>

                </Row>
                <p className=" m-auto d-inline-block fw-bold  " style={{fontSize: '0.7em',color: '#019b18'}}>артикул: {device.id} рейтинг: {device.rating}</p>
                <p className="m-auto mb-2 d-inline-block fw-bold fs-5 text-uppercase text-success ">{device.name} <span style={{color: '#026507'}}>{device.price}tg</span></p>





            </Card>
        </Col>
    );
};

export default DeviceItem;
