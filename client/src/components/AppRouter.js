import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {Main_ROUTE} from "../utils/consts";
import {Context} from "../index";


const AppRouter = () => {
    const {user} = useContext(Context)
    const Boolrole = user.UserOne.role === process.env.REACT_APP_ROLE;
    return (
        <Routes >
            { Boolrole&& adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact />)}
            {user.isAuth && authRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={<Component/>} exact />)}
            {publicRoutes.map(({path,Component}) =>
            <Route key={path} path={path} element={<Component/>} exact />)}
            <Route path='*' element={<Navigate to={Main_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;