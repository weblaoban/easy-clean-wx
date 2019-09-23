<template>
    <div class="extension">
        <el-tabs v-model="currentSection"
                 @tab-click="handleClick">
            <el-tab-pane label="推广链接" name="link">
                <div class="container" v-if="!hasBind">
                    <div class="section">
                        <div class="title">
                            <p>我要获得推荐资格</p>
                            <div class="button">点击报名</div>
                        </div>
                        <p>
                            如果你希望推荐朋友，获得朋友额外每单一元的佣金，请先点击报名，我们会审核并给与推荐资格</p>
                    </div>
                    <div class="section">
                        <div class="title">
                            <p>推荐商家</p>
                            <div class="button" @click="copyTextToClipboard('111')">点击复制商家注册链接</div>
                        </div>
                        <p>
                            发送注册链接至商家，请用PC端打开，商家每放一单你都能得到1元提成</p>
                    </div>
                </div>
                <div class="container" v-if="hasBind">
                    <div class="section">
                        <div class="title">
                            <p>推荐试用朋友</p>
                            <div class="button">点击复制推广注册链接</div>
                        </div>
                        <p>发送注册链接至朋友，只能用手机端打开，朋友完成任务后，他每做一单，你都能得到1元提成</p>
                    </div>
                    <div class="section">
                        <div class="title">
                            <p>推荐商家</p>
                            <div class="button" @click="copyTextToClipboard('111')">点击复制商家注册链接</div>
                        </div>
                        <p>\发送注册链接至商家，请用PC端打开，商家每放一单你都能得到1元提成</p>
                    </div>
                </div>
                <p class="tip">推广一个商家，远胜推荐1000个朋友，请大家加油推荐</p>
            </el-tab-pane>
            <el-tab-pane label="我推荐的" name="list">
                <ul class="head">
                    <li>
                        <span>用户名</span><span>姓名</span><span>注册时间</span><span>完成试用数/发布任务数</span>
                    </li>
                    <li v-for="item in inviteList" :key="item.id">
                        <span v-text="item.userName">用户名</span><span v-text="item.name">姓名</span><span v-text="item.registerTime">注册时间</span><span v-text="item.publishTaskNum">完成试用数/发布任务数</span>
                    </li>
                </ul>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  export default {
    name: 'extension',
    data() {
      return {
        currentSection: 'link',
        hasBind: true,
        inviteList: [
          {
            id: 1,
            userName: '用户名',
            name: '姓名',
            registerTime: '',
            taskNum: '1',
            publishTaskNum: '2'
          }
        ]
      }
    },
    methods: {
      handleClick(tab) {
        this.currentSection = tab.name;
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
      }
    }
  }
</script>
<style lang="scss">
    .extension {
        font-size: 24px;

        .el-tabs__nav {
            width: 100%;

            .el-tabs__item {
                width: 50%;
                font-size: 24px;
            }
        }

        .container {
            padding: 0 40px;
        }
        .section{
            margin-bottom: 40px;
        }
        .title {
            display: flex;
            font-size: 24px;
            line-height: 60px;
            align-items: center;
            margin-bottom: 10px;

            .button {
                line-height: 60px;
                padding: 0 40px;
                font-size: 24px;
                text-align: center;
                background: #4685f4;
                border-radius: 5px;
                color: #fff;
                margin-left: 30px;
            }
        }
        .head{
            padding: 0 20px;
            li{
                display: flex;
                justify-content: space-between;
                line-height: 30px;
                span{
                    line-height: 30px;
                    flex: 1;
                    text-align: center;
                }
            }
        }
        p {
            line-height: 40px;
            font-size: 24px;
            text-align: left;
            &.tip{
                color: #E53333;
                padding: 0 40px;
            }
        }
    }
</style>
