const host = '/api/'
const url = {
    login: 'user/login',              //登录接口
    register:'user/register' ,//注册
    getProvince: 'common/province',
    getCities: 'common/city',
    resetPassword: 'user/forgetPassWord',
    getSmsCode: 'sms/verificationCode',
    getUserInfo: 'user/info', //用户信息
    userAuth: 'userAuthentication/info', //用户信息
    identityAuth: 'userAuthentication/identityAuth', //实名认证
    phoneAuth: 'userAuthentication/phoneAuth', //手机认证
    bankAuth: 'userAuthentication/bankAuth', //银行卡认证
    buyNumberList: 'user/buyNumberList', //买号列表
    addBuyNumber: 'user/addBuyNumber', //添加买号
    buyNumberRemove: 'user/buyNumberRemove', //删除买号
    withdrawBankCard: 'userAccount/withdrawBankCard', //提现银行卡查询
    bankAccountBind:'userAccount/binding', // 绑定银行卡
    withdraw:'userAccount/withdraw', // 提现
    financeList:'userCapitalFlow/list', // 提现
    updatePassword: 'user/updatePwd', // 修改登录密码
    updatePayPassword: 'user/updatePayPwd', // 修改登录密码
    taskList: 'userTask/list', // 可申请任务列表
    checkBuyer:'userTask/check',
}
for (let key in url) {
    url[key] = host + url[key]
}
export default url
