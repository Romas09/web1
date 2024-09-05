import React, {useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createDevice, createType} from "../../http/deviceApi";
import Portret from "../../utils/CheckResolution";
import {createNewses, createSales} from "../../http/NewsandSalesApi";

const CreateSales = ({show, onHide}) => {
    const  [value, setValue] = useState('')
    const  [title, setTitle] = useState('')
    const  [text, setText] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [file1, setFile1] = useState(null)
    const [type, setType] = useState('')
    const  [date_start, setdate_start] = useState('')
    const  [date_end, setdate_end] = useState('')

    let isPortret=Portret()


    const  selectFile = e => {
        setFile(e.target.files[0])
    }
    const  selectFile1 = e => {
        setFile1(e.target.files[0])
    }

    const createNewss = () => {
        const formData =new FormData()


        formData.append('title', title)
        formData.append('text', text)
        formData.append('description', description)
        formData.append('img_glav', file)
        formData.append('img_font', file1)
        formData.append('type', type)
        formData.append('date_start', date_start)
        formData.append('date_end', date_end)
        console.log(formData)
        createSales(formData).then(data => {console.log(data);onHide()})
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить Акцию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className={!isPortret ? 'mb-3' : 'mt-2 mb-2'}>
                    <Dropdown.Toggle variant="dark" id="sort-dropdown" className={"w-100 btn-dark bg-color-success"} style={{color: '#1ed93a'}}>
                        {type || "Выберите тип сортировки "}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={"w-100 bg-dark"} style={{color: '#1ed93a'}}>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setType('Скидка')}}>
                            Скидка</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setType('Промокод')}}>
                            Промокод</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form>
                    <Form.Control value={title}
                                  onChange={e => setTitle(e.target.value)}
                                  placeholder={"Введите название Новости или блога"}  />
                    <Form.Label className={'my-2'}>Текст</Form.Label>
                    <Form.Control className="n mb-2  text-success border-success"  style={{backgroundColor: '#171717'}} as="textarea" rows={3} onChange={e => {setText(e.target.value);}} />
                    <Form.Label className={'my-2'}>html код</Form.Label>
                    <Form.Control className="n mb-2  text-success border-success"  style={{backgroundColor: '#171717'}} as="textarea" rows={3} onChange={e => {setDescription(e.target.value);}} />
                    <Form.Control value={date_start} className={'mt-2'}
                                  onChange={e => setdate_start(e.target.value)}
                                  placeholder={"Введите начало акции"}  />
                    <Form.Control value={date_end} className={'mt-2'}
                                  onChange={e => setdate_end(e.target.value)}
                                  placeholder={"Введите конец акции"}  />
                    <Form.Label className={'my-2'}>Добавьте заголовочную картинку устройства</Form.Label>
                    <Form.Control className="my-1" placeholder="Добавьте заголовочную картинку устройства"
                                  type="file"  onChange={selectFile}/>
                    <Form.Label className={'my-2'}>Добавьте дополнительную картинку устройства</Form.Label>
                    <Form.Control className="my-1" placeholder="Добавьте дополнительную картинку устройства"
                                  type="file"  onChange={selectFile1}/>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={createNewss}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateSales;