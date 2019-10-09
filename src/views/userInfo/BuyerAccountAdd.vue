<template>
    <div class="buyerRequire">
        <div class="container">
            <el-form :model="buyerRequire" :rules="rules"
                     label-position="left" ref="buyerRequire"
                     label-width="80px"
                     class="demo-ruleForm"
                     hide-required-asterisk="">
                <el-form-item label="任务分类:" prop="type">
                    <el-select v-model="buyerRequire.type">
                        <el-option v-for="item in taskType" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号：" prop="userAccount">
                    <el-input v-model="buyerRequire.userAccount" placeholder="请输入买号账号" />
                </el-form-item>
                <el-form-item label="账号性别:" prop="sex">
                    <el-select v-model="buyerRequire.sex">
                        <el-option v-for="item in sex" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="信用积分:" prop="credit">
                    <el-select v-model="buyerRequire.credit">
                        <el-option v-for="item in credit" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄段:" prop="ageGroup">
                    <el-select v-model="buyerRequire.ageGroup" placeholder="请选择">
                        <el-option v-for="item in ages" :key="item.id" :label="item.desc" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="淘气值:" prop="naughtyValue">
                    <el-input v-model="buyerRequire.naughtyValue" placeholder="请输入淘气值" />
                </el-form-item>
                <el-form-item label="常购类目:" prop="categories">
                    <el-checkbox-group v-model="buyerRequire.categories">
                        <el-checkbox v-for="item in buyTypes" :label="item.id" :text="item.desc" :key="item.id">{{item.desc}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="地区:" prop="address" class="address">
                    <div class="key-item">
                        <el-form-item labelWidth="0" prop="province">
                            <el-select @focus="areas=[];cities=[]" @change="provinceChange" v-model="buyerRequire.province" placeholder="请输入（省）">
                                <el-option v-for="province in provinces" :key="province.code" :label="province.name" :value="province.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="cities.length" labelWidth="0" prop="city">
                            <el-select @focus="areas=[]" @change="cityChange"  v-model="buyerRequire.city" placeholder="请输入（市）">
                                <el-option v-for="city in cities" :key="city.code" :label="city.name" :value="city.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="areas.length" labelWidth="0" prop="city" style="margin-top: 10px;">
                            <el-select  v-model="buyerRequire.area" placeholder="请输入（区）">
                                <el-option v-for="area in areas" :key="area.code" :label="area.name" :value="area.code"></el-option>
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
                <el-form-item prop="screenshotTop" labelWidth="0">
                    <el-upload
                            v-loading="uploadLoading"
                            :on-progress="handelAvatarProgress"
                            class="avatar-uploader"
                            action="/api/attachment/upload"
                            :show-file-list="false"
                            :data="{type:'BUY_NUMBER_CHART'}"
                            name="file"
                            accept="image/png,image/gif,image/jpg,image/jpeg"
                            :before-upload="validateSize"
                            :on-success="function(e){handleAvatarSuccess(e,'screenshotTop')}">
                        <img v-if="buyerRequire.screenshotTop" :src="buyerRequire.screenshotTop" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <h4><span>2、手机淘宝-我的淘宝-底部</span><a>截图示例</a></h4>
                <el-form-item prop="screenshotBottom" labelWidth="0">
                    <el-upload
                            v-loading="uploadLoading"
                            :on-progress="handelAvatarProgress"
                            class="avatar-uploader"
                            action="/api/attachment/upload"
                            :show-file-list="false"
                            :data="{type:'BUY_NUMBER_CHART'}"
                            name="file"
                            accept="image/png,image/gif,image/jpg,image/jpeg"
                            :before-upload="validateSize"
                            :on-success="function(e){handleAvatarSuccess(e,'screenshotBottom')}">
                        <img v-if="buyerRequire.screenshotBottom" :src="buyerRequire.screenshotBottom" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <h4><span>3、手机淘宝-收货地址</span><a>截图示例</a></h4>
                <el-form-item prop="screenshotAddress" labelWidth="0">
                    <el-upload
                            v-loading="uploadLoading"
                            :on-progress="handelAvatarProgress"
                            class="avatar-uploader"
                            action="/api/attachment/upload"
                            :show-file-list="false"
                            :data="{type:'BUY_NUMBER_CHART'}"
                            name="file"
                            accept="image/png,image/gif,image/jpg,image/jpeg"
                            :before-upload="validateSize"
                            :on-success="function(e){handleAvatarSuccess(e,'screenshotAddress')}">
                        <img v-if="buyerRequire.screenshotAddress" :src="buyerRequire.screenshotAddress" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <h4><span>4、淘宝截图-我的</span><a>截图示例</a></h4>
                <el-form-item prop="screenshotMy" labelWidth="0">
                    <el-upload
                            v-loading="uploadLoading"
                            :on-progress="handelAvatarProgress"
                            :before-upload="validateSize"
                            class="avatar-uploader"
                            action="/api/attachment/upload"
                            :show-file-list="false"
                            :data="{type:'BUY_NUMBER_CHART'}"
                            name="file"
                            accept="image/png,image/gif,image/jpg,image/jpeg"
                            :on-success="function(e){handleAvatarSuccess(e,'screenshotMy')}">
                        <img v-if="buyerRequire.screenshotMy" :src="buyerRequire.screenshotMy" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button type="primary" @click="submitForm('buyerRequire')" :loading="loading" style="width: 100%">提交</el-button>
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
        uploadLoading: false,
        loading: false,
        taskType,
        buyTypes,
        ages,
        credit,
        sex,
          provinces: provinces,
          cities: [],
        areas:[],
        category: [],
        buyerRequire: {
          type: '',
          userAccount: '',
          credit: '',
          categories: [],
          naughtyValue:'',
          sex: '',
          ageGroup: '',
            province:'',
            city:'',
          area: '',
            address:'',
          screenshotTop: '',
          screenshotBottom: '',
          screenshotAddress: '',
          screenshotMy: '',
        },
        rules: {
          type: [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
          userAccount:  [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            credit:  [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
          categories:[
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
          naughtyValue: [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
            sex:  [
                {
                    required: true, message:'不能为空',trigger:'blur'
                }
            ],
          ageGroup:  [
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
        },
      }
    },
    methods: {
      submitForm() {
        this.$refs.buyerRequire.validate(async (valid) => {
          if (valid) {
            const {screenshotTop, screenshotBottom, screenshotAddress, screenshotMy} = this.buyerRequire;
            if(!screenshotTop || !screenshotBottom || !screenshotAddress || !screenshotMy){
              this.$message.info('请上传淘宝截图');
              return;
            }
            const categories = [...this.buyerRequire.categories];
            this.categories = categories.map(item=>{return {category:item}});
            this.loading = true;
            const result = await this.$API.request(this.$API.addBuyNumber, 'POST', {...this.buyerRequire, categories: this.categories});
            this.loading = false;
            if (result && result.success) {
              this.$message.success('添加成功')
              const that = this;
              setTimeout(function(){
                that.$router.push('/userInfo/buyerAccount')
              }, 1000)
            } else {
              this.$message.error(result.msg)
            }
          } else {
            return false;
          }
        })
      },
      provinceChange(province){
        this.cities = []
        const cities = provinces.find(function(item){return item.code===province})?provinces.find(function(item){return item.code===province}).cityList : []
        this.cities = cities;
      },
      cityChange(city){
        this.areas=[];
        const areas = this.cities.find(function(item){return item.code===city})?this.cities.find(function(item){return item.code===city}).areaList : []
        this.areas = areas;
      },
      validateSize(file) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isLt2M;
      },
      handelAvatarProgress() {
        this.uploadLoading = true
      },
        handleAvatarSuccess(res, type) {
          this.uploadLoading = false
          if(res && res.success)
           this.buyerRequire[type] = res.msg;
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
                flex-wrap: wrap;
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
                  width: 100%;
                img{
                    width: 100%;
                }
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
