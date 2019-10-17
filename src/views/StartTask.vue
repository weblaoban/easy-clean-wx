<template>
    <div class="task" v-loading="loading">
        <Step1 v-if="step===1 && taskRequire.isThreeShops" @submit="submit" ref="step1" :taskRequire="taskRequire" :ruleForm="ruleForm"></Step1>
        <Step2 v-if="step===2" @submit="submit" ref="step2" :taskRequire="taskRequire" :steps="steps" :ruleForm="ruleForm.targetGoods"></Step2>
        <Step3 v-if="step===3" @submit="submit" ref="step3" :taskRequire="taskRequire" :steps="steps" :ruleForm="ruleForm.isChatBeforeShooting"></Step3>
        <Step4 v-if="step===4" @submit="submit" ref="step4" :taskRequire="taskRequire" :steps="steps" :ruleForm="ruleForm.isBrowseEvaluation"></Step4>
        <Step5 v-if="step===5" @submit="submit" ref="step5" :taskRequire="taskRequire" :steps="steps" :ruleForm="ruleForm.isBrowseBaby"></Step5>
        <Step6 v-if="step===6" @submit="submit" ref="step6" :taskRequire="taskRequire" :steps="steps" :ruleForm="ruleForm.isShoppingCart"></Step6>
        <Step7 v-if="step===7" @submit="submit" ref="step7" :taskRequire="taskRequire" :steps="steps" :ruleForm="ruleForm.isCollectionBaby"></Step7>
        <Step8 v-if="step===8" @submit="submit" ref="step8" :taskRequire="taskRequire" :steps="steps" :ruleForm="ruleForm.payment" :loading="submiting"></Step8>
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
        data() {
            return {
                step: 1,
                submiting: false,
                loading: false,
                taskRequire: {},
                steps:[],
                ruleForm: {
                    isThreeShops:{
                        value1: '',
                        value2: '',
                        value3: '',
                        picture1:'',
                        picture2:'',
                        picture3:'',
                    },
                    targetGoods:{
                        value1: ''
                    },
                    isChatBeforeShooting:{
                        picture1:'',
                    },
                    isBrowseEvaluation:{
                        picture1:'',
                    },
                    isBrowseBaby:{
                        picture1:'',
                        picture2:'',
                        picture3:'',
                    },
                    isShoppingCart:{
                        picture1:'',
                    },
                    isCollectionBaby:{
                        picture1:'',
                    },
                    payment:{
                        value1: '',
                        value2: '',
                        picture1:'',
                    }
                },
            }
        },
        async created() {
            const taskId = this.$route.params.taskId;
            const taskSubId = this.$route.params.taskSubId;
            const buyNumberId = this.$route.params.buyerNumberId;
            const id = this.$route.params.id;
            this.loading = true;
            const result = await this.$API.request(this.$API.taskDetail, 'POST', {taskId, taskSubId, buyNumberId, id});
            this.loading = false;
            if (result && result.success) {
                const data = result.data;
                this.taskRequire = {...result.data,  times:(new Date(data.endDate).getTime()-new Date(data.currentDate).getTime())/1000, timeDown: ''};
                if(data.isThreeShops){
                    this.steps.push(1,2)
                } else {
                    this.steps.push(2)
                }
                if(data.isChatBeforeShooting){
                    this.steps.push(3)
                }
                if(data.isBrowseEvaluation){
                    this.steps.push(4)
                }
                if(data.isBrowseBaby){
                    this.steps.push(5)
                }
                if(data.isShoppingCart){
                    this.steps.push(6)
                }
                if(data.isCollectionBaby){
                    this.steps.push(7)
                }
                this.steps.push(8)
                this.step = this.steps[0]
            } else {
                if (result.msg === 'token is invalid,please login again!') {
                    this.$router.push('/login')
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
            async submit(step) {
                if(step===9){
                    const ordersSteps = [];
                const that = this;
                    const id = this.$route.params.id;
                    Object.keys(this.ruleForm).forEach(function(item){
                        ordersSteps.push({name: item,...that.ruleForm[item],ordersId: id})
                    })
                    this.submiting = true;
                    const result = await this.$API.request(this.$API.startTask, 'POST', ordersSteps);
                    this.submiting = false;
                    if(result && result.success){
                        this.$message.success('操作成功')
                        const that = this;
                        setTimeout(function(){
                            that.$router.push('/myTask')
                        }, 1000)
                    } else {
                        this.$message.info(result.msg)
                    }
                }else{
                    this.step = step;
                }
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
