<template>
    <div class="realName">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <p>已发送验证码到您的手机</p>
            <h4>112321323</h4>
            <el-form-item prop="code" label="">
                <el-input placeholder="请输入验证码" v-model="ruleForm.code"></el-input>
                <span @click.prevent="sendCode" class="code">{{codeDesc}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'phoneAuth',
    data(){
      return {
        codeDesc: '发送验证码',
        total: 180,
        ruleForm: {
          code:'',
        },
        rules: {
          code: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ]
        }
      }
    },
    methods:{
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
