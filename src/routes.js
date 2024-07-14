import HelloWorld from './pages/HelloWorld.vue' 
import GamePage from './pages/GamePage.vue' 
import HomePage from './pages/HomePage.vue' 
import AddingNewWord from './pages/AddingNewWord.vue' 
import LoginToAdmin from './pages/LoginToAdmin.vue' 
import Deneme from './pages/Deneme.vue' 

import {auth, onAuthStateChanged }  from './firebase/config';

const authKontrol = (to, from, next) => {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next({ name: 'giris' });
      }
    });
  };

export const routes = [
    {path  : '' ,component : HomePage, name: 'anasayfa' },
    {path  : '/oyunlar' ,component : GamePage, name: 'oyunlar'},
    {path  : '/yeni-kelime',  beforeEnter:authKontrol, component : AddingNewWord, name: 'newWord', children:[
        {path  : '/yeni-kelime/edit' ,component : AddingNewWord, name:'wordEdit'}
    ]},
    {path  : '/hello' ,component : HelloWorld, name: 'hel'},
    {path  : '/login' ,component : LoginToAdmin, name: 'giris'},
    {path  : '/deneme' ,component : Deneme, name: 'deneme'},

]

