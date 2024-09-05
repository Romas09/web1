import React, {Component, useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row, Form, Modal, Carousel, InputGroup} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchType, limit, LimitPage} from "../http/deviceApi";
import Slider from "react-slick";
import FindBar from "../components/FindBar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {refresh} from "./Auth";
import Portret from "../utils/CheckResolution";
import {getAllNews, getAllSales} from "../http/NewsandSalesApi";
import SalesItem from "../components/SalesItem";
import RecommendDeviceBar from "../components/RecommendItem";
import company from '../assets/Frame 2.png'
import reclamaM from '../assets/reclama.png'
import partnerH from '../assets/partenrHp.png'
import partnerX from '../assets/partenrXiaomi.png'
import partnerS from '../assets/partenrSVC.png'
import {updateData, userId} from "../http/userApi";
import SpaceBar from "../components/modals/SpaceBar";
import NewsItem from "../components/NewsItem";
import {sponsorEmail} from "../http/Basket_Favourites_PromoApi";

const  addbasket = require.context('../assets', false, /\.(png|jpe?g|svg)$/);


const Main = observer(() => {
    const  {device} = useContext(Context)
    const [value, setValue] = useState('');
    const [news, setNews] = useState([]);
    const [sales, setSales] = useState([]);
    const [blogs, setBlog] = useState([]);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [purpose, setPurpose] = useState('');

    let isPortret=Portret()


    const navigate = useNavigate();
    const location = useLocation();
    let { from } = location.state || { from: "" };
    if (from === "refresh") {
        console.log(from)
        window.history.replaceState({}, '')

        refresh();
    } else {
    }



    useEffect(() => {
        getAllNews(LimitPage).then(data => {
            console.log(data)
            setNews(data.rows)

        })
    }, [])
    useEffect(() => {
        getAllNews(LimitPage,null,'Блог').then(data => {
            console.log(data)
            setBlog(data.rows)

        })
    }, [])
    useEffect(() => {
        getAllSales(LimitPage).then(data => {
            console.log(data)
            setSales(data.rows)

        })
    }, [])


    useEffect(() => {
        fetchDevice(null, null, device.page, 0,null,null,device.Search).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)

        })
    }, [ ])


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    const handlePurposeChange = (e) => {
        setPurpose(e.target.value);
    };

    const handleSubmit = () => {
        // Проверки пустых полей и других условий
        if (!email || !phone || !fullName || !purpose) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!email.match(emailPattern)) {
            alert('Пожалуйста, введите корректный адрес электронной почты');
            return;
        }

        const phonePattern = /^7[0-9]{10}$/;
        if (!phone.match(phonePattern)) {
            alert('Пожалуйста, введите корректный номер телефона 7**********');
            return;
        }

        const nameWords = fullName.trim().split(/\s+/);
        if (nameWords.length < 2) {
            alert('Пожалуйста, введите как минимум два слова в поле ФИО');
            return;
        }

        // Если все проверки прошли успешно, можно отправить данные или выполнить другие действия
        sponsorEmail(email, phone, fullName, purpose)
        alert('Данные успешно отправлены');
        console.log('Данные успешно отправлены:', { email, phone, fullName, purpose });
    };




    var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                },


            ]
        };

    var settings1 = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    infinite: true,
                    dots: true
                }
            },
        ]
    };




    return (
        <Container >
           <FindBar/>
            <div className="slider-container text-success mt-3 ">
                <NavLink to={'/sale'} className='text-success text-decoration-none'>
                <h2 className={'text-center'}>Наши Акции</h2></NavLink>
                <Slider {...settings1}>
                    {sales.map(sale =>
                        <SalesItem key={sale.id} sales={sale} />)}
                </Slider>
            </div>
            <Container id={'услуги'} style={{minHeight: '7rem'}} className={'uslugiCol justify-content-center text-success mt-5 mb-5'}>
                <NavLink to={'/help/usluga'} className='text-success text-decoration-none'>
                <h3 className={'text-center mb-3'}>Наши популярные услуги </h3></NavLink>
                <Row style={{fontSize: '0.9rem'}} className={''} >
                    <Col md={3} xs={6} className={'d-flex  p-2'}>
                        <Image width={50} height={50} src={addbasket('./programIco.png')}/><p className={'ms-2'}>Настройка и установка программ</p>
                    </Col>
                    <Col md={3} xs={6} className={'d-flex  p-2'}>
                        <Image width={50} height={50} src={addbasket('./pcIco.png')}/><p className={'ms-2'}>Сможем собрать компьютер любой сложности</p>
                    </Col>
                    <Col md={3} xs={6} className={'d-flex  p-2'}>
                        <Image width={50} height={50} src={addbasket('./remontIco.png')}/><p className={'ms-2'}>Замена комплектующих и матриц на ноутбуках</p>
                    </Col>
                    <Col md={3} xs={6} className={'d-flex  p-2'}>
                        <Image width={50} height={50} src={addbasket('./akumIco.png')}/><p className={'ms-2'}>Замена аккумуляторов на любой технике </p>
                    </Col>

                </Row><p style={{opacity: 0}}>f</p>
            </Container>
            <RecommendDeviceBar/>
            <Container id={'услуги'} className={'justify-content-center text-success '}>
                <h3 className={'text-center mb-3'}>Почему выбирают нас: </h3>
                <Row style={{fontSize: '0.9rem'}} >
                    <Col md={3} xs={6} className={'d-flex uslugiCol p-2'}>
                        <Image width={50} height={50} src={addbasket('./consultIco.png')}/><p className={'ms-2'}>Быстрая и качественная консультация</p>
                    </Col>
                    <Col md={3} xs={6} className={'d-flex uslugiCol p-2'}>
                        <Image width={50} height={50} src={addbasket('./deliveryIco.png')}/><p className={'ms-2'}>Быстрая Доставка по всему городу Алматы</p>
                    </Col>
                    <Col md={3} xs={6} className={'d-flex uslugiCol p-2'}>
                        <Image width={50} height={50} src={addbasket('./serviceIco.png')}/><p className={'ms-2'}>Надежная гарантия и лучший сервис центр</p>
                    </Col>
                    <Col md={3} xs={6} className={'d-flex uslugiCol p-2'}>
                        <Image width={50} height={50} src={addbasket('./bisnesIco.png')}/><p className={'ms-2'}>Работа с множеством официальных партнеров</p>
                    </Col>
                </Row>
            </Container>
            <SpaceBar/>



            {!isPortret ? (<>
                    <div className={'text-center'}>
                        <Image style={{width: '90%'}} src={reclamaM} className="rounded-5 mb-4 "></Image></div>
                    <SpaceBar/>
                    <NavLink to={'/help'} className=' text-decoration-none'>
                        <h2 className={'text-center'} style={{color: '#0da617'}}>Посмотрите всю информацию о сайте</h2></NavLink>
                    <SpaceBar/>
                <div><h2 className={'text-center text-success'}>Наши партнеры</h2>
                    <Carousel fade interval={null}>
                        <Carousel.Item>
                            <Image style={{width: '100%'}} src={partnerH}
                                   className={'rounded-5'}/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image style={{width: '100%'}} src={partnerX}
                                   className={'rounded-5'}/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image style={{width: '100%'}} src={partnerS}
                                   className={'rounded-5'}/>
                        </Carousel.Item>

                    </Carousel></div></>
            ): (<>
                <div className={'text-center'}>
                <Image style={{width: '90%', height: '100px' }} src={reclamaM} className="rounded-5 mt-2 mb-4 "></Image></div>
                <div><h2 className={'text-center text-success'}>Наши партнеры</h2>
                <Carousel fade interval={null}>
                    <Carousel.Item>
                        <Image style={{width: '100%', height: '80px' }} src={partnerH}
                        className={'rounded-5'}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image style={{width: '100%', height: '80px' }} src={partnerX}
                        className={'rounded-5'}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image style={{width: '100%', height: '80px' }} src={partnerS}
                        className={'rounded-5'}/>
                    </Carousel.Item>
                </Carousel></div></>
                    )}
            <hr className={'hr '}/>
            <SpaceBar/>


            <Container>
                <NavLink to={'/info'} className='text-success text-decoration-none'>
                <h2 className={'text-center text-success'}>О КОМПАНИИ</h2>
                    </NavLink >
                <hr className={'hr '}/>
                <Row>
                    <Col md={6}>
                        <h3 className={'text-center text-success'}> Основное</h3>
                        <p className={' text-success'}>Компания <b>RsI</b> была основана в 2018году, в те времена мы предоставляли базовый ремонт
                        и продажу комлпектующих. На данный момент наша компания имеет большой оборот клиентов, а так же постоянно развивается привлекая к себе все новых сотрудников
                        и новые связи</p>
                        <h3 className={'text-center text-success mt-4'}> ОСОБЕННОСТИ</h3>
                        <p className={' text-success'}>Наша компания имеет ряд особенностей и преимуществ</p>
                        <ul className={' text-success'} style={{fontSize: '1.1rem'}}>
                            <li>Большой ассортимент официальных товаров</li>
                            <li>Квалифицированный и вежливый персонал</li>
                            <li>Быстрая обработка заказов</li>
                            <li>Низкая стоимость</li>
                            <li>Система бонусов</li>
                        </ul>

                    </Col>
                    <Col md={6} className="text-center">
                        <Image style={{width: '90%',height: 'auto'}} className={'mb-3 rounded-4'} src={company}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className={' text-success '}>
                        <Form className={'customcardMain p-3 rounded-5 '}>
                            <h4 className="text-success text-center">Форма для сотрудничества с нами</h4>
                            <InputGroup  as={Row} className="mb-3 mx-auto" controlId="formPlaintextEmail">
                                <Form.Label column sm="2" className='textProf'>Email:</Form.Label>
                                <Col sm="10" className=''>
                                    <Form.Control type="text" className='bg-dark border-success ms-3 n formBlackGreen'  onChange={handleEmailChange}
                                                  placeholder={'введите свою почту'} value={email} />
                                </Col>
                                <Form.Label className='textProf' column sm="2">ТЕЛЕФОН:</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" className='bg-dark border-success ms-3 n formBlackGreen' onChange={handlePhoneChange} placeholder='+7' value={phone}  />
                                </Col>
                                <Form.Label className='textProf' column sm="2">ФИО:</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" className='ms-3 bg-dark border-success n formBlackGreen'onChange={handleFullNameChange}
                                                  placeholder="Пользователь" value={fullName} />
                                </Col>
                                <Form.Label className='textProf' column sm="2">Цель обращения:</Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" className='ms-3 bg-dark border-success n formBlackGreen' onChange={handlePurposeChange}
                                                  placeholder="опишите" value={purpose}/>
                                </Col>

                                <Button style={{width: '100%', color: '#1ed93a'}} variant="primary" className="mt-2 mb-1 btn-dark "
                                        onClick={handleSubmit} > Отправить </Button>
                        </InputGroup>
                        </Form>
                    </Col>
                    <Col md={6} className="text-center">
                        <iframe className="mt-3"
                                src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad29e266d95ee0e740fe3182709268ef380db013bcbc4cf293b69fddfc2c63c2e&amp;source=constructor"
                                style={{width: '90%',height: '300px'}}></iframe>
                    </Col>
                </Row>
            </Container>

            <div className="slider-container text-success mt-5 ">
                <NavLink to={'/news'} className='text-success text-decoration-none'>
                    <h2 className={'text-center'}>Наши Новости</h2></NavLink>
                <Slider {...settings1}>
                    {news.map(sale =>
                        <NewsItem key={sale.id} news={sale} />)}
                </Slider>
            </div>

            <div className="slider-container text-success  ">
                <NavLink to={'/blog'} className='text-success text-decoration-none'>
                    <h2 className={'text-center'}>Наш Блог</h2></NavLink>
                <Slider {...settings1}>
                    {blogs.map(sale =>
                        <NewsItem key={sale.id} news={sale} />)}
                </Slider>
            </div>

            {/*<div className="slider-container text-success mt-3 ">*/}
            {/*    <NavLink to={'/sale'} className='text-success text-decoration-none'>*/}
            {/*        <h2 className={'text-center'}>Наши Акции</h2></NavLink>*/}
            {/*    <Slider {...settings1}>*/}
            {/*        {blog.map(sale =>*/}
            {/*            <SalesItem key={sale.id} sales={sale} />)}*/}
            {/*    </Slider>*/}
            {/*</div>*/}

        </Container>

    );
});
export default Main;













