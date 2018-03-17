<template>
  <el-container>
    <el-header class="csm-header-wrap">
      <cms-header></cms-header>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>
      <cms-footer></cms-footer>
    </el-footer>
  </el-container>
</template>

<script>
import CmsHeader from'./components/cmsheader'
import CmsFooter from'./components/cmsfooter'
import {mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  name: 'App',
  components:{
    CmsHeader,
    CmsFooter
  },
  data(){
    return{
      checkUrl:'http://127.0.0.1:3000/upload/login'
    }
  },
  methods:{
    ...mapActions(['login']),
    ...mapGetters({storeInfo:'getInfo'}),
    ...mapMutations({logout:'_LOGOUT_'}),
    checkToken(){
      const _this = this;
      let token = _this.getToken();
      if(token){
        this.postToken(token)
      }else{
        this.checkFail();
      }
    },
    getToken(){
      const token = this.storeInfo.token?this.storeInfo.token:window.localStorage.getItem('token');
      return token
    },
    postToken(token){
      const _this = this;
      _this.$http({
          method:'post',
          timeout:2000,
          headers:{"x-access-token":`${token}`},
          url:_this.checkUrl
        }).then((res)=>{
          console.log('res',res)
          if(res.status === 200 && res.data.success) _this.checkSuccess(res.data);
          else _this.checkFail();
          
        }).catch(()=>{
          _this.checkFail();
        });
    },
    checkSuccess(data){
      this.login(data);
    },
    checkFail(){
      this.logout();
      this.$router.push({name:'Login'});
    }
  },
  created(){
    this.checkToken();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
