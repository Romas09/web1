import {$authHost, $host} from "./index";

export let limit=8
export const LimitPage=8

export const createType =async (type) => {
    const {data} =  await  $authHost.post(process.env.REACT_APP_API_URL+'api/type',  type)
    return data
}
export const fetchType =async () => {
    const {data} =  await  $host.get(process.env.REACT_APP_API_URL+'api/type')
    return data
}
export const createBrand =async (brand) => {
    const {data} =  await  $authHost.post(process.env.REACT_APP_API_URL+'api/brand',  brand)
    return data
}
export const fetchBrand =async () => {
    const {data} =  await  $host.get(process.env.REACT_APP_API_URL+'api/brand' )
    return data
}
export const createDevice =async (device) => {
    const {data} =  await  $authHost.post(process.env.REACT_APP_API_URL+'api/device',  device)
    return data
}
export const createReview =async (device) => {
    const {data} =  await  $authHost.post(process.env.REACT_APP_API_URL+'api/device/rev/',  device)
    return data
}
export const getAllReview =async (limit, page, search, status ) => {
    const {data} =  await  $authHost.get(process.env.REACT_APP_API_URL+'api/device/rev/', {params: {
            limit, page, search, status
        }})
    return data
}
export const getAllReviewUser =async (limit, page, email ) => {
    const {data} =  await  $authHost.get(process.env.REACT_APP_API_URL+'api/device/rev/user', {params: {
            limit, page, email
        }})
    return data
}
export const updateReview =async (status,id,bonus,iddevice) => {
    const {data} =  await  $authHost.put(process.env.REACT_APP_API_URL+'api/device/rev/', {status,id,bonus,iddevice})
    return data
}
export const delReview =async (id) => {
    const {data} =  await  $authHost.delete(process.env.REACT_APP_API_URL+'api/device/rev/'+ id)
    return data
}
export const fetchDevice =async (typeId, brandId, page, limit, sortBy, sortOrder,search) => {
    const {data} =  await  $host.get(process.env.REACT_APP_API_URL+'api/device', {params: {
            typeId, brandId, page, limit,sortBy, sortOrder,search
        }})
    console.log($host.get(process.env.REACT_APP_API_URL+'api/device'))
    return data
}
export const fetchOneDevice =async (id,reviewPage,reviewLimit,rating) => {
    const {data} =  await  $host.get(process.env.REACT_APP_API_URL+'api/device/'+ id,{params: {
            reviewPage,reviewLimit,rating
        }})
    return data
}
export const fetchOneBasket =async (id) => {
    const {data} =  await  $authHost.get(process.env.REACT_APP_API_URL+'api/basket/'+ id)
    return data
}


export const createProtoInfo =async (device) => {
    const {data} =  await  $authHost.post('http://localhost:5000/api/device/protoinfo',  device)
    return data
}
export const fetchOneProtoInfo =async (id) => {
    const {data} =  await  $authHost.get(process.env.REACT_APP_API_URL+'api/device/protoinfo/'+ id)
    return {data}
}

export const delOneProtoInfo =async (id) => {
    const {data} =  await  $authHost.delete(process.env.REACT_APP_API_URL+'api/device/protoinfo/'+ id)
    return data
}
