import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchType, limit} from "../http/deviceApi";
import Pages from "../components/Pages";
import NewsBar from "../components/NewsBar";
import "../css/index.css"
import {refresh} from "./Auth";
import {useLocation, useNavigate} from "react-router-dom";


const Shop = observer(() => {
    const  {device} = useContext(Context)
    const[loading, setloading] = useState(true)

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
        fetchType().then(data => device.setTypes(data))
        fetchBrand().then(data => device.setBrands(data))
        fetchDevice(null, null, 1, limit).then(data => {
            device.setDevices(data.rows)
        device.setTotalCount(data.count)
            device.setLimit(limit)

        }).finally( () => setloading(false))
    }, [])


   useEffect(() => {device.setFixed(false)
        fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, device.limit,device.SortBy,device.SortOrder,device.Search).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)

        })
    }, [device.page, device.selectedType, device.selectedBrand,device.SortBy,device.SortOrder,device.Search ])

    if(loading){
        return <Spinner animation="border" variant="success" />
    }

    return (
        <Container >
            <Row className="mt-2">
                <Col  md={3}>
                    <TypeBar />
                    <BrandBar/>
                    <NewsBar/>
                </Col>
                <Col md={9}>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});
export default Shop;