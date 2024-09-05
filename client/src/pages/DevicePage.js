import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Carousel, Col, Container, Dropdown, Form, FormText, Image, Row} from "react-bootstrap";
import bigstar from "../assets/star.png"
import {Link, useNavigate, useParams} from "react-router-dom";
import {createDevice, createReview, fetchOneDevice} from "../http/deviceApi";
import addbasket from "../assets/addBasket1.png";
import addfavourite from "../assets/favourites.png";
import {observer} from "mobx-react-lite";
import {$authHost, $host} from "../http";
import {userId} from "../http/userApi";
import {refresh} from "./Auth";
import {createFavourites, deleteOneDevice, getAll, getOne} from "../http/FavouritesApi";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


import CreateDelUpdatePromo from "../components/modals/Create,Del,Update Promo";
import WriteReview from "../components/modals/WriteReview";
import {Context} from "../index";
import PagesReview from "../components/PagesReview";
import Reviewtem from "../components/ReviewItem";
import Portret from "../utils/CheckResolution";
import FindBar from "../components/FindBar";
import RecommendItem from "../components/RecommendItem";
import {Blog_ROUTE, News_ROUTE, SHOP_ROUTE} from "../utils/consts";



const addBaskets =async (count,sum,device_id,basket_id,deviceId,basketId,type_id,band_id) => {

    const {data}=  await  $authHost.post(process.env.REACT_APP_API_URL+'api/basket/', {count,sum,device_id,basket_id,deviceId,basketId,type_id,band_id})
    alert('Товар добавлен в корзину');refresh()

}
export const check = async (did,bid,count,sum,device_id,basket_id,deviceId,basketId,type_id,band_id) => {
    const {data}= await $authHost.get(process.env.REACT_APP_API_URL+`api/basket/${did}/${bid}`)
    if (data.id!=undefined){return alert('Товар уже находиться в корзине');}
    else{addBaskets(count,sum,device_id,basket_id,deviceId,basketId,type_id,band_id);}
}
export const checkFavourite = async (did,bid) => {
    const {data}= await  $host.get(process.env.REACT_APP_API_URL+`api/favourites/${did}/${bid}`)
    if (data.id!=undefined){return alert('Товар уже добавлен в избранное');}
    else{console.log(did,bid);createFavourites(did,bid); alert('Товар добавлен в избранное');refresh()}
}

