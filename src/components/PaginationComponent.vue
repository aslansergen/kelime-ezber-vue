<template>
    <div class="w-100">
        <button @click="firstPage" v-if="firstPageButton" class="btn">
            <i class="fas fa-angle-double-left">l</i>
        </button>
        <button v-for="item in buttons" @click="newPage(item.value)" 
        class="mr-2 me-2"
        :class="item.value === activePage ? 'btnActive':'btn' "
        >{{item.text}} </button>
        <button @click="lastPage" v-if="lastPageButton" class="btn">
            <i class="fas fa-angle-double-right">r</i>
        </button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selectBoxStatus : false,
            totalPageCount : null,
            buttons : [],
            buttonsLength : 5,
            activePage : 0,
        }
    },
    methods : {
        firstPage: function(){
            this.$emit('newpage', 0);
            this.activePage = 0;
            this.creatingButtons();
        },
        lastPage: function(){
            this.$emit('newpage', this.totalPageCount-1);
            this.activePage = this.totalPageCount-1;
            this.creatingButtons();
        },
        newPage: function(page){
            if(page !== this.activePage){
                this.$emit('newpage', page);
                this.activePage = page;
            }
        },
        buttonsCreated: function(start,end){
            this.buttons = [];
            for (let i = start; i < end ; i++) {
                this.buttons = [...this.buttons,{
                    text : i+1,
                    value : i
                }] 
            }
        },
        creatingButtons: function(){
            if(this.totalPageCount < 5 ){
                 this.buttonsCreated(0,this.totalPageCount);
            }else if(this.activePage+1  == this.totalPageCount){
                this.buttonsCreated(this.activePage-4,this.totalPageCount)
            }else if(this.activePage+2  == this.totalPageCount){
                this.buttonsCreated(this.activePage-3,this.totalPageCount)
            }else if(this.activePage+1 > 3){
                this.buttonsCreated( this.activePage-2, this.activePage+3);
            }else{
                this.buttonsCreated(0,5)
            }
        },
        renderPages: function(){
            this.activePage = this.data.page;
            this.totalPageCount = this.data.totalPageCount;
            this.creatingButtons();
        }
    },
    computed: {
        firstPageButton: function(){
            if(this.buttons.length === 0){
                return false
            }else {
                if(this.buttons[0].value > 0){
                    return true
                }else{
                    return false
                }
            }
        },
        lastPageButton: function(){
            if(this.buttons.length === 0 || this.buttons.length < 5){
                return false;
            }else {
                if(this.buttons[4].value < this.totalPageCount-1){
                    return true
                }else{
                    return false
                }
            }
        }
    },
    watch: {
        data: function () {
            this.renderPages();
        },
    },
    props:{
        data:{
            type :[ Object],
            required : true
        },
    },
    created: async function () {
        this.renderPages();
    }
}

</script>
<style scoped>
.w-100{
    width: 100%;
}
.mr-2,
.me-2{
    margin: 0 15px;
}
.btn,
.btnActive{
    padding: 4px;
    background-color: transparent;
    border: 1px solid white;
    color: white;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    transition: .3s ease;
}
.btn:hover{
    color: #47BAEA;
    background-color: white;
}
.btnActive{
    color: white;
    background-color: #47BAEA;;
}
</style>