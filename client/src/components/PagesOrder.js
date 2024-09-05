import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const PagesOrder = observer(() => {
    const {device} = useContext(Context)
    const [value, setValue] = useState('');
    const pageCount = Math.ceil(device.OrdersTotalcount / device.limit)//limit 8 device on page
    const pages = []

    for(let i=0; i<pageCount;i++){
        pages.push(i+1)
    }

    return (
        <Pagination className={"mt-5 mb-1 "}>
            {pages.map(page =>
                <Pagination.Item key={page} active={device.page === page}
                                 onClick={() => device.setPageOrder(page)} className={"pg Pages"}>{page}</Pagination.Item>)}
        </Pagination>
    );
})

export default PagesOrder;