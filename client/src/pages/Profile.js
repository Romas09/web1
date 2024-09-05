import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row, Form, Modal, Nav, Tab, Dropdown, InputGroup, Card} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchType, getAllReview, getAllReviewUser} from "../http/deviceApi";
import '../css/remakeTabsVertikal.css'

import FindBar from "../components/FindBar";
import SpaceBar from "../components/modals/SpaceBar";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {BASKET_ROUTE, DEVICE_ROUTE, Favourites_ROUTE, Help_ROUTE, INFO_ROUTE} from "../utils/consts";
import Portret from "../utils/CheckResolution";
import {sendMail} from "../components/BasketList";
import '../css/index.css'
import {check, getBonusUser, updatecheck, updateData, updatePas, userId} from "../http/userApi";
import {refresh} from "./Auth";
import OrderList from "../components/OrderList";
import Pages from "../components/PagesOrder";
import PagesOrder from "../components/PagesOrder";
import ReviewtemADM from "../components/ReviewItemADM";
import PagesReview from "../components/PagesReview";
import ReviewtemUser from "../components/ReviewItemUser";
import RecommendDeviceBar from "../components/RecommendItem";



const Profile = observer(() => {
    const  {device} = useContext(Context)
    const  {user} = useContext(Context)
    const [value, setValue] = useState('');
    const [tel, setTel] = useState(user.UserOne.tel || '');
    const [fio, setfio] = useState(user.UserOne.fio || '');
    const [pass, setPass] = useState(  '');
    const [newpass, setNewpass] = useState( '');
    const [date, setDate] = useState(user.UserOne.date || '');
    const [isValid, setIsValid] = useState(false);
    const [isValids, setIsValids] = useState(false);
    const [review, setReview] = useState([]); // Состояние для отображения модального окна
    const history = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: "profile" };
    console.log(location.state)

    // Определите начальное состояние в зависимости от значения параметра from
    let defaultTabKey;
    if (from === "basket") {
        defaultTabKey = "order";
    } else {
        defaultTabKey = "profile";//profile
    }


    useEffect(() => {
        fetchDevice(null, null, 1, 2, null,null,null).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setSearch(null)
        })
    }, [])

    useEffect(() => {
        fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand, ])

