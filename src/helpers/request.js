import axios from 'axios'
import {Message} from 'element-ui'

// 封装数据请求接口

// axios 默认 post 内容的格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// axios 默认的根url
axios.defaults.baseURL = 'https://blog-server.hunger-valley.com'

// 可以跨源访问
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url,
            method: type
        }
        if (type.toLowerCase() === 'get') {
            option.params = data
        } else {
            option.data = data
        }
        axios(option).then(res => {
            console.log(res)
            if (res.data.status === 'ok') {
                resolve(res.data)
            } else {
                // Message.error(res.data.msg)
                Message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'error'
                })
                reject(res.data)
            }
        }).catch(err => {
            Message.error('网络异常')
            reject({msg: '网络异常'})
        })
    })
}


// request('/auth/login', 'POST', {username: 'hunger', password: '123456'})
//   .then(data=>{
//     console.log(data)
//   })