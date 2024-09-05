import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrand, fetchDevice, fetchType} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";
import axios from "axios";
import {updateTypes} from "./UpdateType";
import {$authHost} from "../../http";

export function updateBrands(id,name){

    $authHost.put(process.env.REACT_APP_API_URL+`api/device/brands/${id}/${name}`);
}

const CreateBrands = observer(({show, onHide}) => {
    const  {device} = useContext(Context)
    const [name, setName] = useState('')

    useEffect(() => {
        fetchBrand().then(data => device.setBrands(data))
    }, [])

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить имя Брэнда
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите Брэнд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item onClick={() => device.setSelectedBrand(brand)}
                                               key={brand.id}>
                                    {brand.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                <Form.Control className="mt-3"
                        placeholder="Введите новое название Брэнда"
                value={name} onChange={e => setName(e.target.value)}/>
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => {updateBrands(device.selectedBrand.id, name);onHide()}}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateBrands;