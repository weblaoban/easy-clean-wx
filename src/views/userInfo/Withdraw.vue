<template>
    <div class="finance recharge container">
        <p>提现银行卡</p>
        <el-form v-if="withdrawCard" :model="ruleForm"
                 :rules="rules" ref="ruleForm"
                 class="demo-ruleForm"
                 hide-required-asterisk>
            <div class="item">
                <span class="label">账户姓名：</span>
                <span class="content">{{account.name}}</span>
            </div>
            <div class="item">
                <span class="label">银行名称：</span>
                <span class="content">{{account.bankName}}</span>
            </div>
            <div class="item">
                <span class="label">卡号：</span>
                <span class="content">{{account.bankCard}}</span>
            </div>
            <p class="tip">如需修改银行卡请联系客服</p>
        </el-form>
        <el-form v-if="!withdrawCard" :model="ruleForm" :rules="rules"
                 ref="ruleForm" class="demo-ruleForm"
                 hide-required-asterisk>
            <el-form-item prop="accountName" label="账户姓名:">
                <el-input
                        v-model="ruleForm.accountName"></el-input>
            </el-form-item>
            <el-form-item prop="bankName" label="银行名称:">
                <el-select v-model="ruleForm.bankName"
                           placeholder="选择银行名称">
                    <el-option v-for="item in banks"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="bankCardNo" label="卡号:">
                <el-input
                        v-model="ruleForm.bankCardNo" placeholder="请输入银行卡卡号"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="银行卡预留手机号:" class="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入预留手机号的验证码"></el-input>
            </el-form-item>
            <el-form-item prop="code" class="code">
                <el-input placeholder="请输入接收到的验证码" v-model="ruleForm.code"></el-input>
                <span @click.prevent="sendCode" class="code">{{codeDesc}}</span>
            </el-form-item>
            <el-form-item>
                <el-button style="margin-left:100px" type="primary"
                           @click="submitForm('ruleForm')">
                    提交
                </el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div class="item">
            <span class="label">账户余额：</span>
            <span class="content">{{finance.amount}}</span>
        </div>
        <div class="item">
            <span class="label">提现冻结中：</span>
            <span class="content">{{finance.freeze}}</span>
        </div>
        <el-form :model="withdrawForm"
                 :rules="rules" ref="withdrawForm"
                 class="withdrawForm" label-width="100px"
                 hide-required-asterisk>
            <el-form-item prop="amount" label="转帐金额:">
                <el-input v-model="withdrawForm.amount" :min="1" placeholder="请输入金额"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="支付密码:">
                <el-input v-model="withdrawForm.password" type="password" placeholder="请输入支付密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="submitForm('withdrawForm')">
                    提交
                </el-button>
            </el-form-item>
        </el-form>
        <p>账户说明</p>
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
        codeDesc: '发送验证码',
        total: 180,
        withdrawCard: false,
        account: {
          name: '互评',
          bankName: '浙江省杭州市文一路支行',
          bankCard: '银行',
          notes: 'HD11211'
        },
        finance: {
          amount: 122,
          freeze: 12,
        },
        ruleForm: {
          accountName: '',
          bankName: '',
          bankCardNo: '',
          code: '',
          phone: '',
        },
        withdrawForm: {
          amount: '',
          password: '',
        },
        rules: {
          amount: [
            {
              validator: this.checkAmount, trigger: 'blur'
            }
          ],
          accountName: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          bankName: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          bankCardNo: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          code:[
            {
              required: true,message:'请输入手机验证码',trigger:'blur'
            }
          ],
          phone: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          password: [
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
    methods: {
      submitForm(formName) {
        if(formName==='withdrawForm'){
          if(!this.withdrawCard){
            this.$message({
              message: '请先绑定提现银行卡',
              type: 'warning'
            });
            return;
          }
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm)
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

