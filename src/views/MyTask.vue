<template>
    <div class="myTask" v-loading="loading">
        <el-tabs v-model="currentSection"
                 @tab-click="handleClick">
            <el-tab-pane v-for="item in taskType" :label="item.desc" :name="(item.id).toString()" :key="item.id"
                         :disabled="item.id!==1">
                <ul>
                    <li v-for="item in taskList" :key="item.id">
                        <div class="top">
                            <div class="img">
                                <img :src="item.picture1" alt="">
                            </div>
                            <div class="desc">
                                <p style="width: 60%; text-align: left"><span>任务编号：</span><span v-text="item.taskNumber"></span></p>
                                <p style="width: 40%"><span v-text="status[item.status]">已审核</span></p>
                                <p style="text-align: left"><span>宝贝价格：</span><span v-text="item.money"></span></p>
                                <p><span>佣金：</span><span v-text="item.userCommission"></span></p>
                            </div>
                        </div>
                        <div class="bottom">
                            <p><span>买号：</span><span v-text="item.userAccount"></span></p>
                            <p v-if="timeDown(item)>0"><span>下单剩余时间：</span><span v-text="item.timeDown"></span></p>
                            <p v-if="item.status===3"><span>下单完成时间：</span><span v-text="item.completeDate">2017-12-12 12:40</span></p>
                            <p v-if="item.status===4"><span>返款时间：</span><span v-text="item.refundsDate"></span></p>
                            <p v-if="item.status===6"><span>返佣金时间：</span><span v-text="item.returnCommissionDate"></span></p>
                            <p class="tip" v-if="item.statu===1||item.statu===2||item.status===3">提示：下单后24小时内返款，评价结束返佣金</p>
                            <div class="button" v-if="item.status===2">
                                <el-button type="primary"><router-link :to="'/startTask/'+item.taskId+'/'+item.taskSubId+'/'+item.buyNumberId+'/'+item.id">开始任务</router-link></el-button>
                                <el-button type="primary" @click="giveUp(item)" :loading="givingup">放弃任务</el-button>
                            </div>
                            <div class="button" v-if="item.status===4">
                                <el-button type="primary"><router-link :to="'/evaluate/'+item.id+'/'+item.taskSubId+'/'+item.taskId">去评价</router-link></el-button>
                            </div>
                            <div class="button" v-if="item.status===5">
                                <el-button type="info">已评价</el-button>
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
        name: 'myTask',
        data() {
            return {
                taskType,
                status: {
                '-1':'放弃',
                0:'待申请',1:'已申请',2:'已审核',3:'已下单',4:'已确认',5:'已评价',6:'已返佣金（完成）',7:'投诉',
                },
                loading: false,
                givingup: false,
                currentSection: '1',
                taskList: [],
            }
        },
        created(){
          this.getList();
        },
        methods: {
            async getList() {
                this.loading = true;
                const result = await this.$API.request(this.$API.myTaskList, 'POST');
                this.loading = false;
                if (result && result.success) {
                    const data = result.data;
                    this.taskList = data.map(item=>{return {...item, times:(new Date(item.endDate).getTime()-new Date(item.currentDate).getTime())/1000, timeDown: ''}});
                } else {
                    if (result.msg === 'token is invalid,please login again!') {
                        this.$router.push('/login')
                    }
                }
            },
            async giveUp(data){
                const orderId = data.id;
                const taskSubId = data.taskSubId;
               this.givingup=true;
                const result = await this.$API.request(this.$API.giveUp, 'POST',{orderId, taskSubId});
               this.givingup=false;
               if(resule && result.success){
                   this.$message.success('操作成功')
                   this.getList();
               } else{
                   this.$message.error(result.msg)
               }
            },
            handleClick(tab) {
                this.currentSection = tab.name;
            },
            timeDown(row){
                const taskList = [...this.taskList];
                const index = taskList.indexOf(row);
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
                        this.taskList[index] = row;
                    }, 1000)
                    if(total < 0) clearInterval(this.int);
                    return result;
                }
                return 0;
            }
        }
    }
</script>
<style lang="scss">
    .myTask {
        padding-bottom: 100px;
        font-size: 24px;
        .el-tabs__nav-wrap{
            width: 100%;
            padding: 0 20px;
            .el-tabs__nav{
                width: 100%;
                .el-tabs__item{
                    padding: 0;
                }
                .el-tabs__active-bar, .el-tabs__item {
                    width: 25% !important;
                }
            }
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
                            width: 200px;
                            height: 300px;
                            margin-right: 50px;
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
                            margin-bottom: 20px;
                            span{
                                line-height: 60px;
                                font-size: 30px;
                                word-break: break-all;
                                text-align: left;
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
                                display: block;
                                width: 100%;
                                height: 100%;
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
