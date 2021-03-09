<template id="templateContainer">
<v-app>
    <v-app-bar
      color="black"
      dark
      max-height="60px"

    > <router-link to ="/welcome" style="color:#fff; text-decoration: none;"><v-icon style="font-size:45px;">mdi-home</v-icon></router-link>

    <v-spacer></v-spacer>

    <div v-if="user.loggedIn">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </div>
    <div v-else>
       <router-link to ="/authenticate" style="color:#fff; text-decoration: none;"><v-icon style="font-size:45px;">mdi-account</v-icon>SIGN UP</router-link>
    </div>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      color="grey darken-4"
      absolute
      bottom
      temporary
      right
    >
    <div v-if="user.loggedIn">
      <v-list-item class="px-2" style="margin-top:7px">
        <v-list-item-avatar color="blue accent-4" size="37">
            <v-icon>mdi-account</v-icon>
          </v-list-item-avatar>

          <v-list-item-title><span style="color:#fff!important">{{ user.data.displayName }}</span></v-list-item-title>

          <v-btn
            icon
            color="light-blue"
            @click.stop="drawer = !drawer"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
      </v-list-item>
    </div>

      <v-divider color="light-blue darken-4"></v-divider>

      <v-list dense>
        <v-container v-if="user.loggedIn">
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="light-blue" >mdi-movie-open-star-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="font-weight-regular">
                  <router-link to ="/home" style="color:#fff; text-decoration: none;margin-top:10px;">Movies</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="light-blue">mdi-playlist-star</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-regular">
                  <router-link to ="/wishlist" style="color:#fff; text-decoration: none;"> Wish List</router-link></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="light-blue">mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-regular">
                  <a v-on:click="logOut" style="color:#fff; list-style:none; margin-top:10px;"> Log Out</a>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="light-blue">mdi-help</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="font-weight-regular">
                <template v-slot:activator="{ on, attrs }">
                  <btn v-bind="attrs" v-on="on" text color="white">
                    Help
                  </btn>
                </template>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-container>
        <v-container v-else>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                  <router-link to ="/authenticate" style="text-decoration: none;margin-top:15px;">Sign UP</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-container>
      </v-list>
    </v-navigation-drawer>

    <v-main style="font-family: sans-serif;">
      <router-view></router-view>
      <v-dialog v-model="dialogHelp" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal first name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      background: '#EFF6F7',
    },
    drawer: false,
    dialogHelp: false
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
