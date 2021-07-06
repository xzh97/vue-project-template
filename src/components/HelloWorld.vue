<template>
    <div>
        <img class="default-img" :src="defaultImg" alt="">
        <p class="text">{{text}}</p>
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
.default-img{
    display: block;
    width: 100px;
    margin: 8px auto;
}
.text{
    font-size: 18px;
    text-align: center;
}
</style>