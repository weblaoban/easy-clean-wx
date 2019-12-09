<template>
   <div class="step5">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
           <h4>{{indexDesc[(steps.indexOf(5)+1)]}}、 浏览副宝贝</h4>
           <p>1、浏览副宝贝数量为：{{taskRequire.isBrowseBaby}}</p>
           <p v-if="taskRequire.isScreenshot">2、截图上传</p>
           <el-form-item v-if="taskRequire.isScreenshot" prop="top" labelWidth="0" v-for="item in taskRequire.isBrowseBaby">
               <el-upload
                       v-loading="uploadLoading"
                       :on-progress="handelAvatarProgress"
                       :before-upload="validateSize"
                       class="avatar-uploader"
                       action="/api/attachment/upload"
                       :show-file-list="false"
                       :data="{type:'ORDERS_CHART'}"
                       name="file"
                       accept="image/*"
                       :on-success="function(e,file){handleAvatarSuccess(e,file,'picture'+item)}">
                   <img v-if="ruleForm['picture'+item]" :src="ruleForm['picture'+item]" class="avatar">
                   <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </el-upload>
           </el-form-item>
           <div class="button">
               <el-button type="primary" @click="goPrev">上一步</el-button>
               <el-button type="primary" style="margin-left: 40px;" @click="submitForm('ruleForm')">下一步</el-button>
           </div>
       </el-form>
   </div>
</template>
<script>
  export default {
    name: 'startTask',
      props: ['taskRequire','steps', 'ruleForm'],
    data(){
      return{
        uploadLoading: false,
          indexDesc:{1:'一',2:'二',3:'三',4:'四',5:'五',6:'六',7:'七'},
        rules: {
           name:[
             {
               required: true,message:'不能为空',trigger: 'blur'
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
      handleAvatarSuccess(res, file,type) {
        this.uploadLoading = false
        this.ruleForm[type]=res.msg;
      },
      goPrev(){
          this.$emit('submit', this.steps[this.steps.indexOf(5)-1]);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
              if(!this.ruleForm.picture1 && this.taskRequire.isScreenshot) {
                  this.$message.info('请上传截图');
                  return;
              } else {
                  this.$emit('submit', this.steps[this.steps.indexOf(5)+1]);
              }
          }else{
            return false;
          }
        })
      }
    },
  }
</script>
<style lang="scss">
.step5{
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
