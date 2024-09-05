import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, Image, Modal, Row,} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import star from "../assets/romas.png"
import whats from "../assets/whatsap.png"
import telephone from "../assets/phone-conversation.png"//telephone.png
import info from "../assets/infoGPro.png"//info.png
import { MDBFooter} from "mdb-react-ui-kit";
import {Context} from "../index";
import {Link, useNavigate} from "react-router-dom";
import MainDeviceItem from "./MainDeviceItem";
import {fetchDevice, fetchOneDevice} from "../http/deviceApi";
import RecomendDeviceItem from "./RecommenDeviceItem";
import Slider from "react-slick";
import SpaceBar from "./modals/SpaceBar";
import Portret from "../utils/CheckResolution";



const RecommendDeviceBar = observer(({count}) => {
    const  {device} = useContext(Context)
    const [value, setValue] = useState('');
    const [outputArray, setoutputArray] = useState([]); // Состояние для отображения модального окна
    const [randomSales, setRandomSales] = useState([]);
    const history =useNavigate()
    if(count){}
    else {count=3}
    function getRandomNumbers(arr, count) {
        console.log(arr)
        const shuffled = arr.sort(() => 0.5 - Math.random());
        console.log(shuffled.slice(0, count))
        return shuffled.slice(0, count);

    }

    console.log(randomSales)

    const array = () => {
        let text = "1,2,24,31,112";
        setoutputArray(text.split(",").map(Number));

    }
    useEffect(() => {
        fetchDevice(null, null, device.page, 0,null,null).then(data => {
            const devicesCopy = [...data.rows];
            const randomSalesArray = getRandomNumbers(devicesCopy,9)
            setRandomSales(randomSalesArray);
        })
    }, [ ])

    var settings1 = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: count,
        slidesToScroll: 2,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: count-1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    infinite: true,
                    dots: true
                }
            },
        ]
    };

    return (

            <div className="slider-container text-success ">
                <h2 className={'text-center'}>Рекомендованные товары</h2>
                <Slider {...settings1}>
                    {randomSales.map(randomSale =>
                        <RecomendDeviceItem key={randomSale.id} id={randomSale.id}/>
                    )}
                </Slider>
                <SpaceBar/>
            </div>



    );});


export default RecommendDeviceBar;