import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Dropdown, ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Dropdown className="mt-2 mb-2 ">  <Dropdown.Toggle className={"w-100 btn-dark  bg-color-success"} style={{color: '#1ed93a'}} >{device.selectedType.name || "Выберите тип товара "}</Dropdown.Toggle>
            <Dropdown.Menu className={"w-100 bg-dark"} >
                <Dropdown.Item  className={"w-100   bg-color-success"} style={{color: '#1ed93a'}} onClick={() => device.setSelectedType('')}>Все Типы </Dropdown.Item>
                {device.types.map(brand =>
                    <Dropdown.Item className={"w-100 btn-dark  bg-color-success"} style={{color: '#1ed93a'}} onClick={() => device.setSelectedType(brand)}
                                   key={brand.id}>{brand.name} </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>

    );
});


export default TypeBar;
//1ed93a