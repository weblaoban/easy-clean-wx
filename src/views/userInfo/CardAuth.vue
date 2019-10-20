<template>
    <div class="realName">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name">
                <el-input placeholder="王平（注册时填写的真实姓名，不可修改）" v-model="name" disabled></el-input>
            </el-form-item>
            <el-form-item prop="bankName">
                <el-input placeholder="请输入银行名称" v-model="ruleForm.bankName"></el-input>
            </el-form-item>
            <el-form-item prop="cardNumber">
                <el-input placeholder="请输入您的银行借记卡卡号" v-model="ruleForm.cardNumber"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'realName',
    data(){
      return {
        loading: false,
        name:'',
        ruleForm: {
          cardNumber: '',
          bankName: ''
        },
        rules: {
          cardNumber: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ],
          bankName: [
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
        this.name = data.name;
      }
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate(async (valid)=>{
          if(valid){
            this.loading = true;
            const result = await this.$API.request(this.$API.bankAuth, 'POST', {...this.ruleForm});
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
      },
      handleAvatarSuccess(res, file) {
        this.ruleForm.positive = URL.createObjectURL(file.raw);
      },
      handleOtherSuccess(res, file) {
        this.ruleForm.otherSide = URL.createObjectURL(file.raw);
      },
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
    .realName{
        width: 100%;
        padding: 20px;
        padding-bottom: 1rem;
        margin: 40px auto 0;
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
        .el-form-item{
            position: relative;
            .code{
                position: absolute;
                color: #4685f4;
                right: 20px;
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
    }
    .el-button{
        width: 100%;
        margin: 0;
    }
</style>
