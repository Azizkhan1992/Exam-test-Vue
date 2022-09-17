<template>
<div id="app">
    <Nav v-if="!isLogged" />

    <v-app>
        <v-main>
            <ul v-if="isLogged">
                <li>
                    <button id="logout" @click="logOut"><img :src="`/logOut.svg`" width="70px" color="rgb(2, 110, 2)" height="70px" /></button>
                </li>
            </ul>
            <router-view />
        </v-main>
    </v-app>
</div>
</template>

<script>
import '@/assets/style.css';
import Nav from './components/Nav.vue';
import TokenService from './services/TokenService';

export default {
    name: 'App',
    components: {
        Nav
    },
    data() {
        return {
            isLogged: false
        }
    },
    beforeMount() {
        this.getAuth()
    },
    methods: {
        getAuth() {
            if (TokenService.getToken()) {
                this.isLogged = true
            }
        },
        logOut(){
            TokenService.removeToken()
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>

#app ul li{
    float: right;
    margin-top: 50px;
    list-style: none;
    color: green;
}
#app ul li img{
    color: rgb(2, 110, 2) !important;
}
#logout{
    margin-top: 15px;
    width: 50px;
    height: 65px;
}
</style>
