<template>
    <div class="forgetPassword">
        <h4>找回支付密码</h4>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="100px" hide-required-asterisk>
            <el-form-item prop="phone" label="手机号：">
                <el-input placeholder="请输入注册时填写的手机号码" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item prop="code" label="手机验证码：">
                <el-input placeholder="请输入接收到的验证码" v-model="ruleForm.code"></el-input>
                <el-button @click.prevent="sendCode" class="code">{{codeDesc}}</el-button>
            </el-form-item>
            <el-form-item prop="password" label="新支付密码：">
                <el-input placeholder=" 请输入新支付密码" v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass" label="确认密码：">
                <el-input placeholder="重复输入支付密码" v-model="ruleForm.checkPass" type="password"></el-input>
            </el-form-item>
            <el-form-item label-width="0">
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'forgetPayPassword',
    data(){
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        const validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else {
                callback();
            }
        };
      return {
        codeDesc: '发送验证码',
        total: 180,
        ruleForm: {
          phone: '',
          code: '',
          password: '',
          checkPass: '',
        },
        rules: {
            phone: [
                {
                    validator: validatePhone, trigger:'blur'
                }
            ],
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
    methods: {
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
      submitForm(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            console.log(this.ruleForm)
          }else{
            return false;
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
    h4{
        font-size: 24px;
        color: #666;
        text-align: center;
        margin-bottom: 20px;
    }
    .forgetPassword{
        margin-top: 150px;
        .el-form{
            padding: 20px;
            margin: 0 auto;
            .el-form-item__content{
                .el-button.code{
                    width: auto !important;
                    position: absolute;
                    right:40px;
                    padding: 5px;
                    height: 100%;
                    top:0;
                }
            }
            .el-input{
                width: 340px;
                float: left;
            }
            .el-button{
                width: 80%;
            }
        }
    }
</style>
