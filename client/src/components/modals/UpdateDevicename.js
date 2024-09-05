import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrand, fetchDevice, fetchType} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";
import axios from "axios";
import {$authHost} from "../../http";

export function updateBrands(id,name){

    $authHost.put(process.env.REACT_APP_API_URL+`api/device/deviced/${id}/${name}`);

}

const UpdateDevicename = observer(({show, onHide}) => {
    const  {device} = useContext(Context)
    const [id, setID] = useState('')
    const [name, setName] = useState('')


    useEffect(() => {
        fetchBrand().then(data => device.setBrands(data))
    }, [])

    return (
        <Modal show={show} onHide={onHide} size="lg" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить имя Девайса
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control className="mt-3"
                                  placeholder="Введите ID Девайса"
                                  value={id} onChange={e => setID(e.target.value)}/>
                    <hr/>
                </Form>
                <Form>
                <Form.Control className="mt-3"
                        placeholder="Введите новое название Девайса"
                value={name} onChange={e => setName(e.target.value)}/>
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => {updateBrands(id, name);onHide();}}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default UpdateDevicename;