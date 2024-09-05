import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Dropdown, Form, Image, Ratio, Row} from "react-bootstrap";
import bigstar from "../assets/star.png"
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {createDevice, createReview, fetchOneDevice} from "../http/deviceApi";
import addbasket from "../assets/addbasket.png";
import {observer} from "mobx-react-lite";
import {$authHost, $host} from "../http";
import {userId} from "../http/userApi";
import {refresh} from "./Auth";
import {createFavourites, getAll, getOne} from "../http/FavouritesApi";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import CreateDelUpdatePromo from "../components/modals/Create,Del,Update Promo";
import WriteReview from "../components/modals/WriteReview";
import {Context} from "../index";
import PagesReview from "../components/PagesReview";
import Reviewtem from "../components/ReviewItem";
import Portret from "../utils/CheckResolution";
import {fetchOneNews} from "../http/NewsandSalesApi";
import FindBar from "../components/FindBar";
import {Blog_ROUTE, DEVICE_ROUTE, News_ROUTE} from "../utils/consts";
import RecommendDeviceBar from "../components/RecommendItem";





const NewsPage =  observer(  () => {
    //const device = {id: 1, name: '7ghh', price: 4568554, rating: 6, img: 'https://purposechurch.com/wp-content/uploads/2022/10/Eric-H_edit_21.jpg'}
    const [newses, setNews] = useState({ info: [], review: [] });
    const {device} = useContext(Context)
    const {id} = useParams()
    const [reviewWrite, setreviewWrite ] = useState(false)
    const [sortBy, setSortBy ] = useState(null)
    const [sort, setSort ] = useState('')
    let isPortret=Portret()

    const history = useNavigate();
    const location = useLocation();
    let { from } = location.state || { from: "" };


    useEffect(() => {
        if (from === true) {console.log('hfstgldflgkdfljk')
            setSort(true)

            window.history.replaceState({}, '')
        } else {
        }
        fetchOneNews(id).then(data => setNews(data))


    }, [id])


    return (
        <Container className="mt-3" style={{ backgroundColor: 'rgba(37,36,37,0.38)', minHeight: '100vh' }}>
            <div className={'p-2'}><FindBar /></div>
            <a className=" text-success  p-2 " style={{textDecoration: 'none',cursor: 'pointer'}} onClick={() => {sort ? history(Blog_ROUTE):history(News_ROUTE)}}> {'<-'} назад</a>

            <h1 className={'text-success text-center mt-2'}>{newses.title}</h1>


            <p style={{fontSize: '1em',color: '#026507'}} className={'ms-3 '}>Дата публикации: {newses.date}</p>

            <div className={'text-center'}  >
                <Image style={{width:'90%',height: "auto"}} src={process.env.REACT_APP_API_URL+ newses.img_font}/>
        </div>
            <hr className={'hr-news'}/>
            <div className='rdw-editor-main rdw-editor-main1 rdw'  dangerouslySetInnerHTML={{ __html: newses.description }} />
            <hr className={'hr-news'}/>
            <Row className={'d-flex mb-3'}>
                <Col sm={6} md={6} className="align-self-start">
                    {sort ? (<Button className="btn-dark text-success butMain w-50 " onClick={() => history(Blog_ROUTE)}>Вернуться к спику блогов</Button>

                    ):( <Button className="btn-dark text-success butMain w-50" onClick={() => history(News_ROUTE)}>Посмотреть новости</Button>)}
                </Col>
                <Col sm={6} md={6} className=" d-flex  ">
                    {sort ? (
                        <Col className=" d-flex  ">{!isPortret ? (
                        <Button className="btn-dark text-success butMain w-50 ms-auto" onClick={() => history(News_ROUTE)}>Посмотреть новости</Button>
                    ) : (
                        <Button className="btn-dark text-success butMain w-50 mt-2" onClick={() => history(News_ROUTE)}>Посмотреть новости</Button>
                    )}</Col>)
                            : (<Col className=" d-flex  ">
                    {!isPortret ? (
                        <Button className="btn-dark text-success butMain w-50 ms-auto" onClick={() => history(Blog_ROUTE)}>Посмотреть наши блоги</Button>
                        ) : (
                        <Button className="btn-dark text-success butMain w-50 mt-2" onClick={() => history(Blog_ROUTE)}>Посмотреть наши блоги</Button>
                    )}</Col>)}

                        </Col>
            </Row>
            <p style={{color: 'rgba(17,17,17,0)'}}>cbvc</p>
            <div className={' mt-2'}>
            <RecommendDeviceBar/>
            </div>
        </Container>
    );
});

export default NewsPage;