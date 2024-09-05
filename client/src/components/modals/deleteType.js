import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {$authHost} from "../../http";

export function deleteTypes(name){
    $authHost.delete(`http://localhost:5000/api/device/types/${name}`)
}

const DeleteType = ({show, onHide}) => {
    const  [value, setValue] = useState('')
    const  deleteType = () => {
        deleteTypes(value).then(data =>{ setValue('')
            onHide()
        }) }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить Тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={value}
                                  onChange={e => setValue(e.target.value)}
                                  placeholder={"Введите название Типа"}  />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={deleteType}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteType;