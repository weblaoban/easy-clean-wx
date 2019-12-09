<template>
    <div class="realName">
        <el-form :model="ruleForm" :rules="rules"
                 ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="name">
                <el-input placeholder="（注册时填写的真实姓名，不可修改）"
                          v-model="name"
                          disabled></el-input>
            </el-form-item>
            <el-form-item prop="idNumber">
                <el-input placeholder="请输入您的身份证号码"
                          v-model="ruleForm.idNumber"
                          :disabled="authState===3"></el-input>
            </el-form-item>
            <el-form-item prop="positivePhoto">
                <el-upload
                        v-loading="avatarLoading"
                        class="avatar-uploader"
                        action="/api/attachment/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-progress="handelAvatarProgress"
                        accept="image/*"
                        :data="{type:'REAL_NAME_CHART'}"
                        name="file"
                        :before-upload="validateSize"
                >
                    <img v-if="ruleForm.positivePhoto"
                         :src="ruleForm.positivePhoto"
                         class="avatar">
                    <i v-else
                       class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>本人手持身份证正面</p>
            </el-form-item>
            <el-form-item prop="backPhoto">
                <el-upload
                        v-loading="backLoading"
                        class="avatar-uploader"
                        action="/api/attachment/upload"
                        :show-file-list="false"
                        :data="{type:'REAL_NAME_CHART'}"
                        name="file"
                        accept="image/*"
                        :on-progress="handelOtherProgress"
                        :before-upload="validateSize"
                        :on-success="handleOtherSuccess">
                    <img v-if="ruleForm.backPhoto"
                         :src="ruleForm.backPhoto"
                         class="avatar">
                    <i v-else
                       class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>本人手持身份证反面</p>
            </el-form-item>
            <el-form-item>
                <el-button v-if="authState===0"
                           type="primary"
                           @click="submitForm('ruleForm')"
                           :loading="loading">提交
                </el-button>
                <el-button v-if="authState===3" type="info">
                    审核中
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  export default {
    name: 'realName',
    data() {
      return {
        backLoading: false,
        avatarLoading: false,
        loading: false,
        authState: 0,
        name: '',
        ruleForm: {
          idNumber: '',
          positivePhoto: '',
          backPhoto: ''
        },
        rules: {
          idNumber: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    async created() {
      const authResult = await this.$API.request(this.$API.userAuth, 'POST');
      if (authResult && authResult.success) {
        const data = authResult.data;
        this.authState = data.identityAuth;
      }
      const result = await this.$API.request(this.$API.getUserInfo, 'POST');
      if (result && result.success) {
        const data = result.data;
        this.name = data.name;
      }
      if (result.code === 'OVERTIME') {
        this.$router.push('/login')
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (!this.ruleForm.positivePhoto) {
              this.$message.error('请上传身份证正面照');
              return;
            }
            if (!this.ruleForm.backPhoto) {
              this.$message.error('请上传身份证反面照');
              return;
            }
            this.loading = true;
            const result = await this.$API.request(this.$API.identityAuth, 'POST', {...this.ruleForm});
            this.loading = false;
            if (result && result.success) {
              this.$message.success('提交成功')
              const that = this;
              setTimeout(function () {
                that.$router.push('/userInfo')
              }, 1000)
            } else {
              this.$message.error(result.msg)
            }
          } else {
            return false;
          }
        })
      },
      validateSize(file) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isLt2M;
      },
      handelAvatarProgress() {
        this.avatarLoading = true
      },
      handelOtherProgress() {
        this.backLoading = true
      },
      handleAvatarSuccess(res) {
        this.avatarLoading = false;
        this.ruleForm.positivePhoto = res.msg;
      },
      handleOtherSuccess(res) {
        this.backLoading = false
        this.ruleForm.backPhoto = res.msg;
      },
    }
  }
</script>
<style lang="scss">
    h4 {
        font-size: 24px;
        color: #666;
        text-align: center;
        margin-bottom: 20px;
    }

    .realName {
        width: 100%;
        padding: 20px;
        margin: 40px auto 0;
        padding-bottom: 1rem;

        a {
            display: block;
            width: 100%;
            text-align: right;
            color: #4685f4;
            margin-bottom: 15px;
        }

        .register {
            a {
                display: inline;
                text-align: center;
            }
        }

        .avatar-uploader .el-upload {
            border: 2px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 100%;
        }

        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }

        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100%;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 100%;
            height: 178px;
            display: block;
        }
    }

    .el-button {
        width: 100%;
        margin: 0;
    }
</style>
