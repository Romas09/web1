import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Row} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import {observer} from "mobx-react-lite";
import DeleteDevice from "../components/modals/deleteDevice";
import DeleteBrand from "../components/modals/deleteBrand";
import DeleteType from "../components/modals/deleteType";
import UpdateType from "../components/modals/UpdateType";
import UpdateBrand from "../components/modals/UpdateBrand";
import UpdateDevices from "../components/modals/UpdateDevice";
import UpdateDevicename from "../components/modals/UpdateDevicename";
import CreateDelUpdatePromo from "../components/modals/Create,Del,Update Promo";
import CreateDelProperties from "../components/modals/CreateDelProperties";
import {fetchDevice, fetchOneDevice, getAllReview, limit} from "../http/deviceApi";
import {Context} from "../index";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OrderList from "../components/OrderList";
import PagesOrder from "../components/PagesOrder";
import OrderListAdm from "../components/OrderListAdm";
import ReviewtemADM from "../components/ReviewItemADM";
import Reviewtem from "../components/ReviewItem";
import PagesReview from "../components/PagesReview";
import Portret from "../utils/CheckResolution";
import EditorConvertToHTML from "../components/EditorText";
import CreateNews from "../components/modals/CreateNews";
import UpdateNews from "../components/modals/UpdateNewsDel";
import UpdateDelSale from "../components/modals/UpdateDelSale";
import CreateSales from "../components/modals/CreateSale";


