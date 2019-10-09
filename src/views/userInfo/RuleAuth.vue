<template>
    <div class="rule container">
        <el-form :rules="rules" ref="ruleForm" :model="ruleForm" labelWidth="100%" label-position="top" hideRequiredAsterisk="">
            <el-form-item :label="item.title" :prop="(index+1)+''" v-for="(item, index) in questions" :key="index">
                <el-radio-group v-model="ruleForm[(index+1)+'']">
                    <el-radio :key="index+answer.value" v-for="answer in item.options" :label="answer.value" :value="answer.value">{{answer.desc}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'ruleAuth',
        data(){
            return {
                loading: false,
                ruleForm:{
                    '1':'',
                    '2':'',
                    '3':'',
                    '4':'',
                    '5':'',
                    '6':''
                },
                rules:{
                    '1':[
                        {required: true, message:'不能为空',trigger:'change'}
                    ],
                    '2':[
                        {required: true, message:'不能为空',trigger:'change'}
                    ],
                    '3':[
                        {required: true, message:'不能为空',trigger:'change'}
                    ],
                    '4':[
                        {required: true, message:'不能为空',trigger:'change'}
                    ],
                    '5':[
                        {required: true, message:'不能为空',trigger:'change'}
                    ],
                    '6':[
                        {required: true, message:'不能为空',trigger:'change'}
                    ],
                },
                questions:[
                    {
                        title: '1、平台提交订单已经超过24小时了，商家还是没有返款，该怎么办？（操作考核）',
                        options: [
                            {
                                desc:'直接到淘宝用阿里旺旺联系卖家返款',
                                value: 'A'
                            },
                            {
                                desc:'直接申请退款',
                                value: 'B'
                            },
                            {
                                desc: '在平台客服上班时间内联系客服处理，非上班时间等待客服上班时间联系，客服上班时间为9:30---17.30，不联系平台客服直接到淘宝退款的，或直接联系卖家旺旺催返款的，清退，并上传行业黑名单！',
                                value: 'C'
                            }
                        ]
                    },
                    {
                        title: '2、会员恶意申请退款，平台会如何处理？（操作考核）',
                        options: [
                            {
                                desc:'通知商家拒接退款，平台通过特殊手段对退款淘宝号进行限制登陆，同时平台会把退款的淘宝号/手机号/微信号/银行卡，提交到行业联盟黑名单，今后此人在所有平台不能做任务，并委第三方机构对此人进行无限制骚扰！',
                                value: 'A'
                            },
                            {
                                desc:'同意退款',
                                value: 'B'
                            }
                        ]
                    },
                    {
                        title: '3、平台收取会员费用吗？是完全免费吗？（防骗考核）',
                        options: [
                            {
                                desc:'收取费用',
                                value: 'A'
                            },
                            {
                                desc:'平台完全免费，其他一切自称我们平台客服向会员收取会费/使用费/保证金等等都是骗子，请勿相信！',
                                value: 'B'
                            }
                        ]
                    },
                    {
                        title: '4、审核不通过的淘宝号应该如何处理？（账号问题）',
                        options: [
                            {
                                desc:'重新提交一次',
                                value: 'A'
                            },
                            {
                                desc:'审核不通过的号一般为不合格账号，不能重复提交，应该换一个别的号提交',
                                value: 'B'
                            }
                        ]
                    },
                    {
                        title: '5、是否可以使用花呗/信用卡/代付？（操作考核）',
                        options: [
                            {
                                desc:'可以使用',
                                value: 'A'
                            },
                            {
                                desc:'平台严禁使用花呗/信用卡/淘金币付款，除非商家留言指定花呗/信用卡/淘金币付款，违规使用会导致商家投诉，平台将对会员做罚款5元一次处理！',
                                value: 'B'
                            }
                        ]
                    },
                    {
                        title: '6、订单显示已返款，要在哪里查看收到的资金？（返现问题）',
                        options: [
                            {
                                desc:'银行卡',
                                value: 'A'
                            },
                            {
                                desc:'返款的资金在平台账户里，到{个人中心}查看资金余额，必须手动申请提现，平台财务才会在24小时内转账到您提交的银行卡账户内！并不是任务返款后就自动到银行卡的，如果平台已返款，去申请退款的，当骗子处理，并上传行业黑名单！',
                                value: 'B'
                            }
                        ]
                    },
                ]
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                        let answer='';
                        const that = this;
                        Object.keys(this.ruleForm).forEach(function(item){
                            answer+=item+that.ruleForm[item]
                        })
                        this.loading = true;
                        const result = await this.$API.request(this.$API.ruleAuth,'POST',{answer});
                        this.loading = false;
                        if(result && result.success){
                            this.$message.success('认证成功');
                            const that = this;
                            setTimeout(function(){
                                that.$router.push('/userInfo')
                            }, 1000)
                        } else {
                            this.$message.error(result.msg)
                        }
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .rule{
        padding-bottom: 1rem;
        .el-form{
            width: 100%;
        }
        .el-form-item__label{
            font-size: 26px;
            display: block;
            text-align: left;
        }
        .el-radio{
            width: 100%;
            display: block;
            text-align: left;
            margin-bottom: 20px;
            .el-radio__label{
                font-size: 26px;
                white-space: normal;
                word-break: break-all;
                line-height: 39px;
            }
        }
        .el-button{
            width: 100%;
            padding: 20px;
        }
    }
</style>
