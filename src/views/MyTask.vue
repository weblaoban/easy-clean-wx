<template>
    <div class="extension">
        <el-tabs v-model="currentSection"
                 @tab-click="handleClick">
            <el-tab-pane v-for="item in taskType" :label="item.desc" :name="(item.id).toString()" :key="item.id">
                <ul>
                    <li>
                        <div class="top">
                            <div class="img">
                                <img src="../assets/images/head.png" alt="">
                            </div>
                            <div class="desc">
                                <p><span>任务编号：</span><span>111111</span></p>
                                <p><span>已审核</span></p>
                                <p><span>宝贝价格：</span><span>111111</span></p>
                                <p><span>佣金：</span><span>111111</span></p>
                            </div>
                        </div>
                        <div class="bottom">
                            <p><span>买号：</span><span>11111</span></p>
                            <p><span>下单剩余时间：</span><span>00:59：59</span></p>
                            <p class="tip">提示：下单后24小时内返款，评价结束返佣金</p>
                            <div class="button">
                                <el-button type="primary"><router-link to="/startTask/id">开始任务</router-link></el-button>
                                <el-button type="primary">放弃任务</el-button>
                            </div>
                            <div class="button">
                                <el-button type="primary">去评价</el-button>
                            </div>
                        </div>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import { taskType } from '../utils/options'
    export default {
        name: 'extension',
        data() {
            return {
                taskType,
                currentSection: '1',
                hasBind: true,
                taskList: [
                    {
                        id: 1,
                        userName: '用户名',
                        name: '姓名',
                        registerTime: '',
                        taskNum: '1',
                        publishTaskNum: '2'
                    }
                ]
            }
        },
        methods: {
            handleClick(tab) {
                this.currentSection = tab.name;
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
            }
        }
    }
</script>
<style lang="scss">
    .extension {
        font-size: 24px;
        .el-tabs__nav-wrap{
            width: 100%;
            padding: 0 20px;
        }
        ul{
            li{
                padding: 20px 20px 30px;
                border-bottom: 1px solid #eee;
                .top{
                   display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    .img{
                        img{
                            width: 73px;
                            height: 91px;
                        }
                    }
                    .desc{
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        p{
                            width: 50%;
                            &:first-child{
                                margin-bottom: 20px;
                            }
                            span{
                                line-height: 60px;
                                font-size: 30px;
                            }
                        }
                    }
                }
                .bottom{
                    padding: 0 40px;
                    p{
                        text-align: left;
                        line-height: 60px;
                        span{
                             line-height: 60px;
                            font-size: 30px;
                        }
                        &.tip{
                            color: #E53333;
                            line-height: 60px;
                            font-size: 30px;
                        }
                    }
                    .button{
                        margin-top: 20px;
                        .el-button{
                            padding: 12px 20px;
                            span{
                                font-size: 30px;
                            }
                            a{
                                font-size: 30px;
                                color: #fff;
                            }
                    }
                    }
                }
            }
        }
    }
</style>
