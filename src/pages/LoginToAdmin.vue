<template>
    <h3>Giriş Sayfası</h3>
    <input type="email" placeholder="Email Giriniz" v-model="email"> <br>
    <input type="text" placeholder="Şifre Giriniz" v-model="password"> <br>
    <button @click="login">Giriş yapılacak</button>
    <p> {{err}} </p>
</template>

<script>

import {auth, signInWithEmailAndPassword} from '../firebase/config';

export default {
    name : 'LoginToAdmin',
    data() {
        return {
            password: 'sergen123',
            email: 'sergenaslan09@gmail.com',
            err: null,
        }
    },
    methods:{
        login: async function(){
            try {
                const response = await signInWithEmailAndPassword(auth, this.email, this.password);
                this.$router.push({ name: 'newWord' });
            } catch (error) {
                console.error(error);
                this.err = error.response;
            }
        }
    }
}

</script>