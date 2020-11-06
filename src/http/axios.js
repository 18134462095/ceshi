import axios from 'axios';
import config from './config';
import router from '@/router'
// 使用vuex做全局loading时使用
// import store from '@/store'
export default function $axios(options) {
    return new Promise(resolve => {
        if (!window.plus) resolve('123')
        // console.log(localStorage.imei,'localStorage.imei')
        if (localStorage.imei) {
            resolve(localStorage.imei)
        } else {
            document.addEventListener("plusready", () => {
                if (isiOS) {
                    var ASIdentifierManager = plus.ios.importClass("ASIdentifierManager");
                    var sharedManager = ASIdentifierManager.sharedManager();
                    // if (sharedManager.isAdvertisingTrackingEnabled()) {
                    var advertisingIdentifier = sharedManager.advertisingIdentifier();
                    var idfa = plus.ios.invoke(advertisingIdentifier, "UUIDString");
                    localStorage.imei = idfa
                    resolve(localStorage.imei)
                    // }
                } else {
                    if (plus.os.version >= 10) {
                        plus.device.getOAID({
                            success: function (e) {
                                localStorage.imei = e.oaid
                                resolve(localStorage.imei)
                            }
                        })
                    } else {
                        plus.device.getInfo({
                            success: function (e) {
                                localStorage.imei = e.imei.split(',')[0]
                                resolve(localStorage.imei)
                            }
                        })
                    }
                }
            }, false);
        }
    }).then(imei => {
        // console.log('设备号: ' + imei + '\n' + 'ip: ' + returnCitySN.cip + '\n' + '设备号类型: ' + deviceType)
        return new Promise((resolve, reject) => {
            const instance = axios.create({
                baseURL: config.baseUrl,
                headers: config.headers,
                timeout: config.timeout,
                withCredentials: config.withCredentials
            })
            // request 拦截器
            instance.interceptors.request.use(
                config => {
                    config.headers.token = imei
                    return config
                },

                error => {
                    // 1. 判断请求超时
                    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                        // return service.request(originalRequest);// 再重复请求一次
                    }
                    // 2. 需要重定向到错误页面
                    const errorInfo = error.response
                    if (errorInfo) {
                        error = errorInfo.data // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                        const errorStatus = errorInfo.status; // 404 403 500 ...
                        router.push({
                            path: `/error/${errorStatus}`
                        })
                    }
                    return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
                }
            )

            // response 拦截器
            instance.interceptors.response.use(
                response => {
                    let data;
                    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                    if (response.data == undefined) {
                        data = JSON.parse(response.request.responseText)
                    } else {
                        data = response.data
                    }
                    // 根据返回的code值来做不同的处理
                    switch (data.rc) {
                        case 1:
                            break;
                        case 0:
                        default:
                    }
                    // 若不是正确的返回code，且已经登录，就抛出错误
                    // const err = new Error(data.desc)
                    // err.data = data
                    // err.response = response
                    // throw err

                    return data
                },
                err => {
                    if (err && err.response) {
                        switch (err.response.status) {
                            case 400:
                                err.message = '请求错误'
                                break
                            case 401:
                                err.message = '未授权'
                                break
                            case 403:
                                err.message = '拒绝访问'
                                break
                            case 404:
                                err.message = `请求地址出错: ${err.response.config.url}`
                                break
                            case 408:
                                err.message = '请求超时'
                                //重新发起请求
                                return axios(err.config);
                                break
                            case 500:
                                err.message = '服务器内部错误'
                                break
                            case 501:
                                err.message = '服务未实现'
                                break
                            case 502:
                                err.message = '网关错误'
                                break
                            case 503:
                                err.message = '服务不可用'
                                break
                            case 504:
                                err.message = '网关超时'
                                break
                            case 505:
                                err.message = 'HTTP版本不受支持'
                                break
                            default:
                        }
                    }
                    return Promise.reject(err) // 返回接口返回的错误信息
                }
            )
            // 请求处理
            instance(options).then(res => {
                resolve(res)
                return false
            }).catch(error => {
                reject(error)
            })
        })
    })
}