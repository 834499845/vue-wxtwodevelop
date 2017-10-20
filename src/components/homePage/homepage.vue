<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="home">
        <div class="main">
            <div class="mainCont">
                <div class="contTitle">
                    <div>
                        <img :src="userObj.avatar | imgUrlFun" alt="">
                    </div>
                    <div>
                        {{userObj.nickName | strFun}}
                    </div>
                    <div>
                        <small>邀请码</small> <small>{{userObj.selfCode | strFun}}</small>
                    </div>
                </div>
                <div class="contUl">
                    <ul>
                        <li class="inetrLi">
                            <div>
                                积分
                            </div>
                            <div style="color: green">
                                {{userObj.scores | numFun}}
                            </div>
                        </li>
                        <li class="czLi" @touchstart="ListTouchstart($event,0)" @touchend="ListTouchend($event,0)">
                            <div>
                                收货地址
                            </div>
                            <div>
                                <img src="/static/img/extended.png" alt="">
                            </div>
                        </li>
                        <li class="czLi" @touchstart="ListTouchstart($event,1)" @touchend="ListTouchend($event,1)">
                            <div>
                                我的好友
                            </div>
                            <div>
                                <img src="/static/img/extended.png" alt="">
                            </div>
                        </li>
                        <li class="czLi" @touchstart="ListTouchstart($event,2)" @touchend="ListTouchend($event,2)">
                            <div>
                                邀请好友
                            </div>
                            <div>
                                <img src="/static/img/extended.png" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mainDian">

            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import { Toast } from 'mint-ui';
    require("../../../API/config.js");
    export default {
        name: 'home',
        data() {
            return {
                userObj: {
                    nickName: '',
                    avatar: '',
                    scores: 0,
                    startTouchYShop: 0
                }
            }
        },
        computed: mapState(['regUserObj']),
        filters: {
            // 时间戳过滤
            ctimeFun: function (val) {
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
            },
            // 图片过滤
            imgUrlFun: function (val) {
                if (val) {
                    return val
                } else {
                    return '/static/img/errimg.png'
                }
            },
            // 文字过滤
            numFun: function (val) {
                if (val > 0) {
                    return val
                } else {
                    return '0'
                }
            },
            strFun: function (val) {
                if (val) {
                    return val
                } else {
                    return '无'
                }
            }
        },
        created: function () {
            var self = this
            self.$emit('childsay', 'homepage');
            // self.regUserObj.id->402881925c1f9366015c1facec9a0002
            if (self.regUserObj.id.length > 0) {
                if (self.regUserObj.avatar.length > 0) {
                    self.userObj.avatar = self.regUserObj.avatar
                }
                self.getUserList({
                    consumerid: self.regUserObj.id
                }).then((data) => {
                    console.log(data)
                    if (data.data.code == "200") {
                        if (data.data.data == null) {
                        } else {
                            self.userObj.avatar = data.data.data.avatar
                            self.userObj.nickName = data.data.data.nickName
                            self.userObj.scores = data.data.data.scores
                            self.userObj.selfCode = data.data.data.selfCode
                        }
                    } else {
                    }
                }).catch(msg => {
                    console.log(msg)
                    Toast({
                        message: '服务器错误',
                        className: 'toastLoad'
                    });
                })
            } else {
                if (sessionStorage.homepageopened) {
                    var idStr = localStorage.getItem('id')
                    self.regUserObj.id = idStr
                    self.getUserList({
                        consumerid: idStr
                    }).then((data) => {
                        console.log(data)
                        if (data.data.code == "200") {
                            if (data.data.data == null) {
                            } else {
                                self.userObj.avatar = data.data.data.avatar
                                self.userObj.nickName = data.data.data.nickName
                                self.userObj.scores = data.data.data.scores
                            }
                        } else {
                        }
                    }).catch(msg => {
                        console.log(msg)
                        Toast({
                            message: '服务器错误',
                            className: 'toastLoad'
                        });
                    })
                    console.log('窗口是刷新页面,不是新打开')
                } else {
                    console.log('窗口是新打开')
                }
                sessionStorage.setItem('homepageopened', 'true');
            }
        },
        beforeDestroy: function () {
            sessionStorage.removeItem('homepageopened');
        },
        watch: {
        },
        methods: {
            // 跳转
            ListTouchstart(event, index) {
                this.startTouchYShop = event.changedTouches[0].clientY
            },
            ListTouchend(event, index) {
                var self = this
                var distance = event.changedTouches[0].clientY - this.startTouchYShop
                if (15 > distance && distance > -15) {
                    if (index == 0) {
                        this.$router.push({
                            path: '/site'
                        })
                    } else if (index == 1) {
                        this.$router.push({
                            path: '/friendM'
                        })
                    } else if (index == 2) {
                        this.$router.push({
                            path: '/friendT'
                        })
                    }
                }
            },
            ...mapActions(['getUserList'])
        }
    }

</script>
<style scoped>
    #app {
        background-color: #f5f5f6;
        overflow-x: hidden;
        height: 100vh;
    }
    
    .mainDian {
        height: 4.5rem;
    }
    
    .contTitle {
        height: 13.5rem;
        overflow: hidden;
    }
    
    .contTitle>div {
        width: 100%;
    }
    
    .contTitle>div:nth-child(1) {
        height: 5.5rem;
        margin-top: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .contTitle>div:nth-child(1) img {
        width: 5rem;
        height: 5rem;
        border-radius: 0.3rem;
    }
    
    .contTitle>div:nth-child(2) {
        margin-top: 0.5rem;
        font-size: 1.2rem;
        height: 2.2rem;
        text-align: center;
        line-height: 2.2rem;
    }
    
    .contTitle>div:nth-child(3) {
        margin-top: 0.5rem;
        height: 2.2rem;
        text-align: center;
        line-height: 2.2rem;
    }
    
    .contTitle>div:nth-child(3) small {
        font-size: 1.2rem;
        color: #d8d8db;
    }
    
    .contUl {
        background-color: #fff;
    }
    
    .contUl>ul>li {
        height: 4.5rem;
        border-bottom: 1px solid #f7f7f7;
        font-size: 1.2rem;
        line-height: 4.5rem;
    }
    
    .contUl>ul>li>div:nth-child(1) {
        margin-left: 1rem;
    }
    
    .contUl>ul>li>div:nth-child(2) {
        margin-right: 1rem;
    }
    
    .inetrLi {
        display: flex;
        justify-content: space-between;
    }
    
    .czLi {
        display: flex;
        justify-content: space-between;
    }
</style>