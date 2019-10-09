<template>
   <div class="step">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
           <h4>{{indexDesc[(steps.indexOf(8)+1)]}}、 拍下宝贝</h4>
           <p>1、预购买的宝贝提前收藏</p>
           <p>2、请输入你实际支付的金额</p>
           <el-form-item prop="value1">
               <el-input placeholder="实际支付的金额" v-model="ruleForm.value1"></el-input>
           </el-form-item>
           <p>3、请输入宝贝订单编号</p>
           <el-form-item prop="value2">
               <el-input placeholder="宝贝订单编号" v-model="ruleForm.value2"></el-input>
           </el-form-item>
           <p v-if="taskRequire.isPaymentScreenshot">4、付款截图上传（如果任务发布时选取了要求）</p>
           <el-form-item prop="top" labelWidth="0" v-if="taskRequire.isPaymentScreenshot">
               <el-upload
                       v-loading="uploadLoading"
                       :on-progress="handelAvatarProgress"
                       :before-upload="validateSize"
                       class="avatar-uploader"
                       action="/api/attachment/upload"
                       :show-file-list="false"
                       :data="{type:'ORDERS_CHART'}"
                       name="file"
                       accept="image/png,image/gif,image/jpg,image/jpeg"
                       :on-success="function(e,file){handleAvatarSuccess(e,file,'picture1')}">
                   <img v-if="ruleForm.picture1" :src="ruleForm.picture1" class="avatar">
                   <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </el-upload>
           </el-form-item>
           <div class="button">
               <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">提交</el-button>
           </div>
       </el-form>
   </div>
</template>
<script>
  export default {
    name: 'startTask',
      props: ['taskRequire','steps', 'ruleForm', 'loading'],
    data(){
      return{
        uploadLoading: false,
          indexDesc:{1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',7:'七'},
          rules: {
            value1: [
                {
                    required: true, message: '不能为空', trigger: 'blur'
                }
            ],
                value2: [
                {
                    required: true, message: '不能为空', trigger: 'blur'
                }
            ]
        }
      }
    },
    methods: {
      validateSize(file) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isLt2M;
      },
      handelAvatarProgress() {
        this.uploadLoading = true
      },
      copyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        if (document.execCommand('copy')) {
          this.$message.success('复制成功');
        }
        document.body.removeChild(textArea);
      },
      handleAvatarSuccess(res) {
        this.uploadLoading = false
          this.ruleForm.picture1 = res.msg;
      },
      goPrev(){
          this.$emit('submit', this.steps[this.steps.indexOf(8)-1]);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
             this.$emit('submit', 9);
          }else{
            return false;
          }
        })
      }
    },
  }
</script>
<style lang="scss">
.step{
    padding: 20px 30px 100px;
    .el-form{
        text-align: left;
        h4{
            margin-bottom: 15px;
        }
        p, h4{
            line-height: 50px;
            margin-bottom: 10px;
        }
        .button{
            text-align: center;
            margin-top: 20px;
        }
        .el-button{
            padding: 12px 20px;
            a{
                color: #fff;
            }
        }
    }
    .el-upload {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 400px;
        min-height: 200px;
        float: left;
        img{
            width: 400px;
            min-height: 200px;
        }
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 200px;
        line-height: 200px;
        text-align: center;
    }
}
</style>
