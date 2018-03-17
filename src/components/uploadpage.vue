<template>
    <div id="cms-upload--content">
        <trans-fade-left>
            <div class="cms-upload--wrap">
                <el-input 
                class="cms-upload--input"
                v-model="upLoadText"
                placeholder="输入作者名称或ID">
                </el-input>
                <!-- size:图片大小限制单位m
                     onErro:错误处理钩子
                     handleUpLoad:获取上传图片的钩子
                 -->
                <cmsUpload 
                class="cms-img--upload"
                :name="uploadName" 
                :size="2" 
                :handleUpLoad="handleFile"
                uploadlist 
                describe="avatar-" 
                :onErro="handleErro"
                multiple 
                ref="upload"
                ></cmsUpload>
                <div class="csm-submit--wrap" >
                    <el-button class="csm-upload--submit" 
                    type="primary"
                    @click="submit"
                    >上传提交</el-button>
                </div>
            </div>
       </trans-fade-left>
    </div>
</template>

<script>
    import cmsUpload from './upload/index.vue'
    import transFadeLeft from './transition/fadeleft.vue'
    export default{
        name:'uploadPage',
        data(){
            return{
                uploadName:'file',
                inputName:'information',
                upLoadImgs:[],
                upLoadText:'',
                requestUrl:'http://127.0.0.1:3000/api/uploadPhoto',
                uploadInfo:{
                    author:'',
                    mapImg:[]
                }, //图片上传的作者以及图片id名称映射
                withCredentials:true
            }
        },
        components:{
            cmsUpload,
            transFadeLeft
        },
        methods:{
            handleFile(file){
                this.upLoadImgs = [].concat(file);
            },
            submit(){
                let formData = new FormData();
                let uploadInfo = this.uploadInfo;
                if(this.upLoadText === '' || this.upLoadImgs.length === 0){
                    this.handleErro('作者名或者图片不能为空');
                    return
                }
                this.upLoadImgs.forEach((file,i)=>{
                    let info = {};
                    info[file.data.name] = file.id;
                    formData.append(this.uploadName,file.data);
                    uploadInfo.mapImg.push(info);

                });
                uploadInfo.author = this.upLoadText;
                formData.append(this.inputName,JSON.stringify(uploadInfo));
                this.upload(formData);
            },
            upload(file){
                console.log('uploadfile',this.upLoadImgs)
                this.$http({
                    method:'post',
                    url:this.requestUrl,
                    data:file
                }).then((res)=>{
                    let resData = res.data;
                    console.log('res',res)
                    let uploadFile = this.upLoadImgs;
                    let uploadComponent = this.$refs['upload'];
                    let flen = resData.failData.length;
                    const message = resData.message;
                    if(!resData.success) {

                        message && this.handleErro(message);
                    }
                    if(flen === 0) {
                        uploadComponent.clearFiles();
                        message && this.handRight(resData.message);
                    }else if(flen > 0){
                        let failData = resData.failData;
                        let getFile = this.getFile(failData);
                        message && this.handleErro(message);
                        for(let i = 0,len = uploadFile.length; i < len ; i++){ //遍历上传失败的图片id

                            let result = getFile(uploadFile[i].data.name);
                            if(result) uploadComponent.removeFile(uploadFile[i],1); //删除上传成功的图片
                        }
                    }
                });
            },
            getFile(resFail){
                return (id)=>{
                    let result = resFail.forEach((imgId,i)=>{
                       return imgId.originalname === id?img:null;
                    });
                    return result 
                }
            },
            handleErro(info){
                const _this = this;
                if(Array.isArray(info) || info instanceof Array) {
                    erroArray(info);
                    return
                }else if(typeof info === "string"){
                    errMessage(info);
                }
                function erroArray(info){
                    info.forEach((file,i)=>{
                        errNotify(file.errInfo);
                    })
                }
                function errNotify(info){
                    _this.$notify({
                        title:'错误',
                        message:info,
                        type:'error'
                    })
                }
                function errMessage(info){
                    _this.$message({
                        showClose:true,
                        message:info,
                        duration:2000,
                        type:'error',
                        center:true
                    });
                }
            },
            handRight(info){
                this.$message({
                    showClose:true,
                    message:info,
                    duration:2000,
                    type:'success',
                    center:true
                })
            }

        }
    }
</script>
<style>
    .cms-img--upload{
        margin: 16px 0;
    }
    .cms-upload--wrap{
        position: relative;
        height: 100%;
    }
    .cms-upload--input{
        width: 180px;
        margin: 16px 0;
    }
    .cms-upload--wrap{
        height: 100%;
    }
    #cms-upload--content{
        height: 100%;
    }
</style>