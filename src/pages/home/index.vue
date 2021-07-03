<template>
    <div class="home-wrapper">
        <hello-world :text="text"></hello-world>
    </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
export default {
    name: 'home',
    components:{
        HelloWorld
    },
    data(){
        return {
            text: 'Welcome to home page',
        }
    }
}
</script>

<style lang='scss' scoped>

</style>