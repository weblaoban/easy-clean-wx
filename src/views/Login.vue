<template>
    <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="userName">
                <el-input placeholder="用户名" v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="passWord">
                <el-input placeholder="密码" v-model="ruleForm.passWord" type="password"></el-input>
            </el-form-item>
            <router-link to="/forgetPassword">忘记密码</router-link>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">登录</el-button>
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
        loading: false,
        ruleForm: {
          userName:'',
          passWord: '',
        },
        rules: {
          userName: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ],
          passWord: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ]
        }
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.loading = true;
            const result = await this.$API.request(this.$API.login, 'POST', {...this.ruleForm});
            this.loading = false;
            if (result && result.success) {
              sessionStorage.setItem('userInfo', JSON.stringify(result.data));
              this.$router.push('/')
            } else {
              this.$message.error(result.msg)
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
        .el-input{
            line-height: 80px;
            .el-input__inner{
                height: 80px;
                &::placeholder{
                    font-size: 26px;
                }
            }
        }
        .el-button{
            width: 100%;
            height: 80px;
        }
    }
</style>
