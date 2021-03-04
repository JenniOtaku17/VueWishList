<template>
  <v-app :style="myStyle">
    <v-app-bar
      app
      color="black"
      dark
    >
    <template>
      <v-tabs>
        <v-tab><router-link to ="/home" style="color:#fff; text-decoration: none;"><v-icon>mdi-home-search</v-icon>HOME</router-link></v-tab>
        <v-container v-if="user.loggedIn">
          <div style="width:280px;float:right;">
          <v-tab style="float:left"><router-link to ="/wishlist" style="color:#fff; text-decoration: none;">    <v-avatar>
            <v-icon>mdi-account</v-icon>
          </v-avatar> My WISHLIST</router-link>
          </v-tab>
          <v-tab style="float:right;">
             <a v-on:click="logOut" style="color:#fff; list-style:none; margin-top:10px;">
              <v-icon>mdi-logout</v-icon></a>
          </v-tab>
          </div>
        </v-container>
        <v-container v-else>
          <v-tab style="float:right;"><router-link to ="/authenticate" style="color:#fff; text-decoration: none;margin-top:15px;">Sign UP</router-link></v-tab>
        </v-container>
      </v-tabs>
    </template>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import routes from './routes/index';
import {mapGetters} from 'vuex';
import firebase from 'firebase/app'

export default {
  name: 'App',

  components: {
  },
  computed: {
  ...mapGetters({
      user: "user"
    })
  },
  mounted(){
    routes
  },
  data: () => ({
    myStyle:{
      background: '#EFF6F7'
    }
  }),
  methods: {
    logOut(){
      firebase.auth().signOut().then(()=> {
        this.$router.replace({
          name: "Authenticate"
        })
      })
    }
  }
};
</script>
