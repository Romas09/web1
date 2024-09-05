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
        getAllNews(LimitPage,1,'Блог').then(data => {
            console.log(data)
            setNews(data.rows)
            device.setTotalCount(data.count)

        })
    }, [])
    console.log(news)


    useEffect(() => {

        getAllNews(LimitPage, device.page, 'Блог').then(data => {
            setNews(data.rows)
            device.setTotalCount(data.count)

        })
    }, [device.page, sort ])


    return (
        <Container >
            <FindBar/>
            <Row className={'mt-3'}>
                    <h2 className={'text-center text-success'}>Наш Блог</h2>


            </Row>

            <Row>
                {news.map(newss =>
                    <NewsItem key={newss.id} blog={true} news={newss} />)}
            </Row>
            <PagesNews/>
        </Container>
    );
});
export default News;