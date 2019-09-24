<template>
   <div class="step">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
           <h4>八、 拍下宝贝</h4>
           <p>1、预购买的宝贝提前收藏</p>
           <p>2、请输入你实际支付的金额</p>
           <el-form-item prop="amount">
               <el-input placeholder="实际支付的金额" v-model="ruleForm.amount"></el-input>
           </el-form-item>
           <p>3、请输入宝贝订单编号</p>
           <el-form-item prop="orderId">
               <el-input placeholder="宝贝订单编号" v-model="ruleForm.orderId"></el-input>
           </el-form-item>
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
               <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
           amount: '',
           orderId: ''
         },
        rules: {
           amount:[
             {
               required: true,message:'不能为空',trigger: 'blur'
             }
           ],
          orderId:[
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
        this.$emit('submit', 6);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            console.log(this.ruleForm)
            // this.$emit('submit', 8);
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
