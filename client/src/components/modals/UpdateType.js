import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import { fetchType} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";
import axios from "axios";
import {updateBrands} from "./UpdateDevicename";
import {$authHost} from "../../http";

export function updateTypes(id,name){

    $authHost.put(process.env.REACT_APP_API_URL+`api/device/types/${id}/${name}`);
}

const CreateTypes = observer(({show, onHide}) => {
    const  {device} = useContext(Context)
    const [name, setName] = useState('')

    useEffect(() => {
        fetchType().then(data => device.setTypes(data))
    }, [])

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить имя Типа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{device.selectedType.name || "Выберите Тип"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(type =>
                            <Dropdown.Item onClick={() => device.setSelectedType(type)}
                                           key={type.id}>
                                {type.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control className="mt-3"
                        placeholder="Введите новое название Типа"
                value={name} onChange={e => setName(e.target.value)}/>
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={() => {updateTypes(device.selectedType.id, name);onHide()}}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateTypes;