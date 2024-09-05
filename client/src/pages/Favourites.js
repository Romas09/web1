import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchDevice} from "../http/deviceApi";
import FavouritesList from "../components/FavouritesList";
import RecommendDeviceBar from "../components/RecommendItem";

const Favourites = observer(() => {
    const  {device} = useContext(Context)
    useEffect(() => {
        fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, 16).then(data => {
            device.setDevices(data.rows)
        })
    })

    return (
        <Container >
            <Row className="mt-2">  <FavouritesList/> </Row>
            <RecommendDeviceBar/>
        </Container>
    );
});
//<Pages/>
export default Favourites;