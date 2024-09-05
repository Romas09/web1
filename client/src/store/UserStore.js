import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._userBool = {}
        this._user = []
        this._bonus = 0
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setBonus(bool) {
        this._bonus = bool
    }
    setUser(user) {
        this._userBool = user
    }
    get isAuth() {
        return this._isAuth
    }
    get users(){
        return this._userBool
    }
    setUserOne(user) {
        this._user = user
    }
    get UserOne() {
        return this._user
    }
    get Bonus() {
        return this._bonus
    }
}