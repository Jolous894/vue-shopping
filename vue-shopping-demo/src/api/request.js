//axios的二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//1：利用axios对象的方法create，去创建一个axios实例
//2：request就是axios，只不过稍微配置一下
const request = axios.create({
    //配置对象
    //基础路劲，发送请求的时候，自动在路径在前面加上 /api
    baseURL:'/api',
    //代表请求超时的时间5s
    timeout:5000,
})

//请求拦截器：  在发请求之前，请求拦截器可以检测到，可以在请求发送出去之前做一些事情
request.interceptors.request.use((config)=>{
    //config:配置对象，对象里面有一个属性很重要，header请求头
    //进度条开始动
    //请求头添加一个字段(userTempId):后台商量好的
    let uuid_token = localStorage.getItem("UUIDTOKEN")
    let token = localStorage.getItem("TOKEN")
    if (uuid_token) {
        config.headers.userTempId = uuid_token
    }
    if(token) {
        config.headers.token = token
    }
    nprogress.start()
    return config
})

//响应拦截器
request.interceptors.response.use((res)=>{
//成功的回调函数：服务器响应的数据回来以后，响应拦截器可以检测到，可以做一些事情
nprogress.done()
return res.data
},(error)=>{
    //响应失败的回调函数
    return Promise.reject(error)
})

export default request
