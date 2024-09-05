import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom"
import {LOGIN_ROUTE, Main_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {registration, login} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { useNavigate } from "react-router-dom"
import {checkEmail} from "../http/Basket_Favourites_PromoApi";
import {fetchBrand, fetchDevice, fetchType} from "../http/deviceApi";
import UpdateDelSale from "../components/modals/UpdateDelSale";
import UpdatePassword from "../components/modals/updatePassword";

export  function refresh() {
    window.location.reload();
}
const Auth = observer(() => {
    const  {user} = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin= location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [isValid, setIsValid] = useState(false);
    const  [password,setPassword] = useState('')
    const [kods, setKod] = useState(null);
    const [kodss, setKods] = useState(null);
    const [hide, setHide] = useState(false);
    const [pass, setPass] = useState(false);
    useEffect(() => {
       setKods(Math.floor(Math.random() * (999999 - 1000 + 1)) + 1000)
    }, [])


    const registr = async () => {
        let kodsin=parseInt(kods)
        if(kodsin===kodss ||isLogin ){ try {
            let data;
            if(isLogin) {
                data = await login(email, password);

            } else { data = await registration(email, password);}
            user.setUser(data)//data or user in ()
            user.setIsAuth(true)
            history(Main_ROUTE)
            refresh();
        } catch (e) {alert(e.response.data.message)
        }}else{alert('код не верный или устарел')}
    }

    const click = async () => {if(isLogin){registr();return;}
        setHide(true)
        console.log(kodss)
       checkEmail(kodss,email)

        alert('на вашу почту отправлено сообщение')
    }

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);//setEmail(e.target.value)
        if(value===process.env.REACT_APP_CHECK_ROLE){setIsValid(true);return;}
        // Проверка валидности email-адреса
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setIsValid(isValidEmail);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center "
        style={{height: window.innerHeight-54}}>
           <Card style={{width: 600}} className="p-5 navMain">
                  <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                  <Form className="d-flex flex-column">
                        <Form.Control
                            value={email}
                            onChange={ handleEmailChange}
                            className="mt-3 bg-dark border-success n formBlackGreen"
                            placeholder="Вевдите вашу почту">
                        </Form.Control>
                      <Form.Control
                          className="formBlackGreen mt-3 bg-dark border-success n "
                          placeholder="Введите ваш пароль"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                      type="password">
                      </Form.Control>
                      {!hide ? (<a></a>):(<Col className="d-flex" ><Col md={8} xs={8}><Form.Control
                              className="formBlackGreen mt-3 bg-dark border-success n "
                              placeholder="Введите код с почты"
                              onChange={e => setKod(e.target.value)}
                              >
                          </Form.Control></Col><Col md={4} xs={4}>
                          <Button  className="mt-3 ms-2 btn btn-outline-success but"
                                  onClick={registr} disabled={!isValid}>
                              Подтвердить</Button></Col></Col>)}
                      <Form className="d-flex justify-content-between mt-3 px-3 ">

                          {isLogin?

                              <div>
                                  Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} > Зарегистрируйся! </NavLink>
                                  <p><NavLink onClick={() => setPass(true) }> Забыли пароль?  </NavLink></p>

                              </div>
                              :
                              <div >
                                  Есть аккаунт? <NavLink to={LOGIN_ROUTE} onClick={() => setHide(false)}> Войдите! </NavLink>
                              </div>
                          }
                          <Button className="mt-3  btn btn-outline-success but"
                          onClick={click} disabled={!isValid}>
                              {isLogin? 'Войти' : 'Регистрация'}
                          </Button>
                      </Form>
                  </Form>
              </Card>

            <UpdatePassword show={pass} onHide={() => setPass(false)}/>
        </Container>
    );
});

export default Auth;