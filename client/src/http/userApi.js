import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";


export const registration =async (email, password) => {
    const {data} =  await  $host.post(process.env.REACT_APP_API_URL+'api/user/registration', {email, password, role: process.env.REACT_APP_REGISTR_ROLE})//ADMIN

    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login =async (email, password) => {
      const {data}=  await  $host.post(process.env.REACT_APP_API_URL+'api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return (jwt_decode(data.token))
}

export const check =async () => {
    const {data} =  await  $authHost.get(process.env.REACT_APP_API_URL+'api/user/auth', )
    return jwt_decode(data.token)
}
export const updatecheck =async (id) => {
    const {data} =  await  $authHost.get(process.env.REACT_APP_API_URL+`api/user/auth/${id}`, )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const updatePassword =async (email,password) => {
    const {data} =  await  $host.put(process.env.REACT_APP_API_URL+`api/user/password`, {email,password})

}
export function parseJwt (token) {
    if(token === null){token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiIxIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njk4MTk3NDAsImV4cCI6MTY2OTkwNjE0MH0.M4NM_kDeVOIh2O8SMFeHftZcf08mGRlUYzOCHU2yJoE"}
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};
export let userId=(parseJwt(localStorage.getItem('token')).id);

export const updateData =async (id,tel,fio,date) => {console.log(id,tel,fio,date)
    const {data}=  await  $authHost.put(process.env.REACT_APP_API_URL+'api/user/update', {id,tel,fio,date})
    return data
}
export const updatePas =async (email, password,newpass) => {
    const {data}=  await  $authHost.put(process.env.REACT_APP_API_URL+'api/user/updatep', {email, password,newpass})
    return data
}
export const getAllUsers =async () => {
    const {data}=  await  $authHost.get(process.env.REACT_APP_API_URL+'api/user/all', {})
    return data
}
export const updateBonus =async (id,bonus) => {
    const {data}=  await  $authHost.put(process.env.REACT_APP_API_URL+'api/user/bonus', {id,bonus})
    return data
}
export const getBonus =async (iduser) => {
    const {data}=  await  $authHost.get(process.env.REACT_APP_API_URL+`api/user/bonus/${iduser}`, {})
    return data
}
export const getBonusUser =async (iduser) => {
    const {data}=  await  $authHost.get(process.env.REACT_APP_API_URL+`api/user/bonususer/${iduser}`, {})
    return data
}
export const createBonus =async (id,bonus) => {
    const {data}=  await  $authHost.post(process.env.REACT_APP_API_URL+'api/user/bonus', {id,bonus})
    return data
}