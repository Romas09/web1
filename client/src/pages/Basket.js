import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchDevice} from "../http/deviceApi";
import BasketList from "../components/BasketList";
import FindBar from "../components/FindBar";

const Basket = observer(() => {
    const  {device} = useContext(Context)
    useEffect(() => {
        fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, 16).then(data => {
            device.setDevices(data.rows)
        })
    })

    return (
        <Container className="">
            <FindBar/>
            <Row className="mt-2 ms-2 ">  <BasketList/> </Row>
        </Container>
    );
});
//<Pages/>
export default Basket;