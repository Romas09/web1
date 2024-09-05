import React, {useContext, useEffect, useState} from 'react';
import {Image,} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import star from "../assets/romas.png"
import whats from "../assets/whatsap.png"
import telephone from "../assets/telPro.png" //telephone.png phone-conversation.png"
import info from "../assets/infoGPro.png"//info.png
import { MDBFooter} from "mdb-react-ui-kit";
import {Context} from "../index";

export let Fixed=true

const FooterBar = observer(() => {
    const  {device} = useContext(Context)
    const [isFixed, setIsFixed] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset === 0) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
       const footerStyle = {
           position: isFixed ? 'fixed' : 'relative',
           bottom: 0,left: 0, right: 0,
           width: '100%',
           backgroundColor: '#333',
           color: 'white',}

      /* setIsFixed(device.Fixed)},[device.Fixed]); НО НУЖНО ЧЕРЕЗ КОНТЕКСТ НА КАЖДОЙ СТРАНИЦЕ УКАЗЫВАТЬ device.setFixed(true) false
        const footerStyle = {
            position: isFixed ? 'fixed' : 'relative',
            bottom: 0,left: 0, right: 0,
            width: '100%',
            backgroundColor: '#333',
            color: 'white',}
*/

        return (
            <MDBFooter className='text-center mt-5 fixed-bottom p-2 bg-dark' style={footerStyle}>
                <div className="my-2">
                    <a className="p-2 mx-2 " href="/"><Image src={star} width={120} height={35}/></a>
                    <a href="https://wa.me/+77786678572" className="mx-2 p-2"><Image src={whats} width={35} height={35}/></a>
                </div>
                <div className="my-2">
                    <a href="tel:+77786678572" ><Image src={telephone} width={35} height={35}/></a>
                    <a href="/info" className="mx-2  text-uppercase text text- text-decoration-none">информация и адрес<Image className="ms-2" src={info} width={35} height={35}/></a>
                </div>
            </MDBFooter>
        );});


export default FooterBar;