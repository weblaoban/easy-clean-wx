<template>
    <div class="userInfo blackList container">
        <ul class="head">
            <li>
                <span>买号</span><span>上一次使用</span><span>信用</span><span>审核状态</span><span>操作</span>
            </li>
            <li v-for="item in buyerList" :key="item.id">
                <span v-text="item.account"></span><span v-text="item.lastTime"></span><span v-text="item.credit"></span><span v-text="item.checkState"></span><span><a @click="removeBuyer(item)">删除</a></span>
            </li>
        </ul>
        <p class="tip">请注意：</p>
        <p class="tip">申请任务时，当日已申请的买号24小时内不能再次申请；7天内（158小时内）只能申请两次。</p>
        <el-button type="primary"><router-link to="/userInfo/buyerAccountAdd">添加买号</router-link></el-button>
    </div>
</template>

<script>
  export default {
    name: 'buyAccount',
    data() {
      return {
        buyerList: [
          {
            id: 1,
            account: '111',
            lastTime: '2019-1-1',
            credit: '3心',
            checkState: '已审核',
          }
        ],
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
      removeBuyer(item){
        console.log(item.id)
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
            &.tip {
                color: #E53333;
                margin-top: 20px;
            }
        }
        .head{
            li{
                display: flex;
                justify-content: space-between;
                line-height: 60px;
                span{
                    line-height: 60px;
                    flex: 1;
                    text-align: center;
                    a{
                        color: #4685f4;
                    }
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
        .el-button{
            margin-top: 40px;
            width: 100%;
            padding: 12px 20px;
            a{
                display: block;
                width: 100%;
                height:100%;
                color: #fff;
                font-size: 30px;
            }
        }
    }
</style>
