<template>
    <div class="step1">
        <el-form :model="ruleForm.isThreeShops" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <h4>一、 {{threeShops[taskRequire.isThreeShops] || threeShops[0]}}</h4>
            <p>1、每家至少停留1分钟，进入货比商品页面，找到他家店铺名称，填写在下方空格中</p>
            <p>2、请确认使用买号【{{taskRequire.userAccount}}】登录</p>
            <p>3、点击搜索粘贴指定的关键词【{{taskRequire.searchTerms}}】</p>
            <el-button type="primary" @click="copyTextToClipboard(taskRequire.searchTerms)">复制关键词</el-button>
            <p>4、请输入货比商品店铺名称</p>
            <el-form-item :prop="'value'+item" v-for="item in 3">
                <el-input :placeholder="'商品店铺'+item" v-model="ruleForm.isThreeShops['value'+item]"></el-input>
            </el-form-item>
            <p v-if="taskRequire.isScreenshot">5、截图上传</p>
            <el-form-item v-if="taskRequire.isScreenshot" prop="top" labelWidth="0" v-for="item in 3">
                <el-upload
                        v-loading="uploadLoading"
                        :on-progress="handelAvatarProgress"
                        :before-upload="validateSize"
                        class="avatar-uploader"
                        action="/api/attachment/upload"
                        :show-file-list="false"
                        :data="{type:'ORDERS_CHART'}"
                        name="file"
                        accept="image/png,image/gif,image/jpg,image/jpeg"
                        :on-success="function(e,file){handleAvatarSuccess(e,file,'picture'+item)}">
                    <img v-if="ruleForm.isThreeShops['picture'+item]" :src="ruleForm.isThreeShops['picture'+item]" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <p v-if="this.timeDown(taskRequire)>0">下单剩余时间：<span v-text="taskRequire.timeDown">00:59：59</span>（一小时倒计时）</p>
            <div class="button">
                <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'startTask',
        props: ['taskRequire', 'ruleForm'],
        data() {
            return {
              uploadLoading: false,
                threeShops: {
                    0: '不需要', 1: '货比一家', 2: '货比两家', 3: '货比三家 '
                },
                rules: {
                    value1: [
                        {
                            required: true, message: '不能为空', trigger: 'blur'
                        }
                    ],
                    value2: [
                        {
                            required: true, message: '不能为空', trigger: 'blur'
                        }
                    ],
                    value3: [
                        {
                            required: true, message: '不能为空', trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
          validateSize(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
          },
          handelAvatarProgress() {
            this.uploadLoading = true
          },
            copyTextToClipboard(text) {
                const textArea = document.createElement('textarea');
                textArea.style.position = 'fixed';
                textArea.style.top = 0;
                textArea.style.left = 0;
                textArea.style.width = '2em';
                textArea.style.height = '2em';
                textArea.style.padding = 0;
                textArea.style.border = 'none';
                textArea.style.outline = 'none';
                textArea.style.boxShadow = 'none';
                textArea.style.background = 'transparent';
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                if (document.execCommand('copy')) {
                    this.$message.success('复制成功');
                }
                document.body.removeChild(textArea);
            },
            handleAvatarSuccess(res, file,type) {
              this.uploadLoading = false
                this.ruleForm.isThreeShops[type]=res.msg;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.taskRequire.isScreenshot){
                            const shops = this.taskRequire.isThreeShops;
                            if(shops===1){
                                if(!this.ruleForm.isThreeShops.picture1){
                                  this.$message.info('请上传截图');
                                    return;
                                } else {
                                    this.$emit('submit', 2);
                                }
                            } else if(shops===2){
                                if(!this.ruleForm.isThreeShops.picture1 || !this.ruleForm.isThreeShops.picture2){
                                    this.$message.info('请上传截图');
                                    return;
                                } else {
                                    this.$emit('submit', 2);
                                }
                            }else if(shops===3){
                                if(!this.ruleForm.isThreeShops.picture1 || !this.ruleForm.isThreeShops.picture2 || !this.ruleForm.isThreeShops.picture3){
                                    this.$message.info('请上传截图');
                                    return;
                                } else {
                                    this.$emit('submit', 2);
                                }
                            } else {
                                this.$emit('submit', 2);
                            }
                        }else {
                            this.$emit('submit', 2);
                        }
                    } else {
                        return false;
                    }
                })
            },
            timeDown(row){
                let total = row.times;
                if(total){
                    let result;
                    this.int = setInterval(()=>{
                        const s = (total%60) < 10 ? ('0' + total%60) : total%60;
                        const h = total/3600 < 10 ? ('0' + parseInt(total/3600)) : parseInt(total/3600);
                        const m = (total-h*3600)/60 < 10 ? ('0' + parseInt((total-h*3600)/60)) : parseInt((total-h*3600)/60);
                        result = h + ' : ' + m + ' : ' + s;
                        total--;
                        row.timeDown = result;
                        row.times = total;
                        this.taskRequire = row;
                    }, 1000)
                    if(total < 0) clearInterval(this.int);
                    return result;
                }
                return 0;
            }
        },
    }
</script>
<style lang="scss">
    .step1 {
        padding: 20px 30px 100px;
        .el-form {
            text-align: left;
            h4 {
                margin-bottom: 15px;
            }
            p, h4 {
                line-height: 50px;
                margin-bottom: 10px;
            }
            .button {
                text-align: center;
                margin-top: 20px;
            }
            .el-button {
                padding: 12px 20px;
                a {
                    color: #fff;
                }
            }
        }
        .el-upload {
            border: 2px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 400px;
            min-height: 200px;
            float: left;
            img{
                width: 400px;
                min-height: 200px;
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
</style>
