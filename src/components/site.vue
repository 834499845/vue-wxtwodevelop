<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <transition name="bounce">
        <div id="app" class="site">
            <div class="main">
                <ul>
                    <li>
                        <div>
                            收货人
                        </div>
                        <div>
                            <input type="text" v-model="siteObj.name" :placeholder="sitePlObj.namePl | strFun">
                        </div>
                    </li>
                    <li>
                        <div>
                            手机号
                        </div>
                        <div>
                            <input type="number" v-model="siteObj.phone" :placeholder="sitePlObj.phonePl | strFun">
                        </div>
                    </li>
                    <li>
                        <div>
                            详细地址
                        </div>
                        <div v-bind:style="{height:textHeightMax}">
                            <textarea v-bind:style="{height:textHeight,fontSize:textSize}" name="" id="" v-model="siteText" :placeholder="sitePlObj.sitePl | strFun"></textarea>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="addBut" @touchstart="addTouchstart($event)">
                <div>保存</div>
            </div>
        </div>
    </transition>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import { Toast } from 'mint-ui';
    require("../../API/config.js");
    export default {
        name: 'type',
        data() {
            return {
                textHeight: '1.4rem',
                textSize: '1.2rem',
                textHeightMax: '1.7rem',
                siteObj: {
                    name: '',
                    site: '',
                    phone: ''
                },
                siteText: '',
                sitePlObj: {
                    namePl: '暂无',
                    sitePl: '暂无',
                    phonePl: '暂无'
                }
            }
        },
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
                    return "http://" + global.logIp + ":" + global.logFileport + "/files" + val
                } else {
                    return "/static/img/errimg.png"
                }
            },
            // 文字过滤
            strFun: function (val) {
                if (val.length > 0) {
                    return val
                } else {
                    return '暂无信息'
                }
            }
        },
        computed: mapState(['regUserObj']),
        created: function () {
            var self = this
            if (sessionStorage.openedsite) {
                var idStr = localStorage.getItem('id')
                self.regUserObj.id = idStr
                console.log('窗口是刷新页面,不是新打开')
            } else {
                console.log('窗口是新打开')
            }
            sessionStorage.setItem('openedsite', 'true');
            self.$emit('appchildsay', 'site');
            // self.regUserObj.id->402881925c1f9366015c1facec9a0002
            self.getSiteList({
                consumerid: self.regUserObj.id
            }).then((data) => {
                console.log(data)
                if (data.data.code == "200") {
                    if (data.data.data == null) {
                    } else {
                        self.sitePlObj.namePl = data.data.data.contact
                        self.sitePlObj.phonePl = data.data.data.mobile
                        self.sitePlObj.sitePl = data.data.data.address
                        self.siteObj.name = data.data.data.contact
                        self.siteObj.phone = data.data.data.mobile
                        self.siteText = data.data.data.address
                        self.siteObj.site = data.data.data.address
                    }
                } else {
                }
            }).catch(msg => {
                console.log(msg)
                // Toast({
                //     message: '服务器错误',
                //     className: 'toastLoad'
                // });
            })

        },
        beforeDestroy: function () {
            sessionStorage.removeItem('openedsite');
        },
        methods: {
            // 保存
            addTouchstart(event, index) {
                var self = this
                if (self.siteObj.phone.length > 0 && self.siteObj.name.length > 0) {
                    self.siteObj.site = self.siteText
                    self.getUpdateSite({
                        consumerId: self.regUserObj.id,
                        mobile: self.siteObj.phone,
                        contact: self.siteObj.name,
                        address: self.siteObj.site
                    }).then((data) => {
                        console.log(data)
                        if (data.data.code == "200") {
                            Toast({
                                message: '修改成功',
                                className: 'toastLoad'
                            });
                            self.sitePlObj.namePl = ""
                            self.sitePlObj.phonePl = ""
                            self.sitePlObj.sitePl = ""
                            self.getSiteList({
                                consumerid: self.regUserObj.id
                            }).then((data) => {
                                console.log(data)
                                if (data.data.code == "200") {
                                    if (data.data.data == null) {
                                    } else {
                                        self.sitePlObj.namePl = data.data.data.contact
                                        self.sitePlObj.phonePl = data.data.data.mobile
                                        self.sitePlObj.sitePl = data.data.data.address
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
                            Toast({
                                message: '修改失败',
                                className: 'toastLoad'
                            });
                        }
                    }).catch(msg => {
                        alert(JSON.stringify(msg))
                        Toast({
                            message: '服务器错误',
                            className: 'toastLoad'
                        });
                    })
                } else {
                    if (self.siteObj.phone.length == 0) {
                        Toast({
                            message: '手机号为必填项',
                            className: 'toastLoad'
                        });
                    } else if (self.siteObj.name.length == 0) {
                        Toast({
                            message: '收货人为必填项',
                            className: 'toastLoad'
                        });
                    }
                }

            },
            // 判断是否为数字
            numberFun(val) {
                if (parseFloat(val).toString() == "NaN") {
                    return false;
                } else {
                    return true;
                }
            },
            ...mapActions(['getSiteList','getUpdateSite'])
        },
        watch: {
            siteText: function (val, oldVal) {
                var valNum = val * 1
                if (this.numberFun(valNum) == false) {
                    if (val.length * 1.2 < 20) {
                        this.textHeight = '1.5rem'
                        this.textHeightMax = '1.7rem'
                    } else if (val.length * 1.2 > 20 && val.length * 1.2 < 40) {
                        this.textHeight = '3rem'
                        this.textHeightMax = '3.2rem'
                    } else if (val.length * 1.2 > 40 && val.length * 1.2 < 60) {
                        this.textHeight = '4.5rem'
                        this.textHeightMax = '4.7rem'
                    } else if (val.length * 1.2 > 60 && val.length * 1.2 < 80) {
                        this.textHeight = '6rem'
                        this.textHeightMax = '6.2rem'
                    } else if (val.length * 1.2 > 80 && val.length * 1.2 < 100) {
                        this.textHeight = '7.5rem'
                        this.textHeightMax = '7.7rem'
                    } else if (val.length * 1.2 > 100 && val.length * 1.2 < 120) {
                        this.textHeight = '9rem'
                        this.textHeightMax = '9.2rem'
                    } else if (val.length * 1.2 > 120 && val.length * 1.2 < 140) {
                        this.textHeight = '10.5rem'
                        this.textHeightMax = '10.7rem'
                    }
                } else {
                    if (val.length > 5) {
                        Toast({
                            message: '收获地址不能为纯数字',
                            className: 'toastLoad'
                        });
                    }
                }
            }
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
    
    .main>ul>li {
        min-height: 4.5rem;
        border-bottom: 1px solid #e7e7e7;
        background-color: #fff;
        display: flex;
        align-items: center;
    }
    
    .main>ul>li>div:nth-child(1) {
        width: 9rem;
        text-align: center;
        font-size: 1.2rem;
        color: #a7a7a7;
    }
    
    .main>ul>li:nth-child(3)>div:nth-child(1) {
        min-height: 4.5rem;
        line-height: 4.5rem;
    }
    
    .main>ul>li:nth-child(3)>div:nth-child(2) {
        height: 7.4rem;
        display: flex;
        align-items: center;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        /*border: 1px solid red;*/
    }
    
    .main>ul>li:nth-child(3)>div:nth-child(2) textarea {
        width: 22rem;
        border: 0;
        resize: none;
        overflow: hidden;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        padding-left: 0;
    }
    
    .main>ul>li>div:nth-child(2) {
        width: calc(100vw - 11rem);
        /*border: 1px solid red;*/
    }
    
    .main>ul>li>div:nth-child(2) input {
        border: 0;
        padding: 0;
        font-size: 1.2rem;
    }
    
    .addBut {
        width: 100%;
        height: 4.3rem;
        margin-top: 9rem;
        overflow: hidden;
    }
    
    .addBut>div {
        margin: 0 auto;
        width: 95%;
        background-color: #1aac19;
        height: 100%;
        line-height: 4.3rem;
        color: #fff;
        font-size: 1.4rem;
        text-align: center;
        border-radius: 0.2rem;
    }
    
    .bounce-enter-active {
        transition: all 0.7s ease;
    }
    
    .bounce-enter,
    .bounce-leave-active {
        transform: translateY(30px);
        opacity: 0;
    }
</style>