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
                        <el-checkbox v-for="item in buyTypes" :label="item.id" :text="item.desc" :key="item.id">无限制</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="地区:" prop="address" class="address">
                    <div class="key-item" :key="index" v-for="(item,index) in buyerRequire.address">
                        <el-form-item labelWidth="0" :prop="'address.'+index+'.province'">
                            <el-select @change="function(e){provinceChange(e,index)}" v-model="item.province" placeholder="请输入（省）">
                                <el-option v-for="province in item.provinces" :key="province" :label="province" :value="province"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="item.cities.length" labelWidth="0" :prop="'address.'+index+'.city'">
                            <el-select  v-model="item.city" placeholder="请输入（市）">
                                <el-option v-for="city in item.cities" :key="city" :label="city" :value="city"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
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
        buyerRequire: {
          taskType: 1,
          account: '',
          buyerCredit: 3,
          naughty:'',

          verify: 0,
          taskLimit: 10,
          naughtyValue: 0,
          buyerSex: 0,
          buyerAge: [0],
          buyCategory: [],
          address: [
            {
              provinces: Object.keys(provinces),
              cities: [],
              province:'',
              city:''
            }
          ],
        },
        rules: {},
        formData: new FormData()
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
      provinceChange(province, index){
        const cities = provinces[province]?provinces[province]:[]
        const target = this.buyerRequire.address[index];
        target.cities = cities;
      },
      addKeys(){
        const searchKeys = this.buyerRequire.address;
        searchKeys.push({
          provinces: Object.keys(provinces),
          cities: [],
          province:'',
          city:''
        })
        this.buyerRequire.address = searchKeys;
      },
      removeKeys(){
        const searchKeys = this.buyerRequire.address;
        if(searchKeys.length<2){
          return;
        }
        searchKeys.pop();
        this.buyerRequire.address = searchKeys;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .buyerRequire {
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
        }
    }
</style>
