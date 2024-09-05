import React, {useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createDevice, createType} from "../../http/deviceApi";
import Portret from "../../utils/CheckResolution";
import {
    createNewses,
    delNews,
    delSales,
    fetchOneNews,
    fetchOneSales,
    updateNews,
    updateSales
} from "../../http/NewsandSalesApi";
import {News_ROUTE} from "../../utils/consts";

const UpdateNews = ({show, onHide}) => {
    const  [value, setValue] = useState('')
    const  [title, setTitle] = useState('')
    const  [text, setText] = useState('')
    const  [date_start, setdate_start] = useState('')
    const  [date_end, setdate_end] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')

    let isPortret=Portret()



    const loadSales = () => {
        fetchOneSales(value).then(data => {
            setTitle(data.title);setDescription(data.description);
            setText(data.text);setType(data.type);
            setdate_end(data.date_end);setdate_start(data.date_start)
        })

    }


    const updateSaless = () => {
        const formData =new FormData()
        formData.append('title', title)
        formData.append('id', value)
        formData.append('text', text)
        formData.append('description', description)
        formData.append('type', type)
        formData.append('date_start', date_start)
        formData.append('date_end', date_end)
        console.log(formData)
        updateSales(formData).then(data => {onHide()})
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
                    Изменить Новости
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control value={value}
                              onChange={e => setValue(e.target.value)}
                              placeholder={"Введите id"}  />
                <Button className="btn-dark text-success butMain w-50 my-2" onClick={() => loadSales()}>Подгрузить изменяемую новость</Button>
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
                    <Form.Control value={text} className="n mb-2  text-success border-success"  style={{backgroundColor: '#171717'}} as="textarea" rows={3} onChange={e => {setText(e.target.value);}} />
                    <Form.Label className={'my-2'}>html код</Form.Label>
                    <Form.Control value={description} className="n mb-2  text-success border-success"  style={{backgroundColor: '#171717'}} as="textarea" rows={3} onChange={e => {setDescription(e.target.value);}} />
                    <Form.Control value={date_start} className={'my-2'}
                                  onChange={e => setdate_start(e.target.value)}
                                  placeholder={"Введите начало акции"}  />
                    <Form.Control value={date_end} className={'my-2'}
                                  onChange={e => setdate_end(e.target.value)}
                                  placeholder={"Введите конец акции"}  />
                </Form>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить Новости
                </Modal.Title>
                <Button className="btn-outline-danger butDel w-50 my-2" onClick={() => {delSales(value);onHide()}}>Удалить</Button>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={updateSaless}>изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateNews;