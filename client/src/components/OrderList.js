import React, {useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import DeviceItem from "./DeviceItem";
import {Button, Form, Row, Dropdown, Col} from "react-bootstrap";
import {Fixed} from "./FooterBar";
import {fetchBrand, fetchDevice, fetchType, limit} from "../http/deviceApi";
import {fetchallOrderUser, fetchOneOrder} from "../http/orderApi";
import {userId} from "../http/userApi";
import OrderItem from "./OrderItem";
import Portret from "../utils/CheckResolution";
import {refresh} from "../pages/Auth";


const OrderList = observer(() => {

    const  {device} = useContext(Context)
    useEffect(() => {//возможно дописать в контексмте сортбай сортордер исирч
        fetchallOrderUser(null,  null,null,null,null,userId).then(data => {
            device.setOrders(data.rows)
            device.setOrdersTotalCount(data.count)


        })
    }, [])
    useEffect(() => {//возможно дописать в контексмте сортбай сортордер исирч
        fetchallOrderUser(limit,  device.PageOrder,device.SortBy,device.SortOrder,device.Search,userId).then(data => {
            device.setOrders(data.rows)
            device.setOrdersTotalCount(data.count)


        })
    }, [device.PageOrder,device.SortBy,device.SortOrder,device.Search])
    const [value, setValue] = useState('');
    const [sortBy, setSortBy] = useState(null);
    let isPortret=Portret()

    return (
        <Row className="d-flex">
            <Col  md={8} className={''}>
                <Form className="d-flex mb-1 " style={{ borderRadius: '5px' }}>
                    <Form.Control
                        className="bg-dark  border-success n"
                        type="number"
                        placeholder="№Заказа"
                        aria-label="Search"
                        style={{ border: '1px solid black',color: '#1ed93a' }}
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
                    <Dropdown.Toggle variant="dark" id="sort-dropdown" className={"w-100 btn-dark bg-color-success"} style={{color: '#1ed93a'}}>
                        {sortBy || "Выберите тип сортировки "}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={"w-100 bg-dark"} style={{color: '#1ed93a'}}>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('создан');setSortBy('создан');}}>
                            Создан</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('принят');;setSortBy('принят')}}>
                            Принят</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('ожидает оплаты');setSortBy('ожидает оплаты');}}>
                            Ожидает оплаты</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('отправлен');setSortBy('отправлен')}}>
                            Отправлен</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('на тестировании');setSortBy('на тестировании')}}>
                            На тестировании</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('готов к выдаче');setSortBy('готов к выдаче')}}>
                            Готов к выдаче</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('выдан');setSortBy('выдан')}}>
                            Выдан</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSearch(null);device.setSearch('отменён');setSortBy('отменён');}}>
                            Отменен</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSortBy('createdAt');device.setSearch(null);device.setSortOrder('DESC');setSortBy('Новые')}}>
                            Новые</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSortBy('createdAt');device.setSearch(null);device.setSortOrder('ASC');setSortBy('Старые')}}>
                            Старые</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            {device.Orders.map(order =>
                    <OrderItem key={order.id} order={order} />
            )}

        </Row>
    );
});

export default OrderList;
