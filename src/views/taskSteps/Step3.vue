<template>
   <div class="step">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
           <h4>三、 拍前聊天</h4>
           <p>1、与目标店家客服聊天，至少3问</p>
           <p>2、截图上传（如果任务发布时选取了要求）</p>
           <el-form-item prop="top" labelWidth="0">
               <el-upload
                       class="avatar-uploader"
                       action="https://jsonplaceholder.typicode.com/posts/"
                       :show-file-list="false"
                       :on-success="function(e,file){handleAvatarSuccess(e,file,'top')}">
                   <img v-if="ruleForm.top" :src="ruleForm.top" class="avatar">
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
    data(){
      return{
         ruleForm: {
           name: '',
           top: ''
         },
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
      handleAvatarSuccess(res, file, type) {
        console.log(type)
//            this.ruleForm.positive = URL.createObjectURL(file.raw);
      },
      goPrev(){
        this.$emit('submit', 2);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            console.log(this.ruleForm)
            this.$emit('submit', 4);
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
        height: 200px;
        float: left;
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
