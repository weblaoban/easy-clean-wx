<template>
    <div class="userInfo blackList container">
        <el-form :inline="true" :model="financeInfo"
                 ref="finance" class="demo-form-inline">
            <el-form-item style="width: 100%" prop="category" label="类别："
                          class="userName">
                <el-select v-model="financeInfo.category"
                           placeholder="选择类别">
                    <el-option v-for="item in financeTypes"
                               :key="item.id"
                               :label="item.desc"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width: 100%;margin-bottom: 0.1rem">
                <el-button type="primary"
                           @click="submitForm('finance')" :loading="loading">搜索
                </el-button>
                <el-button type="primary"
                           @click="submitForm('finance', true)" :loading="loading">
                    重置
                </el-button>
            </el-form-item>
        </el-form>
        <ul class="head title">
            <li style="background: #fff;">
                <span>发生时间</span><span>类别</span><span>变动金额</span><span>账户余额</span>
            </li>
        </ul>
            <div class="wrap dataLists" ref="bs0" v-loading="loading">
                <div ref="wrap0" class="container" down="上拉加载" v-show="financeList.length">
                    <div class="listWraper" ref="listWraper">
                        <ul v-loading="loading" class="head">
                            <li v-for="item in financeList" :key="item.id">
                                <span v-text="item.createDate"></span><span v-text="item.category"></span><span
                                    v-text="item.income || item.expend"></span><span v-text="item.balance"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        name: 'financeList',
        data() {
            return {
                loading: false,
                noMore: false,
                financeInfo: {
                    category: '',
                },
                financeList: [],
                financeTypes: [
                    {
                        id: 1,
                        desc: '充值'
                    },
                    {
                        id: 2,
                        desc: '提现'
                    },
                    {
                        id: 3,
                        desc: '返款'
                    },
                    {
                        id: 4,
                        desc: '佣金'
                    },
                    {
                        id: 5,
                        desc: '推荐费'
                    },
                    {
                        id: 6,
                        desc: '平台调账'
                    },
                    {
                        id: 7,
                        desc: '罚款'
                    },
                ],
                pagination: {
                    total: 4,
                    pageSize: 10,
                    pageNo: 1
                },
                scroll: null,
            }
        },
        mounted() {
            this.getFinanceList();
            this.$nextTick(() => {
                this.createScroll()
            })
            const bs = this.$refs.bs0
            const listWraper = this.$refs.listWraper;
            listWraper.style.minHeight = bs.getBoundingClientRect().height + 'px'
        },
        methods: {
            createScroll() {
                const bs = this.$refs.bs0
                const scroll = this.scroll = new BScroll(bs, {
                    click: true,
                    preventDefault: true
                })
                const wrap = this.$refs.wrap0
                let diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                scroll.on('touchEnd', async (pos) => {
                    diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height;
                    if (diff - pos.y > 30) {
                        console.log(this.pagination)
                        if (this.pagination.pageNo < this.pagination.pages && !this.loading) {
                            this.pagination.pageNo = this.pagination.pageNo+1;
                            await this.getFinanceList()
                            this.$nextTick(() => {
                                scroll.refresh()
                                diff = bs.getBoundingClientRect().height - wrap.getBoundingClientRect().height
                            })
                        } else {
                            wrap.setAttribute('down', '已全部加载')
                        }
                    }
                })
            },
            async getFinanceList() {
                this.loading = true;
                const params = {};
                const that = this;
                if (this.financeInfo.category) {
                    params.category = this.financeInfo.category
                }
                const result = await this.$API.request(this.$API.financeList, 'POST', {...this.pagination, ...params});
                this.loading = false;
                if (result && result.success) {
                    const data = result.data;
                    let financeList = data.records;
                    financeList = financeList.map(function (item) {
                        let category = item.category;
                        const type = that.financeTypes.filter(function (typeItem) {
                            return typeItem.id === item.category
                        });
                        if (type && type.length) {
                            category = type[0].desc
                        }
                        return {...item, category}
                    })
                    this.financeList = this.financeList.concat(financeList)
                    const pagination = {total: data.total, pageSize: data.size, pageNo: data.current, pages: data.pages}
                    this.pagination = pagination;
                    this.$nextTick(() => {
                        this.scroll && this.scroll.refresh()
                    })
                }
            },
            submitForm(formName, isReset = false) {
                if (isReset) {
                    this.$refs[formName].resetFields();
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.financeList = [];
                        this.getFinanceList();
                    } else {
                        return false;
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .blackList {
        border-radius: 0;
        margin-top: 20px;
        padding: 40px;
        padding-bottom: 100px;
        p {
            text-align: left;

            &.desc {
                text-align: center;
                margin-top: 20px;
            }
        }
        .dataLists {
            overflow: hidden;
            padding: 0 20px;
            width: 100%;
            position:absolute; top:310px;left:0; bottom:100px; z-index:0;
            background: #fff;
            .container {
                position: relative;
                padding-top: 0.2rem;
                $beforeAfterH: 0.5rem;
                &:before {
                    content: attr(up);
                    position: absolute;
                    left:0;
                    top:- $beforeAfterH;
                    z-index: 10;
                    width: 100%;
                    height: $beforeAfterH;
                    text-align: center;
                    line-height: $beforeAfterH;
                }
                &:after {
                    content: attr(down);
                    display: block;
                    width: 100%;
                    height: $beforeAfterH;
                    text-align: center;
                    line-height: $beforeAfterH;
                    position: absolute;
                }
            }
        }
        .el-form {
            text-align: left;
            .el-form-item{
                margin-bottom: 20px;
            }
            .el-button{
                padding: 12px 20px;
            }
        }
        .infinite-list {
            height: 300px;
            padding: 0;
            margin: 0;
            list-style: none;
        }
        .head {
            padding: 0 20px;
            li {
                display: flex;
                justify-content: space-between;
                line-height: 60px;
                span {
                    line-height: 60px;
                    flex: 1;
                    text-align: center;
                }
            }
            &.title {
                &:first-child {
                    margin-bottom: 10px;
                    span {
                        font-weight: bold;
                    }
                }
            }
        }

        .el-date-editor .el-range-separator {
            padding: 0;
        }
    }
</style>
