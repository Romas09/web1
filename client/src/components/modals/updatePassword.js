import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal} from "react-bootstrap";
import {createBrand, createReview} from "../../http/deviceApi";
import {Context} from "../../index";
import {checkEmail} from "../../http/Basket_Favourites_PromoApi";
import {login, registration, updatePassword} from "../../http/userApi";


const UpdatePassword = ({show, onHide}) => {
    const  {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const  [password,setPassword] = useState('')
    const [hide, setHide] = useState(false);
    let [isValid, setIsValid ] = useState(false)
    const [kods, setKod] = useState(null);
    const [kodss, setKods] = useState(null);
    const [pass, setPass] = useState(false);
    useEffect(() => {
        setKods(Math.floor(Math.random() * (999999 - 1000 + 1)) + 1000)
    }, [])

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);//setEmail(e.target.value)
        if(value===process.env.REACT_APP_CHECK_ROLE){setIsValid(true);return;}
        // Проверка валидности email-адреса
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setIsValid(isValidEmail);
    };


    const updatepass =async () => {console.log('yes3')
        let kodsin=parseInt(kods)
        if(kodsin===kodss ){ try {console.log('yes43432')
            const data = await updatePassword(email,password)
            console.log('yes')
            } catch (e) {alert(e.response.data.message)}}
        else{alert('код не верный или устарел')}
        onHide()
        console.log('yes2')
    }

    const click = async () => {
        setHide(true)
        console.log(kodss)
       // checkEmail(kodss,email)
        alert('на вашу почту отправлено сообщение')
    }


    return (
        <Modal className={"my-modal"}
               show={show}
               onHide={onHide}
               size="lg"
               centered>
            <Modal.Header closeButton className={"bg-dark text-success lineBottom"}>
                <Modal.Title  className={"bg-dark text-success"} id="contained-modal-title-vcenter">Изменить пароль</Modal.Title>
            </Modal.Header>
            <Modal.Body className={"bg-dark text-success"}>
                <Form>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            value={email}
                            onChange={ handleEmailChange}
                            className="mt-3 bg-dark border-success n formBlackGreen"
                            placeholder="Вевдите вашу почту">
                        </Form.Control>
                        <Form.Control
                            className="formBlackGreen mt-3 bg-dark border-success n "
                            placeholder="Введите ваш пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password">
                        </Form.Control>
                        {!hide ? (<a></a>):(<Col className="d-flex" ><Col md={8} xs={8}><Form.Control
                            className="formBlackGreen mt-3 bg-dark border-success n "
                            placeholder="Введите код с почты"
                            onChange={e => setKod(e.target.value)}
                        >
                        </Form.Control></Col><Col md={4} xs={4}>
                            <Button  className="mt-3 ms-2 btn btn-outline-success but"
                                     onClick={updatepass} disabled={!isValid}>
                                Подтвердить</Button></Col></Col>)}

                </Form></Form>



            </Modal.Body>
            <Modal.Footer className={"bg-dark text-success lineTop"}>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success"  disabled={!isValid} onClick={() => click()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );};

export default UpdatePassword;

