import {$authHost, $host} from "./index";
import axios from "axios";


export const createOrder =async (date, delivery, adres, fio, tel, email, promo,bonus,itog_sum,user_id,devicearr) => {

    const {data} = await $authHost.post(process.env.REACT_APP_API_URL + 'api/order/', {
        date, delivery, adres, fio, tel, email, promo,bonus,itog_sum,user_id,devicearr
    })
    return data
}

export const fetchallOrder =async (limit,page, sortBy, sortOrder,search) => {
    const {data} =  await  $authHost.get(process.env.REACT_APP_API_URL+'api/order', {params: {
              limit,page,sortBy, sortOrder,search
        }})
    return data
}
export const fetchallOrderUser =async (limit,page, sortBy, sortOrder,search,user_id) => {
    const {data} =  await  $authHost.get(process.env.REACT_APP_API_URL+'api/order/user', {params: {
            limit,page,sortBy, sortOrder,search,user_id
        }})
    return data
}

    export const fetchOneOrder =async (id) => {
        const {data} =  await  $authHost.get(process.env.REACT_APP_API_URL+'api/order/'+ id)
        return data
    }
export const updateOrder=async (id,status)=> {
    const {data} =  await $authHost.put(process.env.REACT_APP_API_URL+`api/order/status/`, {id,status});
    return data
}
