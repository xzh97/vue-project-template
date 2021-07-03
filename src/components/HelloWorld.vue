<template>
    <div>
        <img :src="defaultImg" alt="">
        <p>{{text}}</p>
    </div>
</template>

<script>
import defaultImg from '@/assets/images/default.jpg'
export default {
    name: 'hw',
    props:{
        text: {
            type: String,
        }
    },
    data(){
        return {
            defaultImg
        }
    }
}
</script>

<style lang='scss' scoped>

</style>