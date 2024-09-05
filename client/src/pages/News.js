import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Dropdown, Row, Spinner} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchType, limit, LimitPage} from "../http/deviceApi";
import Pages from "../components/Pages";
import NewsBar from "../components/NewsBar";
import "../css/index.css"
import {refresh} from "./Auth";
import {useLocation, useNavigate} from "react-router-dom";
import FindBar from "../components/FindBar";
import Portret from "../utils/CheckResolution";

import {getAllNews} from "../http/NewsandSalesApi";
import PagesNews from "../components/PagesNews";
import NewsItem from "../components/NewsItem";



const News = observer(() => {
    const  {device} = useContext(Context)
    const navigate = useNavigate();
    const location = useLocation();
    let { from } = location.state || { from: "" };
    const [news, setNews] = useState([]);
    const [sort, setSort] = useState(null)
    let isPortret=Portret



    useEffect(() => {
        console.log('yes')
        getAllNews(LimitPage).then(data => {
            console.log(data)
            setNews(data.rows)
            device.setTotalCount(data.count)

        })
    }, [])
    console.log(news)


    useEffect(() => {

        getAllNews(LimitPage, device.page, sort).then(data => {
            setNews(data.rows)
            device.setTotalCount(data.count)

        })
    }, [device.page, sort ])


    return (
        <Container >
            <FindBar/>
            <Row className={'mt-3'}>
                <Col sm={6} md={6}>
                    <h2 className={'text-center text-success'}>Новостная лента</h2>
                </Col>
                <Col sm={6} md={6} className={'text-center '}>
                    <Dropdown className={!isPortret ? '' : 'mt-2'}>
                        <Dropdown.Toggle variant="dark" id="sort-dropdown" className={"w-50 btn-dark bg-color-success"} style={{color: '#1ed93a'}}>
                            {sort || "Все "}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={"w-50 bg-dark"} style={{color: '#1ed93a'}}>
                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{setSort('') }}>
                                Все</Dropdown.Item>
                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{setSort('Новости о нас') }}>
                                О нас</Dropdown.Item>
                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{setSort('Новости IT') }}>
                                О мире IT</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

        <Row>
            {news.map(newss =>
                <NewsItem key={newss.id} news={newss} />)}
        </Row>
            <PagesNews/>
        </Container>
    );
});
export default News;