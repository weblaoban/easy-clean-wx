<template>
   <div class="step">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
           <h4>二、 查找目标宝贝</h4>
           <p>关键词：取自：任务发布时录入的关键词</p>
           <el-button type="primary" @click="copyTextToClipboard('关键词')">复制关键词</el-button>
           <p>2、目标宝贝店铺的旺旺号：中国****舰店 （显示绑定名称的前后两位，其他****代替）</p>
           <p>3、参考宝贝主图</p>
           <img src="../../assets/images/head.png" alt="">
           <p>4、请录入已正确找到的商家旺旺号名称</p>
           <el-form-item prop="name">
               <el-input placeholder="用户名" v-model="ruleForm.name"></el-input>
           </el-form-item>
           <p>下单剩余时间：<span>00:59：59</span>（一小时倒计时）</p>
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
        rules: {}
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
        this.$emit('submit', 1);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            console.log(this.ruleForm)
            this.$emit('submit', 3);
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
        img{
            width: 200px;
            height: 200px;
            display: block;
            margin: 20px 0;
        }
        .button{
            text-align: center;
            margin-top: 20px;
        }
        .el-button{
            padding: 12px 20px;
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
