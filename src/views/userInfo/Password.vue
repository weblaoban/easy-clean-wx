<template>
    <div class="forgetPassword">
        <el-tabs v-model="currentSection"
                 @tab-click="handleClick">
            <el-tab-pane label="登陆密码" name="login"></el-tab-pane>
            <el-tab-pane label="交易密码" name="pay"></el-tab-pane>
            <div class="container">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="100px" hide-required-asterisk>
                    <el-form-item prop="phone" label="手机号：">
                        <span style="float: left" v-text="phone">111111111</span>
                    </el-form-item>
                    <el-form-item prop="verificationCode" label="手机验证码：" class="code">
                        <el-input placeholder="请输入接收到的验证码" v-model="ruleForm.verificationCode"></el-input>
                        <el-button @click.prevent="sendCode" class="code" :loading="sendLoading">{{codeDesc}}</el-button>
                    </el-form-item>
                    <el-form-item prop="newPwd" :label="currentSection==='login'?'新登录密码：':'新支付密码：'">
                        <el-input :placeholder="currentSection==='login'?'请输入新登录密码':'请输入新支付密码'" v-model="ruleForm.newPwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item prop="newPwdConfirm" label="确认密码：">
                        <el-input :placeholder="currentSection==='login'?'重复输入登录密码':'重复输入支付密码'" v-model="ruleForm.newPwdConfirm" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label-width="0" class="button">
                        <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tabs>
    </div>
</template>

<script>
  export default {
    name: 'password',
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.newPwdConfirm !== '') {
            this.$refs.ruleForm.validateField('newPwdConfirm');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        loading: false,
        sendLoading: false,
        currentSection: 'login',
        codeDesc: '发送验证码',
        total: 180,
        phone: '',
        ruleForm: {
          verificationCode: '',
          newPwd: '',
          newPwdConfirm: '',
        },
        rules: {
          code:[
            {
              required: true,message:'请输入手机验证码',trigger:'blur'
            }
          ],
          password: [
            {
              validator: validatePass,trigger: 'blur'
            }
          ],
          checkPass: [
            {
              validator: validatePass2,trigger: 'blur'
            }
          ]
        }
      }
    },
    async created(){
      const result = await this.$API.request(this.$API.getUserInfo, 'POST');
      if (result && result.success) {
        this.phone = result.data.phone;
      } else {
        if (result.code === 'OVERTIME') {
          this.$router.push('/login')
        } else {
          this.$message.info(result.msg)
        }
      }
    },
    methods: {
      async sendCode(){
        if(!this.phone){
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
        this.sendLoading=true;
        const type = this.currentSection==='login'?'pwd':'payPwd';
        const result = await this.$API.request(this.$API.getSmsCode,'POST',{phone: this.phone, type: type});
        this.sendLoading=false;
        if(result && result.success){
          const t = setInterval(function(){
            that.total-=1;
            that.codeDesc=that.total+'s';
            if(that.total<1){
              that.codeDesc='发送验证码';
              that.total=180;
              clearInterval(t)
            }
          },1000)
        } else {
          this.$message.info(result.msg)
        }
      },
      handleClick(tab) {
        this.currentSection = tab.name;
      },
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            const apiUrl = this.currentSection === 'login' ? this.$API.updatePassword : this.$API.updatePayPassword;
            this.loading=true;
            const result = await this.$API.request(apiUrl, 'POST', {...this.ruleForm});
            this.loading=false;
            if (result && result.success) {
              this.$refs[formName].resetFields();
              this.$message.success('修改成功')
            } else {
              this.$message.info(result.msg)
            }
          } else {
            return false;
          }
        })
      }
    }
  }
</script>
<style lang="scss">
    .forgetPassword {
        font-size: 24px;

        .el-tabs__nav {
            width: 100%;

            .el-tabs__item {
                width: 50%;
                font-size: 24px;
            }
        }

        .container {
            padding: 0 40px;
        }
            .el-form{
                margin: 0 auto;
                .el-form-item__content{
                    .el-button.code{
                        width: auto !important;
                        position: absolute;
                        right:-10px;
                        padding: 5px;
                        height: 100%;
                        top:0;
                    }
                }
                .el-input{
                    width: 340px;
                    float: left;
                }
                .code{
                    .el-input{
                        width: 300px;
                    }
                }
                .button{
                    .el-button{
                        width: 100%;
                    }
                }
            }
    }
</style>
