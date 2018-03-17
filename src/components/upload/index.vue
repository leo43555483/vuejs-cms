<template>
    <div class="">
        <upLoadList :uploadFile="uploadFile" ref="input" :uploadlist="uploadlist" v-on:remove="removeFile"></upLoadList>  
        <div class="cms-uploadItem--default" :class="handleClass?handleClass:'cms-uploadfile'">
            <i class="el-icon-plus cms-upload--plus"></i>
            <input 
            @change="handleChange"
            class="transparency cms-upload--button" 
            type="file" 
            ref="input"
            :multiple="multiple" 
            accept="image/jpg,image/jpeg,image/gif,image/png">
            <div class="cms-avatar" v-if="showOnSelf && uploadFile.length > 0 ">
                <img class="cms-avatar--img" :src=" uploadFile[0].data | createUrl">
                <editButton :onClick="handleRemove"></editButton>
            </div>
        </div>
    </div>
</template>
<script>
    import upLoadList from './uploadlist.vue'
    import { createUrl } from './filter.js'
    import editButton from '../common/editbutton.vue'
    export default{
        name:'cmsUpload',
        props:{
            uploadlist:{
                type:Boolean,
                default:true
            },
            multiple:Boolean,
            name:{
                type:String,
                required:true  
            },
            handleUpLoad:Function,
            limit:Number,
            size:Number,
            onErro:Function,
            describe:String,
            reqUrl:String,
            onSubmit:Boolean,
            itemWidth:String,
            itemHeight:String,
            customClass:Array,
            showOnSelf:{
                type:Boolean,
                default:false
            },
            multiple:{
                type:Boolean,
                default:false
            }
        },
        components:{
            upLoadList,
            editButton           
        },
        data(){
            return {
                uploadFile:[],
                legalExt:/\w+([.jpg|.png|.jpeg|.gif|.swf|.bmp]){1}$/
            }
        },
        filters:{
            createUrl(file){
                return createUrl(file)
            }
        },
        methods:{
            handleChange(e){
                let files = e.target.files;
                if(this.limit && files.length + uploadFile.length > this.limit){
                    this.onErro('limitErro');
                    return 
                }
                if(!this.multiple || this.showOnSelf) {
                    files = Array.prototype.slice.call(files).slice(0,1);
                }
                let rfiles = this.handleImg(files);
                console.log('rf',rfiles)
                if(rfiles.illegalFile && rfiles.illegalFile.length > 0){
                    this.onErro(rfiles.illegalFile);
                }
                this.uploadFile = this.uploadFile.concat(rfiles.legalFile);
                rfiles = null;

            },
            handleImg(file){
                let illegal = [];
                let legal = [];
                for(let item in file){
                    if(file[item].type){
                       let img = file[item];
                       let oFile = {
                            id:Date.now() + '-' + img.name,
                            data:img
                       };
                       if(this.isExist(img)){
                            handleErro(oFile,'上传图片不能重名');
                            continue                            
                       }
                        
                       if(!this.isImg(img)){
                            handleErro(oFile,'上传文件必须为图片');
                            continue  
                       }
                       if(this.size && (img.size/1024/1024) > this.size){
                            handleErro(oFile,`图片不超过${this.size}m`);
                            continue  
                       }
                       legal.push(oFile);
                    }
                       
                }
                function handleErro(img,info){
                    console.log('info',info)
                    img.errInfo = info;
                    illegal.push(img);
                }
               return {
                    legalFile:legal,
                    illegalFile:illegal
               }
            },
            isImg(img){
                let a = img.type.split('/');
                let extName = a[a.length-1];
                return this.legalExt.test(extName)
            }, 
            isExist(img){
                let uploadFile = this.uploadFile;
                if(uploadFile.length === 0 ) return false;
                else return uploadFile.some((file,i)=>{
                        return file.data.name === img.name
                    });
                    
            },
            removeFile(img,count){
                let files = this.uploadFile;
                files.splice(files.indexOf(img),count); 
                this.$refs.input.value = '';
            },
            clearFiles(){
                this.uploadFile = [];
                
            },
            handleRemove(){
                let img = this.uploadFile[0];
                this.removeFile(img,1)
            }
        },
        computed:{
            handleClass(){
                let customClass = this.customClass;
                if(customClass){
                    return [...customClass]
                }
            }
        },
        watch:{
            uploadFile:function(newValue,oldValue){
                if(this.handleUpLoad){
                    this.handleUpLoad(newValue)
                }
            }
        }
    }
</script>
<style>
    .cms-upload--wrap{
        position: relative;
        height: 100%;
    }
    .cms-uploadItem--default{
        display: inline-block;
        position: relative;
        vertical-align: middle;
    }
    .cms-uploadfile{
        height: 180px;
        width: 180px;
        border: 1px solid #409EFF;
        
    }
    .cms-upload--plus{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        font-size: 32px;
        color: #409EFF;

    }
    .cms-upload--button {
        width: 100%;
        height: 100%;
    }
    .csm-upload--submit{
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
    }
    .csm-submit--wrap{
        overflow:hidden;
    }
    .cms-avatar{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .cms-avatar--img{
        width: 100%;
        height: 100%;
    }
</style>