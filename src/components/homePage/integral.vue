<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="integral">
        <div class="main">
            <div class="mainUl">
                <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="(item,index) in items" @touchstart="shopListTouchstart($event)" @touchend="shopListTouchend($event,index)">
                        <div class="cont">
                            <div>
                                <img :src="item.icon | imgUrlFun" alt="">
                            </div>
                            <div class="contRight">
                                <div>{{item.pname | strStrFun}}</div>
                                <div>剩余：{{item.inventory | strFun}}</div>
                                <div>
                                    <div>
                                        <img src="/static/img/积分.png" alt="">
                                        <small>{{item.scores | strFun}}</small>
                                    </div>
                                    <div @touchstart.stop="conveListTouchstart($event)" @touchend.stop="conveListTouchend($event,index)">
                                        立即兑换
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li id="orderLi" v-show="isNullLi">
                        <div id="orderLiImg">
                            <img src="/static/img/暂无数据.png" alt="">
                        </div>
                        <div id="orderLiNull">
                            暂无记录
                        </div>
                    </li>
                </ul>
            </div>
            <div class="mainDian">

            </div>
            <div v-show="isLoad" class="loadIng">
                <mt-spinner type="fading-circle" color="rgb(42, 83, 205)"></mt-spinner>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import { Toast } from 'mint-ui';
    require("../../../API/config.js");
    export default {
        name: 'integral',
        data() {
            return {
                isNullLi: true,
                startTouchY: 0,
                startTouchYShop: 0,
                items: [
                ],
                isLoad: true,
                loading: true
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
                return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute;
            },
            // 图片过滤
            imgUrlFun: function (val) {
                if (val) {
                    return "http://" + global.logZSIp + ":" + global.logFileport + "/files" + val
                } else {
                    return "/static/img/errimg.png"
                }
            },
            strFun: function (val) {
                if (val) {
                    return val
                } else {
                    return '0'
                }
            },
            strStrFun: function (val) {
                if (val) {
                    return val
                } else {
                    return '无'
                }
            },
            numFun: function (val) {
                return val.toFixed(2);
            }
        },
        computed: mapState(['regUserObj', 'interagsObj']),
        created: function () {
            var self = this
            self.isLoad = true
            if (sessionStorage.openedintegral) {
                var idStr = localStorage.getItem('id')
                self.regUserObj.id = idStr
            } else {
            }
            sessionStorage.setItem('openedintegral', 'true');
            self.$emit('childsay', 'integral');
            self.getIntegralList({
                page_no: 1
            }).then((data) => {
                console.log(data)
                if (data.data.code == "200") {
                    self.isLoad = false
                    self.items = data.data.data
                    if (data.data.data.length > 0) {
                        self.isNullLi = false
                    } else {
                        self.isNullLi = true
                    }
                } else {
                    self.isNullLi = true
                }
            }).catch(msg => {
                // alert(JSON.stringify(msg))
                self.isLoad = false
                Toast({
                    message: '服务器错误',
                    className: 'toastLoad'
                });
            })
        },
        beforeDestroy: function () {
            sessionStorage.removeItem('openedintegral');
        },
        methods: {
            // 上拉刷新
            loadMore() {

            },
            // 兑换积分
            conveListTouchstart(event, index) {
                this.startTouchY = event.changedTouches[0].clientY
            },
            conveListTouchend(event, index) {
                var self = this
                var distance = event.changedTouches[0].clientY - this.startTouchY
                if (15 > distance && distance > -15) {
                    console.log('兑换积分', index)
                    // self.regUserObj.id->402881925c1f9366015c1facec9a0002
                    self.getIntegralExchange({
                        consumerId: self.regUserObj.id,
                        productId: self.items[index].id
                    }).then((data) => {
                        console.log(data)
                        if (data.data.code == "200") {
                            Toast({
                                message: '兑换成功',
                                className: 'toastLoad'
                            });
                        } else if (data.data.code == "1002") {
                            Toast({
                                message: '积分不足，请加油吧',
                                className: 'toastLoad'
                            });
                        } else if (data.data.code == "1003") {
                            Toast({
                                message: '收获地址没有填写',
                                className: 'toastLoad'
                            });
                        } else {
                            Toast({
                                message: '兑换错误',
                                className: 'toastLoad'
                            });
                        }
                    }).catch(msg => {
                        console.log(msg)
                        Toast({
                            message: '服务器错误',
                            className: 'toastLoad'
                        });
                    })
                }
            },
            // 商城详情
            shopListTouchstart(event, index) {
                this.startTouchYShop = event.changedTouches[0].clientY
            },
            shopListTouchend(event, index) {
                var self = this
                var distance = event.changedTouches[0].clientY - this.startTouchYShop
                if (15 > distance && distance > -15) {
                    console.log('商城详情', index)
                    self.$router.push({
                        path: '/integralImg'
                    })
                    self.interagsObj.id = self.items[index].id
                    localStorage.setItem('Imgid', self.items[index].id)
                }
            },
            ...mapActions(['getIntegralList','getIntegralExchange'])
        }
    }

</script>

<style scoped>
    .loadIng {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        z-index: 1000000000;
        justify-content: center;
    }
    
    #app {
        background-color: #f5f5f6;
        overflow-x: hidden;
        height: 100vh;
    }
    
    .mainUl>ul>li {
        height: 12rem;
        width: 100%;
        margin-bottom: 1rem;
        background-color: #f5f5f6;
    }
    
    .cont {
        overflow: hidden;
        margin: 0 auto;
        height: 100%;
        width: calc(100vw - 1.5rem);
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .cont>div:nth-child(1) {
        margin-left: 0.5rem;
        width: 10.5rem;
        height: 10.5rem;
        border-radius: 0.2rem;
        overflow: hidden;
    }
    
    .cont>div:nth-child(1) img {
        width: 100%;
        height: 100%;
    }
    
    .contRight {
        height: 100%;
        width: calc(100vw - 14.5rem);
    }
    
    .contRight>div {
        width: 100%;
        font-size: 1.2rem;
    }
    
    .contRight>div:nth-child(1) {
        width: calc(100vw - 16.5rem);
        height: 4rem;
        line-height: 2rem;
        margin-top: 0.7rem;
        overflow: hidden;
        color: #303030;
    }
    
    .contRight>div:nth-child(2) {
        height: 2.8rem;
        color: #b8b8b8;
        line-height: 2.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .contRight>div:nth-child(3) {
        margin-top: 0.8rem;
        border: 1px solid #8dd68c;
        height: 2.6rem;
        width: 17rem;
        display: flex;
    }
    
    .contRight>div:nth-child(3)>div {
        width: 50%;
        height: 100%;
    }
    
    .contRight>div:nth-child(3)>div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .contRight>div:nth-child(3)>div:nth-child(1) img {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 0.5rem;
    }
    
    .contRight>div:nth-child(3)>div:nth-child(1) small {
        font-size: 1.2rem;
        color: #000;
    }
    
    .contRight>div:nth-child(3)>div:nth-child(2) {
        background-color: #1aac19;
        color: #fff;
        font-size: 1.2rem;
        line-height: 2.6rem;
        text-align: center;
    }
    
    .mainDian {
        height: 4.5rem;
    }
    
    #orderLi {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 25rem;
        background-color: #f5f5f6;
        border: 0;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
    }
    
    #orderLiImg {
        height: 11rem;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 6.3rem;
        align-items: center;
    }
    
    #orderLiImg img {
        width: 11rem;
        height: 11rem;
    }
    
    #orderLiNull {
        margin-top: 3.5rem;
        width: 100%;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        font-size: 3rem;
        color: #bababa;
    }
</style>