<template>
    <transition
    appear
    appear-class="fade-left-enter"
    appear-active-class="fade-left-enter-active">
        <slot></slot>
    </transition>
</template>
<script>
    import '@/assets/less/transition.less'
    export default{
        name:'transition-fade-left',
        data(){
            return{}
        }
    }
</script>