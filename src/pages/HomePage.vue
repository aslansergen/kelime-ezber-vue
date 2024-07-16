<template>
    <UserLinkComponent />
    <SearchComponent />
    <h1>Ezberlenen Kelimeler {{ ezberlenenKelime.length }}</h1>
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
            <button @click="setSmileCategory(showWord)" :class="{active : showWord.btnSmile}">
                <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512"><path fill="white" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg> 
            </button>
            <button @click="setThinkCategory(showWord)" :class="{active : showWord.btnThink}">
               <svg fill="white" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden=true role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet"><path d="M39.195 37.311c-4.338-2.949-9.924-3.91-15.049-2.584c-1.35.365-.359 3.523.904 3.201c4.719-1.201 9.277.141 12.143 2.084c1.065.75 3.073-1.955 2.002-2.701" fill="white"></path><path d="M49.685 17.038l-.139-.207l-.235-.083c-3.83-1.356-8.632-1.501-12.7-.363l-.244.068l-.152.202a8.193 8.193 0 0 0-1.675 4.974c0 4.559 3.709 8.268 8.268 8.268c4.56 0 8.27-3.709 8.27-8.268a8.25 8.25 0 0 0-1.393-4.591m-6.878 11.358a6.776 6.776 0 0 1-6.768-6.768c0-1.25.358-2.444 1.01-3.506c-.018.144-.051.281-.051.43a3.76 3.76 0 0 0 7.52 0c0-.477-.1-.927-.263-1.346c1.507.133 2.975.422 4.315.872a6.733 6.733 0 0 1 1.006 3.55a6.776 6.776 0 0 1-6.769 6.768" fill="white"></path><path d="M29.461 21.629a8.228 8.228 0 0 0-1.392-4.591l-.139-.207l-.235-.083c-3.83-1.356-8.632-1.501-12.7-.363l-.244.068l-.153.202a8.193 8.193 0 0 0-1.675 4.974c0 4.559 3.709 8.268 8.268 8.268c4.56-.001 8.27-3.709 8.27-8.268m-8.27 6.767a6.776 6.776 0 0 1-6.768-6.768c0-1.25.358-2.444 1.01-3.506c-.018.144-.051.281-.051.43a3.76 3.76 0 0 0 7.52 0c0-.477-.1-.927-.263-1.346c1.507.133 2.975.422 4.315.872a6.733 6.733 0 0 1 1.006 3.55c.001 3.732-3.035 6.768-6.769 6.768" fill="white"></path><path d="M32 2C16.531 2 4 14.533 4 30a27.83 27.83 0 0 0 3.895 14.209c-.392.896-.744 1.848-.791 3.047c-.01.203-.023.422-.037.654c-.135 2.057-.334 5.166 2.416 9.063c1.775 2.512 4.531 4.162 7.969 4.766c1.219.213 2.467.295 3.822.25c2.217-.076 3.773-.156 4.625-1.703c.722-1.309-.109-2.135.507-2.856A28.16 28.16 0 0 0 32 58c15.469 0 28-12.533 28-28S47.469 2 32 2m-6.989 55.969c.277 1.699-.689 3.305-7.216 2.127c-10.741-1.938-10.012-12.1-8.277-15.761c1.274-2.689 1.08-3.833.344-7.171c-.669-3.029 5.053-1.658 5.217 1.974c.121 2.694-.916 4.068.375 5.253c2.886 2.65 11.213 1.198 16.842.004c2.408-.511 3.646 1.931 1.861 3.175c-1.908 1.333-4.139 1.874-7.439 2.116c-1.723.125.221.68-.049 2.316c-.147.898-1.088.867-1.052 1.801c.019.497 1.044 1.02.347 2.27c-.207.373-1.133.801-.953 1.896M32 55.5c-1.536 0-3.037-.147-4.499-.41a2.734 2.734 0 0 0-.278-.83c-.377-.738 1.498-1.5.736-3.482c2.857-.469 4.982-1.02 6.951-2.139c2.117-1.203 2.188-2.514 2.043-3.188c-.246-1.123-1.404-2.049-2.887-2.309a4.162 4.162 0 0 0-1.686.037c-3.125.758-10.604 1.779-14.387 1.115c-1.063-.188-1.41-.441-1.508-.541c-.549-.551-.445-1.605-.176-3.785c.33-2.68-2.078-5.537-4.213-5.912l-.137-.023c-1.178-.148-2.229.191-2.883.934c-.732.826-.896 2.061-.453 3.383c.349 1.039.428 1.873.36 2.615A25.365 25.365 0 0 1 6.5 30c0-7.028 2.858-13.401 7.473-18.018c.079.022.152.022.213-.015a13.284 13.284 0 0 1 11.256-.983c.512.198 1.328-1.683.703-1.92a15.299 15.299 0 0 0-7.538-.752A25.343 25.343 0 0 1 32 4.5c7.063 0 13.464 2.889 18.087 7.544a15.325 15.325 0 0 0-12.929 1.157c-.572.342.557 2.049 1.029 1.768a13.284 13.284 0 0 1 11.256-.986c.429.167 1.06-1.114.89-1.68C54.765 16.893 57.5 23.131 57.5 30c0 14.061-11.439 25.5-25.5 25.5" ></path></svg>
            </button>
            <button @click="setAngryCategory(showWord)"  :class="{active : showWord.btnAngry}">
                <svg fill="white" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/><path d="M12,13.41,13.41,12,8.46,7.05,7.05,8.46Zm7.07-8.48A9.93,9.93,0,0,0,12,2H11V6h2V4.06A8,8,0,1,1,6.34,6.34l.71-.7L5.64,4.22l-.71.71A10,10,0,1,0,19.07,19.07a10,10,0,0,0,0-14.14Z"/></svg>
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
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="white" stroke-width="1.5"/>
                <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="white" stroke-width="1.5"/>
            </svg>
        </button>
        <button @click="smileCategoryActive" :class="{ active: activeMenuCategory === btnSmileMenuName }">
            <span class="totalNumber">{{smileCategoryTotalNumber}}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512">
                <path fill="white" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
            </svg> 
        </button>
        <button @click="thinkCategoryActive" :class="{ active: activeMenuCategory === btnThinkMenuName }">
            <span class="totalNumber">{{thinkCategoryTotalNumber}}</span>
            <span class="totalNumber">1</span>
            <svg fill="white" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden=true role="img" class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet"><path d="M39.195 37.311c-4.338-2.949-9.924-3.91-15.049-2.584c-1.35.365-.359 3.523.904 3.201c4.719-1.201 9.277.141 12.143 2.084c1.065.75 3.073-1.955 2.002-2.701" fill="white"></path><path d="M49.685 17.038l-.139-.207l-.235-.083c-3.83-1.356-8.632-1.501-12.7-.363l-.244.068l-.152.202a8.193 8.193 0 0 0-1.675 4.974c0 4.559 3.709 8.268 8.268 8.268c4.56 0 8.27-3.709 8.27-8.268a8.25 8.25 0 0 0-1.393-4.591m-6.878 11.358a6.776 6.776 0 0 1-6.768-6.768c0-1.25.358-2.444 1.01-3.506c-.018.144-.051.281-.051.43a3.76 3.76 0 0 0 7.52 0c0-.477-.1-.927-.263-1.346c1.507.133 2.975.422 4.315.872a6.733 6.733 0 0 1 1.006 3.55a6.776 6.776 0 0 1-6.769 6.768" fill="white"></path><path d="M29.461 21.629a8.228 8.228 0 0 0-1.392-4.591l-.139-.207l-.235-.083c-3.83-1.356-8.632-1.501-12.7-.363l-.244.068l-.153.202a8.193 8.193 0 0 0-1.675 4.974c0 4.559 3.709 8.268 8.268 8.268c4.56-.001 8.27-3.709 8.27-8.268m-8.27 6.767a6.776 6.776 0 0 1-6.768-6.768c0-1.25.358-2.444 1.01-3.506c-.018.144-.051.281-.051.43a3.76 3.76 0 0 0 7.52 0c0-.477-.1-.927-.263-1.346c1.507.133 2.975.422 4.315.872a6.733 6.733 0 0 1 1.006 3.55c.001 3.732-3.035 6.768-6.769 6.768" fill="white"></path><path d="M32 2C16.531 2 4 14.533 4 30a27.83 27.83 0 0 0 3.895 14.209c-.392.896-.744 1.848-.791 3.047c-.01.203-.023.422-.037.654c-.135 2.057-.334 5.166 2.416 9.063c1.775 2.512 4.531 4.162 7.969 4.766c1.219.213 2.467.295 3.822.25c2.217-.076 3.773-.156 4.625-1.703c.722-1.309-.109-2.135.507-2.856A28.16 28.16 0 0 0 32 58c15.469 0 28-12.533 28-28S47.469 2 32 2m-6.989 55.969c.277 1.699-.689 3.305-7.216 2.127c-10.741-1.938-10.012-12.1-8.277-15.761c1.274-2.689 1.08-3.833.344-7.171c-.669-3.029 5.053-1.658 5.217 1.974c.121 2.694-.916 4.068.375 5.253c2.886 2.65 11.213 1.198 16.842.004c2.408-.511 3.646 1.931 1.861 3.175c-1.908 1.333-4.139 1.874-7.439 2.116c-1.723.125.221.68-.049 2.316c-.147.898-1.088.867-1.052 1.801c.019.497 1.044 1.02.347 2.27c-.207.373-1.133.801-.953 1.896M32 55.5c-1.536 0-3.037-.147-4.499-.41a2.734 2.734 0 0 0-.278-.83c-.377-.738 1.498-1.5.736-3.482c2.857-.469 4.982-1.02 6.951-2.139c2.117-1.203 2.188-2.514 2.043-3.188c-.246-1.123-1.404-2.049-2.887-2.309a4.162 4.162 0 0 0-1.686.037c-3.125.758-10.604 1.779-14.387 1.115c-1.063-.188-1.41-.441-1.508-.541c-.549-.551-.445-1.605-.176-3.785c.33-2.68-2.078-5.537-4.213-5.912l-.137-.023c-1.178-.148-2.229.191-2.883.934c-.732.826-.896 2.061-.453 3.383c.349 1.039.428 1.873.36 2.615A25.365 25.365 0 0 1 6.5 30c0-7.028 2.858-13.401 7.473-18.018c.079.022.152.022.213-.015a13.284 13.284 0 0 1 11.256-.983c.512.198 1.328-1.683.703-1.92a15.299 15.299 0 0 0-7.538-.752A25.343 25.343 0 0 1 32 4.5c7.063 0 13.464 2.889 18.087 7.544a15.325 15.325 0 0 0-12.929 1.157c-.572.342.557 2.049 1.029 1.768a13.284 13.284 0 0 1 11.256-.986c.429.167 1.06-1.114.89-1.68C54.765 16.893 57.5 23.131 57.5 30c0 14.061-11.439 25.5-25.5 25.5" ></path></svg>
        </button>
        <button @click="angryCategoryActive" :class="{ active: activeMenuCategory === btnAngryMenuName }">
            <span class="totalNumber">{{angryCategoryTotalNumber}}</span>
            <span class="totalNumber">1</span>
            <svg fill="white" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><title/><path d="M12,13.41,13.41,12,8.46,7.05,7.05,8.46Zm7.07-8.48A9.93,9.93,0,0,0,12,2H11V6h2V4.06A8,8,0,1,1,6.34,6.34l.71-.7L5.64,4.22l-.71.71A10,10,0,1,0,19.07,19.07a10,10,0,0,0,0-14.14Z"/></svg>
        </button>
    </div>
