<template>
<div v-if="user.data">
  <v-parallax
    height="400"
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <h1 class="display-1 font-weight-thin mb-4">
          {{ user.data.displayName}}'s Wish List
        </h1>
        <h4 class="subheading">
          Click the button below to choose a random movie
        </h4>
        <br>
        <v-btn
          color="blue darken-4"
          dark
          v-on:click="getRandom()"
        >Get Random Movie</v-btn>
      </v-col>
    </v-row>
  </v-parallax>
  <v-container fluid class="ma-3">
    <v-row no-gutters v-if="movies.length">
        <v-col
        v-for="movie in movies"
        :key="movie.id"
        >
            <v-card width="350" style="margin-bottom:5%;">
                <v-img
                :src="'http://image.tmdb.org/t/p/w780'+movie.poster_path"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                >
                <v-card-title v-text="movie.title"></v-card-title>
                </v-img>
                <v-card-subtitle><i>Released date: {{ movie.release_date }}</i></v-card-subtitle>
                <v-card-actions>
                <v-btn
                    color="red"
                    text
                    v-on:click="deleteMovie(movie.id)"
                >
                <v-icon>mdi-trash-can</v-icon>Remove
                </v-btn>
                </v-card-actions>
            </v-card>

        </v-col>     
    </v-row>
    </v-container>
</div>
</template>

<script>
  import {mapState} from 'vuex';
  import axios from 'axios';
  import {fire} from '../firebase';
  import Swal from 'sweetalert2';

  export default {
    name: 'WishList',

    data: () => {
      return {
          moviesId: [],
          movies: [],
          movieToDelete: null,
      }
    },    
    computed: {
    ...mapState({
        user : state => state.user
      })
    },
    firebase: {
      movies: fire.database().ref('movies')
    },
    mounted() {
       setTimeout(() => {
           this.getMovies();
       },400)
    },
    methods: {
        deleteMovie(id){
            console.log('deleting... '+id)
            this.moviesId.forEach( movie => {
                if(movie.movieId == id){
                    this.movieToDelete= movie.id;
                    console.log(this.movieToDelete);                  
                    if(this.movieToDelete){
                        this.$firebase.firestore().collection('users/'+this.user.data.uid+"/movies").doc(this.movieToDelete).delete().then(()=> {
                            console.log("Deleted");
                            this.$router.go()
                        });
                    }
                }
            });
        },

        getMovies(){
            this.$firebase.firestore().collection('users/'+this.user.data.uid+"/movies").get().then(dt => {
                let moviesId = [];
                    dt.forEach(mv => {
                        moviesId.push({
                            id: mv.id,
                            movieId : mv.data().movieId
                        });
                    })
                    this.moviesId = moviesId;

                    let movies = []
                    this.moviesId.forEach( mv => {
                        let id = mv.movieId;
                        let url = "https://api.themoviedb.org/3/movie/"+id+"?api_key=94dcae6139c7f599099691ea345952f0&language=en-US"
                        axios.get(url).then( result=> {
                            movies.push(result.data);
                        });
                        
                    })

                this.movies = movies;
            });
        },
        getRandom(){
            let movie = this.movies[Math.floor(Math.random() * this.movies.length)];
            Swal.fire({
            position: 'center',
            title: 'The random movie is '+ movie.title,
            showConfirmButton: false,
            timer: 2000
            })
        }
    }
  }
</script>