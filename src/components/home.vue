<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div id="app" class="home">
        <div class="main">
            <div class="view">
                <transition name="bounce">
                    <router-view @childsay="listenToMyBoy" keep-alive></router-view>
                </transition>
            </div>
            <div class="strutTab">
            </div>
            <div class="tabBar" v-bind:style="{position: fixedStr}">
                <ul>
                    <li v-for="(tabBar,index) in tabBars" @touchstart="tbbarStart($event,index)" :class="{selectBar:isSelectBar == index}">
                        <div>
                            <div v-if="imgG == index">
                                <img :src="tabBar.imgG" alt="">
                            </div>
                            <div v-else>
                                <img :src="tabBar.img" alt="">
                            </div>
                            <div>{{tabBar.name}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'home',
        data() {
            return {
                fixedStr: 'fixed',
                isSeekLabel: true,
                seekVal: '',
                tabBars: [
                    {
                        imgG: '/static/img/积分-绿色.png',
                        img: '/static/img/积分.png',
                        name: '积分兑换',
                        pathStr: 'integral'
                    }, {
                        imgG: '/static/img/个人中心-绿色.png',
                        img: '/static/img/个人中心.png',
                        name: '个人中心',
                        pathStr: 'homepage'
                    }],
                isSelectBar: 0,
                imgG: 0,
                isTriangle: 0
            }
        },
        computed: mapState([]),
        created: function () {
            var self = this
            var pathStr = self.$route.path.split('/')[2]
            switch (pathStr) {
                case 'homepage':
                    self.isSelectBar = 1
                    self.imgG = 1
                    break;
                case "integral":
                    self.isSelectBar = 0
                    self.imgG = 0
                    break;
                default:
                    break;
            }
        },
        methods: {
            listenToMyBoy(val) {
                var self = this
                self.$emit('appchildsay', val);
                switch (val) {
                    case 'homepage':
                        self.isSelectBar = 1
                        self.imgG = 1
                        break;
                    case "integral":
                        self.isSelectBar = 0
                        self.imgG = 0
                        break;
                    default:
                        break;
                }
            },
            tbbarStart(event, index) {
                var self = this
                self.isSelectBar = index
                self.imgG = index
                var pathStr = "/home/" + self.tabBars[index].pathStr
                self.$router.push({
                    path: pathStr
                })
            },
            ...mapActions([])
        },
        mounted() {
        }
    }

</script>
<style scoped>
    .bounce-enter-active {
        transition: all 0.7s ease;
    }
    
    .bounce-enter,
    .bounce-leave-active {
        transform: translateY(-30px);
        opacity: 0;
    }
    
    #app {
        background-color: #f5f5f6;
        overflow-x: hidden;
        height: 100vh;
    }
    
    .main {
        background-color: #f5f5f6;
    }
    
    .view {
        width: 100vw;
        height: calc(100vh - 4.5rem);
        background-color: #f5f5f6;
        overflow: hidden;
    }
    
    .strutTab {
        height: 4.5rem;
    }
    
    .tabBar {
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 4.5rem;
        border-top: 1px solid #d9d9da;
        background-color: #fff;
    }
    
    .tabBar>ul {
        display: flex;
    }
    
    .tabBar>ul>li {
        width: 50%;
        display: flex;
        height: 4.5rem;
        align-items: center;
        justify-content: center;
    }
    
    .tabBar>ul>li>div {
        width: 10rem;
        height: 100%;
        height: 4.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .tabBar>ul>li>div>div:nth-child(1) {
        width: 2.3rem;
        overflow: hidden;
    }
    
    .tabBar>ul>li>div>div:nth-child(2) {
        font-size: 1.2rem;
        overflow: hidden;
        color: #848484;
    }
    
    .tabBar>ul>li:nth-child(1)>div:nth-child(1) img {
        display: block;
        width: 1.8rem;
        height: 1.6rem;
        /*72 64 36 32 18 16*/
    }
    
    .tabBar>ul>li:nth-child(2)>div:nth-child(1) img {
        display: block;
        width: 2rem;
        height: 1.95rem;
        /*80 78 40 39 20 19.5 */
    }
    
    .tabBar>ul .selectBar div:nth-child(2) {
        color: #1aac19;
    }
</style>