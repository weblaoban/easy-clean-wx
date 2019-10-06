<template>
    <div class="finance recharge container">
        <p>提现银行卡</p>
        <el-form v-cloak v-if="withdrawCard && authState===1" :model="ruleForm"
                 :rules="rules" ref="ruleForm"
                 class="demo-ruleForm"
                 hide-required-asterisk>
            <div class="item">
                <span class="label">账户姓名：</span>
                <span class="content">{{account.userName}}</span>
            </div>
            <div class="item">
                <span class="label">开户行：</span>
                <span class="content">{{account.openBank}}</span>
            </div>
            <div class="item">
                <span class="label">银行名称：</span>
                <span class="content">{{account.bankName}}</span>
            </div>
            <div class="item">
                <span class="label">卡号：</span>
                <span class="content">{{account.cardNumber}}</span>
            </div>
        </el-form>
        <p v-cloak class="tip" v-if="authState===1">如需修改银行卡请联系客服</p>
        <p v-cloak class="tip" v-if="authState===3">银行卡审核中，请审核完成后发起提现</p>
        <el-form v-cloak v-if="!withdrawCard" :model="ruleForm" :rules="rules"
                 ref="ruleForm" class="demo-ruleForm" label-width="100px"
                 hide-required-asterisk>
            <el-form-item prop="idNumber" label="身份证号：">
                <el-input placeholder="请输入您的身份证号码" v-model="ruleForm.idNumber"></el-input>
            </el-form-item>
            <el-form-item prop="bankName" label="银行名称：">
                <el-input placeholder="请输入银行名称" v-model="ruleForm.bankName"></el-input>
            </el-form-item>
            <el-form-item prop="cardNumber" label="卡号：">
                <el-input placeholder="请输入您的银行借记卡卡号" v-model="ruleForm.cardNumber"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="submitForm('ruleForm')" :loading="loading">
                    提交
                </el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div class="item">
            <span class="label">账户余额：</span>
            <span class="content">{{finance.balance}}</span>
        </div>
        <div class="item">
            <span class="label">提现冻结中：</span>
            <span class="content">{{finance.accountFrozen}}</span>
        </div>
        <el-form v-cloak v-if="authState===1" :model="withdrawForm"
                 :rules="rules" ref="withdrawForm"
                 class="withdrawForm" label-width="100px"
                 hide-required-asterisk>
            <el-form-item prop="money" label="转帐金额：">
                <el-input v-model="withdrawForm.money" :min="1"></el-input>
            </el-form-item>
            <el-form-item prop="payPassWord" label="支付密码：">
                <el-input v-model="withdrawForm.payPassWord" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="submitForm('withdrawForm')" :loading="withdrawLoading">
                    提交
                </el-button>
            </el-form-item>
        </el-form>
        <p style="margin-top: 20px">账户说明</p>
        <p>1、单次提现最小金额20元</p>
        <p>2、单次提现最大金额5000元</p>
        <p>3、提现费率2元/笔</p>
        <p>4、提现到账时间：48小时内</p>
    </div>
