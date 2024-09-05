import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Image, Row, Spinner} from "react-bootstrap";
import {Context} from "../index";
import '../css/neon.css';
import {$authHost} from "../http";
import {refresh} from "../pages/Auth";
import axios from "axios";
import {checkFavourite} from "../pages/DevicePage";
import {userId} from "../http/userApi";
import addfavourite from "../assets/favourites.png";
import Portret from "../utils/CheckResolution"
import {Link} from "react-router-dom";
import {fetchOneDevice} from "../http/deviceApi";

export const deleteDevice =async (device) => {
      await  $authHost.delete(process.env.REACT_APP_API_URL+`api/basket/device/${device}`)
    refresh();}

export function updateCountdevice(id,count,sum){
    axios.put(process.env.REACT_APP_API_URL+`api/basket/${id}/${count}/${sum}`)
    refresh();};

const DeviceItem = ({basket}) => {
    const[value, setValue] =useState('')
    const[loading, setloading] = useState(true)

    useEffect(async () => {await fetchOneDevice(basket.device_id).then(data =>{
        setValue(data.device)})
    }, []);

    let isPortret =  Portret()
    const increase = () => {  if(basket.count < value.count ){
        updateCountdevice(basket.id,basket.count+1,value.price*(basket.count+1))}
    else {alert("количество не может быть больше наличия")}}
    const decrease = () => {
        if ( basket.count > 1) {
            updateCountdevice(basket.id,basket.count-1,value.price*(basket.count-1))}
        else {deleteDevice(basket.id)}};

    return (
    <Container className="mt-3 mb-2 customcardMain rounded-5 text-success mx-0 " >

        {!isPortret ? (<Row >
            <Col md={4} className="text-center" >
                <Image className="customcardImageMain m-3 rounded-4 p-0" style={{width: '170px', height: '170px'}} src={process.env.REACT_APP_API_URL+ value.img}/>
            </Col>
            <Col md={4}>
                <Form className="d-flex flex-column align-items-center">
                    <h2 className="mt-3 "> {value.name}</h2>
                    <p className="m-0 " style={{fontSize: '0.6em'}}>артикул: {value.id}</p>
                    <div> <p className="text-center text-success ">количество: {basket.count}</p>
                        <Button  onClick={decrease}  variant="primary" className=" btn-dark me-2" style={{ color: '#1ed93a'}}>-</Button>
                        <span className="counter__output">{basket.count}</span>
                        <Button  onClick={increase} variant="primary" className=" btn-dark  ms-2" style={{ color: '#1ed93a'}} >+</Button></div>
                </Form>
            </Col>
            <Col md={4} >
                <Card className="d-flex flex-column align-items-center justify-content-around m-2 border border-0  "
                      style={{width: '90%', height: '90%', fontSize: 32, backgroundColor: 'rgba(217, 217, 217, 0)'}}>
                    <h3>{value.price*basket.count} тг</h3>
                    <Button  className={" mt-2 mb-3 p-2  btn-outline-danger butDel"}
                             onClick={() => deleteDevice(basket.id) } >Удалить из корзины</Button>
                </Card>
            </Col>
        </Row>):(<Row className="">
            <Col xs={6} className="text-center mt-1 "><Row className="ms-2 " >
                <Image className="customcardImageMain m-3 rounded-4 img-fluid p-0" style={{width: '170px', height: '170px'}} src={process.env.REACT_APP_API_URL+ value.img}/>
            </Row> </Col>
            <Col xs={6} className="mt-1"><Row className="ms-2">
                <Form className="d-flex flex-column align-items-center">
                    <h2 className="mt-3 "style={{fontSize: '1.5em'}}> {value.name}</h2>
                    <p className="m-0 " style={{fontSize: '0.6em'}}>артикул: {value.id}</p>
                    <div> <p className="text-center text-success ">количество: {basket.count}</p>
                        <Button  onClick={decrease}  variant="primary" className=" btn-dark me-2" style={{ color: '#1ed93a'}}>-</Button>
                        <span className="counter__output">{basket.count}</span>
                        <Button  onClick={increase} variant="primary" className=" btn-dark  ms-2" style={{ color: '#1ed93a'}} >+</Button></div>
                        <h3>{value.price*basket.count} тг</h3>
                </Form></Row >

            </Col>
            <Card className="d-flex flex-column align-items-center justify-content-around m-2 border border-0  "
                  style={{width: '90%', height: '90%', fontSize: 32, backgroundColor: 'rgba(217, 217, 217, 0)'}}>

                <Button  className={" mt-2 mb-3 p-2  btn-outline-danger butDel"}
                         onClick={() => deleteDevice(basket.id) } >Удалить из корзины</Button>
            </Card>
        </Row>) } </Container>

    );
};//container sky neon

export default DeviceItem;