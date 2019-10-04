<template>
    <div class="register container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" hide-required-asterisk>
            <el-form-item prop="userName">
                <el-input placeholder="请输入用户名" v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="请输入登录密码" v-model="ruleForm.passWord" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="payPassword">
                <el-input placeholder=" 请输入支付密码" v-model="ruleForm.payPassword" type="password"></el-input>
            </el-form-item>
                    <el-form-item prop="name">
                        <el-input placeholder="请输入真实姓名" v-model="ruleForm.name"></el-input>
                    </el-form-item>

                    <el-form-item prop="sex">
                        <el-radio-group v-model="ruleForm.sex" size="medium">
                            <el-radio label="1">先生</el-radio>
                            <el-radio label="2">女士</el-radio>
                        </el-radio-group>
                    </el-form-item>

                <el-row>
                    <el-col :span="12">
                        <el-form-item prop="province">
                            <el-select @change="provinceChange"
                                       v-model="ruleForm.province"
                                       placeholder="请输入（省）">
                                <el-option
                                        v-for="item in provinces"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code">{{item.name}}</el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="cities.length">
                        <el-form-item prop="city">
                            <el-select v-model="ruleForm.city"
                                       placeholder="请输入（市）">
                                <el-option
                                        v-for="item in cities"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            <el-form-item prop="email">
                <el-input placeholder=" 请输入电子邮箱" v-model="ruleForm.email"></el-input>
            </el-form-item>

            <el-form-item prop="phone">
                <el-input placeholder=" 请输入可联系的手机号码" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item prop="qq">
                <el-input placeholder=" 请输入可联系的QQ号码" v-model="ruleForm.qq"></el-input>
            </el-form-item>
            <el-form-item prop="recommendId" v-if="recommendId">
                <el-input disabled placeholder=" 推荐人（如果有）" v-model="recommendName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import getParams from '../utils/getParams';
    export default {
      name: 'register',
      data() {
        return {
          loading: false,
          provinces: [],
          cities: [],
          codeDesc: '发送验证码',
          total: 180,
            recommendId:'',
            recommendName: '',
          ruleForm: {
            userName: '',
            phone: '',
            passWord: '',
            payPassword: '',
            sex: '1',
            name: '',
            email: '',
            qq: '',
            province: '',
            city: '',
          },
          rules: {
            userName: [
              {
                required: true,
                message: '请输入用户名',
                trigger: 'blur'
              }
            ],
            phone: [
              {
                required: true,
                message: '请输入手机号',
                trigger: 'blur'
              }
            ],
            code: [
              {
                required: true,
                message: '请输入手机验证码',
                trigger: 'blur'
              }
            ],
            passWord: [
              {
                required: true,
                message: '请输入密码',
                trigger: 'blur'
              }
            ],
            payPassword: [
              {
                required: true,
                message: '请输入支付密码',
                trigger: 'blur'
              }
            ],
            name: [
              {
                required: true,
                message: '请输入真实姓名',
                trigger: 'blur'
              }
            ],
            province: [
              {
                required: true,
                message: '请选择省',
                trigger: 'blur'
              }
            ],
            email: [
              {
                required: true,
                message: '请输入邮箱地址',
                trigger: 'blur'
              },
              {
                type: 'email',
                message: '请输入正确的邮箱地址',
                trigger: ['blur', 'change']
              }
            ],
            qq: [
              {
                required: true,
                message: '请输入qq号',
                trigger: 'blur'
              }
            ]
          }
        }
      },
      async created(){
        const recommendId = getParams(location.href,'id');
        if(recommendId){
            this.recommendId = recommendId;
          const recommendName = await this.$API.request(this.$API.getUserByRecommend, 'POST',{recommendId});
          if(recommendName && recommendName.success){
              this.recommendName = recommendName.data.userName;
          }
        }
        const provinces = await this.$API.request(this.$API.getProvince);
        if(provinces && provinces.success){
          this.provinces = provinces.data;
        }
      },
      methods: {
        async provinceChange(province) {
          const cities = await this.$API.request(this.$API.getCities+'?parentCode='+province,'GET',{parentCode: province});
          if(cities && cities.success){
            this.cities = cities.data
          }
        },
        submitForm(formName) {
          this.$refs[formName].validate(async(valid) => {
            if (valid) {
              this.loading = true;
              const result = await this.$API.request(this.$API.register,'POST',{...this.ruleForm, recommendId: this.recommendId});
              this.loading = false;
              if(result && result.success){
                this.$message.success('注册成功');
                const that = this;
                setTimeout(function(){
                  that.$router.push('/login')
                }, 1000)
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
    h4{
        font-size: 24px;
        color: #666;
        text-align: center;
        margin-bottom: 20px;
    }
    .register{
        width: 100%;
        margin: 60px auto 0;
        .title{
            width: 100%;
            height: 42px;
            line-height: 40px;
            border-bottom: 1px solid #efefef;
            text-align: left;
            padding: 0 20px;
            font-weight: bolder;
            margin-bottom: 20px;
        }
        .el-form{
            margin: 0 auto;
            .el-form-item{
                width: 100%;
            }
            .el-form-item__content{
                padding: 20px;
                .el-input{
                    width: 100%;
                }
                .el-select{
                    width: 245px;
                    float: left;
                }
                .el-button.code{
                    width: auto !important;
                    height: 40px;
                    position: absolute;
                    right:-120px;
                    padding: 5px;
                }
                p{
                    text-align: left;
                }
            }
            .el-input{
                line-height: 80px;
                .el-input__inner{
                    height: 80px;
                    &::placeholder{
                        font-size: 26px;
                    }
                }
            }
            .el-button{
                width: 100%;
                height: 80px;
            }
        }
    }
</style>
