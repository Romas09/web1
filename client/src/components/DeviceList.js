import React, {useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import DeviceItem from "./DeviceItem";
import {Button, Form, Row, Dropdown, Col} from "react-bootstrap";
import {Fixed} from "./FooterBar";


const DeviceList = observer(() => {

    const { device } = useContext(Context);
    const [value, setValue] = useState('');
    const [sortBy, setSortBy] = useState(null);


    return (
        <Row className="d-flex">
                <Col  md={8} className={''}>
                    <Form className="d-flex mb-1 " style={{ borderRadius: '5px' }}>
                        <Form.Control
                            className="bg-dark  border-success n"
                            type="search"
                            placeholder="Поиск"
                            aria-label="Search"
                            style={{ border: '1px solid black',color: '#1ed93a' }}
                            onChange={(event) => {
                                const searchValue = event.target.value; // Extract the value directly from the event
                                setValue(searchValue); // Update the state variable if necessary
                                if (searchValue.trim()) {
                                    device.setSearch(searchValue);
                                } else {
                                    device.setSearch(searchValue);}
                            }}/>
                    </Form>


                </Col>
                <Col  md={4} className={''}>
                    <Dropdown >
                        <Dropdown.Toggle variant="dark" id="sort-dropdown" className={"w-100 btn-dark bg-color-success"} style={{color: '#1ed93a'}}>
                            {sortBy || "Выберите тип сортировки "}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={"w-100 bg-dark"} style={{color: '#1ed93a'}}>
                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSortBy('price');device.setSortOrder('ASC');setSortBy('По возрастанию цены')}}>
                                По возрастанию цены</Dropdown.Item>
                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSortBy('price');device.setSortOrder('DESC');setSortBy('По убыванию цены')}}>
                                По убыванию цены</Dropdown.Item>
                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSortBy('name');device.setSortOrder('ASC');setSortBy('По имени')}}>
                                По имени</Dropdown.Item>
                            <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ device.setSortBy('createdAt');device.setSortOrder('DESC');setSortBy('По новизне')}}>
                                По новизне</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device} />)}
          {device.devices.length === 0 && (
                <h2 className={'text-success text-center mt-3'} >Товаров не найдено</h2>
            )}

        </Row>
    );
});

export default DeviceList;
