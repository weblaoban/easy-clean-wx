<template>
    <div class="task">
         <Step1 v-if="step===1" @submit="submit" ref="step1" />
         <Step2 v-if="step===2" @submit="submit" ref="step2" />
         <Step3 v-if="step===3" @submit="submit" ref="step3" />
         <Step4 v-if="step===4" @submit="submit" ref="step4" />
         <Step5 v-if="step===5" @submit="submit" ref="step5" />
         <Step6 v-if="step===6" @submit="submit" ref="step6" />
         <Step7 v-if="step===7" @submit="submit" ref="step7" />
         <Step8 v-if="step===8" @submit="submit" ref="step8" />
    </div>
</template>
<script>
    import Step1 from './taskSteps/Step1';
    import Step2 from './taskSteps/Step2';
    import Step3 from './taskSteps/Step3';
    import Step4 from './taskSteps/Step4';
    import Step5 from './taskSteps/Step5';
    import Step6 from './taskSteps/Step6';
    import Step7 from './taskSteps/Step7';
    import Step8 from './taskSteps/Step8';
    export default {
      name: 'startTask',
      data(){
        return{
          step: 3,
        }
      },
      created(){
        console.log(this.$route.params.id)
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
      submit(step){
        console.log(step)
        this.step=step
        console.log(this.step)
        // this.$refs[formName].validate((valid)=>{
        //   if(valid){
        //     console.log(this.ruleForm)
        //   }else{
        //     return false;
        //   }
        // })
      },
    },
      components: {
        Step1,
        Step2,
        Step3,
        Step4,
        Step5,
        Step6,
        Step7,
        Step8,
      }
    }
</script>
<style lang="scss" scoped>

</style>
