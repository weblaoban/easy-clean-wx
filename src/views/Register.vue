<template>
    <div class="register container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" hide-required-asterisk>
            <el-form-item prop="userName">
                <el-input placeholder="请输入用户名" v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="请输入登录密码" v-model="ruleForm.checkPass" type="password"></el-input>
            </el-form-item>
            <el-form-item prop="payPassword">
                <el-input placeholder=" 请输入支付密码" v-model="ruleForm.password" type="password"></el-input>
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
                        <el-select @change="provinceChange" v-model="ruleForm.province" placeholder="请输入（省）">
                            <el-option v-for="item in provinces" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="cities.length">
                        <el-form-item prop="city">
                        <el-select  v-model="ruleForm.city" placeholder="请输入（市）">
                            <el-option v-for="item in cities" :key="item" :label="item" :value="item"></el-option>
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
            <el-form-item prop="inviter">
                <el-input placeholder=" 推荐人（如果有）" v-model="ruleForm.inviter"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import provinces from '../utils/city.json';
    export default {
        name: 'register',
        data(){
            return {
                provinces: Object.keys(provinces),
                cities: [],
                codeDesc: '发送验证码',
                total: 180,
                ruleForm: {
                    userName:'',
                    phone: '',
                    password: '',
                    payPassword: '',
                    sex: '1',
                    realName: '',
                    email:'',
                    qq: '',
                    inviter: '',
                    province: '',
                    city: '',
                },
                rules: {
                    userName: [
                        {
                            required: true,message:'请输入用户名', trigger:'blur'
                        }
                    ],
                    phone: [
                        {
                            required: true,message:'请输入手机号', trigger:'blur'
                        }
                    ],
                    code:[
                        {
                            required: true,message:'请输入手机验证码',trigger:'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,message:'请输入密码',trigger: 'blur'
                        }
                    ],
                    payPassword: [
                        {
                            required: true,message:'请输入支付密码',trigger: 'blur'
                        }
                    ],
                    name: [
                        {
                            required: true,message:'请输入真实姓名', trigger:'blur'
                        }
                    ],
                    province: [
                        {
                            required: true,message:'请选择省', trigger:'blur'
                        }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ],
                    qq: [
                        {
                            required: true,message:'请输入qq号', trigger:'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            provinceChange(province){
                const cities = provinces[province]?provinces[province]:[]
              this.cities = cities;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        console.log(this.ruleForm)
                    }else{
                        return false;
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
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
            .el-button{
                width: 100%;
            }
        }
    }
</style>
