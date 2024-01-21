<template>
    <div class="form">
        <h2 class="pageTitle">Kelime Ekleme Sayfası</h2>
        <input type="text" placeholder="Kelime" :class="{error:kelimeInValid}" v-model="wordData.kelime" :disabled="formDisabled">
        <p class="inputErrorText">Lütfen Kelime Giriniz...</p>
        <input type="text" placeholder="Okunuşu" :class="{error:okunusInValid}" v-model="wordData.okunus" :disabled="formDisabled">
        <p class="inputErrorText">Lütfen Kelimenin Okunuşunu Giriniz..</p>
        <input type="text" :class="{error:wordNotMeaningError}" placeholder="İsim Kelimesi" v-model="wordData.isim" :disabled="formDisabled">
        <input type="text" :class="{error:wordNotMeaningError}" placeholder="Sıfat Kelimesi" v-model="wordData.sifat" :disabled="formDisabled">
        <input type="text" :class="{error:wordNotMeaningError}" placeholder="Zarf  Kelimesi" v-model="wordData.zarf" :disabled="formDisabled">
        <input type="text" :class="{error:wordNotMeaningError}" placeholder="Fiil  Kelimesi" v-model="wordData.fiil" :disabled="formDisabled">
        <img v-if="uploadedImageShow" class="uploaded-image" :src="wordData.resimYol">
        <button class="changeImage" v-if="changeImageBtnShow" @click="deleteImage">Farklı Resim Yükle</button>
        <label v-if="!uploadedImageShow" class="file-upload">
          <input type="file" ref="fileInput" @change="handleUpload" :disabled="fileUploadInputDisabled">
          {{fileUploadInputButtonText}}
        </label>
        <button class="saveButton" @click="addWordToFirebase" :disabled="formDisabled || sendButtonDisabled"> {{ sendButtonText }} </button>
        <p class="formWarningText" v-if="formErrorText !== null">{{formErrorText}}</p>
    </div>
