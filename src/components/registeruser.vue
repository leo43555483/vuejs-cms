<template>
    <div class="cms-register--page">
        <el-row type="flex" justify="center" :gutter="40">
            <el-col :span="3">
                <h3 class="text-center">用户头像</h3>
                <cmsUpload class="text-center"
                name="avatar"
                :handleUpLoad="handleFile"
                :uploadlist="false" 
                :customClass="['cms-avatar--upload']"
                showOnSelf
                ></cmsUpload>
            </el-col>
            <el-col :span="7">
                <h3 class="text-center">用户信息</h3>
                <el-form :model="userInfo" ref="regForm" :rules="rules" label-width="100px" status-icon>
                    <el-form-item class="cms-register__input" label="用户昵称:" prop="userName" placeholder="请输入用户昵称" inline-message>
                        <el-input v-model="userInfo.userName"></el-input>
                    </el-form-item>
                    <el-form-item class="cms-register__input" label="性别:" prop="gender" inline-message >
                        <el-select v-model="userInfo.gender" :filterable="true">
                            <el-option v-for="item in options1" :label="item.label" :value="item.value" :key="item.value" >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="cms-register__input" label="用户邮箱:" prop="email" placeholder="请输入用户邮箱" inline-message>
                        <el-input v-model="userInfo.email"></el-input>
                    </el-form-item>
                    <el-form-item  class="cms-register__input" label="个人简介:" prop="intro" placeholder="请输入个人简介" inline-message>
                        <el-input v-model="userInfo.intro"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="cms-register--submit" type="primary" @click="onSubmit">创建</el-button>
                        <el-button class="cms-register--reset" @click="onReset">重置</el-button>
                    </el-form-item>
                </el-form>
                <div class="cms-resData__wrap" >
                     <el-collapse-transition>
                        <div class="cms-resData__content" v-show="show">
                            <div class="cms-resData__line"><b>用户信息</b></div>
                            <el-col class="cms-resData__item">
                                <span>用户名:</span>
                                <span>{{resData.userName}}</span>
                            </el-col>
                            <el-col class="cms-resData__item">
                                <span>用户ID:</span>
                                <span>{{resData.userId}}</span>
                            </el-col>
                        </div>
                     </el-collapse-transition>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import cmsUpload from './upload/index.vue' 
    export default{
        name:'RegisterUser',
        components:{cmsUpload},
        data(){
            let validatorName = (rule,value,cb)=>{
                    if(!value) {
                        cb(new Error('请输入用户名'));
                    }else{
                        cb();
                    }
                }
            let validatorEmail = (rule,value,cb)=>{
                function isEmail(v){
                    let re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
                    return re.test(v)
                }
                if(!value){
                    cb(new Error('请输入电子邮箱'))
                    return
                 }else if(!isEmail(value)){
                    cb(new Error('邮箱格式有误'))
                    return
                }else{
                    cb();    
                }
                
            }
            let validatorGender = (rule,value,cb) => {
                if(!value){
                    cb(new Error('请输入性别信息'));
                }else{
                    cb();
                }
            }
            return {
                //规则属性名要与表单数据名相同
                rules:{
                      userName:{validator:validatorName,trigger:'blur'},
                      email:{validator:validatorEmail,trigger:'blur'},
                      gender:{validator:validatorGender}
                },
                options1:[{value:'male',label:'男'},{value:'female',label:'女'}],
                userInfo:{
                    userName:'',
                    gender:'',
                    email:'',
                    intro:''
                },
                show:false,
                avartar:[],
                avartarFildName:'file',
                infoFildName:'information',
                requestUrl:'http://127.0.0.1:3000/api/authorInfor',
                resData:{
                    userName:'',
                    userId:''
                }
            }
        },
        methods:{
            handleFile(file){
                let avartar = this.avartar;
                this.avartar = avartar.concat(file);
                console.log('avart',this.avartar)
            },
            onSubmit(){
                    console.log('avart',this.validateParams())
                if(this.validateParams()){
                    let formData = new FormData();
                    const userInfo = JSON.stringify(this.userInfo);
                    const avartar = this.avartar[0].data;
                    formData.append(this.infoFildName,userInfo);
                    formData.append(this.avartarFildName,avartar);
                    this.upload(formData);
                };
            },
            upload(data){
                const _this = this;
                this.$http({
                    method:'post',
                    url:_this.requestUrl,
                    withCredentials:_this.withCredentials,
                    data:data
                }).then((res)=>{
                    console.log('res',res)
                    const data =res.data;
                    let success = data.success;
                    if(success){
                        _this.handleSuccess(data.message);
                        _this.handleResData(data);
                    }else{
                        _this.handleError(data.message);
                        _this.onReset();
                    }
                }).catch((err)=>{
                    _this.handleError(err.response.data.message);
                    _this.onReset();
                })
            },
            handleResData(data){
                const info = data.data;
                this.resData.userName = info.userName;
                this.resData.userId = info.userId;
                this.show = true
            },
            validateParams(){
                const _this = this;
                let result = null;
                this.$refs['regForm'].validate((valid) => {
                    if(valid){
                        if(_this.avartar.length <= 0){
                            _this.$message({
                                showClose:true,
                                center:true,
                                message:'请上传头像',
                                type:'error',
                                duration:2000
                            });
                            result = false;
                            return 
                        }
                        result = true;
                        return 
                    }else{
                        result = false;
                        return 
                    }
                });
                console.log('result',result)
                return result
            },
            handleSuccess(message){
                this.$message({
                    showClose:true,
                    center:true,
                    message:message,
                    type:'success',
                    duration:2000
                })
            },
            handleError(message){
                this.$message({
                    showClose:true,
                    center:true,
                    message:message,
                    type:'error',
                    duration:2000
                })
            },
            onReset(){
                this.$refs['regForm'].resetFields();
            }
        }
    }

</script>

<style>

    
    .cms-register--page{
        margin: 18px 0;
    }
    .cms-avatar--upload{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid #409EFF;
        overflow: hidden;
    }
    .cms-resData__content{
        height: 80px;
    }
    .cms-resData__line{
        position: relative;
        width: 100%;
        padding:0 20px; 
        margin: 10px auto;
        color: #606266;
        font-size: 18px;
        line-height: 20px;
    }
    .cms-resData__line::after{
        content: "";
        display: block;
        position: absolute;
        margin-top: 5px;
        left: 20px;
        height: 1px;
        width: 100%;

        box-sizing: border-box;
        background:linear-gradient(90deg,rgba(0,0,0,.6) 0,rgba(0,0,0,.6) 55%,rgba(255,255,255,1) 100%);
        z-index: -1;
    }
    .cms-resData__item{
        color: #606266;
        line-height: 40px;
    }
</style>