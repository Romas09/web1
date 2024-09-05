import React, {useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {createDevice, createType} from "../../http/deviceApi";
import Portret from "../../utils/CheckResolution";
import {createNewses} from "../../http/NewsandSalesApi";

const CreateNews = ({show, onHide}) => {
    const  [value, setValue] = useState('')
    const  [title, setTitle] = useState('')
    const  [text, setText] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [file1, setFile1] = useState(null)
    const [fileall, setFileall] = useState(null)
    const [type, setType] = useState('')

    let isPortret=Portret()


    const  selectFile = e => {
        setFile(e.target.files[0])
    }
    const  selectFile1 = e => {
        setFile1(e.target.files[0])
    }
    const  selectFile2 = e => {
        //const filesArray = Object.values(e.target.files);
        let fileListData=e.target.files
        const filesArray = Object.keys(fileListData).map(key => fileListData[key]);
      console.log(e.target.files)
        setFileall(e.target.files)

    }

    const createNewss = () => {
        /*console.log(name, price, file,
        device.selectedBrand.id, device.selectedType.id,  JSON.stringify(info) )*/
        const currentDate = new Date(Date.now()); // Создаем объект Date с текущим временем
        const year = currentDate.getFullYear(); // Получаем год
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Получаем месяц (плюс 1, так как месяцы нумеруются с 0)
        const day = String(currentDate.getDate()).padStart(2, '0'); // Получаем день
        const date = `${year}-${month}-${day}`;
        const formData =new FormData()
        if(fileall){
            for (let i = 0; i < fileall.length; i++) {
                formData.append('img_html', fileall[i]);
            }
        }

        formData.append('title', title)
        formData.append('text', text)
        formData.append('description', description)
        formData.append('img_glav', file)
        formData.append('img_font', file1)
        formData.append('date', date)
        formData.append('type', type)

        createNewses(formData).then(data => {console.log(data);onHide()})
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить Тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className={!isPortret ? 'mb-3' : 'mt-2 mb-2'}>
                    <Dropdown.Toggle variant="dark" id="sort-dropdown" className={"w-100 btn-dark bg-color-success"} style={{color: '#1ed93a'}}>
                        {type || "Выберите тип сортировки "}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={"w-100 bg-dark"} style={{color: '#1ed93a'}}>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setType('Новости о нас')}}>
                            Новости о нас</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setType('Новости IT')}}>
                            Новости IT</Dropdown.Item>
                        <Dropdown.Item style={{color: '#1ed93a'}} onClick={() =>{ setType('Блог')}}>
                            Блог</Dropdown.Item>


                    </Dropdown.Menu>
                </Dropdown>
                <Form>
                    <Form.Control value={title}
                                  onChange={e => setTitle(e.target.value)}
                                  placeholder={"Введите название Новости или блога"}  />
                    <Form.Label className={'my-2'}>Текст</Form.Label>
                    <Form.Control className="n mb-2  text-success border-success"  style={{backgroundColor: '#171717'}} as="textarea" rows={3} onChange={e => {setText(e.target.value);}} />
                    <Form.Label className={'my-2'}>html код</Form.Label>
                    <Form.Control className="n mb-2  text-success border-success"  style={{backgroundColor: '#171717'}} as="textarea" rows={3} onChange={e => {setDescription(e.target.value);}} />
                    <Form.Label className={'my-2'}>Добавьте заголовочную картинку устройства</Form.Label>
                    <Form.Control className="my-1" placeholder="Добавьте заголовочную картинку устройства"
                                  type="file"  onChange={selectFile}/>
                    <Form.Label className={'my-2'}>Добавьте дополнительную картинку устройства</Form.Label>
                    <Form.Control className="my-1" placeholder="Добавьте дополнительную картинку устройства"
                                  type="file"  onChange={selectFile1}/>
                    <Form.Label className={'my-2'}>Добавьте картинки страницы</Form.Label>
                    <Form.Control type="file" className={'mt-4'} placeholder="Добавьте картинки страницы" multiple onChange={selectFile2} />
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={createNewss}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateNews;