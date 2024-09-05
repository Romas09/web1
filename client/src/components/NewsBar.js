import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, Col, Container, Dropdown, Row,} from "react-bootstrap";
import newssale from "../assets/newssale.png";
import newssale1 from "../assets/News.png";
import Portret from "../utils/CheckResolution";
import {NavLink, useNavigate} from "react-router-dom";
import {News_ROUTE, Sale_ROUTE} from "../utils/consts";

const NewsBar = observer(() => {
    let isPortret=Portret()
    const history = useNavigate();


    return (   <Card style={{ width: '100%', border: 15 }} className="customcardMain mt-3 mb-2 d-flex align-items-center justify-content-center">
            {!isPortret ? (<Col md={12} className='text-center'>
                    <NavLink to='/sale'><Card.Img variant="top" src={newssale} className="w-100 m-auto p-2" /></NavLink>
                <Button variant="dark" className={"my-2 w-75 m-auto"}> <a href="/sale" style={{textDecoration: 'none', color: '#1fd736'}} >Узнайте о всех акциях первым!</a></Button>
                <Button variant="dark" className={"my-2 w-75  mb-3"}> <a href="/news" style={{textDecoration: 'none', color: '#1fd537'}} >Посмотреть наши новости</a></Button>
                    <Button variant="dark" className={"my-2 w-75  mb-3"}> <a href="/blog" style={{textDecoration: 'none', color: '#1fd537'}} >Так же не забудьте о нашем блоге</a></Button>
            </Col>
                ):(<Row xs={12} className={"mx-1"}>
                <NavLink to='/sale'> <Card.Img variant="top" src={newssale1} className="w-100  m-auto p-2" style={{height: '5em'}}/></NavLink>
<Col xs={6}>
                <Button variant="dark" className={"my-2 w-100 m-auto p-1"}> <a href="/sale" style={{textDecoration: 'none', color: '#1fd736',fontSize: '0.65em'}} onClick={() => history(Sale_ROUTE )}>Узнайте о всех акциях первым!</a></Button>
</Col> <Col xs={6}>
                <Button variant="dark" className={"my-2 w-100  mb-3 p-1"}> <a href="/news" style={{textDecoration: 'none', color: '#1fd537',fontSize: '0.65em'}} onClick={() => history(News_ROUTE )} >Посмотреть наши новости</a></Button>


                </Col>
                    <Button variant="dark" className={"my-2 w-100  mb-3 p-1"}> <a href="/blog" style={{textDecoration: 'none', color: '#1fd537',fontSize: '0.65em'}} >Так же не забудьте о нашем блоге</a></Button></Row>

                )

        }

        </Card>
    );
});

export default NewsBar;