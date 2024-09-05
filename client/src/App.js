import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check, getBonus, userId} from "./http/userApi";
import {Spinner} from "react-bootstrap";
import FooterBar from "./components/FooterBar";
import SpaceBar from "./components/modals/SpaceBar";

const App = observer(() => {
    const {user} = useContext(Context)
    const[loading, setloading] = useState(true)

    useEffect(() =>  {
            check().then(data => {
                user.setUserOne(data)
                user.setUser(true)
                user.setIsAuth(true)
            }).finally( () => setloading(false))
        }, [])

        if(loading){
            return <Spinner animation="border" variant="success" />
        }



  return (
    <BrowserRouter>
        <NavBar />
        <AppRouter  />
        <FooterBar/>

    </BrowserRouter>
  );
});

export default App;
