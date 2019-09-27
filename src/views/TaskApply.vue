<template>
    <div class="extension">
        <el-tabs v-model="currentSection"
                 @tab-click="handleClick">
            <el-tab-pane v-for="item in taskType"
                         :label="item.desc"
                         :name="(item.id).toString()"
                         :key="item.id">
                <ul>
                    <li>
                        <div class="top">
                            <div class="img">
                                <img src="../assets/images/head.png"
                                     alt="">
                            </div>
                            <div class="desc">
                                <p style="width: 100%;text-align: left;"><span>任务编号：</span><span>111111</span>
                                </p>
                                <p><span>宝贝价格：</span><span>111111</span>
                                </p>
                                <p><span>佣金：</span><span>111111</span>
                                </p>
                            </div>
                        </div>
                        <div class="tags">
                            <!--v-if="(typeof item.searchTerms)==='string' &&item.searchTerms"-->
                            <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="hover"
                                    content="搜索词">
                                <el-tag type="success"
                                        slot="reference">搜索词
                                </el-tag>
                            </el-popover>
                            <!--v-if="item.isScreenshot"-->
                            <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="hover"
                                    content="截图">
                                <el-tag type="success"
                                        slot="reference">截图
                                </el-tag>
                            </el-popover>
                            <!--v-if="item.isThreeShops"-->
                            <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="hover"
                                    content="货比三家">
                                <el-tag type="success"
                                        slot="reference">
                                    货比三家
                                </el-tag>
                            </el-popover>
                            <!--v-if="item.isBrowseBaby"-->
                            <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="click"
                                    content="浏览副宝贝">
                                <el-tag type="success"
                                        slot="reference">
                                    浏览副宝贝
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
                                <el-button type="primary">
                                    <router-link
                                            to="/startTask/id">
                                        申请
                                    </router-link>
                                </el-button>
                            </div>
                            <div class="button">
                                <el-button type="info">
                                    已申请，等待审核
                                </el-button>
                            </div>
                        </div>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import {taskType} from '../utils/options'

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
    }
  }
</script>
<style lang="scss">
    .extension {
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
                            width: 73px;
                            height: 91px;
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
                            }
                        }
                    }
                }

                .tags {
                    text-align: left;
                    margin-top: 20px;
                    .el-tag{
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
                            min-width: 200px;
                            padding: 12px 20px;

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
    }
</style>
