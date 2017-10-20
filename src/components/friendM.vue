<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <transition name="bounce">
        <div id="app" class="contacts">
            <div class="main">
                <div>
                    <ul>
                        <li class="nameLi" v-for="(item,ind) in lists">
                            <div>
                                <div>
                                    <img :src="item.avatar | imgUrlFun" width="32" height="32" alt="">
                                </div>
                                <div>
                                    {{item.nickName}}
                                </div>
                            </div>
                            <div>
                                <div>积分：</div>
                                <div>{{item.scores}}</div>
                            </div>
                        </li>
                        <li id="orderLi" v-show="orderLi">
                            <div id="orderLiImg">
                                <img src="/static/img/暂无数据.png" alt="">
                            </div>
                            <div id="orderLiNull">
                                暂无记录
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'contacts',
        data() {
            return {
                lists: [
                ],
                orderLi: true,
                isLoad: false
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
            if (sessionStorage.openedfriendM) {
                var idStr = localStorage.getItem('selfCo')
                self.regUserObj.selfCode = idStr
                console.log('窗口是刷新页面,不是新打开')
            } else {
                console.log('窗口是新打开')
            }
            sessionStorage.setItem('openedfriendM', 'true');
            self.$emit('appchildsay', 'friendM');
            // self.regUserObj.id->402881925c1f9366015c1facec9a0002
            self.getFriendMList({
                selfCode: self.regUserObj.selfCode,
                pageno: '1'
            }).then((data) => {
                console.log(data)
                if (data.data.code == "200") {
                    self.orderLi = false
                    self.lists = data.data.data
                } else if (data.data.code == '404') {
                    self.lists = []
                    self.orderLi = true
                } else {
                    self.orderLi = true
                }
            }).catch(msg => {
                console.log(msg)
                Toast({
                    message: '服务器错误',
                    className: 'toastLoad'
                });
            })
        },
        beforeDestroy: function () {
            sessionStorage.removeItem('openedfriendM');
        },
        methods: {
         ...mapActions(['getFriendMList'])
        }
    }

</script>

<style scoped>
    #app {
        background-color: #f5f5f6;
        overflow-x: hidden;
        height: 100vh;
        width: 100vw;
    }
    
    .main {
        background-color: #f5f5f6;
    }
    
    .oneInd {
        background-color: #f5f5f5;
        height: 2rem;
        line-height: 2rem;
        color: #9d9d9d;
        padding-left: 1.3rem;
    }
    
    .nameLi {
        height: 5rem;
        border-bottom: 1px solid #f7f7f7;
        background-color: #fff;
        line-height: 5rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .nameLi div {
        font-size: 1.2rem;
        color: #525252;
    }
    
    .nameLi>div:nth-child(1) {
        display: flex;
        align-items: center;
        margin-left: 1.5rem;
    }
    
    .nameLi>div:nth-child(1)>div:nth-child(1) {
        width: 3.2rem;
        height: 3.2rem;
    }
    
    .nameLi>div:nth-child(1)>div:nth-child(1) img {
        width: 100%;
        height: 100%;
    }
    
    .nameLi>div:nth-child(1)>div:nth-child(2) {
        margin-left: 1.5rem;
    }
    
    .nameLi>div:nth-child(2) {
        margin-right: 0.5rem;
        display: flex;
        align-items: center;
        min-width: 9rem;
    }
    
    .nameLi>div:nth-child(2)>div:nth-child(1) {
        width: 3.7rem;
    }
    
    .nameLi>div:nth-child(2)>div:nth-child(2) {
        width: 5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .bounce-enter-active {
        transition: all 0.7s ease;
    }
    
    .bounce-enter,
    .bounce-leave-active {
        transform: translateX(30px);
        opacity: 0;
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
</style>