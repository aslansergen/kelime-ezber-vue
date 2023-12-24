<template>
 <div class="meaning"> {{ data.kategori }}: <span> {{ data.anlami }}</span></div>
</template>

<script>
export default {
    props: {
        data : JSON
    }
}
</script>
<style scoped>
.meaning{
    position: relative;
    width: 90%;
    text-align: center;
    text-transform: capitalize;
    font-family: 'Shadows Into Light', cursive;
    font-size: 20px;
    color:black;
    text-align: left;
    padding-left: 25px;
    display: flex;
}
.meaning span{
    color:white;
    padding-left: 15px;
}
</style>