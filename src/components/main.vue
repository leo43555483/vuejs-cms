<template>
  <div class="main">
    <el-row class="cms-nav--wrap" type="flex" justify="center">
      <el-col>
        <el-menu :default-active="onRoute" mode="horizontal" router>
          <el-menu-item index="home" >主页</el-menu-item>
          <el-menu-item index="register" >创建用户</el-menu-item>
          <el-menu-item index="upload" >上传图片</el-menu-item>
          <el-menu-item index="handlepic" >图片管理</el-menu-item>
          <el-button type="primary" class="hcenter cms-logout" @click="logout">
            <i class="cms-logout--button iconfont">&#xe66d;</i>
            注销
          </el-button>
        </el-menu>
      </el-col>
    </el-row> 
    <el-row class="cms-content" type="flex" justify="center" align="middle">
        <el-col class="cms-content--wrap">
          <router-view></router-view>
        </el-col>
    </el-row>
  </div>
  
</template>

<script>
import bus from '@/bus.js'
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to cms of gellery',
    }
  },
  methods:{
    logout(){
      this.$store.commit('_LOGOUT_');
      this.login();
    },
    clearLocalStorage(){
      window.localStorage.clear();
    },
    login(){
      this.$router.push({name:'Login'});
    },
  },
  computed:{
    onRoute(){
      return this.$route.path.replace('/','')
    }
  },
  created(){
    const _this = this;
    bus.$on('onLogOut',_this.logout);
    
    _this.$router.push({name:'Home'});

  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.cms-content--wrap{
  height: 100%;
}
.el-menu{
  width:100%;
  height: 100%;
}
.cms-logout{
  position: absolute;
  left: 90%;
  padding: 6px 8px;
  border-radius: 20px 20px;
  box-sizing:border-box;
}
.cms-logout--button{
  display: inline-block;
  vertical-align: text-bottom;
}
.cms-logout:hover{
  background: #fff;
  color: #409EFF;
}
</style>
