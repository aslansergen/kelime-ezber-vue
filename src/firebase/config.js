import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, addDoc,deleteDoc,getDoc,doc,updateDoc,} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,updateProfile } from 'firebase/auth';

import { getStorage, ref, uploadBytes,getDownloadURL,deleteObject } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBRdWucWomMoGeeXLSwTvFJrcTXPPEug6E",
    authDomain: "kelime-ezber-e0e0e.firebaseapp.com",
    projectId: "kelime-ezber-e0e0e",
    storageBucket: "kelime-ezber-e0e0e.appspot.com",
    messagingSenderId: "490623389493",
    appId: "1:490623389493:web:9d0f0bb936afb1188ac67c"
  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage();


  const storageRef = ref(storage);
  
  // createUserWithEmailAndPassword fonksiyonunu auth nesnesi içinden alarak bir değişkene atama
  const createUser = createUserWithEmailAndPassword;
  
  export { db, auth, createUser, getDocs, collection, addDoc, deleteDoc, doc,
     updateDoc,getDoc, signInWithEmailAndPassword,signOut,
     storage, ref, uploadBytes,getDownloadURL, storageRef, deleteObject, updateProfile
    };