</template>
<script>
  export default {
    name: 'withdraw',
    data() {
      return {
        authState: -1,
        loading: false,
        withdrawLoading: false,
        withdrawCard: false,
        account: {},
        finance: {},
        ruleForm: {
          idNumber: '',
            bankName: '',
            cardNumber: ''
        },
        withdrawForm: {
          money: '',
          payPassWord: '',
        },
        rules: {
          money: [
            {
              validator: this.checkAmount, trigger: 'blur'
            }
          ],
          idNumber: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ],
          cardNumber: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ],
          bankName: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ],
          payPassWord: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        },
        banks: [
          {
            id: 1,
            name: '中国银行'
          }
        ]
      }
    },
    async created() {
      const authResult = await this.$API.request(this.$API.userAuth,'POST');
      if(authResult && authResult.success){
        const data = authResult.data;
        this.authState = data.bankAuth;
      }
      this.getWithdrawCard();
      this.getUserInfo();
    },
    methods: {
      async getUserInfo(){
        const result = await this.$API.request(this.$API.getUserInfo, 'POST');
        if (result && result.success) {
          const data = result.data;
          this.finance = {...data.userAccount}
        } else {
          if (result.code === 'OVERTIME') {
            this.$router.push('/login')
          } else {
            this.$message.info(result.msg)
          }
        }
      },
      async getWithdrawCard() {
        const result = await this.$API.request(this.$API.withdrawBankCard, 'POST');
        if (result && result.success) {
          if (result.data) {
            this.account = result.data;
            this.withdrawCard = true;
          }
        } else {
          this.$message.info(result.msg)
        }
      },
      submitForm(formName) {
        if(formName==='withdrawForm'){
          if(!this.withdrawCard){
            this.$message({
              message: '请先绑定提现银行卡',
              type: 'warning'
            });
            return;
          }
          this.$refs[formName].validate(async (valid) => {
            if (valid) {
              this.withdrawLoading = true;
              const result = await this.$API.request(this.$API.withdraw, 'POST', {...this.withdrawForm,money: (this.withdrawForm.money*1).toFixed(2)});
              this.withdrawLoading = false;
              if (result && result.success) {
                this.getUserInfo();
              } else {
                this.$message.error(result.msg)
              }
            } else {
              return false;
            }
          })
          return;
        }
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
             this.loading = true;
             const result = await this.$API.request(this.$API.bankAccountBind, 'POST', {...this.ruleForm});
             this.loading = false;
             if (result && result.success) {
                 this.getUserInfo();
               this.getWithdrawCard();
             } else {
               this.$message.error(result.msg)
             }
          } else {
            return false;
          }
        })
      },
      checkAmount(rule, value, callback){
        value = value*1
        if (value === 0 || value === '') {
          callback(new Error('不能为空'));
        } else if (typeof value !== 'number') {
          callback(new Error('请输入正确的金额'));
        } else if(value<20){
          callback(new Error('单次提现最小金额20元'));
        } else if(value>5000){
          callback(new Error('单次提现最大金额5000元'));
        } else if(value>(this.finance.amount-this.finance.freeze)){
          callback(new Error('提现金额不超过账户余额减去提现冻结金额'));
        } else {
          callback();
        }
      },
      sendCode(){
        if(!this.ruleForm.phone){
          this.$message({
            message: '请输入手机号',
            type: 'warning'
          });
          return;
        }
        if(this.total!==180){
          return;
        }
        const that = this;
        const t = setInterval(function(){
          that.total-=1;
          that.codeDesc='重新发送('+that.total+')';
          if(that.total<1){
            that.codeDesc='发送验证码';
            that.total=180;
            clearInterval(t)
          }
        },1000)
      },
    }
  }
</script>
<style lang="scss">
    [v-cloak] {
        display: none !important;
    }
    .recharge {
        border-radius: 0;
        margin-top: 20px;
        padding: 40px 40px 100px;
        p {
            text-align: left;
            margin-bottom: 20px;

            &.tip {
                color: #E53333;
            }
        }

        h4 {
            font-size: 22px;
            margin-bottom: 20px;
        }

        .item {
            width: 100%;
            text-align: left;
            margin-bottom: 20px;

            .label {
                display: inline-block;
                min-width: 100px;
                margin-right: 10px;
            }
        }

        .el-form {
            .el-input, .el-select {
                width: 320px;
                float: left;
            }
            .el-form-item__error{
                left: 100px;
            }
            .phone{
                .el-input{
                    width: 275px;
                }
                .el-form-item__error{
                    left: 145px;
                }
            }
            .el-form-item__label {
                min-width: 100px;
                font-size: 16px;
                text-align: left !important;
                color: #333;
            }
            &.withdrawForm{
                .el-form-item__error{
                    left: 0;
                }
            }
            .el-button {
                float: left;
                width: 320px;
            }
            .code{
                span{
                    float: left;
                    display: block;
                    margin-left: 20px;
                    color: #4685fe;
                    cursor: pointer;
                }
                .el-form-item__error{
                    left: 0;
                }
            }
        }
    }
</style>

