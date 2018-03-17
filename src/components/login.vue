<template>
    <div class="cms-login--wrap">
        <el-row class="fheight" type="flex" justify="center" align="middle">
            <el-col :span="12">
                <trans-fade-left>
                    <el-form class="cms-login--form" 
                    :model="loginInfo" 
                    :rules="rules" 
                    status-icon ref="login" 
                    :status-icon="false"
                    :show-message="false">
                        <el-form-item >
                            <h2 class="cms-login--titile">lighter 后台管理登录</h2>
                        </el-form-item>
                        <el-form-item class="cms-login--input" prop="name">
                            <el-input v-model="loginInfo.name" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item class="cms-login--input" prop="pass">
                            <el-input type="password" v-model="loginInfo.pass" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button class="cms-login--submit" @click="onSubmit" type="primary">登录</el-button>
                        </el-form-item>
                    </el-form>    
                </trans-fade-left>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import transFadeLeft from './transition/fadeleft.vue'
    import {mapActions} from 'vuex'
    export default{
        name:'login',
        components:{transFadeLeft},
        data(){
            return{
                loginInfo:{
                    name:'',
                    pass:''
                },
                rules:{
                    name:{required:true,trigger:'blur'},
                    pass:{required:true,trigger:'blur'}
                },
                requestUrl:'http://127.0.0.1:3000/upload/login'
            }
        },
        methods:{
            ...mapActions(['login']),
            onSubmit(){
                const validate = async ()=>{
                    try{
                        await this.validate();
                        this.post();
                    }catch(e){
                        console.log(e)
                        return
                    }
                }
                validate();
            },
            validate(){
                return new Promise((reslove,reject)=>{
                    this.$refs['login'].validate((validate)=>{
                        if(validate) reslove();
                        else reject();
                    })
                })
            },
            post(){
                const userName = this.loginInfo.name;
                const pass = this.loginInfo.pass;
                let info = {
                    userName:userName,
                    pass:pass
                };
                this.http(JSON.stringify(info));
            },
            http(datas){
                const _this = this;
                _this.$http({
                    method:'post',
                    url:_this.requestUrl,
                    timeout:5000,
                    headers:{"Content-Type":"application/json"},
                    data:datas
                }).then((res)=>{
                    console.log('res',res)
                    let datas = res.data;
                    console.log('da',datas.success)
                    if(res.status === 200 && datas.success === "true" && datas.token){
                        _this.reqSuccess(datas);
                    }else{
                        _this.reqFailed(datas);
                        return
                    }
                }).catch((err)=>{
                    _this.reqFailed(err);
                    console.log('err',err)
                })
            },
            reqSuccess(data){
                this.login(data);
            },
            reqFailed(data){
                const message = data.message;
                this.onError(message);
            },
            onError(message){
                this.$message({
                    showClose:true,
                    center:true,
                    message:message,
                    type:'error',
                    duration:2000
                });
                               
            }
        },
        computed:{
            getInfoKeys(){
                return this.$store.getters.getInfo;
            }
        }
    }
</script>
<style >
    .cms-login--wrap{
        height: calc(100vh - 120px);
    }
    .cms-login--form{
        width: 40%;
        margin: 0 auto;
        padding: 10%;
        border-radius: 4px;
        box-shadow: 0 0 1px 1px #eee;
        transition: background .3s linear;
    }
    .cms-login--form:hover{
        background: #eee;
    }
    .cms-login--titile{
        color: #409eff;
    }
    .cms-login--input{
        margin-bottom: 30px;
    }
</style>