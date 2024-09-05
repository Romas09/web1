import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Dropdown,} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Dropdown className="mt-4 mb-2">
            <Dropdown.Toggle className={"w-100 btn-dark  "} style={{color: '#1ed93a'}}>{device.selectedBrand.name || "Выберите брэнд"}</Dropdown.Toggle>
            <Dropdown.Menu className={"w-100 bg-dark  "} style={{color: '#1ed93a'}}>
                <Dropdown.Item className={"w-100 btn-dark  "} style={{color: '#1ed93a'}} onClick={() => device.setSelectedBrand('')}>Все Брэнды</Dropdown.Item>
                {device.brands.map(brand =>
                    <Dropdown.Item className={"w-100 btn-dark  bg-color-success"} style={{color: '#1ed93a'}} onClick={() => device.setSelectedBrand(brand)}
                                   key={brand.id}>
                        {brand.name}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default BrandBar;