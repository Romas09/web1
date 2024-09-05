import {$authHost, $host} from "./index";

export let limit=8


export const createNewses =async (device) => {
    const {data} =  await  $authHost.post(process.env.REACT_APP_API_URL+'api/news/',  device)
    return data
}

export const fetchOneNews =async (id) => {
    const {data} =  await  $host.get(process.env.REACT_APP_API_URL+'api/news/'+ id,)
    return data
}
export const getAllNews =async (limit, page, search,  ) => {
    console.log('yes')
    const {data} =  await  $host.get(process.env.REACT_APP_API_URL+'api/news', {params: {
            limit, page, search
        }})
    return data
}
export const updateNews =async (cash) => {
    const {data} =  await  $authHost.put(process.env.REACT_APP_API_URL+'api/news', cash)
    return data
}
export const delNews =async (id) => {
    const {data} =  await  $authHost.delete(process.env.REACT_APP_API_URL+'api/news//del/'+ id)
    return data
}


/////
export const createSales =async (device) => {
    const {data} =  await  $authHost.post(process.env.REACT_APP_API_URL+'api/sales/',  device)
    return data
}

export const fetchOneSales =async (id) => {
    const {data} =  await  $host.get(process.env.REACT_APP_API_URL+'api/sales/'+ id,)
    return data
}
export const getAllSales =async (limit, page, search,  ) => {
    console.log('yes')
    const {data} =  await  $host.get(process.env.REACT_APP_API_URL+'api/sales', {params: {
            limit, page, search
        }})
    return data
}
export const updateSales =async (cash) => {
    const {data} =  await  $authHost.put(process.env.REACT_APP_API_URL+'api/sales', cash)
    return data
}
export const delSales =async (id) => {
    const {data} =  await  $authHost.delete(process.env.REACT_APP_API_URL+'api/sales/del/'+ id)
    return data
}
/*
export const createReview =async (device) => {
    const {data} =  await  $authHost.post(process.env.REACT_APP_API_URL+'api/device/rev/',  device)
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
    return data
}

export const fetchOneBasket =async (id) => {
    const {data} =  await  $authHost.get(process.env.REACT_APP_API_URL+'api/basket/'+ id)
    return data
}



export const delOneProtoInfo =async (id) => {
    const {data} =  await  $authHost.delete(process.env.REACT_APP_API_URL+'api/device/protoinfo/'+ id)
    return data
}
*/