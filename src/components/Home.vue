<template>
<div>
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
          List of Upcoming Movies
        </h1>
        <h4 class="subheading">
          See the overview and add your favorites to your wish list
        </h4>
      </v-col>
    </v-row>
  </v-parallax>
  <v-container fluid class="ma-3">
    <v-row no-gutters v-if="movies">
      
        <v-col
        v-for="movie in movies"
        :key="movie.id"
        >
          <v-card width="350" height="400" style="margin-bottom:5%;">
            <v-img
              :src="'http://image.tmdb.org/t/p/w780'+movie.poster_path"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="movie.title"></v-card-title>
            </v-img>
            <span v-for="genreMV in movie.genre_ids" :key="genreMV" >
              <span v-if="genreMV" style="display:inline">
                <v-chip color="primary" style="margin:5px;">{{ genres.find(x => x.id === genreMV).name }}</v-chip>
              </span>
            </span>
            <v-card-subtitle><i>Released date: {{ movie.release_date }}</i></v-card-subtitle>
            <v-card-actions
            class="pa-150" style="position: absolute!important; bottom: 10px!important;">
              <v-btn
                color="teal darken-4"
                text
                v-on:click="addMovie(movie.id)"
              >
              <v-icon>mdi-playlist-plus</v-icon>ADD
              </v-btn>
              <v-btn
                color="blue"
                text
              v-on:click="selectMovie(movie, 'overview')">
                <v-icon>mdi-playlist-play</v-icon>Overview
              </v-btn>  
              <v-btn
                color="red accent-4"
                text
              v-on:click="selectMovie(movie, 'trailer')">
                <v-icon>mdi-youtube</v-icon>Trailer
              </v-btn>  
            </v-card-actions>
          </v-card>

        </v-col>
        <v-dialog v-model="dialog" max-width="600" v-if="selectedMovie">

              <v-card class="mx-auto my-12">
                <v-toolbar
                  dark
                  color="black"
                >
                  <v-btn
                    icon
                    dark
                    @click="dialog = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  
                </v-toolbar>
                <v-img
                  :src="'http://image.tmdb.org/t/p/w780'+selectedMovie.poster_path"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="300"
                >
                  <v-card-title v-text="selectedMovie.title"></v-card-title>
                </v-img>
                <br>
                <v-card-text>{{ selectedMovie.overview }}</v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    color="red"
                    text
                    v-on:click="addMovie(selectedMovie.id)"
                  >
                    <v-icon>mdi-playlist-plus</v-icon>ADD
                  </v-btn>
                </v-card-actions>            
              </v-card>
          </v-dialog>

          <v-dialog v-model="dialogTrailer" max-width="1000" 
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
  import axios from 'axios';
  import {mapGetters} from 'vuex';
  import {fire} from '../firebase';

  export default {
    name: 'Home',

    data: () => {
      return {
        movies: null,
        dialog: false,
        dialogTrailer: false,
        selectedMovie: null,
        wishtlist:null,
        movieToAdd: {
          movieId : null
        },
        moviesId: null,
        trailer: null,
        video : null,
        genres: null,
        newGenres: null
      }
    },
    computed: {
    ...mapGetters({
        user: "user"
      })
    },
    mounted() {

      axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=94dcae6139c7f599099691ea345952f0&language=en-US&page=1')
      .then( response=> {
        this.movies = response.data.results;
      });
      this.getGenres();


    },
    firebase: {
      movies: fire.database().ref('movies')
    },
    methods: {
      async addMovie(movie){
        this.movieToAdd.movieId = movie;

        let dt = await this.$firebase.firestore().collection('users/'+this.user.data.uid+"/movies").get();
          let moviesId = [];
          console.log(dt);
          moviesId = dt.docs.map(d => ({id: d.id, movieId : d.data().movieId }));

          this.moviesId= moviesId;
          console.log(this.moviesId);
          let state = this.moviesId.map(data=> data.movieId).includes(movie);
          
          if(state){
            console.log("already added")
          }else{
            this.$firebase.firestore().collection("users/"+this.user.data.uid+"/movies").add(this.movieToAdd).then(()=>{
              console.log("Added succesfully!");
            });
          }

      },
      selectMovie(movie, window){
        if(window=="overview"){
          this.selectedMovie = movie;
          this.dialog = true;
          console.log(this.selectedMovie);
        }
        if(window=="trailer"){
          axios.get("https://api.themoviedb.org/3/movie/"+movie.id+"/videos?api_key=94dcae6139c7f599099691ea345952f0&language=en-US")
          .then( response=> {
            this.trailer = response.data.results[0].key;

            this.video = '<iframe width="1000" height="550" src="https://www.youtube.com/embed/'+this.trailer+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

            this.dialogTrailer = true;
            console.log(this.trailer);
          });
        }
      },

      async getGenres(){

        let list = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=94dcae6139c7f599099691ea345952f0&language=en-US&page=1')
        let movieList= list.data.results;
        let genresList = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=94dcae6139c7f599099691ea345952f0&language=en-US')
        let nameGenres = [];

        movieList.forEach(movie=> {
          movie.genre_ids.forEach(genre => {
            let objectGenre = genresList.data.genres.find(x => x.id === genre);
            nameGenres.push(objectGenre);
          })

        })
        this.genres = nameGenres;

      }
    }
  }
</script>
