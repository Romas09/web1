import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    Col,
    Container,
    Image,
    Row,
    Form,
    Modal,
    Nav,
    Tab,
    Dropdown,
    InputGroup,
    Card,
    Accordion
} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchType, getAllReview, getAllReviewUser} from "../http/deviceApi";
import '../css/remakeTabsVertikal.css'

import FindBar from "../components/FindBar";
import SpaceBar from "../components/modals/SpaceBar";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {BASKET_ROUTE, DEVICE_ROUTE, Favourites_ROUTE, Help_ROUTE, INFO_ROUTE} from "../utils/consts";
import Portret from "../utils/CheckResolution";
import {sendMail} from "../components/BasketList";
import '../css/index.css'
import {check, getBonusUser, updatecheck, updateData, updatePas, userId} from "../http/userApi";




const Help = observer(() => {
    const  {device} = useContext(Context)
    const  {user} = useContext(Context)
    const [review, setReview] = useState([]); // Состояние для отображения модального окна
    const history = useNavigate();
    const location = useLocation();
    const {id} = useParams()
    const { from } = location.state || { from: "profile" };
    console.log(location.state)
    let defaultTabKey=id || 'help'
    if (from === "basket") {
        defaultTabKey='order';
    }


   /* useEffect(() => {
        if (from === "basket") {
            setdefaultTabKey('order');
        }
            setdefaultTabKey(id);console.log(id)
        if(id==='bonus'){console.log(true)}
       // Устанавливаем id как defaultActiveKey
        }, [id]);*/
    console.log(defaultTabKey)

    useEffect(() => {
        fetchDevice(null, null, 1, 2, null,null,null).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setSearch(null)
        })
    }, [])

    useEffect(() => {
        fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand, ])

    useEffect(() => {
        updatecheck(userId).then(data => {
            user.setUserOne(data);

        })
    }, [])
    useEffect(() => {
        getAllReviewUser(5,device.page,user.UserOne.email).then(data => {setReview(data.rows);device.setTotalCountRev(data.count)})

    }, [device.page])



    let isPortret=Portret()


    return (
        <Container >
            <FindBar/>
            <Row className="d-flex mt-3 ms-2" >

                <Tab.Container id="left-tabs-example" defaultActiveKey={defaultTabKey} style={{}}>
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column n">
                                <Nav.Item className="mt-1">
                                    <Nav.Link onClick={() => history(INFO_ROUTE )} className="n">В кртаце о компании</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="mt-1">
                                    <Nav.Link eventKey="company" className="n" style={{color: '#019b18'}}>О компании</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="mt-1">
                                    <Nav.Link eventKey="usluga" className="n" style={{color: '#019b18'}}>Услуги</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="mt-1">
                                    <Nav.Link eventKey="help" className="n">Помощь и основные вопросы</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="mt-1">
                                    <Nav.Link eventKey="adres" className="n">Адрес и Оплата</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="mt-1">
                                    <Nav.Link eventKey="bonus" className="n">Бонусная система</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="mt-1">
                                    <Nav.Link eventKey="QA" className="n">Вопрос-Ответ</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="mt-1">
                                    <Nav.Link eventKey="Service" className="n">Сервис центр</Nav.Link>
                                </Nav.Item>

                            </Nav>

                        </Col>
                        <Col sm={9} className={!isPortret ? '{mt-0}':'mt-3' }>
                            <Tab.Content >
                                <Tab.Pane eventKey="company" className={'customcardMain p-3 rounded-5'} >
                                    <div className='rdw-editor-main rdw-editor-main1 rdw'  dangerouslySetInnerHTML={{ __html: `<h3 style="text-align:center;">Основное</h3>
<p style="text-align:start;"><span style="color: rgba(var(--bs-success-rgb),var(--bs-text-opacity));font-size: 16px;">Компания</span> <span style="color: rgba(var(--bs-success-rgb),var(--bs-text-opacity))font-size:16px;">RsI</span> была основана в 2018году, в те времена мы предоставляли базовый ремонт и продажу комлпектующих. На данный момент наша компания имеет большой оборот клиентов, а так же постоянно развивается привлекая к себе все новых сотрудников и новые связи</p>
<h3 style="text-align:center;">ОСОБЕННОСТИ</h3>
<p style="text-align:start;">Наша компания имеет ряд особенностей и преимуществ</p>
<ul>
<li>Большой ассортимент официальных товаров</li>
<li>Квалифицированный и вежливый персонал</li>
<li>Быстрая обработка заказов</li>
<li>Низкая стоимость</li>
<li>Система бонусов&nbsp;</li>
</ul>
<h4>Экономим ваше время</h4>
<p style="text-align:start;">По Алматы - доставка в день заказа, либо на следующий.&nbsp;</p>
<h4 style="text-align:start;">Бережем ваши нервы</h4>
<p style="text-align:start;">Аккуратно ведём заказы. Реагируем на обращение за 60 мин. Надежно упакуем. Вовремя доставим. Даем гарантию 12 месяцев и более. Примем товар назад в течение 14 дней без скандалов и экспертиз.</p>
<h4 style="text-align:start;">Предлагаем низкие цены</h4>
<p style="text-align:start;">Низкая стоимость товаров - одна из ключевых особенностей нашего магазина. Мы стараемся предложить самые выгодные цены, сохраняя высокий уровень обслуживания. Нашли дешевле? Заполните форму на странице товара.</p>
<h4 style="text-align:start;">Не обманываем покупателей</h4>
<p style="text-align:start;">Всегда прозрачные акции и всегда честные скидки. Отзывы  пишут только наши покупатели. Мы принципиально публикуем как позитивные, так и негативные. <br></p>
`}} />
                                </Tab.Pane>

                                <Tab.Pane eventKey="help" className={'customcardMain p-3 rounded-5'}>
                                    <div className='rdw-editor-main rdw-editor-main1 rdw'  dangerouslySetInnerHTML={{ __html: `<h4 style="text-align:center;">Что такое <strong>Rbonus</strong></h4>
<p><strong>Rbonus</strong> наша бонусная система, подробне можете прочетать <a href="http://localhost:3000/help/bonus" target="_self"><span style="color: rgb(97,189,109);"><ins>здесь</ins></span></a><span style="color: rgb(97,189,109);"><ins>,</ins></span> данными <strong>Rbonus</strong> вы сможете оплачивать интернет заказы</p>
<p></p>
<h5 style="text-align:center;">Как заказать</h5>
<p>Достаточно быть авторизованным,  на товаре нажать добавить в корзину, перейти в <a href="http://localhost:3000/basket" target="_self"><span style="color: rgb(97,189,109);"><ins>корзину</ins></span></a> заполнить все поля и заказть, далее с вами свяжется менеджер</p>
<p><strong>Выбор оплаты вам предложит менеджер</strong></p>
<p></p>
<h5 style="text-align:center;">Отзывы и их перимущества</h5>
<p>Вы можете написать отзыв на товар и в зависимости от его содержания получить вознаграждение от 20 до 400<strong> Rbonus</strong></p>
<p></p>
`}} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="usluga" className={'customcardMain p-3 rounded-5'}>
                                    <div className='rdw-editor-main rdw-editor-main1 rdw'  dangerouslySetInnerHTML={{ __html: `<p style="text-align:center;"><span style="font-size: 30px;">Наши услуги</span></p>
<p><span style="font-size: 18px;">Все услуги имеют приблизительную цену, актуальные цены вы можете узнать у менеджера.</span></p>
<p></p>
<ul>
<li><span style="font-size: 18px;">Сборка ПК от 5000тг</span></li>
<li><span style="font-size: 18px;">Установка программ от 3000тг (установка пакетом), <strong>лицензия приобретается отдельно</strong></span></li>
<li><span style="font-size: 18px;">Установка windows 5000тг, с переносом данных от 7500тг, (если кол-во данных более 5000шт или 10гб), доплачивается по 500тг за каждые (10гб или 5000шт). <strong>Лицензия приобретается отдельно</strong></span></li>
<li><span style="font-size: 18px;">Замена комплектующих, аккумуляторов от 1000тг за штуку. </span></li>
<li><span style="font-size: 18px;">Диагностика от 2000тг, при проведении у нас ремонта диагностика бесплатна или скидка на нее 70%.</span></li>
<li><span style="font-size: 18px;">На все услуги действует пенсионная скидка в размере 8%, (скидка распространяется на услугу, но не на стоимость запчасти, лицензии), необходимо предъявить пенсионный</span></li>
</ul>
`}} />
                                </Tab.Pane>

                                <Tab.Pane eventKey="adres" className={'customcardMain p-3 rounded-5'}>
                                    <div className='rdw-editor-main rdw-editor-main1 rdw'  dangerouslySetInnerHTML={{ __html: `
<h3 style="text-align: center">Доставка</h3>
<p style="text-align:start;">Наша компания имеет несколько вариантов доставки:</p>
<ul>
<li>Самовывоз, сможете забрать заказ после статуса готов к выдаче. Адрес указан ниже. Стоимость бесплатно</li>
<li>ЯндексГо доставим за 3часа если заказ был оформлен и присвоен статус принят до 16:00, цену сообщит менеджер</li>
<li>Наша доставка, доставляем в течении одной рабочей недели. Цена 4000тгесли стоимость заказа менее 101 001тг</li>
</ul>
<h4 style="text-align:center;">Оплата</h4>
<p style="text-align:left;">Наша компания имеет несколько вариантов оплата:</p>
<ul>
<li style="margin-left:1.5em;">Наличный расчет, доступен при самовывозе или при выборе нашей доставки, со стоимостью заказа менее 20 000тг.&nbsp;</li>
<li style="margin-left:1.5em;">Каспи, выставим счет или вы можее оплатить переводом по номеру телефону или по нашим реквизитам: kz50023651vs510cfskaspis</li>
</ul>
<p style="text-align:start;"></p>
<h4 style="text-align:center;">Наш Адрес</h4>
<div style="text-align:center;">
<iframe width="90%" height="250px" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad29e266d95ee0e740fe3182709268ef380db013bcbc4cf293b69fddfc2c63c2e&source=constructor" frameBorder="0"></iframe>
</div>
<p style="text-align:start;"></p>
<p><strong>Адрес:</strong> Айнабулак-2 дом65<br><strong>Телефон:</strong> +77786678572</p>
<p><strong>Режим работы:</strong></p>
<ul>
<li><strong>ПН-ПТ: с 10 до 19</strong></li>
<li><strong>СБ-ВС: толька доставка и онлайн консултация</strong></li>
<li><strong>Праздники: </strong><span style="color: rgb(25,134,84);font-size: 16px;font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;"><strong>онлайн консултация</strong></span><strong> </strong></li>
</ul>
<p></p>
`}} />
                                </Tab.Pane>

                                <Tab.Pane eventKey="bonus" className={'customcardMain p-3 rounded-5'}>
                                    <div className='rdw-editor-main rdw-editor-main1 rdw'  dangerouslySetInnerHTML={{ __html: `<h3 style="text-align:center;">Бонусная система</h3>
<p>После регистрации аккаунта мы вам дарим приветсвенные 500Rbonus</p>
<p>При заполнении анкеты в профиле вы получаете, на каждое день рождение по 1000Rbonus&nbsp;</p>
<p>Вы можете получить Rbonus за написание отзыва</p>
<h3>Отзыв к товару</h3>
<p>За написанный и размещенный на сайте отзыв к товару вы получаете на бонусный счет от 50 до 400 бонусов.<br>Все отзывы проходят модерацию. Старайтесь не давать эмоциональных оценок, пишите о реальных достоинствах и недостатках товара. В отзыве необходимо поделиться вашими впечатлениями о товаре и опыте его использования. Будьте объективны, помните, что ваши комментарии читают другие люди, а порой пользуются ими как руководством к действию. Также прикрепляйте реальные фото и видео товара к отзыву - это повысит сумму вознаграждения за него.</p>
<p>Отзыв не проходит модерацию если:&nbsp;</p>
<ul>
<li>Большое количество грамматических ошибок, присутсвует ненормативная лексика или оскорбительная, не культурная и тд.</li>
<li>Отзыв малосодержателен</li>
<li>Клиент уличен в плагиате или мошеничестве, все прошлые бонусы анулируются.&nbsp;</li>
<li>В день можно оставить до 5 отзывов, остальные будут отклонены.&nbsp;</li>
<li>Максимально схож с предыдущими.</li>
</ul>
<p></p>
<p><span style="font-size: 18px;"><strong>1Rbonus = 1тенге</strong></span></p>
`}} />
                                </Tab.Pane>

                                <Tab.Pane eventKey="QA" className={'customcardMain p-3 rounded-5'}>
                                    <Accordion defaultActiveKey={['-1']} alwaysOpen className={"p-0 mt-3"}>
                                        <Accordion.Item >
                                            <Accordion.Header  > Как можно потратить бонусы?</Accordion.Header>
                                            <Accordion.Body style={{color: '#026507', fontFamily: 'Verdana'}} >
                                                <p>Вы можете потрать <a style={{color: '#00ff3c'}} href="http://localhost:3000/help/bonus" target="_self"><span style={{color: 'rgb(97,189,109)'}}><strong><ins>Rbonus</ins></strong></span></a><strong> </strong> только в нашем <a style={{color: '#00ff3c'}} href="http://localhost:3000/rsi" target="_self">интернет магазине</a> , при заказе  <a style={{color: '#00ff3c'}} href="http://localhost:3000/basket" target="_self">в корзине</a>  есть для этого специальное поле. Условия как потратить могут зависить если инное в <a style={{color: '#00ff3c'}} href="http://localhost:3000/sale" target="_self">акционном товаре</a> . При обычных товарах списать количество <strong>Rbonus</strong>  вы сможете столько сколько захотите, ноитоговая сумма заказа должна быть более <strong>100тенге.</strong></p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion defaultActiveKey={['-1']} alwaysOpen className={"p-0 mt-3"}>
                                        <Accordion.Item >
                                            <Accordion.Header  > Как происходит оплата</Accordion.Header>
                                            <Accordion.Body style={{color: '#026507', fontFamily: 'Verdana'}} >
                                                <p>Оплатить заказ вы можете наличными или по карте, после совершения покупки, менеджер свяжется с вами и уточнитт удобство оплаты. Основные условия выбора оплаты вы можете прочетать в разделе <a href="http://localhost:3000/help/bonus" target="_self"><span style={{color: 'rgb(65,168,95)'}}><ins>Адрес и Оплата</ins></span></a></p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <Accordion defaultActiveKey={['-1']} alwaysOpen className={"p-0 mt-3"}>
                                        <Accordion.Item >
                                            <Accordion.Header  > Возврат товара и получение денежных средств</Accordion.Header>
                                            <Accordion.Body style={{color: '#026507', fontFamily: 'Verdana'}} >
                                                <p>Вернуть товар вы сможете в соответствии с законом РК. Основное что нужно знать, товар не распакован, не был в использовании, возврат менее 14дней с момента покупки. Возврат денег происходит сразу или после проверки товара нашим сервисным центром. Наличные выдаются на пункте самовывоза, а при оплате картой, возврат средств будет воспроизведен в среднем в течении недели после подтверждения возвратом средства.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>


                                </Tab.Pane>

                                <Tab.Pane eventKey="Service" className={'customcardMain p-3 rounded-5'}>
                                    <div className='rdw-editor-main rdw-editor-main1 rdw'  dangerouslySetInnerHTML={{ __html: `<p style="text-align:center;"><span style="font-size: 24px;">Гарантия высокого качества товаров</span></p>
<p><br>На товары нашего магазина предоставляется гарантия на срок до 5 лет, в зависимости от сервисной политики производителя. Срок гарантии указывается в характеристиках товара. Если указано 14 дней, то товар не подлежит гарантии, но его можно вернуть согласно ст.30 Закона РК «О защите прав потребителей». Подтверждением гарантийных обязательств служит гарантийный талон производителя или фирменный гарантийный талон от интернет-магазина Forcecom.kz.</p>
<p>Вниммание мы всегда рады вам помочь и рады исправить любые нюансы, но пожалуйста учитывайте нарушение гарантийных пломб, утеря упаковки или комплектации лишает вас права возврата или бесплатного обслудивания в сервисном центре, если инное не предусмотренно производителем.</p>
<p><br>При отправке товара к нам, заполните бланк возврата (выдаст менеджер). А так же заполните адрес доставки:<br>• Получатель: ТОО "RsI";<br>• Адрес доставки: 050035, г. Алматы, айнабулак-2 дом 65<br>• Телефон получателя: +77786678572;<br>• Оплата: за счет Отправителя.</p>
<p></p>
<p>Вы так же можете привезти товар к нам по адресу  айнабулак-2 дом 65, время работы и точный адрес указаны <a href="http://localhost:3000/help/adres" target="_self"><span style="color: rgb(97,189,109);"><ins>здесь</ins></span></a> <br></p>
<p>Так же для этих брендов указаны адреса официального партнера, то есть не нужно везти эти товары к нам, а сразу туда:&nbsp;</p>
<p></p>
<h5><span style="color: rgb(204,204,204);">SVC</span>: Тел:+79865557272 Адрес: г.Алматы Абай-байзаков</h5>
<h5><span style="color: rgb(235,107,86);font-size: 20px;">Xiaomi</span><span style="color: rgb(25,134,84);font-size: 20px;">: </span>Тел:+79865557272 Адрес: г.Алматы Райымбека</h5>
<h5><span style="color: rgb(250,197,28);font-size: 20px;">Poco</span><span style="color: rgb(25,134,84);font-size: 20px;">: </span>Тел:+79865557272 Адрес: г.Алматы Сейфулина макатаева</h5>
<p><span style="color: rgb(44,130,201);font-size: 24px;">HP</span><span style="font-size: 24px;">: </span><a href="https://support.hp.com/kz-ru/help/service-center" target="_blank"><span style="color: rgb(97,189,109);font-size: 24px;"><ins>Перейдите по ссылке</ins></span></a><span style="color: rgb(97,189,109);"><ins> </ins></span>
<p></p>
<h3 style="text-align:start;">Процесс гарантийного ремонта или возврата</h3>
<ol>
<li>Убедитесь, что у вас есть действующий гарантийный талон на технику, которая требует ремонта.</li>
<li>Уточните бренд вашего устройства и в таблице ниже найдите авторизованный сервис-центр, который занимается обслуживанием данного бренда. Если вашего бренда нет в таблице, позвоните нам по номеру +7 727 318 75 65.</li>
<li>Свяжитесь с выбранным авторизованным сервис-центром для проведения диагностики и ремонта, если он потребуется.</li>
<li>Если брак товара подтвердится, вам выдадут заключение об этом. Обратитесь с ним в наш магазин для обмена или возврата товара.&nbsp;</li>
<li>Внимание если проблема будет по вашей вине, стоимость диагностики и остальные затраты будут за ваш счет.</li>
<li>При подтвержении заводской поломки после выдачи заключения и обращения к нам, мы вам вернем деньги, наличные в день обращения, оплата банковской картой в среднем до 10дней (возврат затягиваем не мы, а сам банк)</li>
</ol>
`}} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>




            </Row>
            <SpaceBar/>
        </Container>
        /*   <Dropdown className="mt-4 mb-2">
                                <Dropdown.Toggle className={"w-100 btn-dark  "} style={{color: '#1ed93a'}}>{device.selectedBrand.name || "Выберите брэнд"}</Dropdown.Toggle>
                                <Dropdown.Menu className={"w-100 bg-dark  "} style={{color: '#1ed93a'}}>
                                    <Dropdown.Item className={"w-100 btn-dark  "} eventKey="s" style={{color: '#1ed93a'}}>Все Брэнды</Dropdown.Item>

                                        <Dropdown.Item eventKey="first">5 </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>*/
    );
});
export default Help;













