<template>
    <div class="buyerRequire">
        <div class="container">
            <el-form :model="buyerRequire" :rules="rules"
                     label-position="left" ref="buyerRequire"
                     label-width="80px"
                     class="demo-ruleForm"
                     hide-required-asterisk="">
                <el-form-item label="任务分类:" prop="taskType">
                    <el-select v-model="buyerRequire.taskType">
                        <el-option v-for="item in taskType" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号：" prop="account">
                    <el-input v-model="buyerRequire.account" placeholder="请输入买号账号" />
                </el-form-item>
                <el-form-item label="账号性别:" prop="buyerSex">
                    <el-select v-model="buyerRequire.buyerSex">
                        <el-option v-for="item in sex" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="信用积分:" prop="buyerCredit">
                    <el-select v-model="buyerRequire.buyerCredit">
                        <el-option v-for="item in credit" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄段:" prop="ages">
                    <el-select v-model="buyerRequire.ages" placeholder="请选择">
                        <el-option v-for="item in ages" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="淘气值:" prop="naughty">
                    <el-input v-model="buyerRequire.naughty" placeholder="请输入淘气值" />
                </el-form-item>
                <el-form-item label="常购类目:" prop="buyCategory">
                    <el-checkbox-group v-model="buyerRequire.buyCategory">
                        <el-checkbox v-for="item in buyTypes" :label="item.id" :text="item.desc" :key="item.id">{{item.desc}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="地区:" prop="address" class="address">
                    <div class="key-item">
                        <el-form-item labelWidth="0" prop="province">
                            <el-select @change="provinceChange" v-model="buyerRequire.province" placeholder="请输入（省）">
                                <el-option v-for="province in provinces" :key="province" :label="province" :value="province"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="cities.length" labelWidth="0" prop="city">
                            <el-select  v-model="buyerRequire.city" placeholder="请输入（市）">
                                <el-option v-for="city in cities" :key="city" :label="city" :value="city"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item label="收货地址:" prop="address" class="address">
                    <el-input type="textarea" placeholder="请输入详细地址" v-model="buyerRequire.address" ></el-input>
                </el-form-item>
                <el-divider />
                <h3>上传该账号的淘宝截图</h3>
                <h4><span>1、手机淘宝-我的淘宝-顶部</span><a>截图示例</a></h4>
                <el-form-item prop="top" labelWidth="0">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="function(e,file){handleAvatarSuccess(e,file,'top')}">
                        <img v-if="buyerRequire.top" :src="buyerRequire.top" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <h4><span>2、手机淘宝-我的淘宝-底部</span><a>截图示例</a></h4>
                <el-form-item prop="bottom" labelWidth="0">
                    <el-upload
                            accept="image/jpg"
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="function(e,file){handleAvatarSuccess(e,file,'bottom')}">
                        <img v-if="buyerRequire.bottom" :src="buyerRequire.bottom" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <h4><span>3、手机淘宝-收货地址</span><a>截图示例</a></h4>
                <el-form-item prop="addressImg" labelWidth="0">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="function(e,file){handleAvatarSuccess(e,file,'addressImg')}">
                        <img v-if="buyerRequire.addressImg" :src="buyerRequire.addressImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <h4><span>3、支付宝-我的</span><a>截图示例</a></h4>
                <el-form-item prop="top" labelWidth="0">
                    <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="function(e,file){handleAvatarSuccess(e,file,'aliPay')}">
                        <img v-if="buyerRequire.aliPay" :src="buyerRequire.aliPay" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('buyerRequire')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
  import provinces from '../../utils/city.json';
  import {taskType,buyTypes,ages,credit,sex} from '../../utils/options';
  export default {
    name: 'buyerRequire',
    data() {
      return {
        taskType,
        buyTypes,
        ages,
        credit,
        sex,
          provinces: Object.keys(provinces),
          cities: [],
        buyerRequire: {
          taskType: '',
          account: '',
          buyerCredit: '',
          buyCategory: [],
          naughty:'',
          buyerSex: '',
          ages: '',
            province:'',
            city:'',
            address:'',
            top: '',
            bottom: '',
            addressImg: '',
            aliPay: '',
        },
        rules: {
            taskType: [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            account:  [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            buyerCredit:  [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            buyCategory:[
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            naughty: [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            buyerSex:  [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            ages:  [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            province: [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            city: [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            address: [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            top:  [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            bottom:  [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            addressImg:  [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            aliPay: [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
        },
        formData: new FormData(),
      }
    },
    methods: {
      submit() {
        this.$refs.buyerRequire.validate((valid) => {
          if (!valid) {
            return false;
          }
        })
      },
      provinceChange(province){
        const cities = provinces[province]?provinces[province]:[]
        this.cities = cities;
      },
        handleAvatarSuccess(res, file, type) {
          console.log(type)
//            this.ruleForm.positive = URL.createObjectURL(file.raw);
        },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .buyerRequire {
        padding-bottom: 1rem;
        .container {
            width: 100%;
        }

        .el-form {
            width: 100%;
            .el-input {
                width: 320px;
                float: left;
            }
            .el-select {
                display: block;
            }
            .el-checkbox-group{
                width: 100%;
            }
            .evaluate {
                display: flex;
            }
            .el-form-item__content {
                text-align: left;
                p {
                    margin-left: 20px;
                    display: inline-block;
                    span {
                        color: #ff8888;
                    }
                }
            }
            .item {
                width: 100%;
                text-align: left;
                margin-bottom: 20px;
                .label {
                    display: inline-block;
                    min-width: 100px;
                    margin-right: 10px;
                    font-size: 14px;
                    color: #606266;
                }
                .content {
                    font-size: 14px;
                    color: #606266;
                }
            }
            p {
                color: #606266;
                font-size: 14px;
            }
            .address{
                .el-form-item__content{
                    display: flex;
                }
            }
            .key-item {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-left: 20px;
                p {
                    color: #606266;
                    font-size: 14px;
                }
                .el-form-item {
                    margin: 0;
                }
                .el-button {
                    margin-left: 20px;
                }
                .el-select, .el-input {
                    width: 220px;
                    margin-right: 10px;
                }
            }
            h3{
                font-size: 30px;
                text-align: left;
                line-height: 1.5;
                margin-bottom: 20px;
            }
            h4{
                text-align: left;
                line-height: 1.5;
                margin-bottom: 20px;
                span{
                    font-size: 28px;
                }
                a{
                    color: #4685f4;
                    font-size: 28px;
                    float: right;
                }
            }
            .el-upload {
                  border: 2px dashed #d9d9d9;
                  border-radius: 6px;
                  cursor: pointer;
                  position: relative;
                  overflow: hidden;
                  width: 200px;
                height: 200px;
              }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 100%;
                height: 200px;
                line-height: 200px;
                text-align: center;
            }
        }
    }
</style>