const Admin =  observer( () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible ] = useState(false)
    const [deviceVisible, setDeviceVisible ] = useState(false)
    const [dbrandVisible, setdBrandVisible] = useState(false)
    const [dtypeVisible, setdTypeVisible ] = useState(false)
    const [ddeviceVisible, setdDeviceVisible ] = useState(false)
    const [uptypeVisible, setupTypeVisible ] = useState(false)
    const [upbrandVisible, setupBrandVisible ] = useState(false)
    const [updeviceVisible, setupDeviceVisible ] = useState(false)
    const [updevicenVisible, setupDevicenVisible ] = useState(false)
    const [Promoupdelcr, setupPromoupdelcr ] = useState(false)
    const [visible, setVisble ] = useState(true)
    const [properties, setProperties ] = useState(false)
    const [hide, setHide ] = useState('none')
    const [news, setNews ] = useState(false)
    const [newsupdate, setNewsupdate ] = useState(false)
    const [sales, setSales] = useState(false)
    const [salesupdate, setSalesupdate] = useState(false)
    const [review, setReview ] = useState([])
    const [sortBy, setSortBy ] = useState()
    const [status, setStatus ] = useState()
    const [htmlContent, setHtmlContent ] = useState(``)

    let isPortret=Portret()

    const  {device} = useContext(Context)
    useEffect(() => {device.setFixed(true)})

    useEffect(() => {
        getAllReview(5,device.page,device.Search, status).then(data => {setReview(data.rows);device.setTotalCountRev(data.count)})

    }, [device.page,device.Search,status])

    const handleHtmlContentChange = (value) => {
        setHtmlContent(value);
    };


    return (
        <Container className="d-flex flex-column" >
            <Row className="mt-1 mb-5">
                <Col md={6}><div>
                    <Button onClick={() => setTypeVisible(true)}
                            variant={"btn btn-dark"} className="mt-4 p-2 w-100" >Добавить тип </Button></div>
                    <div><Button onClick={() => setBrandVisible(true)}
                            variant={"btn btn-dark"} className="mt-4 p-2 w-100" >Добавить бренд </Button></div>
                    <div><Button onClick={() => setDeviceVisible(true)}
                            variant={"btn btn-dark"} className="mt-4 p-2 w-100" >Добавить устройство </Button></div>
                </Col>
                <Col md={6}>
                    <div> <Button onClick={() => setdTypeVisible(true)}
                            variant={"btn btn-danger"} className="mt-4 p-2 w-100" >Удалить тип </Button></div>
                    <div><Button onClick={() => setdBrandVisible(true)}
                            variant={"btn btn-danger"} className="mt-4 p-2 w-100" >Удалить бренд </Button></div>
                    <div> <Button onClick={() => setdDeviceVisible(true) }
                            variant={"btn btn-danger"} className="mt-4 p-2 w-100" >Удалить устройство </Button></div>
                </Col>
                <div> <Button onClick={() => setupTypeVisible(true) }
                              variant={"btn btn-warning"} className="mt-4 p-2 w-100" >Изменить имя типа </Button></div>
                <div> <Button onClick={() => setupBrandVisible(true) }
                              variant={"btn btn-warning"} className="mt-4 p-2 w-100" >Изменить имя брэнда </Button></div>
                <div> <Button onClick={() => setupDevicenVisible(true) }
                              variant={"btn btn-secondary"} className="mt-4 p-2 w-100" >Изменить имя Девайса </Button></div>
                <div> <Button onClick={() => setupDeviceVisible(true) }
                              variant={"btn btn-secondary"} className="mt-4 p-2 w-100" >Изменить свойства Девайса </Button></div>
                <div> <Button onClick={() => setupPromoupdelcr(true) }
                              variant={"btn btn-secondary"} className="mt-4 p-2 w-100" >Добавить, изменить, удалить промокод </Button></div>
                <div> <Button onClick={() => setProperties(true) }
                              variant={"btn btn-secondary"} className="mt-4 p-2 w-100" >Добавить, удалить Свойства товара </Button></div>
                <div> <Button onClick={() => setNews(true) }
                              variant={"btn btn-secondary"} className="mt-4 p-2 w-100" >Добавить Новости </Button></div>
                <div> <Button onClick={() => setNewsupdate(true) }
                              variant={"btn btn-secondary"} className="mt-4 p-2 w-100" >Изменить удалить Новости </Button></div>
                <div> <Button onClick={() => setSales(true) }
                              variant={"btn btn-secondary"} className="mt-4 p-2 w-100" >Добавить Акции </Button></div>
                <div> <Button onClick={() => setSalesupdate(true) }
                              variant={"btn btn-secondary"} className="mt-4 p-2 w-100" >Изменить удалить Акции</Button></div>


            </Row>

            <Tabs defaultActiveKey="order" id="fill-tab-example" className="mb-3 custom-button " fill>
                <Tab eventKey="order" title="Заказы" className='bg-dark'
                     style={{ minHeight: 'calc(100vh - 200px)' }}>
                    <Row className={'p-2 ms-2'}>
                    <OrderListAdm/>
                    <PagesOrder/>
                    </Row>
                </Tab>

                <Tab eventKey="profile" title="Скоро будет" className={" "}>
                    <div> <h1 >Код</h1>
                        <Form.Control className="n mb-2  text-success border-success"  style={{backgroundColor: '#171717',minHeight: '500px'}}
                                      as="textarea" rows={3} onChange={(e) => handleHtmlContentChange(e.target.value)} value={htmlContent} />
                        <EditorConvertToHTML setHtmlContent={setHtmlContent} style={{ display: 'none' }} />
                        <div>
                            <h1>Демо сайта React</h1>
                        </div>
                        <Button onClick={() =>{setVisble(!visible)}} className={'btn-dark text-success butMain mb-3' }>Фон вкл/выкл</Button>
                        {visible ? (<div className='rdw-editor-main rdw-editor-main1'  dangerouslySetInnerHTML={{ __html: htmlContent }} />):
                            (<div className=' rdw-editor-main1'  dangerouslySetInnerHTML={{ __html: htmlContent }} />)}
                    </div>
                </Tab>
                {/*style={{whiteSpace: 'pre-wrap'}}*/}

                <Tab eventKey="review" title="Отзывы" style={{ minHeight: 'calc(100vh - 200px)'}}>
                    <Row>
                    <Col  md={8} className={''}>
                        <Form className="d-flex mb-1 " style={{ borderRadius: '5px' }}>
                            <Form.Control
                                className="bg-dark  border-success n"
                                type="search"
                                placeholder="Email пользователя"
                                aria-label="Search"
                                style={{ border: '1px solid black',color: '#1ed93a' }}
                                onChange={(event) => {
                                    const searchValue = event.target.value ; // Extract the value directly from the event
                                   // setValue(searchValue); // Update the state variable if necessary
                                    if (searchValue.trim()) {
                                        device.setSearch(searchValue);
                                    } else {
                                        device.setSearch(searchValue);}
                                }}/>
                        </Form>


                    </Col>
                    <Col  md={4} className={''}>
                        <Dropdown className={!isPortret ? '' : 'mt-2'}>
                            <Dropdown.Toggle variant="dark" id="sort-dropdown" className={"w-100 btn-dark bg-color-success"} style={{color: '#1ed93a'}}>
                                {sortBy || "Выберите тип сортировки "}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className={"w-100 bg-dark"} style={{color: '#1ed93a'}}>
                                <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setStatus('создан');setSortBy('создан');}}>
                                    Создан</Dropdown.Item>
                                <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setStatus('одобрен');;setSortBy('одобрен')}}>
                                    Одобрен</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown></Col></Row>
                    {review.map((review, index) => (
                        <ReviewtemADM review={review} key={index} />
                    ))}
                    <PagesReview />




                </Tab>
            </Tabs>


            <CreateBrand show={brandVisible}  onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible}  onHide={() => setDeviceVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <DeleteBrand show={dbrandVisible}  onHide={() => setdBrandVisible(false)} />
            <DeleteDevice show={ddeviceVisible}  onHide={() => setdDeviceVisible(false)} />
            <DeleteType show={dtypeVisible} onHide={() => setdTypeVisible(false)} />
            <UpdateType show={uptypeVisible} onHide={() => setupTypeVisible(false)}/>
            <UpdateBrand show={upbrandVisible} onHide={() => setupBrandVisible(false)}/>
            <UpdateDevices show={updeviceVisible} onHide={() => setupDeviceVisible(false)}/>
            <UpdateDevicename show={updevicenVisible} onHide={() => setupDevicenVisible(false)}/>
            <CreateDelUpdatePromo show={Promoupdelcr} onHide={() => setupPromoupdelcr(false)}/>
            <CreateDelProperties show={properties} onHide={() => setProperties(false)}/>
            <CreateNews show={news} onHide={() => setNews(false)}/>
            <UpdateNews show={newsupdate} onHide={() => setNewsupdate(false)}/>
            <CreateSales show={sales} onHide={() => setSales(false)}/>
            <UpdateDelSale show={salesupdate} onHide={() => setSalesupdate(false)}/>

        </Container>
    );
});

export default Admin;