<template>
    <div class="userInfo" v-loading="loading">
        <div class="head">
            <div class="container headInfo">
                <div class="img">
                    <img src="../../assets/images/head.png" alt="">
                </div>
                <p><span v-text="info.userName ? info.userName + '，' : ''"></span>欢迎回来</p>
                <a @click="logOut">退出</a>
            </div>
            <div class="finance">
                <p>
                    <span>资金余额</span>
                    <span v-text="info.userAccount.balance"></span>
                </p>
                <p>
                    <span>提现中资金</span>
                    <span v-text="info.userAccount.accountFrozen"></span>
                </p>
            </div>
        </div>
        <div style="height: 50px;line-height: 50px;text-align: center;border-bottom: solid 2px #ddd;background: #fff;">我的认证</div>
        <div class="authentication container">
            <ul v-loading="loading">
                <li>
                    <router-link to="/userInfo/realName" v-if="authInfo.identityAuth === 0 || authInfo.identityAuth === 2 || authInfo.identityAuth === 3">实名认证</router-link>
                    <a v-if="authInfo.identityAuth === 1">实名认证</a>
                    <em class="suess" v-if="authInfo.identityAuth === 1"></em>
                    <em class="fail" v-if="authInfo.identityAuth === 0 || authInfo.identityAuth === 2"></em>
                    <em class="checking" v-if="authInfo.identityAuth === 3"></em>
                </li>
                <li>
                    <router-link to="/userInfo/phoneAuth" v-if="authInfo.phoneAuth === 0 || authInfo.phoneAuth === 2">手机认证</router-link>
                    <a v-if="authInfo.phoneAuth === 1">手机认证</a>
                    <em class="suess" v-if="authInfo.phoneAuth === 1"></em>
                    <em class="fail" v-if="authInfo.phoneAuth === 0 || authInfo.phoneAuth === 2"></em>
                </li>
                <li>
                    <router-link to="/userInfo/cardAuth" v-if="authInfo.bankAuth === 0 || authInfo.bankAuth === 2|| authInfo.bankAuth === 3">银行卡认证</router-link>
                    <a v-if="authInfo.bankAuth === 1">银行卡认证</a>
                    <em class="suess" v-if="authInfo.bankAuth === 1"></em>
                    <em class="fail" v-if="authInfo.bankAuth === 0 || authInfo.bankAuth === 2"></em>
                    <em class="checking" v-if="authInfo.bankAuth === 3"></em>
                </li>
                <li>
                    <router-link to="/" v-if="authInfo.ruleAuth === 0 || authInfo.ruleAuth === 2">平台规则考试认证</router-link>
                    <a v-if="authInfo.ruleAuth === 1">平台规则考试认证</a>
                    <em class="suess" v-if="authInfo.ruleAuth === 1"></em>
                    <em class="fail" v-if="authInfo.ruleAuth === 0 || authInfo.ruleAuth === 2"></em>
                </li>
            </ul>
        </div>
        <ul class="list">
            <li><router-link to="/userInfo/buyerAccount">买号管理</router-link></li>
            <li><router-link to="/userInfo/withdraw">资金提现</router-link></li>
            <li><router-link to="/userInfo/financeList">资金流水</router-link></li>
            <li><router-link to="/userInfo/info">我的资料</router-link></li>
            <li><router-link to="/userInfo/password">密码管理</router-link></li>
            <li><a href="">联系客服</a></li>
        </ul>
    </div>
</template>
<script>
    export default {
      name: 'userInfo',
      data(){
        return {
          loading: false,
          info: {userAccount: {}},
          authInfo: {}
        }
      },
      async created(){
        this.loading = true;
        const result = await this.$API.request(this.$API.getUserInfo,'POST');
        const authResult = await this.$API.request(this.$API.userAuth,'POST');
        this.loading = false;
        if(authResult && authResult.success){
          const data = authResult.data;
          this.authInfo = data;
        }
        if(result && result.success){
          const data = result.data;
          const sexDesc = data.sex===1?'先生':'女士';
          this.info = {...data,sex: sexDesc}
        }
        if (result.code === 'OVERTIME') {
          this.$router.push('/login')
        }
      },
      methods:{
        logOut(){

        }
      }
    }
</script>
<style lang="scss" scoped>
    .userInfo{
        .container{
            padding: 0 30px;
        }
        .head{
            background: #4685f4;
            color: #fff;
            .headInfo{
                padding: 20px 40px;
                .img{
                    border-radius: 50px;
                    img{
                        width: 110px;
                        height: 110px;
                    }
                }
                p{
                    padding-top: 10px;
                    color: #fff;
                    line-height: 40px;
                    span{
                        line-height: 40px;
                    }
                }
                a{
                    display: block;
                    margin-top: 15px;
                    color: #fff;
                    line-height: 40px;
                }
            }
        }
        .finance{
            height: 100px;
            border-bottom: 1px solid #eee;
            padding-top: 10px;
            background: rgba(0,0,0,0.1);
            p{
                width: 50%;
                float: left;
                color: #fff;
                span{
                    display: block;
                    color: #fff;
                    &:first-child{
                        margin-bottom: 10px;
                    }
                }
            }
        }
        .authentication{
            margin-top: 20px;
            ul{
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                li{
                    width: 41%;
                    margin: 1%;
                    position: relative;
                    a{
                        display: block;
                        width: 100%;
                        height: 100%;
                        line-height: 60px;
                        padding: 0 20px;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
                        color: #666;
                    }
                    em{
                        position: absolute;
                        top: -5px;
                        right: -5px;
                        width: 30px;
                        height: 30px;
                        &.suess{
                            background: url(../../assets/images/right.png) no-repeat;
                            background-position: center;
                            background-size: 0.5rem;
                        }
                        &.fail{
                            background: url(../../assets/images/wrong.png) no-repeat;
                            background-position: center;
                            background-size: 0.35rem;
                        }
                        &.checking{
                            background: url(../../assets/images/checking.png) no-repeat;
                            background-position: center;
                            background-size: 0.28rem;
                        }
                    }
                }
            }
        }
        .list{
            margin-top: 20px;
            li{
                width: 100%;
                border-bottom: 1px solid #eee;
                line-height: 80px;
                text-align: left;
                padding: 0 30px;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                    color: #666;
                    line-height: 80px;
                }
            }
        }
    }
</style>
