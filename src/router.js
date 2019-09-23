import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '轻松淘'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
      meta: {
        title: '用户注册'
      }
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: () => import('./views/ForgetPassword.vue'),
    },
    {
      path: '/forgetPayPassword',
      name: 'forgetPayPassword',
      component: () => import('./views/ForgetPayPassword.vue'),
    },
    {
      path: '/extension',
      name: 'extension',
      component: () => import('./views/Extension.vue'),
      meta: {
        title: '轻松淘'
      }
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: ()=>import('./views/userInfo/Index.vue'),
      children:[
        {
          path:'',
          name: 'userInfo',
          component: ()=>import('./views/userInfo/UserInfo.vue'),
          meta: {
            title: '轻松淘'
          }
        },
        {
          path:'realName',
          name: 'realName',
          component: ()=>import('./views/userInfo/RealName.vue'),
          meta: {
            title: '实名认证'
          }
        },
        {
          path:'phoneAuth',
          name: 'phoneAuth',
          component: ()=>import('./views/userInfo/PhoneAuth.vue'),
          meta: {
            title: '手机认证'
          }
        },
        {
          path:'cardAuth',
          name: 'cardAuth',
          component: ()=>import('./views/userInfo/CardAuth.vue'),
          meta: {
            title: '银行卡认证'
          }
        },
        {
          path:'withdraw',
          name: 'withdraw',
          component: ()=>import('./views/userInfo/Withdraw.vue'),
          meta: {
            title: '资金提现'
          }
        },
        {
          path:'info',
          name: 'info',
          component: ()=>import('./views/userInfo/Info.vue'),
          meta: {
            title: '我的资料'
          }
        },
        {
          path:'password',
          name: 'password',
          component: ()=>import('./views/userInfo/Password.vue'),
          meta: {
            title: '密码管理'
          }
        },
        {
          path:'financeList',
          name: 'financeList',
          component: ()=>import('./views/userInfo/FinanceList.vue'),
          meta: {
            title: '资金流水'
          }
        },
        {
          path:'buyerAccount',
          name: 'buyerAccount',
          component: ()=>import('./views/userInfo/BuyAccount.vue'),
          meta: {
            title: '买号管理'
          }
        },
        {
          path:'buyerAccountAdd',
          name: 'buyerAccountAdd',
          component: ()=>import('./views/userInfo/BuyerAccountAdd.vue'),
          meta: {
            title: '添加买号'
          }
        }
      ]
    }
  ]
})
