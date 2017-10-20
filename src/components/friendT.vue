<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <transition name="bounce">
        <div id="app" class="contacts">
            <div class="main">
                <div class="code">
                    <input type="number" v-model="codeNum" placeholder="请输入邀请码">
                </div>
                <div class="codeBut" @touchstart="codeTouchstart($event)" @touchend="codeTouchend($event)">
                    确定
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import { Toast } from 'mint-ui';
    export default {
        name: 'contacts',
        data() {
            return {
                codeNum: '',
                startTouchYShop: 0
            }
        },
        computed: mapState(['regUserObj']),
        filters: {
            // 时间戳过滤
            ctimeFun: function (val) {
                if (val) {
                    var now = new Date(val)
                    var year = now.getYear() - 100;
                    var month = now.getMonth() + 1;
                    month = month > 9 ? month : "0" + month
                    var date = now.getDate();
                    date = date > 9 ? date : "0" + date
                    var hour = now.getHours();
                    hour = hour > 9 ? hour : "0" + hour
                    var minute = now.getMinutes();
                    minute = minute > 9 ? minute : "0" + minute
                    return "20" + year + "-" + month + "-" + date;
                } else {
                    return '无'
                }
            },
            // 图片过滤
            imgUrlFun: function (val) {
                if (val) {
                    return val
                } else {
                    return "/static/img/errimg.png"
                }
            }
        },
        created: function () {
            var self = this
            if (sessionStorage.openedfriendT) {
                var idStr = localStorage.getItem('id')
                self.regUserObj.id = idStr
                console.log('窗口是刷新页面,不是新打开')
            } else {
                console.log('窗口是新打开')
            }
            sessionStorage.setItem('openedfriendT', 'true');
            self.$emit('appchildsay', 'friendT');
        },
        beforeDestroy: function () {
            sessionStorage.removeItem('openedfriendT');
        },
        methods: {
            codeTouchstart() {
                this.startTouchYShop = event.changedTouches[0].clientY
            },
            codeTouchend() {
                var self = this
                var distance = event.changedTouches[0].clientY - this.startTouchYShop
                if (15 > distance && distance > -15) {
                    // self.regUserObj.id->402881fe5c396f3a015c39a546c2000a 
                    if (self.codeNum.length >= 6 && self.codeNum.length <= 10) {
                        self.getFriendYQM({
                            id: self.regUserObj.id,
                            selfcode: self.codeNum
                        }).then((data) => {
                            console.log(data)
                            if (data.data.code == 200) {
                                Toast({
                                    message: '邀请成功',
                                    className: 'toastLoad'
                                });
                                self.codeNum = ''
                            } else if (data.data.code == 1001) {
                                Toast({
                                    message: '不能填写自己的邀请码',
                                    className: 'toastLoad'
                                });
                            } else if (data.data.code == 1002) {
                                Toast({
                                    message: '你已经填写过邀请码了',
                                    className: 'toastLoad'
                                });
                            } else if (data.data.code == 500) {
                                Toast({
                                    message: '非法的邀请码',
                                    className: 'toastLoad'
                                });
                            } else {
                                Toast({
                                    message: '邀请失败',
                                    className: 'toastLoad'
                                });
                            }
                        }).catch(msg => {
                            console.log(msg)
                            Toast({
                                message: '邀请失败,服务器错误',
                                className: 'toastLoad'
                            });
                        })
                    } else {
                        if (self.codeNum.length < 6) {
                            Toast({
                                message: '邀请码最少6位',
                                className: 'toastLoad'
                            });
                        } else if (self.codeNum.length > 10) {
                            Toast({
                                message: '邀请码最多10位',
                                className: 'toastLoad'
                            });
                        }
                    }

                }
            },
         ...mapActions(['getFriendYQM'])
        }
    }

</script>

<style scoped>
    #app {
        background-color: #f5f5f6;
        height: 100vh;
        width: 100vw;
        overflow-x: hidden;
    }
    
    .main {
        margin: 0 auto;
        width: calc(100vw - 2rem);
        height: 11rem;
        margin-top: 4.5rem;
        /*overflow-y: hidden;*/
        display: flex;
        flex-direction: column;
        /*border: 1px solid red;*/
    }
    
    .code {
        width: calc(100vw - 2rem);
        height: 4.5rem;
        overflow: hidden;
        /*border: 1px solid red;*/
    }
    
    .code input {
        margin: 0;
        padding: 0;
        border: 0;
        border: 1px solid #d8d8db;
        width: calc(100vw - 2.2rem);
        height: 3.9rem;
        font-size: 1.2rem;
        text-align: center;
        line-height: 3.9rem;
        border-radius: 0.2rem;
    }
    
    .codeBut {
        margin-top: 2.5rem;
        width: 100%;
        height: 4rem;
        background-color: #1aac19;
        text-align: center;
        line-height: 4.2rem;
        font-size: 1.3rem;
        color: #fff;
        border-radius: 0.2rem;
    }
</style>