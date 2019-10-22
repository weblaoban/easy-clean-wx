<template>
   <div class="step">
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
           <h4>{{taskRequire.isThreeShops?'二':'一'}}、 查找目标宝贝</h4>
           <p>1.关键词：{{taskRequire.searchTerms}}</p>
           <el-button type="primary" @click="copyTextToClipboard(taskRequire.searchTerms)">复制关键词</el-button>
           <p>2、目标宝贝店铺的旺旺号：{{taskRequire.shopName}}</p>
           <p>3、参考宝贝主图</p>
           <img :src="taskRequire.picture1" alt="">
           <p>4、请录入已正确找到的商家旺旺号名称</p>
           <el-form-item prop="value1">
               <el-input placeholder="用户名" v-model="ruleForm.value1"></el-input>
           </el-form-item>
           <p v-if="this.timeDown(taskRequire)>0">下单剩余时间：<span v-text="taskRequire.timeDown">00:59：59</span>（一小时倒计时）</p>
           <div class="button">
               <el-button type="primary" @click="goPrev" v-if="steps.indexOf(2)>0">上一步</el-button>
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
        rules: {
            value1: [
                {
                    required: true, message: '不能为空', trigger: 'blur'
                }
            ],}
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
      goPrev(){
          this.$emit('submit', this.steps[this.steps.indexOf(2)-1]);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            if(this.ruleForm.value1===this.taskRequire.shopName){
                this.$emit('submit', this.steps[this.steps.indexOf(2)+1]);
            } else {
                this.$message.info('输入的旺旺号有误')
            }
          }else{
            return false;
          }
        })
      },
        timeDown(row){
            let total = row.times;
            if(total){
                let result;
                this.int = setInterval(()=>{
                    const s = (total%60) < 10 ? ('0' + total%60) : total%60;
                    const h = total/3600 < 10 ? ('0' + parseInt(total/3600)) : parseInt(total/3600);
                    const m = (total-h*3600)/60 < 10 ? ('0' + parseInt((total-h*3600)/60)) : parseInt((total-h*3600)/60);
                    result = h + ' : ' + m + ' : ' + s;
                    total--;
                    row.timeDown = result;
                    row.times = total;
                    this.taskRequire = row;
                }, 1000)
                if(total < 0) clearInterval(this.int);
                return result;
            }
            return 0;
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
            width: 100%;
            /*height: 200px;*/
            display: block;
            margin: 20px 0;
        }
        .button{
            text-align: center;
            margin-top: 20px;
        }
        .el-button{
            min-width: 200px;
            padding: 20px 20px;
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
