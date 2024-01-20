<template>
    <div class="form">
        <p>Kelime Ekleme Sayfası</p>
        <input type="text" placeholder="Kelime" v-model="wordData.kelime">
        <input type="text" placeholder="Okunuşu">
        <input type="text" placeholder="İsim Kelimesi">
        <input type="text" placeholder="Sıfat Kelimesi">
        <input type="text" placeholder="Zarf  Kelimesi">
        <input type="text" placeholder="Fiil  Kelimesi">
        <img v-if="uploadedImageShow" class="uploaded-image" :src="wordData.resimYol">
        <label v-if="!uploadedImageShow" class="file-upload">
          <input type="file" ref="fileInput" @change="handleUpload" :disabled="fileUploadInputDisabled">
          {{fileUploadInputButtonText}}
        </label>
        <button @click="addWordToFirebase">Ekle</button>
    </div>
</template>

<script>
import {auth ,createUser,db,getDocs,getDoc,signInWithEmailAndPassword,
  collection ,addDoc,deleteDoc, doc, updateDoc,signOut, storage, ref, uploadBytes,getDownloadURL
} from '../firebase/config';
export default {
    name: 'AddingNewWord',
    data() {
        return{
            uploadedImageShow: false,
            fileUploadInputDisabled: false,
            fileUploadInputButtonText : 'Dosya Seçiniz',
            wordData : {
                btnAngry : true,
                btnSmile : false,
                btnThink : false,
                fiil : null,
                isim : null,
                kelime : null,
                knowNumber : '',
                okunus: null,
                resimYol: 'https://firebasestorage.googleapis.com/v0/b/kelime-ezber-e0e0e.appspot.com/o/kelime-ezber%2Fsoap.jpg?alt=media&token=2906724d-a09f-49d6-a661-7f7eb63a89c9',
                sifat : null,
                zarf : null
            },
            dbName : 'kelime-ezber'
        }
    },
    methods: {
        addWordToFirebase :async function(){
            console.log('naber gelmedi senden bi haber');
            console.log(this.wordData);
            try {
                let res = await addDoc(collection(db,this.dbName), this.wordData);
                    console.log(res.id);
                    
                } catch (error) {
                    console.log(error);
            }
        },
        deneme: function(){
            console.log('lan lun bekle');
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
            } catch (error) {
                console.error('Dosya yükleme işlemi başarısız:', error);
            }
        } 
    }
}

</script>
<style scoped>
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
.form button{
    border:none;
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
    height: 150px;
    object-fit: contain;
}
</style>