import Vue from 'vue'
import Vuex from 'vuex'
import router from '../src/router'
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: {
      _id: '',
      admin: false,
      userName: '',
      token: '',
      exp: 0,
    },
    isLogin: false,
  },
  mutations: {
    _LOGIN_(state) {
      state.isLogin = true;
    },
    _UPDATEINFO_(state, payload) {
      state.userInfo = payload;
    },
    _LOGOUT_(state) {
      state.userInfo = {
        _id: '',
        admin: false,
        userName: '',
        token: '',
        exp: 0,
      };
      state.isLogin = false;
      window.localStorage.clear();
    },
  },
  getters: {
    getInfo(state) {
      return state.userInfo
    },
    getStateValue(state) {
      return (key) => {
        return state[key];
      }
    }
  },
  actions:{
    // 返回数据结构为{
            //  expires,
            //  success,
            //  token,
            //  userInfo:{}
            // }
    login({commit,getters,dispatch},data){
        data = initData(data);
        commit('_LOGIN_');
        dispatch('saveInfo',data);
        router.push({name:'Home'});
        function initData(datas){
            let userInfo = getters.getInfo;
            let result = {};
            for(let key in userInfo){
                result[key] = datas[key]?datas[key]:datas.userInfo[key];//获取res中所需数据
            }
            return result
        }
    },
    saveInfo({commit,dispatch},data){
        commit('_UPDATEINFO_',data);
        if(data && window.localStorage) dispatch('saveToLocal');   
    },
    saveToLocal({state,getters}){
        let userInfo = getters.getInfo;
        for(let key in userInfo){
            window.localStorage.setItem(key,userInfo[key]);
        }

    }
  }
});

export default store
