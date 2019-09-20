const host = '/api/'
const url = {
    login: 'login',              //登录接口
}
for (let key in url) {
    url[key] = host + url[key] + '.html'
}
export default url
