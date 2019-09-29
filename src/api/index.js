import axios from 'axios';
import store from '../store';
import router from 'vue-router';
import API from './api';

//  request
axios.interceptors.request.use(function (config) {
    config.withCredentials = true
    config.timeout = 12000
    let token = sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')).token:'';
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
                sessionStorage.removeItem('userInfo')
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
          if (response.data.code === 'OVERTIME') {
              sessionStorage.removeItem('userInfo');
              router.replace({
                  path: 'login',
              })
          }
          return response.data;
      })
      .catch(e => {
          store.dispatch('showLoading', false)
          const status = e.httpStatus;
          if (status === 401) {
              sessionStorage.removeItem('userInfo');
              window.location.href = `/login?redirect=${e.url}`;
          } else {
              alert(`Ops! get a error: ${status}`);
          }
      });
}

API.request = request;
export default API;
