import React, {useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import DeviceItem from "./DeviceItem";
import {Button, Form, Row, Dropdown, Col} from "react-bootstrap";
import {Fixed} from "./FooterBar";
import {fetchBrand, fetchDevice, fetchType, limit} from "../http/deviceApi";
import {fetchallOrder, fetchallOrderUser, fetchOneOrder} from "../http/orderApi";
import {userId} from "../http/userApi";
import OrderItem from "./OrderItem";
import Portret from "../utils/CheckResolution";
import {refresh} from "../pages/Auth";
import OrderItemAdm from "./OrderItemAdm";


const OrderListAdm = observer(() => {

    const  {device} = useContext(Context)
    useEffect(() => {//возможно дописать в контексмте сортбай сортордер исирч
        fetchallOrder(null,  null,null,null,null).then(data => {
            device.setOrders(data.rows)
            device.setOrdersTotalCount(data.count)
            console.log('search',device.Search)
            console.log('data',data.rows)


        })
    }, [])
    useEffect(() => {//возможно дописать в контексмте сортбай сортордер исирч
        fetchallOrder(limit,  device.PageOrder,device.SortBy,device.SortOrder,device.Search).then(data => {
            device.setOrders(data.rows)
            device.setOrdersTotalCount(data.count)


        })
    }, [device.PageOrder,device.SortBy,device.SortOrder,device.Search])
    const [value, setValue] = useState('');
    const [sortBy, setSortBy] = useState(null);
    let isPortret=Portret()

    return (
        <Row className="d-flex mt-2">
            <Col  md={8} className={''}>
                <Form className="d-flex mb-1 " style={{ borderRadius: '5px' }}>
                    <Form.Control
                        className=" border-success n "
                        type="number"
                        placeholder="№Заказа"
                        aria-label="Search"
                        style={{ border: '1px solid black',color: '#1ed93a',backgroundColor: '#151515' }}
                        onChange={(event) => {
                            const searchValue = event.target.value ; // Extract the value directly from the event
                            setValue(searchValue); // Update the state variable if necessary
                            if (searchValue.trim()) {
                                device.setSearch(searchValue);
                            } else {
                                device.setSearch(searchValue);}
                        }}/>
                </Form>


            </Col>
            <Col  md={4} className={''}>
                <Dropdown className={!isPortret ? '' : 'mt-2'}>
                    <Dropdown.Toggle variant="dark" id="sort-dropdown" className={"w-100 btn-dark bg-color-success but-dark-Adm"} style={{color: '#1ed93a'}}>
                        {sortBy || "Выберите тип сортировки "}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={"w-100  but-dark-Adm-list"} style={{color: '#1ed93a'}}>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('создан');setSortBy('Создан');}}>
                            Создан</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('принят');;setSortBy('Принят')}}>
                            Принят</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('ожидает оплаты');setSortBy('Ожидает оплаты');}}>
                            Ожидает оплаты</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('отправлен');setSortBy('Отправлен')}}>
                            Отправлен</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('на тестировании');setSortBy('на тестировании')}}>
                            На тестировании</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('готов к выдаче');setSortBy('Готов к выдаче')}}>
                            Готов к выдаче</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('выдан');setSortBy('Выдан')}}>
                            Выдан</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('отменён');setSortBy('отменён');}}>
                            Отменен</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSortBy('createdAt');device.setSearch(null);device.setSortOrder('DESC');setSortBy('Новые')}}>
                            Все</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            {device.Orders.map(order =>
                <OrderItemAdm key={order.id} order={order} />
            )}

        </Row>
    );
});

export default OrderListAdm;
