import HelloWorld from './pages/HelloWorld.vue' 
import GamePage from './pages/GamePage.vue' 
import KelimePage from './pages/KelimePage.vue' 
import HomePage from './pages/HomePage.vue' 
import AddingNewWord from './pages/AddingNewWord.vue' 

export const routes = [
    {path  : '' ,component : HelloWorld, name: 'anasayfa'},
    {path  : '/oyunlar' ,component : GamePage, name: 'oyunlar'},
    {path  : '/kelime' ,component : KelimePage, name: 'kelime'},
    {path  : '/anasayfa' ,component : HomePage, name: 'anasayfa'},
    {path  : '/yeni-kelime' ,component : AddingNewWord, name: 'newWord', children:[
        {path  : '/yeni-kelime/edit' ,component : AddingNewWord, name:'wordEdit'}
    ]},
    {path  : '/hello' ,component : HelloWorld, name: 'hel'},

]

