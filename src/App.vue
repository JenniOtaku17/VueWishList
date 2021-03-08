<template id="templateContainer">
  <v-app :style="myStyle">
    <v-app-bar
      app
      color="black"
      dark
    >
    <template>
      <v-tabs v-if="user" >
        <v-tab><router-link to ="/welcome" style="color:#fff; text-decoration: none;"><v-icon style="font-size:45px;">mdi-movie-open-star-outline</v-icon></router-link></v-tab>
        <v-container v-if="user.loggedIn">
          <div style="float:right;">
          <v-tab style="float:left;">
             <router-link to ="/home" style="color:#fff; text-decoration: none;margin-top:10px;">
              <v-icon>mdi-movie-search</v-icon> MOVIES</router-link>
          </v-tab>
          <v-tab style="float:right">
          <v-menu 
          open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }" >
              <btn
              v-bind="attrs"
              v-on="on"
              text
              >    
              <v-avatar color="blue darken-4" size="40">
                <v-icon>mdi-account</v-icon>
              </v-avatar><span style="color:#fff!important;"> {{ user.data.displayName}}</span>
              </btn>
            </template>
          <v-list color="black">
            <v-list-item>
              <v-list-item-title>
                <router-link
                to ="/wishlist" style="color:#fff; text-decoration: none;"> Wish List</router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <a v-on:click="logOut" style="color:#fff; list-style:none; margin-top:10px;"> Log Out</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
          </v-menu>
          </v-tab>
          </div>
        </v-container>
        <v-container v-else>
          <v-tab style="float:right;"><router-link to ="/authenticate" style="color:#fff; text-decoration: none;margin-top:15px;">Sign UP</router-link></v-tab>
        </v-container>
      </v-tabs>
    </template>
    </v-app-bar>

    <v-main style="font-family: sans-serif;">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import {mapGetters} from 'vuex';
import firebase from 'firebase/app';


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
    },
  }
};
</script>
