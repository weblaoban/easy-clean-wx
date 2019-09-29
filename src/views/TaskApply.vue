<template>
    <div class="taskApply">
        <el-tabs v-model="currentSection"
                 @tab-click="handleClick">
            <el-tab-pane v-for="item in taskType"
                         :label="item.desc"
                         :name="(item.id).toString()"
                         :key="item.id">
                <ul v-if="taskList.length"
                    v-loading="loading">
                    <li v-for="item in taskList"
                        :key="item.id">
                        <div class="top">
                            <div class="img">
                                <img :src="item.picture1"
                                     alt="">
                            </div>
                            <div class="desc">
                                <p style="width: 100%;text-align: left;">
                                    <span>任务编号：</span><span
                                        v-text="item.taskNumber"></span>
                                </p>
                                <p><span>宝贝价格：</span><span
                                        v-text="item.money"></span>
                                </p>
                                <p><span>佣金：</span><span
                                        v-text="item.commission || 0"></span>
                                </p>
                            </div>
                        </div>
                        <div class="tags">
                            <el-popover
                                    v-if="item.searchTerms"
                                    placement="bottom"
                                    width="200"
                                    trigger="click"
                                    :content="item.searchTerms">
                                <el-tag type="success"
                                        slot="reference">搜索词
                                </el-tag>
                            </el-popover>
                            <el-popover
                                    v-if="item.isScreenshot"
                                    placement="bottom"
                                    width="200"
                                    trigger="hover"
                                    content="截图">
                                <el-tag type="success"
                                        slot="reference">截图
                                </el-tag>
                            </el-popover>
                            <el-popover
                                    v-if="item.isThreeShops"
                                    placement="bottom"
                                    width="200"
                                    trigger="hover"
                                    content="货比三家">
                                <el-tag type="success"
                                        slot="reference">
                                    {{item.isThreeShops===1?'货比一家':item.isThreeShops==='2'?'货比两家':'货比三家'}}
                                </el-tag>
                            </el-popover>
                            <el-popover
                                    v-if="item.isBrowseBaby"
                                    placement="bottom"
                                    width="200"
                                    trigger="click"
                                    content="浏览副宝贝">
                                <el-tag type="success"
                                        slot="reference">
                                    浏览副宝贝{{item.isBrowseBaby}}
                                </el-tag>
                            </el-popover>
                            <el-popover
                                    v-if="item.isDesignatedEvaluation"
                                    placement="bottom"
                                    width="200"
                                    trigger="hover"
                                    content="指定评价">
                                <el-tag type="success"
                                        slot="reference">
                                    指定评价
                                </el-tag>
                            </el-popover>
                            <el-popover
                                    v-if="item.isSlideShow"
                                    placement="bottom"
                                    width="200"
                                    trigger="hover"
                                    content="晒图">
                                <el-tag type="success"
                                        slot="reference">晒图
                                </el-tag>
                            </el-popover>
                        </div>
                        <div class="bottom">
                            <div class="button">
                                <el-button type="primary"
                                           @click="handelApply(item.taskId)">
                                    申请
                                </el-button>
                            </div>
                        </div>
                    </li>
                </ul>
                <p v-if="!taskList.length">
                    平台当前还有<span>（数量）</span>个任务未被申请，当前时间段已全部申请完毕，下一波任务来临时间为
                    <span>2019-12-15 15:50</span>，请各位提前做好准备
                </p>
            </el-tab-pane>
        </el-tabs>
        <el-dialog v-loading="loadingGetBuyer" title="选择买号"
                   :visible.sync="dialogFormVisible">
            <el-form ref="buyerForm">
                <el-form-item>
                    <el-select v-model="buyerAccount"
                               placeholder="请选择买号"
                               @change="buyerChange">
                        <el-option v-for="item in buyerList"
                                   :key="item.id"
                                   :label="item.userAccount"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <p class="tips" v-text="tips"></p>
            <div slot="footer" class="dialog-footer">
                <el-button
                        @click="hideDialog">取
                    消
                </el-button>
                <el-button type="primary"
                           @click="handelApplyTask"
                           :loading="loadingApply">确认
                </el-button>
            </div>
        </el-dialog>
        <div class="refresh" @click="getList">
            <span>刷新</span>
            <i class="el-icon-refresh-right"></i>
        </div>
    </div>