</template>
<script>
import {auth ,createUser,db,getDocs,getDoc,signInWithEmailAndPassword,
  collection ,addDoc,deleteDoc, doc, updateDoc,signOut, storage, ref, uploadBytes,getDownloadURL,
    deleteObject,
} from '../firebase/config';
export default {
    name: 'AddingNewWord',
    data() {
        return{
            kelimeInValid: false,
            okunusInValid: false,
            uploadedImageShow: false,
            fileUploadInputDisabled: false,
            wordNotMeaningError : false,
            fileUploadInputButtonText : 'Dosya Seçiniz',
            sendButtonText: 'Kaydet',
            wordData : {
                kelime : null,
                okunus: null,
                zarf : null,
                sifat : null,
                isim : null,
                fiil : null,
                btnAngry : true,
                btnSmile : false,
                btnThink : false,
                knowNumber : '0',
                resimYol: null,
            },
            dbName : 'kelime-ezber',
            formErrorText:null,
            formDisabled: false,
            sendButtonDisabled:false,
            editActive : false,
        }
    },
    methods: {
        deleteImage: async function(){
            console.log('lan lun ');
            const fileRef = ref(storage, this.wordData.resimYol);
            try {
                let cc = await deleteObject(fileRef);
                this.wordData.resimYol = null;
                this.uploadedImageShow = false;
                console.log(cc);
            } catch (error) {
                console.log(error);
            }
          

        },
        isDataValid: function(value){
            if(value !== null && value.trim() !== '' && value !== undefined){
                return true;
            }
            return false;
        },
        formReset: function(){
           this.wordData = {
                kelime : null,
                okunus: null,
                zarf : null,
                sifat : null,
                isim : null,
                fiil : null,
                btnAngry : true,
                btnSmile : false,
                btnThink : false,
                knowNumber : '0',
                resimYol: null,
            };
            this.uploadedImageShow = false;
            this.sendButtonText = 'Kaydet';
        },
        formValidationReset: function(){
            this.kelimeInValid = false;
            this.okunusInValid = false;
            this.wordNotMeaningError = false;
        },
        formValidation: function(){
            if(!this.isDataValid(this.wordData.kelime)){
                this.kelimeInValid = true;
                return false;
            }
            if(!this.isDataValid(this.wordData.okunus)){
                this.okunusInValid = true;
                return false;
            }
            if( !this.isDataValid(this.wordData.fiil) &&
                !this.isDataValid(this.wordData.isim) &&
                !this.isDataValid(this.wordData.sifat) &&
                !this.isDataValid(this.wordData.zarf)
              ){
                this.formErrorText = "Lütfen Kelimenin Türkçe Anlamını Yazınız";
                this.wordNotMeaningError = true;
                return false;
            }
            if(!this.isDataValid(this.wordData.resimYol)){
                this.formErrorText = "Lütfen Bir Resim Yükleyiniz...";
                return false;
            }
            return true;
        },
        addWordToFirebase :async function(){
            this.formValidationReset();
            if( !this.formValidation() ){
                return
            }
            console.log(this.wordData);
            this.formErrorText = null;
            try {
                this.formDisabled = true;
                this.sendButtonText = 'Yükleniyor...';
                let res = await addDoc(collection(db,this.dbName), this.wordData);
                console.log(res.id);
                this.formDisabled = false;
                this.formReset();
                this.formErrorText = "Resim Başarılı Bir Şekilde Yüklendi.";
                setTimeout(() => {
                    this.formErrorText = null;
                }, 2000);
                } catch (error) {
                    console.log(error);
            }
        },
        handleUpload: async function(){
            const file = this.$refs.fileInput.files[0]; // Seçilen dosyayı al
            if (!file) {
                console.error('Dosya seçilmedi.');
                return;
            }
            this.fileUploadInputDisabled = true;
            this.fileUploadInputButtonText = 'Yükleniyor...'
            // Firebase Storage referansını oluştur
            const storageRef = ref(storage, 'uploads/' + file.name);

            try {
                // Dosyayı yükleme işlemi
                this.sendButtonDisabled = true;
                const snapshot = await uploadBytes(storageRef, file);
                console.log('Dosya yükleme işlemi başarılı:', snapshot);
                console.log(snapshot)
                const downloadURL = await getDownloadURL(snapshot.ref);
                console.log('Dosyanın indirme bağlantısı:');
                this.wordData.resimYol = downloadURL
                console.log(downloadURL);
                this.$refs.fileInput.value = null;
                this.fileUploadInputDisabled = false;
               this.fileUploadInputButtonText = 'Dosya Seçiniz';
               this.uploadedImageShow = true;
               this.sendButtonDisabled = false;
            } catch (error) {
                console.error('Dosya yükleme işlemi başarısız:', error);
            }
        } 
    },
    computed: {
        changeImageBtnShow: function(){
            return  this.editActive && this.wordData.resimYol !== null;
        }
    },
    watch : {
        'wordData.kelime' : function(){
            if(this.kelimeInValid){
                this.kelimeInValid = false;
            }
        },
        'wordData.okunus' : function(){
            if(this.okunusInValid){
                this.okunusInValid = false;
            }
        },
        'wordData.fiil' : function(){
            if(this.wordNotMeaningError){
                this.wordNotMeaningError = false;
            }
        },
        'wordData.isim' : function(){
            if(this.wordNotMeaningError){
                this.wordNotMeaningError = false;
            }
        },
        'wordData.sifat' : function(){
            if(this.wordNotMeaningError){
                this.wordNotMeaningError = false;
            }
        },
        'wordData.zarf' : function(){
            if(this.wordNotMeaningError){
                this.wordNotMeaningError = false;
            }
        }
    },
    created: function(){
        console.log(this.$route.matched);
        this.editActive =  this.$route.matched.some(item =>{
            return item.path === "/yeni-kelime/edit"
        });
        if(this.editActive && this.$store.state.wordToReplace !== null){
            this.wordData = this.$store.state.wordToReplace;
            this.uploadedImageShow = true;
            this.sendButtonText = 'Güncelle';
        }
        console.log(this.editActive);
    }
}

</script>
<style scoped>
h2{
    font-family: 'Shadows Into Light', cursive;
    color:white;
    margin-top: 20px;
    margin-bottom: 40px;
    position: relative;
    top: 10px;
    font-family: 'Shadows Into Light', cursive;
    color: white;
    text-align: center;
    font-size: 22px;
    letter-spacing: 4px;
}
.form{
    display:flex;
    flex-direction: column;
    align-items: center;
}
.form input[type='text']{
    margin-bottom: 10px;
    border-radius: 5px;
    padding:10px;
    border: none;
}
.form .saveButton{
    border:none;
    padding:5px 10px;
    border-radius:5px;
    margin-top:15px;
    cursor: pointer;
}
.form .saveButton:disabled{
    background-color: #e2e2e2;
}
.file-upload{
    background-color: #b290e4;
    color:white;
    border-radius: 5px;
    padding: 5px 10px;
    cursor:pointer;
}
.file-upload input{
    width: 0;
    visibility: hidden;
}
.uploaded-image{
    width: 200px;
    object-fit: contain;
}
.changeImage{
    border: none;
    margin-bottom: 15px;
    margin-top: 5px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
}
.form .formWarningText{
    color:white;
    margin-top:20px;
}
.inputErrorText{
    font-size: 14px;
    color:red;
    margin-top: -5px;
    margin-bottom: 5px;
    height: 0;
    overflow: hidden;
    transition: .3s ease;
}
.form input.error{
    border: 1px solid red;
}
.form input.error +  .inputErrorText{
    height: 17px;
}
.form input:disabled{
    background-color: #e2e2e2;    
}
</style>