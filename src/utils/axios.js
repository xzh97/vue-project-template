import axios from "axios";

let instance = axios.create({
    timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance
