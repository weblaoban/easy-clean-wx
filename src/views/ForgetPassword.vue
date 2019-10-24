<template>
    <div class="forgetPassword">
        <h4>找回登录密码</h4>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="100px" hide-required-asterisk>
            <el-form-item prop="phone" label="手机号：">
                <el-input placeholder="请输入注册时填写的手机号码" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode" label="手机验证码：">
                <el-input placeholder="请输入接收到的验证码" v-model="ruleForm.verificationCode"></el-input>
                <el-button @click.prevent="sendCode" class="code" :loading="loading">{{codeDesc}}</el-button>
            </el-form-item>
            <el-form-item prop="passWord" label="新登录密码：">
                <el-input placeholder=" 请输入新登录密码" v-model="ruleForm.passWord" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="confimPassWord" label="确认密码：">
                <el-input placeholder="重复输入登录密码" v-model="ruleForm.confimPassWord" type="password"></el-input>
            </el-form-item>
            <el-form-item label-width="0">
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'forgetPassword',
    data(){
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.confimPassWord !== '') {
            this.$refs.ruleForm.validateField('confimPassWord');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.passWord) {
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
        loading: false,
        codeDesc: '发送验证码',
        total: 180,
        ruleForm: {
          phone: '',
          verificationCode: '',
          passWord: '',
          confimPassWord: '',
        },
        rules: {
          phone: [
            {
              validator: validatePhone, trigger:'blur'
            }
          ],
          verificationCode:[
            {
              required: true,message:'请输入手机验证码',trigger:'blur'
            }
          ],
          passWord: [
            {
              validator: validatePass,trigger: 'blur'
            }
          ],
          confimPassWord: [
            {
              validator: validatePass2,trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      async sendCode(){
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
        this.loading=true;
        const result = await this.$API.request(this.$API.getSmsCode,'POST',{phone: this.ruleForm.phone, type: 'pwd'});
        this.loading=false;
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
      submitForm(formName) {
        this.$refs[formName].validate(async (valid)=>{
          if(valid){
            this.loading=true;
            const result = await this.$API.request(this.$API.resetPassword,'POST',{...this.ruleForm, type: 'pwd'});
            this.loading=false;
            if(result && result.success){
              this.$message.success('修改成功');
              const that = this;
              setTimeout(function(){
                that.$router.push('/login')
              }, 1000)
            } else {
              this.$message.info(result.msg)
            }
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
        padding-bottom: 1rem;
        margin-top: 150px;
        .el-form{
            padding: 20px;
            margin: 0 auto;
            .el-form-item__content{
                .el-button.code{
                    width: auto !important;
                    position: absolute;
                    right:10px;
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
