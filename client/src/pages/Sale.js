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

import {getAllNews, getAllSales} from "../http/NewsandSalesApi";
import PagesNews from "../components/PagesNews";
import NewsItem from "../components/NewsItem";
import SalesItem from "../components/SalesItem";



const Sale = observer(() => {
        const  {device} = useContext(Context)
        const navigate = useNavigate();
        const location = useLocation();
        let { from } = location.state || { from: "" };
        const [sales, setSales] = useState([]);
        const [sort, setSort] = useState(null)
        let isPortret=Portret()



        useEffect(() => {
                console.log('yes')
                getAllSales(9).then(data => {
                        console.log(data)
                        setSales(data.rows)
                        device.setTotalCount(data.count)

                })
        }, [])


        useEffect(() => {

                getAllSales(9, device.page, sort).then(data => {
                        setSales(data.rows)
                        device.setTotalCount(data.count)

                })
        }, [device.page, sort ])


        return (
            <Container >
                    <FindBar/>
                    <Row className={'mt-3'}>
                            <Col sm={6} md={6}>
                                    <h2 className={'text-center text-success'}>Все наши акции</h2>
                            </Col>

                    </Row>

                    <Row>
                            {sales.map(saless =>
                                <SalesItem key={saless.id} sales={saless} />)}
                    </Row>
                    <PagesNews/>
            </Container>
        );
});
export default Sale;