<template>
  <v-container fluid>
    <v-row>
        <v-col class="text-align:center;">
            <v-card width="40%" class="mx-auto my-15" style="padding:2%">
                <!--Form switch -->
                  <v-row
                        align="center"
                        justify="space-around"
                    >
                        <v-btn
                        text
                        color="primary"
                        v-on:click="changeForm(false)">
                        Login
                        </v-btn>
                        <v-divider
                        vertical
                        ></v-divider>
                            <v-btn
                        text
                        color="primary"
                        v-on:click="changeForm(true)"
                        >
                        Sign UP
                        </v-btn>
                  </v-row>
                  <!--Form switch -->
                  
                  <br>
                  <v-divider></v-divider>
                  <br>
                  <div v-if="error" style="color:red; font-size:12px; margin-bottom:20px;">
                      <span >*{{ error }}</span>
                  </div>

                  <!--SignUP Form -->
                  <div v-if="signup" style="text-align: center;">
                    <v-text-field
                        v-model="formSignup.name"
                        label="Name"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="formSignup.email"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="formSignup.password"
                        label="Password"
                        :type="show ? 'text' : 'password'"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        hint="At least 6 characters"
                        @click:append="show = !show"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="formSignup.confirm_password"
                        label="Confirm Password"
                        :type="show2 ? 'text' : 'password'"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        hint="At least 6 characters"
                        @click:append="show2 = !show2"
                        required
                    ></v-text-field>
                    <br>
                    <v-btn
                    block
                    color="primary"
                    elevation="3"
                    v-on:click="register()">
                    SAVE
                    </v-btn>
                  </div>
                  <!--SignUP Form -->

                  <!--Login Form -->
                  <div v-else style="text-align: center;">
                    <v-text-field
                        v-model="formLogin.email"
                        label="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="formLogin.password"
                        label="Password"
                        :type="show ? 'text' : 'password'"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        hint="At least 6 characters"
                        @click:append="show = !show"
                        required
                    ></v-text-field>
                    <br>
                    <v-btn
                    block
                    color="primary"
                    elevation="3"
                    v-on:click="login()">
                    SAVE
                    </v-btn>
                  </div>
                  <!--Login Form -->

            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import firebase from 'firebase';
  import Swal from 'sweetalert2';
  import store from '../store'

  export default {
    name: 'Authenticate',

    data: () => {
      return {
          signup : false,
          formLogin : {
              email : "",
              password: ""
          },
          formSignup : {
              name: "",
              email : "",
              password: "",
              confirm_password: ""
          },
          currentUser: null,
          show: false,
          show2: false,
          error: null
      }
    },
    mounted() {
        setTimeout(() => {
         this.validateLoggedIn();
       },300)
       
    },
    methods: {
        changeForm(state){
            this.signup= state;
        },
        register(){

            if(this.formSignup.password == this.formSignup.confirm_password){
                firebase.auth().createUserWithEmailAndPassword(this.formSignup.email, this.formSignup.password).then( data=> {
                    data.user.updateProfile({
                        displayName : this.formSignup.name
                    });
                    
                    data.user.sendEmailVerification().then(()=>{
                        Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title:"A verification email has been sent to your email, please verify and proceed with the login process.",
                        }).then(()=> {
                            this.$router.go()
                        })
                    })

                }).catch(error => {
                    this.error = error.message;
                });
            }else{
                this.error = "Passwords do not match"
            }
        },
        login(){
            firebase.auth().signInWithEmailAndPassword(this.formLogin.email, this.formLogin.password).then( data => {
                console.log(data);

                if(data.user.emailVerified == true){
                    this.formLogin.email = "";
                    this.formLogin.password = "";

                    this.$router.replace({
                        name: "Home"
                    })
                }else{
                    firebase.auth().signOut().then(()=> {
                        this.error = 'Must verify your email address.';
                    })
                }

                
            }).catch(error => {
                this.error = error.message;
            });
        },
        getUserState () {
            return store.state.use;
        },
        async validateLoggedIn(){
            let user = await this.getUserState();
            console.log(user.loggedIn);
            if(user.loggedIn){

                    this.$router.replace({
                        name: "Home"
                    })

            }
        }
    }
  }
</script>