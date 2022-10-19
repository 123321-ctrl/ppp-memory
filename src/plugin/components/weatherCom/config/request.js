import axios from 'axios'

export function request(config) {

    const instance = axios.create({
        baseURL: 'https://devapi.qweather.com/v7',
        timeout: 5000
    })

    instance.interceptors.request.use(
        config => {
            config.params.key = 'ef66c4a25ddf4a1abae5d9207801b46e';
            return config
        }),
        err => { console.log(err) }

    return instance(config);
}

export function requestLoc(config) {

    const instance = axios.create({
        baseURL: 'https://geoapi.qweather.com/v2',
        timeout: 5000
    })

    instance.interceptors.request.use(
        config => {
            config.params.key = 'ef66c4a25ddf4a1abae5d9207801b46e';
            // console.log(config)
            return config
        }),
        err => { console.log(err) }

    return instance(config);
}

//get城市
export function getrequestLoc(x,y) {
    return requestLoc({
        url: '/city/lookup',
        params: {
            location: `${x},${y}`
        }
    })
}

// now 实时天气数据
export function getNowData(pos) {
    return request({
        url: '/weather/now',
        params: {
            location: pos
        }
    })
}

// forecast 7日未来天气预报
export function get7DaysData(pos) {
    return request({
        url: '/weather/7d',
        params: {
            location: pos
        }
    })
}

// 天气指数
export function getLifestyle(pos) {
    return request({
        url: '/indices/1d',
        params: {
            location: pos,
            type:'1,2,3,4,6,9,13,16'
        }
    })
}

// 24小时天气
export function get24Temp(pos) {
    return request({
        url: '/weather/24h',
        params: {
            location: pos,
        }
    })
}