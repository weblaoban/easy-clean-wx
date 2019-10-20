<template>
    <div class="userInfo blackList container">
        <ul class="head">
            <li>
                <span>买号</span><span>上一次使用</span><span>信用</span><span>审核状态</span><span>操作</span>
            </li>
            <li v-for="item in buyerList" :key="item.id">
                <span v-text="item.userAccount"></span><span v-text="item.lastDate ? item.lastDate : '未使用'"></span><span v-text="credit[item.credit]"></span><span v-text="status[item.status]"></span><span><a @click="removeBuyer(item)" v-loading="deleting">删除</a></span>
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
        status : {
          0:'待通过',1:'已通过',2:'拒绝',
        },
          credit: {
              3:'3心',4:'4心',5:'5心',6:'1钻',7:'2钻',8:'3钻',9:'4钻',10:'5钻',11:'冠级'
          },
        deleting: false,
        buyerList: [],
      }
    },
    created(){
      this.getList();
    },
    methods: {
      async getList(){
        const result = await this.$API.request(this.$API.buyNumberList,'POST',{status: null});
        if(result && result.success){
          this.buyerList = result.data;
        }else{
          this.$message.info(result.msg)
        }
      },
      async removeBuyer(item){
        this.deleting = true;
        const result = await this.$API.request(this.$API.buyNumberRemove,'POST',{id: item.id});
        this.deleting = false;
        if(result && result.success){
          this.$message.success('操作成功')
          const that = this;
          setTimeout(function(){
            that.getList()
          }, 1000)
        } else {
          this.$message.info(result.msg)
        }
      }
    }
  }
</script>
<style lang="scss">
    .blackList {
        border-radius: 0;
        margin-top: 20px;
        padding: 20px;
        padding-bottom: 1rem;
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
                align-items: center;
                span{
                    line-height: 60px;
                    width: 25%;
                    text-align: center;
                    word-break: break-all;
                    a{
                        color: #4685f4;
                    }
                    &:first-child{
                        min-width: 180px;
                    }
                    &:first-child{
                        max-width: 135px;
                    }
                }
                &:first-child{
                    margin-bottom: 10px;
                    line-height: 40px;
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
