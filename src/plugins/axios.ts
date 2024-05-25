import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8102/api/',
	timeout: 10000,
	headers: {}
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
	const data = response.data;
	if (data.code === 0) {
		return data.data;
	}
	console.error('request error', data)
	return response.data;
}, function (error) {
	return Promise.reject(error);
});

export default instance;