import axios from"axios"

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL

})
$host.interceptors.request.use(config => {
    // Добавление заголовка только если его ещё нет
    if (!config.headers['ngrok-skip-browser-warning']) {
        config.headers['ngrok-skip-browser-warning'] = 'skip-browser-warning';
    }
    return config;
});
$authHost.interceptors.request.use(config => {
    // Добавление заголовка только если его ещё нет
    if (!config.headers['ngrok-skip-browser-warning']) {
        config.headers['ngrok-skip-browser-warning'] = 'skip-browser-warning';
    }
    return config;
});

const authInterceptor = config => {
    config.headers.authorization= `Bearer ${localStorage.getItem('token')}`
    return config
}
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}