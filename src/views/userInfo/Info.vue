<template>
    <div class="userInfo info container">
        <div class="item">
            <span class="label">真实姓名：</span>
            <span class="content">{{info.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{info.sex}}</span>
        </div>
        <div class="item">
            <span class="label">所在地：</span>
            <span class="content">{{info.province}}&nbsp;&nbsp;&nbsp;&nbsp;{{info.city}}</span>
        </div>
        <div class="item">
            <span class="label">电子邮箱：</span>
            <span class="content">{{info.email}}</span>
        </div>
        <div class="item">
            <span class="label">手机号码：</span>
            <span class="content">{{info.phone}}</span>
        </div>
        <div class="item">
            <span class="label">QQ号：</span>
            <span class="content">{{info.qq}}</span>
        </div>
        <div class="item">
            <span class="label">收款银行</span>
        </div>
        <div class="item">
            <span class="label">收款银行卡号：</span>
            <span class="content">{{info.bankCard}}</span>
        </div>
        <div class="item">
            <span class="label">开户行：</span>
            <span class="content">{{info.bankName}}</span>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'info',
    data(){
      return {
        info: {
          name: '互评',
          sex: '先生',
          province: '浙江',
          city: '杭州',
          email:'111@qq.com',
          phone: '111111',
          qq: '111111111',
          bankName:'浙江省杭州市文一路支行',
          bankCard:'银行',
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
    .info{
        border-radius: 0;
        margin-top: 20px;
        padding: 40px;
        .item{
            width: 100%;
            text-align: left;
            margin-bottom: 20px;
            line-height: 40px;
            .label{
                display: inline-block;
                min-width: 100px;
                margin-right: 10px;
            }
        }
    }
</style>

