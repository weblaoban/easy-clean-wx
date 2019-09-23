<template>
    <div class="realName">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name">
                <el-input placeholder="王平（注册时填写的真实姓名，不可修改）" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="idCard">
                <el-input placeholder="请输入您的身份证号码" v-model="ruleForm.idCard"></el-input>
            </el-form-item>
            <el-form-item prop="positive">
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                    <img v-if="ruleForm.positive" :src="ruleForm.positive" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>本人手持身份证正面</p>
            </el-form-item>
            <el-form-item prop="otherSide">
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleOtherSuccess">
                    <img v-if="ruleForm.otherSide" :src="ruleForm.otherSide" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>本人手持身份证反面</p>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="info">审核中</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'realName',
    data(){
      return {
        ruleForm: {
          name:'',
          idCard: '',
          positive: '',
          otherSide: ''
        },
        rules: {
          name: [
            {
              required: true,message: '不能为空',trigger: 'blur'
            }
          ],
          idCard: [
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
