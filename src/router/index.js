import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Main from '@/components/main'
import Home from '@/components/Home'
import RegisterUser from '@/components/registeruser'
import UpLoadPage from '@/components/uploadpage'
import HandlePic from '@/components/handlepic'
import store from '../../store/index.js'
import bus from '@/bus.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: "active",
  routes: [{
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
          name: 'Home',
          path: 'home',
          component: Home
        },
        {
          name: 'RegisterUser',
          path: 'register',
          component: RegisterUser
        },
        {
          name: 'UpLoad',
          path: 'upload',
          component: UpLoadPage
        },
        {
          name: 'HandlePic',
          path: 'handlepic',
          component: HandlePic
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' ) {
    const state = store.state;
    const exp = state.userInfo.expires;
    const isLogin = state.isLogin;
    if (Date.now() > exp || !isLogin) {
      bus.$emit('onLogOut');
    } else {
      next();
    }
  }else{
    next();
  }

})
export default router
