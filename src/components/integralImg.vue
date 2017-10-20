<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <transition name="bounce">
        <div id="app" class="integralImg">
            <img :src="img | imgUrlFun" alt="">
        </div>
        <div v-show="isLoad" class="loadIng">
            <mt-spinner type="fading-circle" color="rgb(42, 83, 205)"></mt-spinner>
        </div>
    </transition>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import { Toast } from 'mint-ui';
    require("../../API/config.js");
    export default {
        name: 'integralImg',
        data() {
            return {
                img: '',
                isLoad: false
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
                    return '无'
                }
            },
            numFun: function (val) {
                return val.toFixed(2);
            }
        },
        computed: mapState(['interagsObj']),
        created: function () {
            var self = this
            self.isLoad = true
            if (sessionStorage.openedintegralImg) {
                var idStr = localStorage.getItem('Imgid')
                self.interagsObj.id = idStr
            } else {
            }
            sessionStorage.setItem('openedintegralImg', 'true');
            
            self.$emit('appchildsay', 'integralImg');

            self.getIntegralDetails({
                id: self.interagsObj.id
            }).then((data) => {
                self.isLoad = false
                if (data.data.code == "0") {
                    self.img = data.data.data.contentImg
                } else if (data.data.code == "404") {

                } else {
                    Toast({
                        message: '获取详情错误',
                        className: 'toastLoad'
                    });
                }
            }).catch(msg => {
                console.log(msg)
                self.isLoad = false
                Toast({
                    message: '服务器错误',
                    className: 'toastLoad'
                });
            })
        },
        beforeDestroy: function () {
            sessionStorage.removeItem('openedintegralImg');
        },
        beforeDestroy: function () {
        },
        methods: {
            ...mapActions(['getIntegralDetails'])
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
        /*height: 100vh;*/
        overflow-y: scroll;
    }
    
    .integralImg img {
        width: 100%;
        height: 100%;
    }
    
    .bounce-enter-active {
        transition: all 0.7s ease;
    }
    
    .bounce-enter,
    .bounce-leave-active {
        transform: translateX(30px);
        opacity: 0;
    }
</style>