import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createBrand, createReview} from "../../http/deviceApi";
import {Context} from "../../index";


const CreateBrand = ({show, onHide,deviceId}) => {
    const  {user} = useContext(Context)
    const [name, setname ] = useState(user.UserOne.fio)
    const [plus, setplus] = useState('')
    const [minus, setminus ] = useState('')
    const [description, setdescription ] = useState('')
    const [rating, setrating] = useState()
    const [date_use, setdate_use] = useState('')
    let [recomend, setrecomend ] = useState('false')
    let [isvalid, setIsValid ] = useState(false)


    const addReview = () => {
        const currentDate = new Date(Date.now()); // Создаем объект Date с текущим временем
        const year = currentDate.getFullYear(); // Получаем год
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Получаем месяц (плюс 1, так как месяцы нумеруются с 0)
        const day = String(currentDate.getDate()).padStart(2, '0'); // Получаем день
        const formattedDate = `${year}-${month}-${day}`;
        if(recomend){recomend='да'}else{recomend='нет'}
        const formData =new FormData()
        formData.append('name', name)
        formData.append('plus', plus)
        formData.append('minus', minus)
        formData.append('description',description)
        formData.append('rating',rating)
        formData.append('date_use',date_use)
        formData.append('date',formattedDate)
        formData.append('recomend',recomend)
        formData.append('email',user.UserOne.email)
        formData.append('deviceId', deviceId)
        //formData.append('brandId', device.selectedBrand.id)
        createReview(formData)
        onHide()
    }

    const [file, setFile] = useState(null)
    const  selectFile = e => {
        setFile(e.target.files[0])
        console.log(e.target.files)
        console.log(JSON.stringify(e.target.files))
    }
    const updateValidity = () =>{
        setIsValid( name.length > 4 &&
            plus.length > 4 &&
            minus.length > 4 &&
            description.length > 4 &&
            rating !== undefined && // Проверяем rating на существование
            date_use.length > 4);
    };
    return (
        <Modal className={"my-modal"}
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton className={"bg-dark text-success lineBottom"}>
                <Modal.Title  className={"bg-dark text-success"} id="contained-modal-title-vcenter">Добавить Отзыв</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"bg-dark text-success"}>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Dropdown className={"mb-2"}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className={'btn-dark bg-color-success but-dark-Adm'} style={{color: '#1ed93a'}}>{date_use || 'Время использования'}</Dropdown.Toggle>
                            <Dropdown.Menu className={"  but-dark-Adm-list"} style={{color: '#1ed93a'}}>
                                <Dropdown.Item style={{color: '#1ed93a'}} href="#/action-1" onClick={() => setdate_use('Несколько дней')}>Несколько дней</Dropdown.Item>
                                <Dropdown.Item style={{color: '#1ed93a'}} href="#/action-2" onClick={() => setdate_use('Несколько месяцев')}>Несколько месяцев</Dropdown.Item>
                                <Dropdown.Item style={{color: '#1ed93a'}} href="#/action-3" onClick={() => setdate_use('Год или более')}>Год или более</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Label>Имя</Form.Label>
                        <Form.Control className="n mb-2  text-success border-success formBlackGreen"style={{backgroundColor: '#171717'}} defaultValue={name} onChange={e => {setname(e.target.value);updateValidity()}} />
                        <Form.Label>Плюсы</Form.Label>
                        <Form.Control className="n mb-2  text-success border-success formBlackGreen" style={{backgroundColor: '#171717'}} as="textarea" placeholder="+" onChange={e => {setplus(e.target.value);updateValidity()}} />
                        <Form.Label>Минусы</Form.Label>
                        <Form.Control className="n mb-2 text-success border-success formBlackGreen" style={{backgroundColor: '#171717'}} as="textarea" placeholder="-" onChange={e => {setminus(e.target.value);updateValidity()}}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Ваше мнение</Form.Label>
                        <Form.Control className="n mb-2  text-success border-success"  style={{backgroundColor: '#171717'}} as="textarea" rows={3} onChange={e => {setdescription(e.target.value);updateValidity()}} />
                    </Form.Group>
                    <Form.Check  type="switch" id="custom-switch" className={"mb-3 check "} label="Рекомендую к покупке" checked={recomend}
                                 onClick={() => setrecomend(!recomend)}/>
                    <div key={`inline-radio`} className="mb-3">
                        <Form.Label className={"mx-2"} >Оценка</Form.Label>
                    <Form.Check inline label="1" name="group1" type='radio' id={`inline-radio-1`} onClick={() => {setrating(1);updateValidity()}}/>
                    <Form.Check inline label="2" name="group1" type='radio' id={`inline-radio-1`} onClick={() => {setrating(2);updateValidity()}}/>
                    <Form.Check inline label="3" name="group1" type='radio' id={`inline-radio-1`} onClick={() => {setrating(3);updateValidity()}}/>
                    <Form.Check inline label="4" name="group1" type='radio' id={`inline-radio-1`} onClick={() => {setrating(4);updateValidity()}}/>
                    <Form.Check inline label="5" name="group1" type='radio' id={`inline-radio-1`} onClick={() => {setrating(5);updateValidity()}}/>
                    </div>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        {/*<Form.Label>Загрузите до трeх фото, иначе будут загружены первые три</Form.Label>*/}
                        {/*<Form.Control type="file"  multiple onChange={selectFile} />*/}
                    </Form.Group>
                    <Form.Check  type="switch" id="custom-switch" className={"mb-3 check "} label="Согласен на публикацию"
                                 onClick={() => updateValidity()}/>
                    </Form>



            </Modal.Body>
            <Modal.Footer className={"bg-dark text-success lineTop"}>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success"  disabled={!isvalid} onClick={addReview}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );};

export default CreateBrand;

