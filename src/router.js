/**
 * Created by LangK on 2016/12/19.
 */

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    redirect: '/home/integral'
  },
  {
    // 我的好友界面
    path: '/friendM',
    component: function (resolve) {
      require(['./components/friendM.vue'], resolve)
    }
  },
  {
    // 我的好友界面
    path: '/friendT',
    component: function (resolve) {
      require(['./components/friendT.vue'], resolve)
    }
  },
  {
    // 我的好友界面
    path: '/integralImg',
    component: function (resolve) {
      require(['./components/integralImg.vue'], resolve)
    }
  },
  {
    path: '/site',
    component: function (resolve) {
      require(['./components/site.vue'], resolve)
    }
  },
  {
    path: '/home',
    component: function (resolve) {
      require(['./components/home.vue'], resolve)
    },
    children: [
      {
        path: 'integral',
        component: function (resolve) {
          require(['./components/homePage/integral.vue'], resolve)
        }
      },
      {
        path: 'homepage',
        component: function (resolve) {
          require(['./components/homePage/homepage.vue'], resolve)
        }
      }
    ]
  }

]