</template>
<script>
import { db, getDocs, collection, updateDoc, doc} from '../firebase/config';
import wordMeaning from '../components/WordMeaning.vue'
import UserLinkComponent from '../components/UserLinkComponent.vue';
import SearchComponent from '../components/SearchComponent.vue'
import { mapMutations, mapGetters } from "vuex";
export default {
    name: 'HelloWorld',
    data() {
      return {
        collectionName: 'kelime-ezber-local',
        ezberlenenKelime: [],
        ezberlenecekKelime: [],
        bekleyenKelime: [],
        showingCategory:[],
        activeWordNumber: 0,
        show: false,
        activeMenuCategory: null,
        btnAllMenuName : "btnAll",
        btnSmileMenuName : "btnSmile",
        btnThinkMenuName : "btnThink",
        btnAngryMenuName : "btnAngry",
        hideDisplayedWord: false
      };
    },
    methods:{
        wordEditPage: function(){
            this.$store.commit('setWordToReplace',this.showWord);
            this.$router.push({ name: 'wordEdit' });
        },
        /* kategoriyi değiştir */
        changeWordCategory: function(targetArr){
            if(this.showingCategory.length > 1){
                    if(this.activeWordNumber === this.showingCategory.length-1){
                        this.activeWordNumber--;
                        this.showingCategory = this.showingCategory.filter(word =>{
                            if(word.kelime !== this.showingCategory[this.activeWordNumber+1].kelime){
                                return word;
                            }else{
                                targetArr.push(word);
                            }
                        });

                    }else{
                        this.showingCategory = this.showingCategory.filter(word =>{
                            if(word.kelime !== this.showingCategory[this.activeWordNumber].kelime){
                                return word;
                            }else{
                                targetArr.push(word);
                            }
                        });
                    }
                }
        },
        /* yukarıdaki butonlar */
        setSmileCategory: async function(word){
            if(!this.showWord.btnSmile){
                this.changeWordCategory(this.ezberlenenKelime);
                let  updatedData = {
                   ...word,
                   btnAngry: false,
                   btnThink: false,
                   btnSmile: true
                }
                const docRef = doc(db,this.collectionName,word.id)
                await  updateDoc(docRef,updatedData);
            }
        },
        setThinkCategory: async function(word){
            if(!this.showWord.btnThink){
                this.changeWordCategory(this.ezberlenecekKelime);
                let  updatedData = {
                   ...word,
                   btnAngry: false,
                   btnThink: true,
                   btnSmile: false
                }
                const docRef = doc(db, this.collectionName ,word.id)
                await  updateDoc(docRef,updatedData);
                this.activeWordNumber = this.activeWordNumber
            }
        },
        setAngryCategory: async function(word){
            if(!this.showWord.btnAngry){
                this.changeWordCategory(this.bekleyenKelime);
               let  updatedData = {
                   ...word,
                   btnAngry: true,
                   btnThink: false,
                   btnSmile: false
                }
                const docRef = doc(db, this.collectionName ,word.id)
                await  updateDoc(docRef,updatedData);
            }
        },
        /* alttaki 4lü butonlar */
        allCategoryActive: function(){
            if(this.activeMenuCategory !== this.btnAllMenuName){
                console.log('allllllallll');
                this.activeWordNumber = 0;
                this.showingCategory = this.totalData;
                this.activeMenuCategory =  this.btnAllMenuName;
            }
        },
        smileCategoryActive: function(){
            if(!this.showWord.btnSmile){
                console.log('ssssssssssssss');
                this.activeWordNumber = 0;
                this.showingCategory = this.ezberlenenKelime;
                this.activeMenuCategory =  this.btnSmileMenuName;
            }
        },
        thinkCategoryActive: function(){
            if(!this.showWord.btnThink){
                console.log('lan lun lan lun');
                this.activeWordNumber = 0;
                this.showingCategory = this.ezberlenecekKelime;
                this.activeMenuCategory =  this.btnThinkMenuName;
            }
        },
        angryCategoryActive: function(){
            if(!this.showWord.btnAngry){
                console.log('pat pat pat pat pat');
                this.activeWordNumber = 0;
                this.showingCategory = this.bekleyenKelime;
                this.activeMenuCategory =  this.btnAngryMenuName;
            }
        },
        prevWord : function(){
            if(this.activeWordNumber  > 0  ){
                this.activeWordNumber--
            }else{
                this.activeWordNumber = this.showingCategory.length-1;
            }
        },
        nextWord: function(){
            if(this.activeWordNumber < this.showingCategory.length-1){
                this.activeWordNumber++
            }else{
                this.activeWordNumber = 0
            }
        },
        ...mapMutations({
            setTotalWordData :  'setTotalWordData'
        }),
    },
    computed: {
        ...mapGetters({
            totalData : 'totalWordData',
        }),
        showWord: function(){
           return this.showingCategory[this.activeWordNumber];
        },
        wordMeaningData: function(){
            const dataWord = [];
            for(let word in this.showingCategory[this.activeWordNumber]){
                if(word == 'isim' || word == 'sifat'||word == 'zarf'||word == 'fiil'){
                    if(this.showingCategory[this.activeWordNumber][word] !== ""){
                        dataWord.push({
                            kategori : word,
                            anlami : this.showingCategory[this.activeWordNumber][word]
                        })
                    }
                }
            }
            return dataWord;
        },
        totalWordNumber : function(){
            return this.totalData.length;
        },
        smileCategoryTotalNumber: function(){
            return this.ezberlenenKelime.length;
        },
        thinkCategoryTotalNumber : function(){
            return this.ezberlenecekKelime.length;
        },
        angryCategoryTotalNumber: function(){
            return this.bekleyenKelime.length;
        }
    },
    created: async function() {
       try {
            const querySnapshot = await getDocs(collection(db, this.collectionName));
           /*  const querySnapshot = data; */
            querySnapshot.forEach(item => {
                let wordInfo = {
                    ...item.data(), id: item.id
                }
                this.setTotalWordData(wordInfo);
                if(wordInfo.btnAngry === true ){
                    this.bekleyenKelime.push(wordInfo);
                }
                if(wordInfo.btnThink === true ){
                    this.ezberlenecekKelime.push(wordInfo);
                }
                if(wordInfo.btnSmile === true ){
                    this.ezberlenenKelime.push(wordInfo);
                }
            });

            this.showingCategory = this.ezberlenecekKelime;
            this.show = true;
            this.activeMenuCategory =  this.btnThinkMenuName;
            /* console.log( JSON.stringify(this.totalData)) */
        } catch (error) {
        console.error('Veri alınırken hata oluştu:', error);
        }
        
    },
    watch :{
        showingCategory: function(){
            switch (this.activeMenuCategory) {
                case this.btnAllMenuName:
                    this.totalData = this.showingCategory;
                    break;
                case this.btnSmileMenuName:
                    this.ezberlenenKelime = this.showingCategory;
                    break;
                case this.btnThinkMenuName:
                    this.ezberlenecekKelime = this.showingCategory;
                    break;
                case this.btnAngryMenuName:
                    this.bekleyenKelime = this.showingCategory;
                    break;
            }
        }
    },
    components : {
        wordMeaning,
        UserLinkComponent,
        SearchComponent
    }
}

</script>
<style>
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
