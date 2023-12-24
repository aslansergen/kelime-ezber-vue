<template>
  <div class="hello">
      <div v-for="data in totalData">
        <span> {{ data.kelime  }}- {{ data.anlami  }}  - 
          <button @click="getDetail(data.id)">Detayları getir</button> 
          <button @click="deleteWord(data.id)">sil</button>
          <button @click="updataWord(data.id)">Veriyi Güncelle</button>
        </span>
      </div>
      <hr>
      <div>
        <input type="text" v-model="datam.kelime">
        <br>
        <input type="text" v-model="datam.anlami">
        <br> 
        <button @click="addNewWord">Yeni Kelime Ekle</button>
      </div>
      <hr>
      <div>
        <input type="email" v-model="email">
        <br>
        <input type="text" v-model="password">
        <br>
        <button @click="login">Giriş Yap</button>
      </div>
      <hr>
      <button @click="logout">Çıkış Yap</button>
      <hr>
      <div>
          dosya yükleme
          <input type="file" ref="fileInput">
          <button @click="handleUpload">Yükle</button>
      </div>
  </div>
</template>

<script>
import {auth ,createUser,db,getDocs,getDoc,signInWithEmailAndPassword,
  collection ,addDoc,deleteDoc, doc, updateDoc,signOut, storage, ref, uploadBytes,getDownloadURL
} from '../firebase/config';

export default {
  name: 'HelloWorld',
  data() {
    return {
      email: 'sergenaslan09@gmail.com',
      password: 'Kelime11',
      totalData:[],
      datam: {
        kelime: null,
        anlami : null,
      }
    };
  },
  methods: {
    createNewUser : async function(){
            createUser(auth, 'sergenaslan09@gmail.com', 'Kelime11')
            .then((userCredential) => {
                console.log('Kullanıcı oluşturuldu:', userCredential.user);
                // Başka işlemler
            })
            .catch((error) => {
                console.log(JSON.stringify(error) )
                console.log(error.code)
                // Hata durumunda yapılacak işlemler
            });
    },
    logout: function(){
      signOut(auth).then((userCredential) => {
          console.log('Çıkış yapıldı:');
          // Başka işlemler
      })
      .catch((error) => {
          console.log(error.code)
          // Hata durumunda yapılacak işlemler
      });
    },
    login : function(){
     signInWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {
                console.log('Griş yapıldı:', userCredential.user);
                // Başka işlemler
            })
            .catch((error) => {
                console.log(JSON.stringify(error) )
                console.log(error.code)
                // Hata durumunda yapılacak işlemler
            });
    },
    addNewWord : async function(){
      try {
       let res = await addDoc(collection(db,'word-data'), this.datam);
        console.log(res.id);
        this.totalData.push({...this.datam, id: res.id});
        this.datam =  {
        kelime: null,
        anlami : null,
      }
      } catch (error) {
        console.log(error);
      }
    },
    extractWordFromData : function(id){
      this.totalData = this.totalData.filter(item => item.id !== id);
    },
    deleteWord: async function(id){
      await  deleteDoc(doc(db,'word-data', id));
      this.extractWordFromData(id);
    },
    updataWord: async function(id){
      let  updatedData = {
          kelime : "aaaaa",
          anlami : "bbbbbb"
      }
      const docRef = doc(db,'word-data',id)
      await  updateDoc(docRef,updatedData)
      this.updateWordFromData(id,updatedData);
    },
    updateWordFromData: function(id,data){
      this.totalData = this.totalData.map(item => {
        if(item.id == id ){
          return {
            ...item, 
            ...data
          }
        }
        return item;
      });
    },
    getDetail: async function(id){
      const docRef = doc(db, 'word-data',id); // 'belge-id' yerine belgenin gerçek ID'si kullanılmal
      try {
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          console.log('Belge verisi:', docSnapshot.data());
          console.log('Belge ID:', docSnapshot.id);
        } else {
          console.log('Belge bulunamadı.');
        }
      } catch (error) {
        console.error('Belge alınırken bir hata oluştu:', error);
      }
    },
    handleUpload: async function(){
      console.log('naber gelmedi senden bi haber merak ettim');

      const file = this.$refs.fileInput.files[0]; // Seçilen dosyayı al

      if (!file) {
        console.error('Dosya seçilmedi.');
        return;
      }

      // Firebase Storage referansını oluştur
      const storageRef = ref(storage, 'uploads/' + file.name);

      try {
        // Dosyayı yükleme işlemi
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Dosya yükleme işlemi başarılı:', snapshot);
        console.log(snapshot)
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Dosyanın indirme bağlantısı:');
        console.log(downloadURL);
        this.$refs.fileInput.value = null;
      } catch (error) {
        console.error('Dosya yükleme işlemi başarısız:', error);
      }
    } 
  },
  created: async function() {
    try {
      const querySnapshot = await getDocs(collection(db, 'word-data'));
      querySnapshot.forEach(item => {
        this.totalData.push({ ...item.data(), id: item.id });
      });
    } catch (error) {
      console.error('Veri alınırken hata oluştu:', error);
    }
  }
}

</script>