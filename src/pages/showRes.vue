<template>
    <div class='bg_image' style="min-height: 100%;">
        <head-top></head-top>
        <div>
            <el-row>

                <el-col :span="20" :offset="2" style="margin-top: 3%;">

                    <span style="font-family: Helvetica Neue; font-size: 14px">您等待完成的预约如下：</span>
                    <el-button type="text" @click="changeShowModus">{{show_modus}}</el-button>
                    <div class="block" style="margin-bottom: 5%;">
                        <div class="radio">
                            <span style="font-family: Helvetica Neue; font-size: 14px">排序：</span>
                            <el-radio-group v-model="reverse">
                                <el-radio :label="true">倒序</el-radio>
                                <el-radio :label="false">正序</el-radio>
                            </el-radio-group>
                        </div>
                    </div>

                    <el-timeline
                            v-if="show_time_line"
                            :reverse="reverse">
                        <el-timeline-item
                                v-for="(res, index) in myRes"
                                :key="index"
                                color="#409EFF"
                                :timestamp="res.week">
                            <el-card>
                                <el-col :span="12">
                                    <h4>{{res.t_name}}老师</h4>
                                    <el-divider></el-divider>
                                    <div style="height: 2em;">
                                        <span>
                                            地点：{{res.place}}
                                        </span>
                                        <el-divider direction="vertical"></el-divider>
                                        <span>
                                            时间：{{res.week}}&nbsp;{{res.weekday}} {{res.segment}}
                                        </span>
                                    </div>
                                    <el-divider></el-divider>
                                    <p>Tips：{{res.tips}}</p>
                                    <br>
                                </el-col>
                                <el-col :span="12">
                                    <p>
                                        您可以进行的操作：
                                    </p>
                                    <el-divider></el-divider>
                                    <div style="height: 2em;">
                                        <el-button
                                                size="mini"
                                                @click="handleFinish(index, res)">完成
                                        </el-button>
                                        <el-button
                                                v-if="res.is_canceled == '0'"
                                                size="mini"
                                                type="danger"
                                                @click="handleCancel(index, res)">{{btn_cancel_res}}
                                        </el-button>
                                        <el-button
                                                v-if="res.is_canceled == '1'"
                                                size="mini"
                                                type="danger"
                                                @click="handleEnsure(index, res)">{{btn_ensure_cancel_res}}
                                        </el-button>
                                        <el-button
                                                v-if="res.is_canceled == '2'"
                                                size="mini"
                                                type="danger"
                                                @click="handleCancel(index, res)">{{btn_wait_ensure}}
                                        </el-button>
                                        <el-button
                                                v-if="res.is_canceled == '3'"
                                                size="mini"
                                                type="danger"
                                                :disabled="true"
                                                @click="handleCancel(index, res)">已取消
                                        </el-button>
                                        <el-divider></el-divider>
                                    </div>
                                </el-col>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>

                    <el-table
                            v-else
                            :data="myRes"
                            stripe
                            style="width: 100%">
                        <el-table-column
                                label="状态"
                                width="80"
                        >
                            <template slot-scope="scope">
                                <el-button size="mini" type="success" plain>
                                    <i class="el-icon-loading"></i>
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="week"
                                label="周次"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="weekday"
                                label="天次"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                sortable
                                prop="segment"
                                label="时间段">
                        </el-table-column>
                        <el-table-column
                                prop="t_name"
                                label="教师">
                        </el-table-column>
                        <el-table-column
                                prop="place"
                                label="地点">
                        </el-table-column>
                        <el-table-column
                                prop="tips"
                                label="主题">
                        </el-table-column>

                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <!--                                <el-button-->
                                <!--                                        size="mini"-->
                                <!--                                        @click="handleFinish(scope.$index, scope.row)">完成-->
                                <!--                                </el-button>-->
                                <el-button
                                        v-if="scope.row.is_canceled == '0'"
                                        size="mini"
                                        type="danger"
                                        @click="handleCancel(scope.$index, scope.row)">{{btn_cancel_res}}
                                </el-button>
                                <el-button
                                        v-if="scope.row.is_canceled == '1'"
                                        size="mini"
                                        type="danger"
                                        @click="handleEnsure(scope.$index, scope.row)">{{btn_ensure_cancel_res}}
                                </el-button>
                                <el-button
                                        v-if="scope.row.is_canceled == '2'"
                                        size="mini"
                                        type="danger"
                                        @click="handleCancel(scope.$index, scope.row)">{{btn_wait_ensure}}
                                </el-button>
                                <el-button
                                        v-if="scope.row.is_canceled == '3'"
                                        size="mini"
                                        type="danger"
                                        :disabled="true"
                                        @click="handleCancel(scope.$index, scope.row)">已取消
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/Header'

    export default {
        name: "showRes",
        components: {
            headTop
        },

        data() {
            return {
                btn_cancel_res: '取消',
                btn_ensure_cancel_res: '同意取消',
                btn_wait_ensure: '等待同意',

                show_time_line: true,
                reverse: false,
                show_modus: '以列表形式显示',

                myRes: [
                    {
                        // week: '第1周',
                        // weekday: '周五',
                        // segment: '10:30 ~ 11:00',
                        // t_name: '***',
                        // place: '宋健一号院北***',
                        // reason: '答疑',
                        // tips: '',
                    }
                ]
            }
        },

        methods: {
            handleFinish(index, row) {
                this.$confirm('预约已完成？', {
                    confirmButtonText: '是',
                    cancelButtonText: '否',
                }).then(({value}) => {
                    console.log(row)
                    this.$store.dispatch('post_data', {
                        api: '/api/finish_res',
                        data: {
                            'account': localStorage.getItem('account'),
                            'serial': row.serial
                        }

                    }).then((response) => {

                        if (response.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '预约已完成！'
                            })
                            location.reload()
                        } else {
                            this.$store.commit({
                                type: 'show_message',
                                status: response.data.status
                            })
                            console.log(response.data.status)
                            this.$message(this.$store.state.app.message_box)
                        }
                    }).catch((error) => {
                        alert(error)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: ' '
                    });
                });

                this.message({
                    type: 'success',
                    message: '已经提醒！'
                })
            },

            handleDelete(index, row) {
                console.log(index, row);
                console.log(row.teacher);
                console.log(row.t_name)
            },

            handleCancel(index, row) {
                console.log('showRes handle Cancel row: ', row);
                this.$prompt('请输入取消预约原因', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    this.$store.dispatch('post_data', {
                        api: '/api/initiate_cancel',
                        data: {
                            'account': localStorage.getItem('account'),
                            'serial': row.serial,
                            'reason': value,
                            'identify': this.$store.state.identify
                        }
                    }).then((response) => {
                        if (response.data.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '等待对方答复……'
                            });
                            location.reload()
                        } else {
                            this.$store.commit({
                                type: 'show_message',
                                status: response.data.status
                            });
                            console.log(response.data.status);
                            this.$message(this.$store.state.app.message_box)
                        }
                    }).catch((error) => {
                        // // // alert(error)
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },

            handleEnsure(index, row) {
                console.log('showRes handle ensure row: ', row)
                this.$store.dispatch('post_data', {
                    api: '/api/ensure_cancel',
                    data: {
                        'account': localStorage.getItem('account'),
                        'serial': row.serial,
                        'identify': this.$store.state.identify
                    }
                }).then((response) => {
                    if (response.data.status == 200) {
                        this.$message({
                            type: 'success',
                            message: '已取消'
                        });
                        location.reload();
                    } else {
                        this.$store.commit({
                            type: 'show_message',
                            status: response.data.status
                        });
                        console.log(response.data.status);
                        this.$message(this.$store.state.app.message_box)
                    }
                }).catch((error) => {
                    // // alert(error)
                });
            },
            changeShowModus() {
                if (this.show_time_line) {
                    this.show_time_line = false;
                    this.show_modus = '以时间线形式显示';
                } else {
                    this.show_time_line = true;
                    this.show_modus = '以列表形式显示';
                }
            }
        },
        mounted() {
            this.$store.dispatch('post_data', {
                api: '/api/s_view_reservation',
                data: {
                    account: localStorage.getItem('account')
                }
            }).then((response) => {
                if (response.data.status == 200) {
                    this.myRes = response.data.ress;
                    for (let i = 0; i < this.myRes.length; i = i + 1) {
                        this.myRes[i]['segment'] = this.$store.state.map_segment[this.myRes[i]['segment']];
                        this.myRes[i]['week'] = this.$store.state.map_week[this.myRes[i]['week']];
                        this.myRes[i]['weekday'] = this.$store.state.map_weekday[this.myRes[i]['weekday']]
                    }
                } else {
                    this.$store.commit({
                        type: 'show_message',
                        status: response.data.status
                    });
                    console.log(response.data.status);
                    this.$message(this.$store.state.app.message_box)
                }
            }).catch((error) => {
                // // alert(error)
            })

        }
    }
</script>

<style scoped>
    .bg_image {
        background-image: url("../assets/bg.jpg");
        /*height: 100%;*/
        background-repeat: repeat;
    }
</style>