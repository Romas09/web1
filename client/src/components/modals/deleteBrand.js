import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {$authHost} from "../../http";

export function deleteBrands(name){
    $authHost.delete(process.env.REACT_APP_API_URL+`api/device/brands/${name}`)
}

const DeleteBrand = ({show, onHide}) => {
    const  [value, setValue] = useState('')
    const  deleteBrand = () => {
        deleteBrands(value).then(data =>{ setValue('')
            onHide()
        }) }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить Брэнд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={value}
                                  onChange={e => setValue(e.target.value)}
                                  placeholder={"Введите название Брэнда"}  />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={deleteBrand}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );};

export default DeleteBrand;