import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import {createBrand, createDevice, fetchBrand, fetchType} from "../../http/deviceApi";
import { Context } from "../../index";
import {$authHost, $host} from "../../http";
import axios from "axios";
import {updateBrands} from "./UpdateDevicename";
import {createFavourites} from "../../http/FavouritesApi";
import {refresh} from "../../pages/Auth";
import {getPromo} from "../../http/Basket_Favourites_PromoApi";


export const createPromo =async (promo) => {
    const {data} =  await  $authHost.post(process.env.REACT_APP_API_URL+'api/promo',  promo)
    return data
}

export function updatePromo(name,date){

    axios.put(process.env.REACT_APP_API_URL+`api/promo/${name}/${date}`);

}
export function delPromo(name){

    axios.delete(process.env.REACT_APP_API_URL+`api/promo/del/${name}/`);

}

const Promo = ({ show, onHide }) => {
    const [name, setName] = useState('');
    const [min_sum, setmin_sum] = useState('');
    const [procent, setProcent] = useState('');
    const [dates, setdates] = useState('');
    const [datee, setdatee] = useState('');
    const [updatee, setupdatee] = useState('');
    const [delname, setdelname] = useState('');
    const [upname, setupname] = useState('');
    const { device } = useContext(Context);
    const [dropdownUpdateFlag, setDropdownUpdateFlag] = useState(false); // Флаг обновления для dropdown

    const addPromo = () => {
        const formData =new FormData()
        formData.append('name', name)
        formData.append('procent', procent)
        formData.append('min_sum', min_sum)
        formData.append('type_id', device.selectedType.id || parseInt('-1'));
        formData.append('band_id', device.selectedBrand.id || parseInt('-1'))
        formData.append('date_start', dates)
        formData.append('date_end', datee)
        createPromo(formData).then(data => onHide())}

    const checkPromo = async () => {
        const { data } = await getPromo(name);
        console.log(data);
       if (data!=undefined){return alert('Промо уже существует');}
       else{addPromo()}
    }

    useEffect(() => {
        fetchType().then(data => device.setTypes(data));
        fetchBrand().then(data => device.setBrands(data));
    }, [device]); // Обновление дропдаунов при изменении device

    const handleTypeSelect = (type) => {
        device.setSelectedType(type);
        setDropdownUpdateFlag(!dropdownUpdateFlag); // Переключаем флаг обновления
    };

    const handleBrandSelect = (brand) => {
        device.setSelectedBrand(brand);
        setDropdownUpdateFlag(!dropdownUpdateFlag); // Переключаем флаг обновления
    };

    const clearSelectedType = () => {
        device.setSelectedType({});
        setDropdownUpdateFlag(!dropdownUpdateFlag);
    };

    const clearSelectedBrand = () => {
        device.setSelectedBrand({});
        setDropdownUpdateFlag(!dropdownUpdateFlag);
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Добавить промокод</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={name} className="mt-3" onChange={e => setName(e.target.value)} placeholder={"Введите название Промокода"} />
                    <Form.Control value={procent} className="mt-3" onChange={e => setProcent(e.target.value)} placeholder={"Введите процент"} />
                    <Form.Control value={min_sum} className="mt-3" onChange={e => setmin_sum(e.target.value)} placeholder={"Введите минимальную сумму, в случаи отсутствия значение 0"} />
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name ? device.selectedType.name : "Выберите Тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item onClick={() => handleTypeSelect(type)} key={type.id}>
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                        {device.selectedType.name && <Button variant="outline-secondary" onClick={clearSelectedType}>×</Button>}
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedBrand.name ? device.selectedBrand.name : "Выберите Брэнд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item onClick={() => handleBrandSelect(brand)} key={brand.id}>
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                        {device.selectedBrand.name && <Button variant="outline-secondary" onClick={clearSelectedBrand}>×</Button>}
                    </Dropdown>
                    <Form.Control value={dates} className="mt-3" onChange={e => setdates(e.target.value)} placeholder={"Дата начала промкода гггг-мм-дд"} />
                    <Form.Control value={datee} className="mt-3" onChange={e => setdatee(e.target.value)} placeholder={"Дата окончания промкода гггг-мм-дд"} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={checkPromo}>Добавить</Button>
            </Modal.Footer>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">Изменить промокод</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={upname} className="mt-2 "
                                  onChange={e => setupname(e.target.value)}
                                  placeholder={"Введите название промкода"}  />
                    <Form.Control value={updatee} className="mt-3 "
                                  onChange={e => setupdatee(e.target.value)}
                                  placeholder={"Введите новую дату окончания"}  />
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-warning" onClick={() => {updatePromo(upname,updatee);onHide();}}>Изменить</Button>
            </Modal.Footer>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">Удалить промокод</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={delname}
                                  onChange={e => setdelname(e.target.value)}
                                  placeholder={"Введите название Промокода"}  />
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={() => {delPromo(delname);onHide();}}>Удалить</Button>
            </Modal.Footer>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Promo;
