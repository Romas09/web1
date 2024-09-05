import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {LimitPage} from "../http/deviceApi";



const PagesNews = observer(() => {
    const {device} = useContext(Context)
    const [value, setValue] = useState('');
    console.log(device.limit)
    const pageCount = Math.ceil(device.totalCount / LimitPage)//limit 8 device on page
    const pages = []

    for(let i=0; i<pageCount;i++){
        pages.push(i+1)
    }

    return (
        <Pagination className={"mt-5 mb-1 "}>
            {pages.map(page =>
                <Pagination.Item key={page} active={device.page === page}
                                 onClick={() => device.setPage(page)} className={"pg Pages"}>{page}</Pagination.Item>)}
        </Pagination>
    );
})

export default PagesNews;