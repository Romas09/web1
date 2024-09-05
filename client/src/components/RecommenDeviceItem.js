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
import Portret from "../utils/CheckResolution";

const RecomendDeviceItem = ({ id }) => {
    const [device, setDevice] = useState({ info: [] });
    const [bool, setBool] = useState(true)

    useEffect(() => {
        fetchOneDevice(id).then(data => {setDevice(data.device)
            if(data.device.count<=0){setBool(!bool)}});
    }, []);


    const history = useNavigate();
    let isPortret=Portret()

    return (
        <Col  className="text-center d-flex justify-content-center"  >
            <Card {...!isPortret ? {...{style: { cursor: 'pointer', width: "20em" }}} : {...{style: { cursor: 'pointer', width: "15em" }}}}
                  onClick={() => history(DEVICE_ROUTE + '/' + device.id)} className="  rounded-4 bg-dark " border={"success"} >
            <Image style={{width: '10rem', height: '10rem'}} className={' rounded-4 my-2  mx-auto p-0'}   src={process.env.REACT_APP_API_URL+ device.img} />

                    <Row {...!isPortret ? {...{style: { cursor: 'pointer', width: "18em" }}} : {...{style: { cursor: 'pointer', width: "13em" }}}} className={'text-center  mb-2 mx-auto'}>
                <Button  className={" mt-2 btn btn-outline-success but1  p-2 "}
                         onClick={(e) => {e.stopPropagation();checkFavourite(device.id,userId)}}>
                    Добавить в избранное </Button>
                        {bool ? (<Button  className={" mt-2 btn btn-outline-success but1 p-2 "}
                                          onClick={(e) => { e.stopPropagation(); check(device.id, userId, 1, device.price, device.id, userId, device.id, userId, device.typeId, device.brandId); }}>
                                Добавить в корзину  </Button>):
                            (<Button  className=" mt-2 mb-3 p-2  btn-outline-danger butDel " >Нет в Наличии</Button>)}
                    </Row>

                <p className=" m-auto d-inline-block fw-bold  " style={{fontSize: '0.7em',color: '#019b18'}}>артикул: {device.id} рейтинг: {device.rating}</p>
                <p className="m-auto mb-2 d-inline-block fw-bold fs-5 text-uppercase text-success ">{device.name} <span style={{color: '#026507'}}>{device.price}tg</span></p>





            </Card>
        </Col>
    );
};

export default RecomendDeviceItem;
