<template>
    <div class="userInfo info container">
        <div class="item">
            <span class="label">真实姓名：</span>
            <span class="content">{{info.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{info.sex}}</span>
        </div>
        <div class="item">
            <span class="label">所在地：</span>
            <span class="content">{{province}}&nbsp;&nbsp;&nbsp;&nbsp;{{city}}</span>
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
        <div class="item" v-if="info.userWithdrawalBankCard">
            <span class="label">收款银行：</span>
            <span class="content">{{info.userWithdrawalBankCard ? info.userWithdrawalBankCard.bankName : ''}}</span>
        </div>
        <div class="item" v-if="info.userWithdrawalBankCard">
            <span class="label">收款银行卡号：</span>
            <span class="content">{{info.userWithdrawalBankCard ? info.userWithdrawalBankCard.cardNumber : ''}}</span>
        </div>
    </div>
</template>
<script>
    import provinces from '../../utils/city.json';
  export default {
    name: 'info',
    data(){
      return {
        province: '',
        city: '',
        info: {
          userWithdrawalBankCard: {}
          },
      }
    },
    async created(){
      const result = await this.$API.request(this.$API.getUserInfo,'POST');
      if(result && result.success){
        const data = result.data;
        const sexDesc = data.sex===1?'先生':'女士';
        this.info = {...data,sex: sexDesc}
        const province = provinces.filter(function(item){
          return item.code === data.province
        });
          if(province.length){
              this.province = province[0].name;
              const cities = province[0].cityList;
              const city = cities.filter(function(item){
                  return item.code === data.city
              });
              if(city.length){
                  this.city = city[0].name;
              }
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
        padding-bottom: 1rem;
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

