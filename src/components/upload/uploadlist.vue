<template>
    <transition-group
    tag="ul"
    v-if="uploadlist" 
    class="cms-upload--list"
    name="cms-list"
    >
        <li class="cms-uploadlist-item" 
        v-for="(file,index) in uploadFile"
        :key="index"
        >   
            <editButton :onClick="(file)=> removeImg(file,1)" ></editButton>
            <img 
            :src=" file.data | createUrl"
            class="cms-upload--img" 
            >
        </li>
    </transition-group>
</template>
<script>
    import editButton from '../common/editbutton.vue'
    import { createUrl } from './filter.js'
    export default{
        name:"upLoadList",
        data(){
            return {

            }
        },
        components:{ editButton },
        props:{
            uploadFile:Array,
            uploadlist:Boolean
        },
        methods:{
            removeImg(file,count){
                this.$emit('remove',file,count)
            }
        },
        filters:{
            createUrl(file){
                return createUrl(file)
            }
        }
    }
</script>

<style>
    .cms-upload--list{
        display: inline;
        list-style: none;
        padding: 0;
        vertical-align: middle;
    }
    .cms-uploadlist-item{
        position: relative;
        display: inline-block;
        height: 180px;
        width: 180px;
        border: 1px solid #409EFF;
    }
    .cms-upload--img{
        vertical-align: middle;
        width: 100%;
        height: 100%;
    }
    .cms-list-enter,.cms-list-leave-to{
        opacity: 0;
    }
    .cms-list-enter-active,.cms-list-leave-active{
        transition: all .4s ease-in-out;
    }
</style>