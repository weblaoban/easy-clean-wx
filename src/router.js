import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/taskApply',
    },
    {
      path: '/taskApply',
      name: 'taskApply',
      component: () => import('./views/TaskApply.vue'),
      meta: {
        title: '申请任务'
      }
    },
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
        path:'/myTask',
          name: 'myTask',
          component: ()=>import('./views/MyTask.vue'),
          meta: {
              title: '我的任务'
          }
      },
      {
          path:'/evaluate/:orderId/:taskSubId/:taskId',
          name: 'evaluate',
          component: ()=>import('./views/Evaluate.vue'),
          meta: {
              title: '评价宝贝'
          }
      },
    {
      path:'/startTask/:taskId/:taskSubId/:buyerNumberId/:id',
      name: 'startTask',
      component: ()=>import('./views/StartTask.vue'),
      meta: {
        title: '开始任务'
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
              path:'ruleAuth',
              name: 'ruleAuth',
              component: ()=>import('./views/userInfo/RuleAuth.vue'),
              meta: {
                  title: '平台规则考试'
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
router.beforeEach((to, from, next) => {
  const userInfo = sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):{};
    if (to.path === '/login') {
        next()
    } else if(to.path==='/register'){
        next()
    } else if(to.path==='/forgetPassword'){
        next()
    } else {
        if (userInfo && userInfo.id) {
            next()
        } else {
            router.push('/login')
        }
    }
})
export default router;
