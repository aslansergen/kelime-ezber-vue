<template>
    <p> {{data}} </p>
</template>
<script>
import {auth ,createUser,db,getDocs,getDoc,signInWithEmailAndPassword,
  collection ,addDoc,deleteDoc, doc, updateDoc,signOut, storage, ref, uploadBytes,getDownloadURL,
  storageRef
} from '../firebase/config';

import {data} from '../data.js'
/* import {data2} from '../data2.js' */
export default {
    name: 'HelloWorld',
    data() {
      return {
        data: 'deneme123',
        downloadLink : null,
        dataRead : [
            {"kelime":"Engine","isim":"Motor","sifat":"","zarf":"","fiil":"","okunus":"enjın","resimYol":"engine.jpg","btnSmile":"true","btnThink":"false","btnAngry":"false","knowNumber":-1},
            {"kelime":"Simple","isim":"","sifat":"Basit, Kolay","zarf":"","fiil":"","okunus":"sımpıl","resimYol":"simple.jpg","btnSmile":"true","btnAngry":"false","btnThink":"false","knowNumber":1},
            {"kelime":"Scale","isim":"ölçek","sifat":"","zarf":"","fiil":"","okunus":"skeyl","resimYol":"scale.jpg","btnSmile":"false","btnAngry":"false","btnThink":"false","knowNumber":0}
        ]
      };
    },
    methods:{
        uploadFile : async function(word){
            console.log(word);
            const file = `http://ezber.epizy.com/resim/${word.resimYol}`;
            //const file = this.$refs.fileInput.files[0];  Seçilen dosyayı al
            // Firebase Storage referansını oluştur
            console.log('---------');
            console.log(file);
            const metadata = {
                contentType: 'image/jpg',
                };
            const storageRef = ref(storage, 'kelime-ezber/' + word.kelime);

            try {
                // Dosyayı yükleme işlemi
                const snapshot = await uploadBytes(storageRef, file,metadata);
                console.log('Dosya yükleme işlemi başarılı:', snapshot);
                const downloadURL = await getDownloadURL(snapshot.ref);
                console.log('Dosyanın indirme bağlantısı:');
                console.log(downloadURL);
                this.downloadLink = downloadURL;
            } catch (error) {
                console.error('Dosya yükleme işlemi başarısız:', error);
            }

        },
        saveWord : async function(word){
            console.log('******************')
            console.log(this.downloadLink)
            let  updatedData = {
                ...word,
                resimYol : this.downloadLink
            }
            console.log(updatedData)
            await addDoc(collection(db,'kelime-ezber'), updatedData);
        }
    },
    created: async function() {
        
        for (const item of data) {
            //await this.uploadFile(item);
           /* console.log(item.resimYol)
            const fileRef = ref(storage,  `/kelime-ezber/${item.resimYol}`); // Dosya adını belirtin
            console.log(fileRef);
            
            try {
                const url = await getDownloadURL(fileRef);
                console.log("Dosya indirme URL'si:", url);
                this.downloadLink = url;
                this.saveWord(item)
            } catch (error) {
                console.error(error);
            } */
        }
      /* console.log(data) */
    }
}

</script>