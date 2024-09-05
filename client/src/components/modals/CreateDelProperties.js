import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {
    createDevice,
    createProtoInfo,
    delOneProtoInfo,
    fetchBrand,
    fetchOneProtoInfo,
    fetchType
} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";
import {getPromo} from "../../http/Basket_Favourites_PromoApi";
import {deleteTypes} from "./deleteType";

const CreateDelProperties = observer(({show, onHide}) => {
    const  {device} = useContext(Context)
    const [info, setInfo] = useState([])
    const  [value, setValue] = useState('')

    useEffect(() => {
        fetchType().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo =(key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addProtoInfo = () => {
        const formData =new FormData()
        formData.append('type_id', device.selectedType.id)
        formData.append('info', JSON.stringify(info))// надо чинить
        console.log(formData)
        createProtoInfo(formData).then(data => onHide());onHide()
    }
    const checkProtoInfo = async () => {
        const { data } = await fetchOneProtoInfo(device.selectedType.id);
        if (data[0]!=undefined){return alert('Свойства для данного типа уже существуют');}
        else{addProtoInfo()}
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Добавить Свойства товара по типу </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите Тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>
                                    {type.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <hr/>
                    <Button variant="outline-dark" onClick={addInfo}> Добавить Информацию</Button>
                    { info.map(i =>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                <Form.Control value={i.title}
                                              onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                              placeholder="Введите название свойства"/>
                            </Col>
                            <Col md={4}>
                                <Form.Control value={i.description}
                                              onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                              placeholder="Введите описание свойства" />
                            </Col>
                            <Col md={4}>
                                <Button  onClick={() => removeInfo(i.number)}variant="outline-danger">
                                    Удалить </Button>
                            </Col>
                        </Row>)}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={checkProtoInfo}>Добавить</Button>
            </Modal.Footer>
        <hr/>
            <Modal.Header className={"mt-2"}>
                <Modal.Title id="contained-modal-title-vcenter">Удалить Свойства товара по типу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className={"my-2"}>Выбирете название типа</h5>
                <Row className="mt-2 mb-2">
                    <Col><Dropdown >
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите Тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>
                                    {type.name}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                    <Col>
                    <Button variant="outline-danger" onClick={() => {delOneProtoInfo(device.selectedType.id);onHide();}}>Удалить</Button>
                    </Col>
                    </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );});

export default CreateDelProperties;