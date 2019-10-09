<template>
    <div class="evaluate" v-loading="getingRequire">
        <el-form :rules="rules" class="demo-ruleForm">
            <p>1、完成评价以及买家秀</p>
            <p v-if="evaluateRequire.isDesignatedEvaluation">指定评价：<span v-text="evaluateRequire.evaluationContent"></span></p>
            <p v-if="evaluateRequire.isSlideShow">2、评价截图上传（如果任务发布时选取了晒图要求）</p>
            <el-form-item v-if="evaluateRequire.isSlideShow" prop="screen" labelWidth="0">
                <el-upload
                        v-loading="uploadLoading"
                        :on-progress="handelAvatarProgress"
                        :before-upload="validateSize"
                        class="avatar-uploader"
                        action="/api/attachment/upload"
                        :show-file-list="false"
                        :data="{type:'COMMENT'}"
                        name="file"
                        accept="image/png,image/gif,image/jpg,image/jpeg"
                        :on-success="handleAvatarSuccess">
                    <img v-if="ruleForm.top" :src="ruleForm.top" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <div class="button">
                <el-button type="primary" @click="submitForm" :loading="loading">完成</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'startTask',
        data(){
            return{
              uploadLoading: false,
                getingRequire: false,
                loading: false,
                screen: '',
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
            handleAvatarSuccess(res) {
              this.uploadLoading = false
                this.ruleForm.screen = res.msg;
            },
            goPrev(){
                this.$emit('submit', 6);
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
            async submitForm() {
                if(this.evaluateRequire.isSlideShow && !this.screen){
                    this.$message.info('请上传截图');
                    return;
                }
                const taskSubId = this.$route.params.taskSubId;
                const orderId = this.$route.params.orderId;
                this.loading = true;
                const result = await this.$API.request(this.$API.comment, 'POST',{orderId, taskSubId,screen: this.screen});
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
            height: 200px;
            float: left;
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
