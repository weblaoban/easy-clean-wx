<template>
    <div class="evaluate" v-loading="getingRequire">
        <el-form :rules="rules" class="demo-ruleForm">
            <p>1、完成评价以及买家秀</p>
            <p v-if="evaluateRequire.isDesignatedEvaluation">指定评价：<span v-text="evaluateRequire.evaluationContent"></span></p>
            <img style="width: 100%;" :src="evaluateRequire.slideShowPicture1" v-if="evaluateRequire.slideShowPicture1" alt="">
            <img style="width: 100%;" :src="evaluateRequire.slideShowPicture2" v-if="evaluateRequire.slideShowPicture2" alt="">
            <img style="width: 100%;" :src="evaluateRequire.slideShowPicture3" v-if="evaluateRequire.slideShowPicture3" alt="">
            <img style="width: 100%;" :src="evaluateRequire.slideShowPicture4" v-if="evaluateRequire.slideShowPicture4" alt="">
            <img style="width: 100%;" :src="evaluateRequire.slideShowPicture5" v-if="evaluateRequire.slideShowPicture5" alt="">
            <p>2、该宝贝的物流截图上传<a @click="showDialog">截图示例</a></p>
            <el-form-item v-if="evaluateRequire" prop="logisticsScreen" labelWidth="0" v-loading="uploadWuliuLoading">
                <el-upload
                        :on-progress="handelWuliuProgress"
                        :before-upload="validateSize"
                        class="avatar-uploader"
                        action="/api/attachment/upload"
                        :show-file-list="false"
                        :data="{type:'COMMENT'}"
                        name="file"
                        accept="image/*"
                        :on-success="handelWuliuSuccess">
                    <img v-if="logisticsScreen" :src="logisticsScreen" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <p v-if="evaluateRequire.isSlideShow">3、评价截图上传</p>
            <el-form-item v-if="evaluateRequire.isSlideShow" prop="screen" labelWidth="0" v-loading="uploadLoading">
                <el-upload

                        :on-progress="handelAvatarProgress"
                        :before-upload="validateSize"
                        class="avatar-uploader"
                        action="/api/attachment/upload"
                        :show-file-list="false"
                        :data="{type:'COMMENT'}"
                        name="file"
                        accept="image/*"
                        :on-success="handleAvatarSuccess">
                    <img v-if="screen" :src="creen" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <div class="button">
                <el-button type="primary" @click="submitForm" :loading="loading">完成</el-button>
            </div>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" src="../assets/images/wuliu.png" alt="">
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'startTask',
        data(){
            return{
              uploadWuliuLoading: false,
              dialogVisible: false,
              uploadLoading: false,
                getingRequire: false,
                loading: false,
                screen: '',
                logisticsScreen: '',
                rules: {},
                evaluateRequire: {},
            }
        },
        async created(){
            const taskId = this.$route.params.taskId;
            this.getingRequire = true;
            const result = await this.$API.request(this.$API.selectComment, 'POST',{taskId});
            this.getingRequire = false;
            if(result && result.success){
                this.evaluateRequire = result.data;
            }
        },
        methods: {
          showDialog(){
            this.dialogVisible = true;
          },
            handleAvatarSuccess(res) {
              this.uploadLoading = false
                this.screen = res.msg;
            },
          handelWuliuProgress(){
            this.uploadWuliuLoading = true;
          },
          handelWuliuSuccess(res){
            this.uploadWuliuLoading = false
            this.logisticsScreen = res.msg;
          },
            goPrev(){
                this.$emit('submit', 6);
            },
          validateSize(file) {
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 5MB!');
            }
            return isLt2M;
          },
          handelAvatarProgress() {
            this.uploadLoading = true
          },
            async submitForm() {
                if(this.evaluateRequire.isSlideShow && !this.screen && !this.logisticsScreen){
                    this.$message.info('请上传截图');
                    return;
                }
                const taskSubId = this.$route.params.taskSubId;
                const orderId = this.$route.params.orderId;
                this.loading = true;
                const result = await this.$API.request(this.$API.comment, 'POST',{orderId, taskSubId,screen: this.screen, logisticsScreen: this.logisticsScreen});
                this.loading = false;
                if(result && result.success){
                    const that = this;
                    this.$message.success('评价成功')
                    setTimeout(function(){
                        that.$router.push('/myTask');
                    }, 1000)
                } else {
                    this.$message.info(result.msg)
                }

            }
        },
    }
</script>
<style lang="scss">
    .evaluate{
        padding: 20px 30px 100px;
        .el-form{
            text-align: left;
            h4{
                margin-bottom: 15px;
            }
            p, h4{
                line-height: 50px;
                margin-bottom: 10px;
                a{
                    color: #4685f4;
                    font-size: 28px;
                    float: right;
                }
            }
            .button{
                text-align: center;
                margin-top: 20px;
            }
            .el-button{
                padding: 20px 20px;
                width: 100%;
                a{
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
            width: 100%;
            min-height: 200px;
            float: left;
            img{
                width: 100%;
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
        .el-dialog{
            width: 80%;
        }
    }
</style>
