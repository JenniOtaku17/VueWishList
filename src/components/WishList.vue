<template>
<div v-if="user.data">

  <!--Parallax -->
  <v-parallax
    height="300"
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
        <div v-if="movies.length">
            <v-btn
            color="blue darken-4"
            dark
            v-on:click="getRandom()"
            >Get Random Movie</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-parallax>
    <!--Parallax -->

  <v-container fluid class="ma-3">
    <v-row no-gutters v-if="movies.length">
        <v-col
        v-for="movie in movies"
        :key="movie.id"
        >
        <v-hover
        v-slot="{ hover }"
        open-delay="200"
        >
          <!--Peliculas -->
            <v-card width="350" style="margin-bottom:5%;"
            :elevation="hover ? 16 : 2">
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
                    color="grey darken-4"
                    text
                    v-on:click="deleteMovie(movie.id)"
                >
                <v-icon>mdi-trash-can</v-icon>Remove
                </v-btn>
                <v-btn
                    color="red accent-4"
                    text
                v-on:click="selectMovie(movie)">
                    <v-icon>mdi-youtube</v-icon>Trailer
                </v-btn>
                
                </v-card-actions>
            </v-card>
          <!--Peliculas -->
        </v-hover>
        </v-col>

        <v-dialog v-model="dialogTrailer" max-width="800" 
          v-if="trailer">

              <v-card class="mx-auto my-12">
                <v-toolbar
                  dark
                  color="black"
                >
                  <v-btn
                    icon
                    dark
                    @click="dialogTrailer = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  
                </v-toolbar>
                <div v-html="video">
                </div>
              </v-card>
          </v-dialog>   
         
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
          trailer: null,
          video: null,
          dialogTrailer: false
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
       },350)
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
                            this.getMovies();
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
            title: movie.title,
            imageUrl: 'http://image.tmdb.org/t/p/w780'+movie.poster_path,
            imageAlt: 'A tall image',
            showConfirmButton: false,
            timer: 3000
            })
        },
        selectMovie(movie){
            axios.get("https://api.themoviedb.org/3/movie/"+movie.id+"/videos?api_key=94dcae6139c7f599099691ea345952f0&language=en-US")
            .then( response=> {
                this.trailer = response.data.results[0].key;

                this.video = '<iframe width="800" height="415" src="https://www.youtube.com/embed/'+this.trailer+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

                this.dialogTrailer = true;
                console.log(this.trailer);
            });
        }
    }
  }
</script>