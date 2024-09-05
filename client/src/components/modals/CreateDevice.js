import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrand, fetchOneProtoInfo, fetchType} from "../../http/deviceApi";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const  {device} = useContext(Context)
    const [name, setName] = useState('')
    const [count, setCount] = useState('')
    const [price, setPrice] = useState('')
    const [rating, setRating] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])
    const [defInfo, setDefInfo] = useState([])
    const [description, setDescription] = useState('')
    const [fileall, setFileall] = useState(null)

    useEffect(() => {
        fetchType().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrands(data))
    }, [])


    const addDefaultinfos = async () => {const {data} = await fetchOneProtoInfo(device.selectedType.id || 0)
        setDefInfo(data);
    addDefaultinfo()}

    const addDefaultinfo = () => {
        defInfo.forEach((i, index) => {
            setTimeout(() => {
                setInfo(prevInfo => [
                    ...prevInfo,
                    {
                        title: i.title,
                        description: i.description,
                        number: Date.now()
                    }
                ]);
            }, index * 100); // Умножаем индекс на 500 миллисекунд (половина секунды)
        });
    }




    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo =(key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const  selectFile = e => {
        setFile(e.target.files[0])
    }
    const  selectFile1 = e => {
        let fileListData=e.target.files
        const filesArray = Object.keys(fileListData).map(key => fileListData[key]);
        console.log(e.target.files)
        setFileall(e.target.files)
    }

    const addDevice = () => {
        /*console.log(name, price, file,
        device.selectedBrand.id, device.selectedType.id,  JSON.stringify(info) )*/
        const formData =new FormData()

        if(fileall){
            for (let i = 0; i < fileall.length; i++) {
                formData.append('img_all', fileall[i]);
            }
        }

        formData.append('name', name)
        formData.append('count', count)
        formData.append('price', price)
        formData.append('rating', rating)
        formData.append('img', file)
        formData.append('description', description)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
       formData.append('info', JSON.stringify(info))// надо чинить
        createDevice(formData).then(data => onHide())
        console.log(fileall)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"> Добавить Девайс </Modal.Title>
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
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{device.selectedBrand.name || "Выберите Брэнд"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(brand =>
                            <Dropdown.Item onClick={() => device.setSelectedBrand(brand)}key={brand.id}>
                                {brand.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control className="mt-3" placeholder="Введите название устройства"
                value={name} onChange={e => setName(e.target.value)}/>
                    <Form.Control className="mt-3" placeholder="Введите кол-во устройства" type="number"
                                  value={count} onChange={e => setCount(Number(e.target.value))}/>
                <Form.Control className="mt-3"
                        placeholder="Введите цену устройства"  type="number"
                value={price} onChange={e => setPrice(Number(e.target.value))}/>
                    <Form.Control className="mt-3" placeholder="Введите рейтинг устройства" type="number"
                                  value={rating} onChange={e => setRating(Number(e.target.value))}/>
                    <Form.Label className={'my-2'}>Описание в виде html</Form.Label>
                    <Form.Control className="n mb-2  text-success border-success"  style={{backgroundColor: '#171717'}} as="textarea" rows={3} onChange={e => {setDescription(e.target.value);}} />
                    <Form.Label className={'my-2'}>Добавьте фото главное 4*3</Form.Label>
                    <Form.Control className="mt-3" placeholder="Добавьте картинку устройства"
                              type="file"  onChange={selectFile}/>
                    <Form.Label className={'my-2'}>Добавьте фото в галерею 16*9</Form.Label>
                    <Form.Control type="file"  multiple onChange={selectFile1} />
                    <hr/>
                    <Row>
                        <Col>
                            <Button variant="outline-dark" onClick={addInfo}> Добавить Информацию</Button>
                        </Col>
                        <Col>
                            <Button variant="outline-success" onClick={addDefaultinfos}>Добавить макет информации</Button>
                        </Col>
                    </Row>
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
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );});

export default CreateDevice;