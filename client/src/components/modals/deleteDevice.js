import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {$authHost} from "../../http";

export function deleteDevices(name){
    $authHost.delete(process.env.REACT_APP_API_URL+`api/device/deviced/${name}`)
}

const DeleteDevice = ({show, onHide}) => {
    const  [value, setValue] = useState('')
    const  deleteDevice = () => {
        deleteDevices(value).then(data =>{ setValue('')
            onHide()
        })}

    return (
        <Modal show={show} onHide={onHide} size="lg" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить Девайс
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={value}
                                  onChange={e => setValue(e.target.value)}
                                  placeholder={"Введите название Девайса"}  />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={deleteDevice}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteDevice;