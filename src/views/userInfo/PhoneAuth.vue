<template>
    <div class="realName">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <p>已发送验证码到您的手机</p>
            <h4 v-text="phone"></h4>
            <el-form-item prop="verificationCode" label="">
                <el-input placeholder="请输入验证码" v-model="ruleForm.verificationCode"></el-input>
                <span v-loading="sendLoading" @click.prevent="sendCode" class="code">{{codeDesc}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" v-loading="loading">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'phoneAuth',
    data(){
      return {
        sendLoading: false,
        loading: false,
        phone: '',
        codeDesc: '发送验证码',
        total: 180,
        ruleForm: {
          verificationCode:'',
        },
        rules: {
          verificationCode: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ]
        }
      }
    },
    async created(){
      const result = await this.$API.request(this.$API.getUserInfo,'POST');
      if(result && result.success){
        const data = result.data;
        this.phone = data.phone;
      }
      if (result.code === 'OVERTIME') {
        this.$router.push('/login')
      }
    },
    methods:{
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
        const result = await this.$API.request(this.$API.getSmsCode,'POST',{phone: this.phone, type: 'phoneAuth'});
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
      submitForm(formName) {
        this.$refs[formName].validate(async (valid)=>{
          if(valid){
            this.loading = true;
            const result = await this.$API.request(this.$API.phoneAuth, 'POST', {...this.ruleForm});
            this.loading = false;
            if (result && result.success) {
              this.$message.success('提交成功')
              const that = this;
              setTimeout(function(){
                that.$router.push('/userInfo')
              }, 1000)
            } else {
              this.$message.error(result.msg)
            }
          }else{
            return false;
          }
        })
      }
    }
  }
</script>
<style lang="scss">
    .realName{
        width: 100%;
        padding: 20px;
        margin: 120px auto 0;
        h4{
            font-size: 30px;
            color: #666;
            text-align: center;
            margin: 30px 0 80px;
        }
        a{
            display: block;
            width: 100%;
            text-align: right;
            color: #4685f4;
            margin-bottom: 15px;
        }
        .el-form-item{
            position: relative;
            .code{
                position: absolute;
                color: #4685f4;
                right: 20px;
            }
        }
        .register{
            a{
                display: inline;
                text-align: center;
            }
        }
        .avatar-uploader .el-upload {
            border: 2px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 100%;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100%;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
        .el-button{
            width: 100%;
            margin: 40px 0 0;
        }
    }
</style>