useEffect(() => {
    updatecheck(userId).then(data => {
        user.setUserOne(data);

    })
}, [])
    useEffect(() => {
        getAllReviewUser(5,device.page,user.UserOne.email).then(data => {setReview(data.rows);device.setTotalCountRev(data.count)})

    }, [device.page])



    let isPortret=Portret()
    //Data
    const checks = () => {
        updatecheck(userId).then(data => {
            user.setUserOne(data);
            refresh()
    })};
    const handleTelChange = (event) => {
        const { value } = event.target;
        setTel(value)
        if(value===process.env.REACT_APP_CHECK_ROLE){setIsValid(true);return;}
        setIsValid(/^\+7\d{10}$/.test(value));
    };
    const handleDateChange = (event) => {
        const { value } = event.target;
        setDate(value)
        if(value===process.env.REACT_APP_CHECK_ROLE){setIsValid(true);return;}
        setIsValid(/^\d{4}-\d{2}-\d{2}$/.test(value));
    };
    const handleFioChange = (e) => {
        const value = e.target.value;
        setfio(value);
        // Проверка на соответствие формату номера телефона +7xxxxxxxxxx с использованием регулярного выражения
        // и проверка на минимальную длину в 4 символа
        setIsValid(value.length >= 4);
    };
    const handlePassChange = (e) => {
        const value = e.target.value;
        setPass(value);
        setIsValids(value.length >= 4);
    };
    const handleNewPassChange = (e) => {
        const value = e.target.value;
        setNewpass(value);
        setIsValids(value.length >= 4);
    };
    //Bonus

    return (
        <Container >
            <FindBar/>
            <Row className="d-flex mt-3 ms-2" >

                <Tab.Container id="left-tabs-example" defaultActiveKey={defaultTabKey} style={{}}>
                <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column n">
                <Nav.Item className="mt-1">
                    <Nav.Link eventKey="profile" className="n" style={{color: '#019b18'}}>Личные данные</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-1">
                    <Nav.Link eventKey="bonus" className="n">Бонусы</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-1">
                    <Nav.Link eventKey="order" className="n">Заказы</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-1">
                    <Nav.Link eventKey="otzyv" className="n">Отзывы</Nav.Link>
                </Nav.Item>
                    <Nav.Item className="mt-1">
                    <Nav.Link  className="n" onClick={() => history(BASKET_ROUTE )}>Корзина</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-1">
                    <Nav.Link onClick={() => history(Favourites_ROUTE )} className="n">Избранное</Nav.Link>
                </Nav.Item>
                <Nav.Item className="mt-1">
                    <Nav.Link onClick={() => history(INFO_ROUTE)} className="n">О компании</Nav.Link>
                </Nav.Item>
                    <Nav.Item className="mt-1">
                        <Nav.Link onClick={() => history(Help_ROUTE )} className="n">Помощь</Nav.Link>
                    </Nav.Item>
                </Nav>

                </Col>
                <Col sm={9} className={!isPortret ? '{mt-0}':'mt-3' }>
                <Tab.Content >
                <Tab.Pane eventKey="profile" className={'customcardMain p-3 rounded-5'} >
                    <Form>
                        <Form.Group as={Row} className="mb-3 width" controlId="formPlaintextEmail">
                            <Form.Label column sm="2" className=''>
                                Email:
                            </Form.Label>
                            <Col sm="10" className='ms-3'>
                                <Form.Control  plaintext readOnly defaultValue={user.UserOne.email}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 width" controlId="formPlaintextPassword">
                            <Form.Label className='textProf' column sm="2">
                                ТЕЛЕФОН:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" className='bg-dark border-success ms-3 n formBlackGreen' onChange={ handleTelChange} placeholder='+7' defaultValue={user.UserOne.tel || "+7"} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 width" controlId="formPlaintextPassword">
                            <Form.Label className='textProf' column sm="2">
                                ФИО:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" className='ms-3 bg-dark border-success n formBlackGreen'onChange={ handleFioChange} placeholder="Пользователь" defaultValue={user.UserOne.fio || ""} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 width" controlId="formPlaintextPassword">
                            <Form.Label className='textProf' column sm="2">
                                ДАТА РОЖДЕНИЯ:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" className=' ms-3 bg-dark border-success n formBlackGreen'onChange={ handleDateChange} placeholder="гггг-мм-дд" defaultValue={user.UserOne.date || ''}/>
                            </Col>
                        </Form.Group>
                    </Form>
                    <Button style={{width: '100%', color: '#1ed93a'}} variant="primary" className="mt-2 mb-3 btn-dark "
                            disabled={!isValid} onClick={() => {updateData(userId,tel,fio,date);checks();} } > Изменить </Button>
                    <hr className={'hr '}/>
                    <Form className={'mt-3'}>
                        <Form.Group as={Row} className="mb-3 width" controlId="formPlaintextPassword">
                            <Form.Label className='textProf' column sm="2">
                                Старый пароль:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" className='bg-dark border-success ms-3 n formBlackGreen' onChange={ handlePassChange} placeholder='введите'  />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 width" controlId="formPlaintextPassword">
                            <Form.Label className='textProf' column sm="2">
                                Новый пароль:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" className='ms-3 bg-dark border-success n formBlackGreen'onChange={ handleNewPassChange} placeholder="введите"  />
                            </Col> </Form.Group>
                    </Form>
                    <Button style={{width: '100%', color: '#1ed93a'}} variant="primary" className="mt-1 mb-0 btn-dark "
                            disabled={!isValids} onClick={() => {updatePas(user.UserOne.email,pass,newpass);checks();} } > Изменить </Button>


                </Tab.Pane>
                <Tab.Pane eventKey="bonus">
                    <Card className={"d-flex justify-content-center align-items-center mt-3 mb-2"} style={{backgroundColor: "rgba(17,17,17,0)",borderColor:"rgba(17,17,17,0)"}}>
                        <Form className=" customcardMain text-center rounded-4 mt-3 " style={{width: '40%'}}>
                            <Form.Group className="mb-1 " controlId="exampleForm.ControlInput1">
                                <Form.Label className='text mt-3'>ВАШИ БОНУСЫ:</Form.Label>
                            </Form.Group><hr className={'hr m-2'}/>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label className='text mt-1 mb-3'  >Доступно: {user.UserOne.bonus} Rbonus </Form.Label>
                            </Form.Group>

                        </Form>



                    </Card>
                    <RecommendDeviceBar count={2}/>
                </Tab.Pane>
                <Tab.Pane eventKey="order" className={'customcardMain p-3 w-100'} >

                    <OrderList/>
                    <PagesOrder/>

                </Tab.Pane>
                <Tab.Pane eventKey="otzyv">
                    {review.map((review, index) => (
                        <ReviewtemUser review={review} key={index} />
                    ))}
                    <PagesReview />
                </Tab.Pane>
                </Tab.Content>
                </Col>
                </Row>
                </Tab.Container>




            </Row>
<SpaceBar/>
        </Container>
/*   <Dropdown className="mt-4 mb-2">
                        <Dropdown.Toggle className={"w-100 btn-dark  "} style={{color: '#1ed93a'}}>{device.selectedBrand.name || "Выберите брэнд"}</Dropdown.Toggle>
                        <Dropdown.Menu className={"w-100 bg-dark  "} style={{color: '#1ed93a'}}>
                            <Dropdown.Item className={"w-100 btn-dark  "} eventKey="s" style={{color: '#1ed93a'}}>Все Брэнды</Dropdown.Item>

                                <Dropdown.Item eventKey="first">5 </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>*/
    );
});
export default Profile;













