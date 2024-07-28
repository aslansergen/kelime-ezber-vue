<template>
    <UserLinkComponent />
    <SearchComponent />
    <h1>Ezberlenen Kelimeler {{ smileCategoryTotalNumber }}</h1>
    <div class="content" v-if="show">
        <img v-if="!hideDisplayedWord" class="wordImage" :src="showWord.resimYol">
        <img @click="wordEditPage" class="editButton" src="../../public/edit.svg">
        <span @click="hideDisplayedWord = !hideDisplayedWord" class="eyeButton">
            <img v-if="!hideDisplayedWord" src="../../public/eye.svg">
            <img v-if="hideDisplayedWord" src="../../public/eye-slash.svg">
        </span>
        <div class="word">
            <span>{{showWord.kelime}} </span>
            <div class="wordReading"> ( {{showWord.okunus}} )</div>
        </div>
        <div v-if="!hideDisplayedWord" class="wordMeaning">
            <wordMeaning v-for="word in wordMeaningData" :data="word"></wordMeaning>
        </div> 
         
        <div class="button-container">
            <button @click="setSmileCategory" :class="{active : showWord.btnSmile}">
                <i class="icon-face-smile-regular"></i>
            </button>
            <button @click="setThinkCategory" :class="{active : showWord.btnThink}">
                <i class="icon-face-think-regular"></i>
            </button>
            <button @click="setAngryCategory"  :class="{active : showWord.btnAngry}">
                <i class="icon-face-angry-regular"></i>
            </button>
        </div>

        <div class="available">{{ activeWordNumber +1}}  </div>
        <div class="total"> {{ showingCategory.length  }} </div>
        <button @click="prevWord" class="prev"> &lt; </button>
        <button @click="nextWord" class="next"> > </button>

    </div>

    <div class="menu">
        <button @click="allCategoryActive" :class="{ active: activeMenuCategory === btnAllMenuName }">
            <span class="totalNumber">{{totalWordNumber}}</span>
            <i class="icon-copy-regular"></i>
        </button>
        <button @click="smileCategoryActive" :class="{ active: activeMenuCategory === btnSmileMenuName }">
            <span class="totalNumber">{{smileCategoryTotalNumber}}</span>
            <i class="icon-face-smile-regular"></i>
        </button>
        <button @click="thinkCategoryActive" :class="{ active: activeMenuCategory === btnThinkMenuName }">
            <span class="totalNumber">{{thinkCategoryTotalNumber}}</span>
            <span class="totalNumber">1</span>
            <i class="icon-face-think-regular"></i>
        </button>
        <button @click="angryCategoryActive" :class="{ active: activeMenuCategory === btnAngryMenuName }">
            <span class="totalNumber">{{angryCategoryTotalNumber}}</span>
            <span class="totalNumber">1</span>
            <i class="icon-face-angry-regular"></i>
        </button>
    </div>
</template>
<script>
import wordMeaning from '../components/WordMeaning.vue'
import UserLinkComponent from '../components/UserLinkComponent.vue';
import SearchComponent from '../components/SearchComponent.vue'
import { mapGetters, mapActions, mapMutations, mapState} from "vuex";
import {dataCheck} from '../utili/utility';
export default {
    name: 'HelloWorld',
    data() {
      return {
        collectionName: 'kelime-ezber-local',
        show: false,
        hideDisplayedWord: false,
      };
    },
    methods:{
        ...mapMutations({
            allCategoryActive : 'allCategoryActive',
            smileCategoryActive : 'smileCategoryActive',
            thinkCategoryActive : 'thinkCategoryActive',
            angryCategoryActive : 'angryCategoryActive',
            prevWord: 'prevWord',
            nextWord: 'nextWord',
           
        }),
        ...mapActions({
            getWordData : "getWordData",
            setSmileCategory: 'setSmileCategory',
            setThinkCategory: 'setThinkCategory',
            setAngryCategory: 'setAngryCategory',
        }),
        wordEditPage: function(){
            this.$store.commit('setWordToReplace',this.showWord);
            this.$router.push({ name: 'wordEdit' });
        },
    },
    computed: {
        ...mapState([
            'totalData',
            'showingCategory', 
            'activeWordNumber',
            'activeMenuCategory',
            'btnAllMenuName',
            'btnSmileMenuName',
            'btnThinkMenuName',
            'btnAngryMenuName',
        ]),
        ...mapGetters({
            smileCategoryTotalNumber: 'smileCategoryTotalNumber',
            totalWordNumber: 'totalWordNumber',
            thinkCategoryTotalNumber: 'thinkCategoryTotalNumber',
            angryCategoryTotalNumber: 'angryCategoryTotalNumber',
            showWord: 'showWord',
            wordMeaningData: 'wordMeaningData'
        }),
      
    },
    created: async function() {
        if(!dataCheck(this.totalData)){
            await this.getWordData();
        }
        this.show =  true ;
    },
    components : {
        wordMeaning,
        UserLinkComponent,
        SearchComponent
    }
}

