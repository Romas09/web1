import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, Col, Dropdown, Form, Image, Row} from "react-bootstrap";
import {fetchOneBasket} from "../http/deviceApi";
import {userId} from "../http/userApi";
import FavouritesItem from "./FavouritesItem";
import addbasket from "../assets/addbasket.png";
import {deleteAllDevice, getAll} from "../http/FavouritesApi";
import {Link} from "react-router-dom";
import {deleteAllBasket} from "../http/Basket_Favourites_PromoApi";
import {refresh} from "../pages/Auth";
import SpaceBar from "./modals/SpaceBar";
import FindBar from "./FindBar";




const FavouritesList = observer(()=> {
    const[favourites, setfavourites] =useState([])

    useEffect(() => {
        getAll(userId).then(data => setfavourites(data))

    }, [])


    return (
        <Row className="d-flex justify-content-center">
            <FindBar/>
            <Col md={8} >


                {favourites.map(favourited =>(console.log(favourited),
                    <FavouritesItem  favourite={favourited}/>))}
                <Button  className={" mt-4 p-2 ms-2  btn-outline-danger butDel w-100"}
                         onClick={() => {deleteAllDevice(userId); refresh()} } >Удалить все из избранного</Button></Col>
    <SpaceBar/>
        </Row>
    );
});

export default FavouritesList;




