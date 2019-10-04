<template>
    <footer>
        <p>© ttc0702 2019</p>
    </footer>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

<style scoped lang='less'>
    @import "../assets/base.less";

    footer {
        background: #d7d7d7;
        color: #666;
        font-size: 13px;
        padding: 10px;
        text-align: center;
    }

    p:hover {
        color: #333;
    }

</style>
