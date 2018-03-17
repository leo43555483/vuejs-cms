<template>
    <span class="cms-upload--edit">
        <i @click="handleClick" class="cms-edit--delet el-icon-delete"></i>
    </span>
</template>
<script>
    export default{
        name:'editButton',
        data(){
            return{}
        },
        props:{
            onClick:{
                type:Function,
                required:true
            }
        },
        methods:{
            handleClick(e){
                const onClick = this.onClick;
                if(onClick) onClick(e)
                else throw new Error('have no handleClick functions');
            }
        }
    }
</script>
<style>
   .cms-upload--edit,.cms-upload--edit::before{
        opacity: 0;
    }
    .cms-upload--edit::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.8);
        transition: all linear .4s; 
    }
    .cms-upload--edit:hover,.cms-upload--edit:hover::before{
        opacity: 1;
    }
    .cms-edit--delet{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
        color: #fff;
        font-size: 32px;
    }
</style>