</script>
<style>
i{
    font-size: 36px;
}
button i{
    position: relative;
    left: -5px;
}
.content{
    position: absolute;
    bottom: 13vh;
    left: calc( 50% - 150px );
    width: 300px;
    height: 345px;
    color:white;
    background-image: linear-gradient(to bottom right, rgb(94, 177, 245), rgb(255, 115, 213));
    border-radius: 15px;
    border:1px solid white;
}
.content .wordImage{
    position: absolute;
    top: -90px;
    left: 40px;
    width: 219px;
    height: 163px;
    border-radius: 10px;
    object-fit: cover;
}
.content .wordMeaning{
    position: absolute;
    top: 155px;
    width: 100%;
    height: 110px;
}
.content .word{
    position: absolute;
    top: 120px;
    width: 100%;
}
.hidden{
    display: none !important;
}

.content .word .wordReading{
    font-size: 18px;
    display: inline-block;
}

.available{
    position: absolute;
    bottom: 0px;
    right: 29px;
    width: 22px;
    height: 24px;
    font-size: 14px;
}
.available::after{
    position: absolute;
    left:18px;
    content:'/';
    display: inline-block;

}
.total{
    position: absolute;
    bottom: 0px;
    right: 10px;
    width: 14px;
    height: 24px;
    font-size: 14px;
}
.prev,.next{
    position: absolute;
    top: 35%;
    padding-top:3px;
    font-size:20px;
    width: 20px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    color:white;
    box-sizing: border-box;
    background:#b290e4;
    outline: none;
    border: none;
}
.prev{left: -12px;}
.next{right: -12px;}
.prev::before{
    content: '';
    border: 8px solid rgba(255, 0, 0, 0);
    border-left: 8px solid #b290e4;
    position: absolute;
    top: -7px;
    transform: rotate(45deg);
}
.next::before{
    content: '';
    border: 8px solid rgba(255, 0, 0, 0);
    border-right: 8px solid #b290e4;
    position: absolute;
    top:-7px;
    right:3.5px;
    transform: rotate(-45deg);
}
.button-container{
    position: absolute;
    bottom: 3px;
    width: 100%;
    height:50px;
    display: flex;
    justify-content: center;
}

.menu{
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 15px;
    text-align: center;
}

.button-container button,
.menu button{
    padding: 4px;
    width: 52px;
    height: 53px;
    border-radius: 28px;
    margin: 0 10px;
    font-weight: bold;
    color : white;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    position: relative;
}
.menu button .totalNumber{
    position: absolute;
    right: 0;
    top:-5px;
    color: #b13a8e;
    font-weight: bold;
}

@keyframes ani{
    0% {
        transform: rotateY(0);
    }
    100% {
        transform: rotateY(360deg);
    }
  }
.animation{
    animation: ani 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
}
.active{
    border:1px solid white !important;
}
.editButton{
    position: absolute;
    left:10px;
    top:10px;
    width: 19px;
    cursor:pointer; 
}
.eyeButton{
    position: absolute;
    right:10px;
    top:10px;
    width: 19px;
    cursor:pointer; 
}
</style>
