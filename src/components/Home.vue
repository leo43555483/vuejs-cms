<template>
    <div class="cms-home--content">
        <transition
        appear
        appear-class="fade-left-enter"
        appear-active-class="fade-left-enter-active"
        >
            <p>lighter</p>
        </transition>
        <transition
        appear
        appear-class="fade-right-enter"
        appear-active-class="fade-right-enter-active"
        >
            <p>图片管理系统</p>
        </transition>
    </div>
</template>

<script>
    export default {
        name:'Home',
        data(){
            return{
                msg:'cms'
            }
        }
    }
</script>
<style>
    .cms-home--content{
        overflow-x: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform:translate(-50%,-50%);
    }
    .cms-home--content p{
        font-size: 3em;
        text-align: center;
        color: #409EFF;
        cursor: pointer;

    }
    .cms-home--content p:last-child {
        font-size: 2em;
    }


</style>