</template>

<script>
  import {taskType} from '../utils/options'

  export default {
    name: 'extension',
    data() {
      return {
        loading: false,
        loadingApply: false,
        loadingGetBuyer: false,
        taskType,
        currentSection: '1',
        dialogFormVisible: false,
        buyerAccount: '',
        taskList: [],
        buyerList: [],
        id: 0,
        tips: '',
      }
    },
    async created() {
      this.getList();
      this.getBuyerList();
    },
    methods: {
      async getBuyerList() {
        this.loadingGetBuyer = true;
        const result = await this.$API.request(this.$API.buyNumberList, 'POST');
        this.loadingGetBuyer = false;
        if (result && result.success) {
          this.buyerList = result.data.filter(function (item) {
            return item.status === 1
          });
        } else {
          this.$message.info(result.msg)
        }
      },
      async getList() {
        this.loading = true;
        const result = await this.$API.request(this.$API.taskList, 'POST');
        this.loading = false;
        if (result && result.success) {
          const data = result.data;
          this.taskList = data;
        } else {
          if (result.msg === 'token is invalid,please login again!') {
            this.$router.push('/login')
          }
        }
      },
      handleClick(tab) {
        this.currentSection = tab.name;
      },
      async buyerChange(value) {
        this.loading = true;
        const result = await this.$API.request(this.$API.checkBuyer, 'POST', {
          buyNumberId: value,
          taskId: this.id
        });
        this.loading = false;
        if (result && !result.success) {
          this.tips = result.msg
        } else {
          this.tips = '';
          this.buyerAccount = value
        }
      },
      handelApply(id) {
        this.id = id;
        this.dialogFormVisible = true;
      },
      async handelApplyTask() {
        if(!this.buyerAccount){
          return;
        }
        if (this.tips) {
          this.$message.error(this.tips)
          return;
        } else {
          this.loadingApply = true;
          const result = await this.$API.request(this.$API.checkBuyer, 'POST', {
            buyNumberId: this.buyerAccount,
            taskId: this.id
          });
        }
      },
      hideDialog() {
        this.buyerAccount = '';
        this.dialogFormVisible = false;
      }
    }
  }
</script>
<style lang="scss">
    .taskApply {
        padding-bottom: 100px;
        font-size: 24px;

        .el-tabs__nav-wrap {
            width: 100%;
            padding: 0 20px;

            .el-tabs__nav {
                width: 100%;

                .el-tabs__active-bar {
                    width: 25% !important;
                }
            }
        }

        ul {
            li {
                padding: 20px 20px 30px;
                border-bottom: 1px solid #eee;

                .top {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;

                    .img {
                        img {
                            width: 200px;
                            height: 300px;
                            margin-right: 50px;
                        }
                    }

                    .desc {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        flex-wrap: wrap;

                        p {
                            width: 50%;
                            text-align: left;

                            &:first-child {
                                margin-bottom: 20px;
                            }

                            span {
                                line-height: 60px;
                                font-size: 30px;
                                word-break: break-all;
                            }
                        }
                    }
                }

                .tags {
                    text-align: left;
                    margin-top: 20px;

                    .el-tag {
                        margin-right: 20px;
                    }
                }

                .bottom {
                    padding: 0 40px;

                    p {
                        text-align: left;
                        line-height: 60px;

                        span {
                            line-height: 60px;
                            font-size: 30px;
                        }

                        &.tip {
                            color: #E53333;
                            line-height: 60px;
                            font-size: 30px;
                        }
                    }

                    .button {
                        margin-top: 20px;

                        .el-button {
                            width: 60%;
                            padding: 20px;

                            span {
                                font-size: 30px;
                            }

                            a {
                                font-size: 30px;
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }

        .el-dialog {
            width: 80%;

            .tips {
                color: red;
            }
        }

        .refresh {
            position: fixed;
            right: 20px;
            bottom: 200px;
            padding: 10px 20px;
            border-radius: 50%;
            box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
            background: #fff;

            span {
                display: block;
            }

            i {
                font-size: 40px;
            }
        }
    }
</style>