const DevicePage =  observer(  () => {
    //const device = {id: 1, name: '7ghh', price: 4568554, rating: 6, img: 'https://purposechurch.com/wp-content/uploads/2022/10/Eric-H_edit_21.jpg'}
    const [devices, setDevices] = useState({ info: [], review: [], gallery: [] });
    const {device} = useContext(Context)
    const {id} = useParams()
    const [reviewWrite, setreviewWrite ] = useState(false)
    const [sortBy, setSortBy ] = useState(null)
    const [sort, setSort ] = useState('')
    const [bool, setBool] = useState(true)
    let isPortret=Portret()
    const history = useNavigate()

    const [counter, setCounter] = useState(1);
    const increase = () => {  if(counter < devices.count ){
        setCounter(count => count + 1); }
    else {alert("количество не может быть больше наличия")}};
    const decrease = () => {
        if ( counter > 1) {
            setCounter(count => count - 1);}
        else {alert("количество не может быть меньше одного")}};

    useEffect(() => {
        fetchOneDevice(id).then(data => {setDevices(data.device)
            if(data.device.count<=0){setBool(!bool)}})
    }, [])

    useEffect(() => {
        fetchOneDevice(id,device.page,null,sort).then(data => {setDevices(data.device)
        device.setTotalCountRev(data.totalReviews)
        })


    }, [device.page,sort])



    return (
        <Container className="mt-3" style={{ backgroundColor: 'rgba(37,36,37,0)', minHeight: '100vh' }}>
            <FindBar/>
            <Row className={'mt-3'}>
                <Col md={2}>
                    <a className=" text-success  p-2 " style={{textDecoration: 'none',cursor: 'pointer'}} onClick={() => {history(SHOP_ROUTE)}}> {'<-'} назад</a>
                </Col>
                <Col md={8}>
                    <h1 className={'text-center text-success'}> {devices.name}</h1>
                </Col>
                <Col md={2}>
                    <Form className={'text-left text-success my-1'}>
                        <Form.Label >артикул: {devices.id} <span className={'ms-2'}>рейтинг: {devices.rating}</span></Form.Label>
                    </Form>
                </Col>
            </Row>

            <Row className={'mt-3 text-center'}>
                <Col md={6} className={'mt-2'}>


                        {!isPortret ? (<Carousel fade interval={null}>
                                <Carousel.Item>
                                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL+ devices.img}
                                           className={'rounded-5'}/>
                                </Carousel.Item>
                            {devices.gallery.map((img, index) => (
                                    <Carousel.Item key={img.id} style={{height: '300px'}}>
                                        <Image width={300} height={300} src={process.env.REACT_APP_API_URL+ img.img}
                                               className={'rounded-5'}/>
                                    </Carousel.Item>))}</Carousel>

                        ):(<Carousel fade interval={null}>
                                <Carousel.Item>
                                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL+ devices.img}
                                           className={'rounded-5'}/>
                                </Carousel.Item>
                                {devices.gallery.map((img, index) => (
                                    <Carousel.Item key={img.id} style={{height: '300px'}} >
                                        <Image  width={300} height={300} src={process.env.REACT_APP_API_URL+ img.img}
                                               className={'rounded-5 '}/>
                                    </Carousel.Item>))}</Carousel>
                            )}
                </Col>
                <Col md={2} className={'mt-2'}>

                </Col>
                <Col md={4} className={'mt-2 text-success'}>
                        <h2>{devices.price} тг.</h2>
                        <p>количество: {devices.count}</p>
                        <Button variant={"rotate mt-2 btn btn-outline-success but1 p-2 mt-2"} onClick={() => {checkFavourite(devices.id, userId);}}>
                        Добавить в избранное <Image className="" src={addfavourite} width={25} height={25} style={{fontSize: '0.5em'}}/></Button>
                        <p></p>
                    {bool ? (
                            <Button variant={"rotate mt-2 btn btn-outline-success but1 p-2 my-1"} onClick={() => check(devices.id,userId,counter,(devices.price*counter),devices.id,userId, devices.id,userId,devices.typeId,devices.brandId)}>
                                Добавить в корзину <Image className=" " src={addbasket} width={25} height={25} style={{fontSize: '0.7em'}}/></Button>
                    ):
                        (<Button  className=" mt-2 mb-3 p-2  btn-outline-danger butDel " >Нет в Наличии</Button>)}

                        <div>
                        <div className={'mt-2 text-success'}>
                            <Button  onClick={decrease} className="btn-dark me-2 text-success">-</Button>
                            <span className="counter__output">{counter}</span>
                            <Button  onClick={increase} className="btn-dark ms-2 text-success">+</Button></div>
                        </div>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3 mx-0">
                <Tabs defaultActiveKey="info" id="fill-tab-example" className="mb-3 mx-0 " fill >

                        {!isPortret ? (<Tab eventKey="info" title="Характеристики"  >{devices.info.map((info, index) => (
                            <Row key={info.id} className='m-2 rounded-4 mx-0' style={{ fontSize: '16px',fontWeight:600, background: index % 2 === 0 ? 'darkgreen ' : "black", color: index % 2 === 0 ? 'black' : "#019b18", padding: 5 }}>
                                <Col xs={6} md={3} className={'d-flex '}>{info.title}:</Col>
                                <Col xs={6} md={9}>{info.description}</Col>
                            </Row>))} </Tab>): (<Tab eventKey="info" title="Характеристики"  >{devices.info.map((info, index) => (
                            <Row key={info.id} className='m-2 rounded-4 mx-0' style={{ fontSize: '12px',fontWeight:600, background: index % 2 === 0 ? 'darkgreen ' : "black", color: index % 2 === 0 ? 'black' : "#019b18", padding: 5 }}>
                                <Col xs={6} md={3} className={'d-flex '}>{info.title}:</Col>
                                <Col xs={6} md={9}>{info.description}</Col>
                            </Row>))} </Tab>)
                        }

                    <Tab eventKey="opys" title="Описание" className={" "}>
                        <div className='rdw-editor-main rdw-editor-main1 rdw'  dangerouslySetInnerHTML={{ __html: devices.description }} />

                    </Tab>
                    <Tab eventKey="review" title={'Отзывы '+device.totalCountRev}><Row>
                    <Col sm={4 }md={4}>
                        <Button  onClick={() => setreviewWrite(true) } className="ms-2 btn-dark text-success butMain  ">Добавить отзыв</Button>

                    </Col>
                    <Col sm={8} md={8}>
                        <Dropdown className={!isPortret ? '' : 'mt-2'}>
                            <Dropdown.Toggle variant="dark" id="sort-dropdown" className={"w-100 btn-dark bg-color-success"} style={{color: '#1ed93a'}}>
                                {sortBy || "Выберите тип сортировки "}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={"w-100 bg-dark"} style={{color: '#1ed93a'}}>
                                <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setSort('beter');setSortBy('Лучшие');}}>
                                    Лучшие</Dropdown.Item>
                                <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setSort('bad');setSortBy('Худшие')}}>
                                    Худшие</Dropdown.Item>
                                <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setSort('new');setSortBy('Новые')}}>
                                    Новые</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    </Row>

                        {devices.review.map((review, index) => {
                            if (review.status === 'одобрен') {
                                return (
                                    <Reviewtem review={review}/>
                                );
                            } else { return null;}})}
                        <PagesReview />
                    </Tab>
                </Tabs>


            </Row>
            <hr className={'hr-news'}/>
            <RecommendItem/>
            <WriteReview show={reviewWrite} onHide={() => setreviewWrite(false)} deviceId={devices.id}/>
        </Container>
    );
});

export default DevicePage;