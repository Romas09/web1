import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import kaspi from "../assets/kaspi.png";
import yango from "../assets/yango.png";
import money from "../assets/banking.png";
import delivery from "../assets/delivery.png";
import SpaceBar from "../components/modals/SpaceBar";

const Info = () => {
    return (
        <Container >
            <Row className="mt-2" style={{color: '#05a11a'}}><Col md={2}></Col><Col md={8} className="text-center">
                <h1>О компании RsI</h1>
                <p className="display-6 text1">Мы основаны в 2018 году прошли большой путь, получили огромный опыт, и крепко основались на Казахстанском рынке</p>
                <p className="display-6 text2"> У нас вы найдете большой ассортимент комплектующих, расходников и прочего. Так же у нас есть готовые сборки и сборка на заказ</p>
                <h2>Доставка <Image src={delivery} width={50} height={45}/></h2>
                <h3>Есть 2 варианта доставки:</h3>
                <h3>Самовывоз: г.Алматы Айнабулак-2</h3>
                <h3 ><Image src={yango} width={30} height={30}/> Яндекс Го</h3>
                <h2>Оплата: </h2>
                <h3 className="d-inline m-2"><Image src={kaspi} width={30} height={30}/> Kaspi,   </h3>
                <h3 className="d-inline m-2">Наличными <Image src={money} width={30} height={30}/></h3>
                <iframe className="mt-3"
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad29e266d95ee0e740fe3182709268ef380db013bcbc4cf293b69fddfc2c63c2e&amp;source=constructor"
                        style={{width: '80%',height: 150}}></iframe>
            </Col></Row>
            <SpaceBar/>
        </Container>
    );
};

export default Info;