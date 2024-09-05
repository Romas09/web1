import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrand, fetchDevice, fetchType} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";
import axios from "axios";
import {updateBrands} from "./UpdateDevicename";
import {$authHost} from "../../http";

export function updateDevices(name, count, price){

    $authHost.put(process.env.REACT_APP_API_URL+`api/device/deviced/${name}/${count}/${price}`);
}

const UpdateDevices = observer(({show, onHide}) => {
    const  {device} = useContext(Context)
    const [name, setName] = useState('')
    const [count, setCount] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        fetchBrand().then(data => device.setBrands(data))
    }, [])



    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить свойства Девайса
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form >
                <Form.Control className="mt-3"
                        placeholder="Введите название изменяемого Девайса"
                value={name} onChange={e => setName(e.target.value)}/>
                    <hr/>
                </Form>
                <Form>
                    <Form.Control className="mt-3"
                                  placeholder="Введите количество товара"
                                  value={count} onChange={e => setCount(e.target.value)}/>
                    <hr/>
                </Form>
                <Form>
                    <Form.Control className="mt-3"
                                  placeholder="Введите новую цену"
                                  value={price} onChange={e => setPrice(e.target.value)}/>
                    <hr/>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => {updateDevices(name,count,price);onHide();}}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateDevices;