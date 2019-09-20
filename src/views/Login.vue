<template>
    <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="userName">
                <el-input placeholder="用户名" v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="密码" v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <router-link to="/forgetPassword">忘记密码</router-link>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
            <div class="register">
                <span>没有账号 点击 <router-link to="/register">注册>></router-link></span>
            </div>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'login',
    data(){
      return {
        ruleForm: {
          userName:'',
          password: '',
        },
        rules: {
          userName: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ]
        }
      }
    },
    methods:{
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
    .login{
        width: 100%;
        padding: 20px;
        margin: 140px auto 0;
        a{
            display: block;
            width: 100%;
            text-align: right;
            color: #4685f4;
            margin-bottom: 15px;
        }
        .register{
            a{
                display: inline;
                text-align: center;
            }
        }
    }
    .el-button{
        width: 100%;
        height: 80px;
    }
</style>
