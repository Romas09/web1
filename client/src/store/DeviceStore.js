import {makeAutoObservable,action} from "mobx";

export default class DeviceStore{
    constructor() {
        this._baskets=[]
        this._favourites=[]
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedBasket = {}
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._totalCountreview = 0
        this._limit = 8
        this._sortBy = 'createdAt'
        this._sortOrder = 'DESC'
        this._search = ''
        this._fixed = true
        this._orders = []
        this._ordersadm = []
        this._ordertotalcount = 0
        this._orderadmtotalcount=0
        this._pageorder = 1
        makeAutoObservable(this)
    }


    setTypes(types) {
        this._types =types
    }
    setBaskets(baskets) {
        this._baskets =baskets
    }
    setFavourites(favourites) {
        this._favourites =favourites
    }
    setBrands(brands) {
        this._brands =brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setSelectedType(type){
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBasket(basket){
        this._selectedBasket = basket
    }
    setSelectedBrand(brand){
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
    setTotalCountRev(count){
        this._totalCountreview = count
    }
    setSortBy(sort){
        this._sortBy = sort
    }
    setSortOrder(sort){
        this._sortOrder = sort
    }
    setSearch(search){
        this._search = search
    }
    setLimit(limit){
        this._limit = limit
    }
    setFixed(types) {
        this._fixed =types
    }
    setOrders(types) {
        this._orders =types
    }
    setOrdersAdm(baskets) {
        this._ordersadm =baskets
    }
    setOrdersTotalCount(baskets) {
        this._ordertotalcount =baskets
    }
    setOrdersAdmTotalCount(baskets) {
        this._orderadmtotalcount =baskets
    }
    setPageOrder(baskets) {
        this._pageorder =baskets
    }
    get types() {
        return this._types
    }
    get baskets() {
        return this._baskets
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBasket(){
        return this._selectedBasket
    }
    get Favourites(){
        return this._favourites
    }
    get selectedBrand(){
        return this._selectedBrand
    }
    get selectedBrand(){
        return this._selectedBrand
    }
    get totalCount(){
        return this._totalCount
    }
    get totalCountRev(){
        return this._totalCountreview
    }
    get page(){
        return this._page
    }
    get limit(){
        return this._limit
    }
    get SortBy(){
        return this._sortBy
    }
    get SortOrder(){
        return this._sortOrder
    }
    get Search(){
        return this._search
    }
    get Fixed(){
        return this._fixed
    }
    get Orders(){
        return this._orders
    }
    get OrdersAdm(){
        return this._ordersadm
    }
    get OrdersTotalcount(){
        return this._ordertotalcount
    }
    get OrdersAdmTotalCount(){
        return this._orderadmtotalcount
    }
    get PageOrder(){
        return this._pageorder
    }


}