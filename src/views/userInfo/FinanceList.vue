<template>
    <div class="userInfo blackList container">
        <el-form :inline="true" :model="financeInfo"
                 ref="finance" class="demo-form-inline">
            <el-form-item prop="type" label="类别："
                          class="userName">
                <el-select v-model="financeInfo.type"
                           placeholder="选择类别">
                    <el-option v-for="item in financeTypes"
                               :key="item.id"
                               :label="item.desc"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="submitForm('finance')">搜索
                </el-button>
                <el-button type="primary"
                           @click="submitForm('finance', true)">
                    重置
                </el-button>
            </el-form-item>
        </el-form>
        <ul class="head">
            <li>
                <span>发生时间</span><span>类别</span><span>变动金额</span><span>账户余额</span>
            </li>
            <li v-for="item in financeList" :key="item.id">
                <span v-text="item.addTime"></span><span v-text="item.type"></span><span v-text="item.income"></span><span v-text="item.amount"></span>
            </li>
        </ul>
        <el-pagination
                style="margin-top:20px"
                @current-change="handleCurrentChange"
                :current-page.sync="pagination.current"
                :page-size="2"
                layout="prev, pager, next, jumper"
                :total="pagination.total">
        </el-pagination>
    </div>
</template>

<script>
  export default {
    name: 'financeList',
    data() {
      return {
        financeInfo: {
          type: '',
          date: '',
        },
        financeList: [
          {
            income: '111',
            type: '不知道',
            addTime: '2019-1-1',
            amount: '1111'
          }
        ],
        financeTypes: [
          {
            id:1,
            desc: '充值'
          },
          {
            id:2,
            desc: '提现'
          },
          {
            id:3,
            desc: '返款'
          },
          {
            id:4,
            desc: '佣金'
          },
          {
            id:5,
            desc: '推荐费'
          },
          {
            id:6,
            desc: '平台调账'
          },
          {
            id:7,
            desc: '罚款'
          },
        ],
        pagination: {
          total: 4,
          pageSize: 10,
          current: 1
        }
      }
    },
    methods: {
      submitForm(formName, isReset = false) {
        if (isReset) {
          console.log(isReset)
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.financeInfo)
          } else {
            return false;
          }
        })
      },
      handleCurrentChange(e) {
        console.log(e)
      }
    }
  }
</script>
<style lang="scss">
    .blackList {
        border-radius: 0;
        margin-top: 20px;
        padding: 40px;
        p {
            text-align: left;

            &.desc {
                text-align: center;
                margin-top: 20px;
            }
        }

        .el-form {
            text-align: left;
        }
        .head{
            padding: 0 20px;
            li{
                display: flex;
                justify-content: space-between;
                line-height: 60px;
                span{
                    line-height: 60px;
                    flex: 1;
                    text-align: center;
                }
                &:first-child{
                    margin-bottom: 10px;
                    span{
                        font-weight: bold;
                    }
                }
            }
        }

        .el-date-editor .el-range-separator {
            padding: 0;
        }
    }
</style>
