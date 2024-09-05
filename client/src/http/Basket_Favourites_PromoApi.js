import {$authHost, $host} from "./index";
import {refresh} from "../pages/Auth";

export const getPromo =async (name) => {
    const {data} =  await  $host.get(process.env.REACT_APP_API_URL+'api/promo/one/'+ name)
    return data //{data}

}

export const deleteAllBasket=async (id) => {
    const {data} =  await  $host.delete(process.env.REACT_APP_API_URL+'api/basket/'+ id)
    return data //{data}

}
export const checkEmail=async (kod,email) => {
const {data} =  await  $host.post(process.env.REACT_APP_API_URL+'api/basket/sendmailcheck',{kod,email})
    return data}

export const sponsorEmail=async (email,fio,tel,opys) => {
    const {data} =  await  $host.post(process.env.REACT_APP_API_URL+'api/basket/sendmailsponsor',{email,fio,tel,opys})
    return data}