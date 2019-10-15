import axios from 'axios';
import store from '../store';
import router from '../router';
import API from './api';
import { Message } from 'element-ui'

//  request
axios.interceptors.request.use(function (config) {
    config.withCredentials = true
    config.timeout = 15000
    let token = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).token:'';
    if (token) {
        config.headers = {
            'token': token,
            'Content-Type': 'application/json; charset=utf-8',
        }
    }
    setTimeout(() => {
      store.dispatch('showLoading', true)
    },500)
    return config;
}, function () {

});

//   response
axios.interceptors.response.use(function (response) {
    store.dispatch('showLoading', false)
    return response;
}, function (error) {
    store.dispatch('showLoading', false)
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                localStorage.removeItem('userInfo')
                router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
    }
    return Promise.reject(error.response.data)
});

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errorText = response.statusText;
    const error = new Error(errorText);
    error.httpStatus = response.status;
    error.url = response.url;
    error.response = response;
    throw error;
}
function request(url, method = 'GET', formData, isUpload) {
    const options = {
        url,
        credentials: 'include',
        method,
        data: formData,
    };
    if (
      options.method === 'POST' ||
      options.method === 'PUT' ||
      options.method === 'DELETE'
    ) {
        if (!isUpload) {
            options.headers = {
                ...options.headers,
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            };
            options.data = JSON.stringify(options.data);
        }
    }

    return axios.request(options)
      .then(checkStatus)
      .then(response => {
          if (response.status === 204) {
              return response.statusText;
          }
          if (response.data && (response.data.code === 'OVERTIME' || response.code === 'OVERTIME' || response.data.msg==='token is invalid,please login again!'|| response.msg==='token is invalid,please login again!')) {
              localStorage.removeItem('userInfo');
              const location = window.location.href;
              if(location.indexOf('login')>-1|| location.indexOf('register')>-1||location.indexOf('forgetPassword')>-1) {

              } else {
                  router.replace({
                      path: 'login',
                  })
              }
          }
          return response.data;
      })
      .catch(e => {
          store.dispatch('showLoading', false)
          const status = e.httpStatus;
          if (status === 401) {
              localStorage.removeItem('userInfo');
              window.location.href = `/login?redirect=${e.url}`;
          } else {
              Message({
                  message: '网络错误',
                  type: 'error',
                  duration: 3 * 1000
              })
          }
      });
}

API.request = request;
export default API;
