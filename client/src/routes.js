import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    DEVICE_ROUTE,
    INFO_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    Sale_ROUTE,
    Main_ROUTE,
    Favourites_ROUTE,
    PROFILE_ROUTE,
    News_ROUTE,
    Blog_ROUTE,
    Help_ROUTE,


} from "./utils/consts";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Info from "./pages/Info";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/Shop";
import Main from "./pages/Main";
import Favourites from "./pages/Favourites"
import Profile from "./pages/Profile"
import News from "./pages/News"
import NewsPage from "./pages/NewsOnePage"
import Sale from "./pages/Sale"
import SalePage from "./pages/SalesPage"
import Blog from "./pages/Blog"
import help from "./pages/Help"

export const authRoutes = [
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: Favourites_ROUTE,
        Component: Favourites
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    }
]
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

export  const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: Main_ROUTE,
        Component: Main
    },
    {
        path: INFO_ROUTE,
        Component: Info
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: News_ROUTE,
        Component: News
    },
    {
        path: News_ROUTE+'/:id',
        Component: NewsPage
    },
    {
        path: Sale_ROUTE,
        Component: Sale
    },
    {
        path: Sale_ROUTE+'/:id',
        Component: SalePage
    },
    {
        path: Blog_ROUTE,
        Component: Blog
    },
    {
        path: Help_ROUTE,
        Component: help
    },
    {
        path: Help_ROUTE+'/:id',
        Component: help
    },


]