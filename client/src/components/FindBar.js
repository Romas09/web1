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
import {fetchDevice} from "../http/deviceApi";



const FindBar = observer(() => {
    const  {device} = useContext(Context)
    const [value, setValue] = useState('');
    const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна

const history =useNavigate()

    useEffect(() => {
        fetchDevice(null, null, device.page, 100,null,null,device.Search).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)

        })
    }, [device.page,device.Search ])

    return (
        <Container >
            <Row className="d-flex ">
                <Form className="d-flex justify-content-center align-items-center mt-1 n " style={{ borderRadius: '5px' }}>
                        <Button variant="warning" className="btn-dark text-success me-1  "
                                onClick={()=> {history('/rsi', { state: { from: 'refresh' } });}}>На главную</Button>
                        <Button variant="warning" className="btn-dark text-success me-1"
                                onClick={()=> {history('/katalog', { state: { from: 'refresh' } });}}>Каталог</Button>
                    <Form.Control type="search" placeholder="Поиск" className="n me-1 bg-dark text-success border-success"
                                  style={{minWidth: '110px', width: '600px' }} aria-label="Search"
                                  value={value}
                                  onChange={(event) => {
                                      const searchValue = event.target.value; // Extract the value directly from the event
                                      setValue(searchValue); // Update the state variable if necessary
                                      if (searchValue.trim()) {
                                          device.setSearch(searchValue);
                                      } else {
                                          device.setSearch(searchValue);}
                                  }}/>
                    <Button variant="primary" className="m-0 btn-dark text-success"  onClick={()=> {setShowModal(true)}}   >Поиск</Button>
                </Form>



                {/* Модальное окно для отображения результатов поиска */}
                <Modal show={showModal} onHide={() => setShowModal(false) } className={"my-modal"}  >
                    <Modal.Header closeButton className={"bg-dark text-success lineBottom"}>
                        <Modal.Title className={"bg-dark text-success"}>Результаты поиска</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={"bg-dark text-success"} style={{ maxHeight: 'calc(100vh - 200px)',overflowY: 'auto', overflowX: "hidden" }}>
                        <Row>
                            {device.devices.map(device =>
                                <MainDeviceItem key={device.id} device={device}/>
                            )}
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className={"bg-dark text-success lineTop"}>
                        <Button className={"  btn-dark text-success butMain "} onClick={() => setShowModal(false)}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>

            </Row>

        </Container>

    );});


export default FindBar;