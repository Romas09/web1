import {$authHost, $host} from "./index";
import {refresh} from "../pages/Auth";
import {useContext} from "react";
import {Context} from "../index";

export const createFavourites =async (device_id,user_id) => {
    const {data} =  await  $authHost.post(process.env.REACT_APP_API_URL+'api/favourites/',  {device_id,user_id})
    return data
}

export const getAll =async (id) => {
    const {data} =  await  $host.get(process.env.REACT_APP_API_URL+`api/favourites/${id}`)
    return data
}


export const deleteOneDevice =async (device,user_id) => {
    await  $authHost.delete(process.env.REACT_APP_API_URL+`api/favourites/device/${device}/${user_id}`)
    refresh();}

export const deleteAllDevice =async (user) => {
    await  $authHost.delete(process.env.REACT_APP_API_URL+`api/favourites/del/${user}`)
    refresh();}



