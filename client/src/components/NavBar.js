import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import { LOGIN_ROUTE} from "../utils/consts";
import star from "../assets/romas.png"
import addbasket from "../assets/shopping-basket.png"//inbasket1.png
import profile from "../assets/userIco.png"//id-card.png
import favorites from "../assets/favouritesstar.png"//favourites_folder.png
import {fetchOneBasket} from "../http/deviceApi";
import {userId} from "../http/userApi";
import Portret from "../utils/CheckResolution"
import FavouritesItem from "./FavouritesItem";
import {getAll} from "../http/FavouritesApi";
import "../css/index.css"


const NavBar = observer(() => {
    const isMobileDevice = Portret()
    const {device} = useContext(Context)
    const {user} =useContext(Context)
    const history = useNavigate()
    const logOut= () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        history(LOGIN_ROUTE)
    }

    useEffect(() => {
        fetchOneBasket(userId).then(data => device.setBaskets(data))

    }, [])
    useEffect(() => {
        getAll(userId).then(data => device.setFavourites(data.length))
    }, [])
    /* <Button variant={"outline-light"}
                                onClick={() => history(ADMIN_ROUTE)}  >
                                поиск </Button>*/

    return (
        <Navbar bg="dark" variant="dark" >
            <Container>
                <Navbar.Brand href="/"><Image src={star} width={150} height={45}/></Navbar.Brand>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        {!isMobileDevice ? (
                            <div>
                                <a href="/profile" className="me-2" style={{textDecoration: 'none', color: '#1ED93AFF', fontSize: '17px'}}>
                                    <Image src={profile} width={50} height={45}/>
                                </a>
                                <a href="/favourites" className="me-2 text-success" style={{textDecoration: 'none', color: 'whitesmoke', fontSize: '17px'}}>
                                    <Image src={favorites} width={50} height={45}/>{device.Favourites}
                                </a>
                                <a href="/basket" className="me-2" style={{textDecoration: 'none', color: '#1ED93AFF', fontSize: '17px'}}>
                                    <Image src={addbasket} width={50} height={45}/>{device.baskets.length}
                                </a>
                            </div>
                        ) : (
                            <div>
                                <a href="/profile" className="me-2" style={{textDecoration: 'none', fontSize: '17px'}}>
                                    <Image src={profile} width={30} height={25}/>
                                </a>
                                <a href="/favourites" className="me-2 text-success" style={{textDecoration: 'none', fontSize: '17px'}}>
                                    <Image src={favorites} width={30} height={25}/>{device.Favourites}</a>
                                    <a href="/basket" className="me-2 " style={{ textDecoration: 'none',color: '#1ED93AFF',  fontSize: '17px', display: 'flex', alignItems: 'center' }}>
                                        <Image src={addbasket} width={30} height={25} style={{ marginRight: '5px'}} />{device.baskets.length}
                                    </a>



                            </div>
                        )}
                        <Button type={"button"}  onClick={() => logOut()} className="mx-2 btn btn-outline-success but ">выйти</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" >
                        <Button type={"button"} className={"mx-2 btn btn-outline-success but "} onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );

});


export default NavBar;

