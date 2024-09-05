import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import '../css/neon.css';
import {$authHost} from "../http";
import {refresh} from "../pages/Auth";
import axios from "axios";
import {check, checkFavourite} from "../pages/DevicePage";
import {userId} from "../http/userApi";
import addbasket from "../assets/addBasket1.png";//addbasket.png
import {deleteOneDevice} from "../http/FavouritesApi";
import {DEVICE_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import addfavourite from "../assets/favourites.png";
import {fetchOneDevice} from "../http/deviceApi";
import {deleteAllBasket} from "../http/Basket_Favourites_PromoApi";
import Portret from "../utils/CheckResolution";




const DeviceItem = ({favourite}) => {
    const[value, setValue] =useState({info: []})
    const {device} = useContext(Context)
    const [bool, setBool] = useState(true)
    const history = useNavigate();
    let isPortret=Portret()

    useEffect(() => {
        fetchOneDevice(favourite.device_id).then(data => {setValue(data.device)
            if(data.device.count<=0){setBool(!bool)}})


    }, [])
console.log(!isPortret)
    return (
        <Col md={12} xs={12} className="mt-3 devicebody d-flex ms-2" onClick={() => history(DEVICE_ROUTE + '/' + value.id)}>
            <Card style={{ cursor: 'pointer', width: "100%"  }} className="customcardKatalog rounded-4 bg-dark " border={"success"} >
                <Row>
                    <Col xs={6} md={6} className='mt-2'>
                        {!isPortret ? (<Row className='ms-5'>
                            <Image style={{width: '180px', height: '180px'}} className={'customcardImageKatalog rounded-4 my-2 ms-4 mx-auto p-0'}   src={process.env.REACT_APP_API_URL + value.img} />
                            </Row>
                                ):(<Row className='ms-2'>
                            <Image style={{width: '170px', height: '170px'}} className={'customcardImageKatalog rounded-4 my-2 ms-1 mx-auto p-0'}   src={process.env.REACT_APP_API_URL + value.img} />
                            </Row>
                            )}

                    </Col>
                    <Col xs={6} md={6} className='mt-2'>
                        {value.info.slice(0, 4).map((info, index) => (
                            <Row key={info.id} className='m-2 rounded-4 ' style={{ fontSize: '16px',fontWeight:600, background: index % 2 === 0 ? 'darkgreen ' : "black", color: index % 2 === 0 ? 'black' : "#019b18", padding: 5 }}>
                                <Col>{info.title}</Col>
                                <Col>{info.description}</Col>
                            </Row>
                        ))}
                    </Col>
                    {!isPortret ? (
                        <Row className={"mx-1  mb-3 p-0"}>
                            <Col md={6} className="text-center"> {/* Половина ширины для каждой кнопки */}
                                <Button  className=" mt-2 mb-3 p-2 ms-2 btn-outline-danger butDel " style={{width: '90%'}}
                                         onClick={(e) => { e.stopPropagation();deleteOneDevice(value.id,userId)} } >Удалить из избранного</Button>
                            </Col>
                            <Col md={6} className="text-center"> {/* Половина ширины для каждой кнопки */}
                                {bool ? (<Button  className="rotate mt-2 btn btn-outline-success but1 p-2 "style={{width: '90%'}}
                                                  onClick={(e) => { e.stopPropagation(); check(value.id, userId, 1, value.price, value.id, userId, value.id, userId, value.typeId, value.brandId); }}>
                                            Добавить в корзину <Image className=" " src={addbasket} width={25} height={25} style={{fontSize: '0.7em'}}/></Button>
                                    ):
                                    (<Button  className=" mt-2 mb-3 p-2 ms-2 btn-outline-danger butDel " >Нет в Наличии</Button>)}
                                </Col>
                            <p className=" m-auto d-inline-block fw-bold text-center  " style={{fontSize: '0.7em',color: '#019b18'}}>артикул: {value.id} рейтинг: {value.rating}</p>
                            <p className="m-auto mb-2 d-inline-block fw-bold fs-5 text-uppercase text-success text-center ">{value.name} <span style={{color: '#026507'}}>{value.price}tg</span></p>

                        </Row>




                    ):(

                        <Row className={"mx-1  mb-3 p-0"}>
                            <p className=" m-auto d-inline-block fw-bold text-center " style={{fontSize: '0.7em',color: '#019b18'}}>артикул: {value.id}</p>
                            <p className="m-auto mb-2 d-inline-block fw-bold fs-5 text-uppercase text-success text-center">{value.name} <span style={{color: '#026507'}}>{value.price}tg</span></p>
                            <Col md={6} className="text-center"> {/* Половина ширины для каждой кнопки */}
                                {bool ? (<Button  className="rotate mt-2 btn btn-outline-success but1 p-2 "style={{width: '90%'}}
                                                  onClick={(e) => { e.stopPropagation(); check(value.id, userId, 1, value.price, value.id, userId, value.id, userId, value.typeId, value.brandId); }}>
                                            Добавить в корзину <Image className=" " src={addbasket} width={25} height={25} style={{fontSize: '0.7em'}}/></Button>
                                    ):
                                    (<Button  className=" mt-2 mb-3 p-2 btn-outline-danger butDel " >Нет в Наличии</Button>)}

                                </Col>
                        <Col md={6} className="text-center"> {/* Половина ширины для каждой кнопки */}
                        <Button  className=" mt-2 mb-3 p-2 btn-outline-danger butDel " style={{width: '90%'}}
                                 onClick={(e) => { e.stopPropagation();deleteOneDevice(value.id,userId)} } >Удалить из избранного</Button>
                        </Col>
                        </Row>
                    )}
                </Row>





            </Card>
        </Col>

    );//<Button className="btn-danger mb-2" onClick={() => deleteOneDevice(value.id,userId) }   ></Button>
};//container sky neon

export default DeviceItem;