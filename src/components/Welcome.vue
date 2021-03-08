<template>
  <div>
    <!--Parallax -->
    <v-parallax
        height="700"
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
            Welcome to WeekCinema
        </h1>
        <br>
            <h3 class="font-weight-thin mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        </h3>
            <br>
            <br>
            <v-btn
            color="blue darken-4"
            dark
            ><router-link to="/home" style="color:#fff; text-decoration: none;">Go to Movies<v-icon>mdi-arrow-right-bold</v-icon></router-link></v-btn>
        </v-col>
        </v-row>
    </v-parallax>
    <!--Parallax -->

    <br>
    <br>

    <!--Social Buttons -->
    <div class="text-center">
        <v-btn
        class="mx-2"
        fab
        dark
        large
        color="blue accent-4"
        >
        <v-icon dark>
            mdi-instagram
        </v-icon>
        </v-btn>
        <v-btn
        class="mx-2"
        fab
        dark
        large
        color="blue accent-4"
        >
        <v-icon dark>
            mdi-facebook
        </v-icon>
        </v-btn>
                <v-btn
        class="mx-2"
        fab
        dark
        large
        color="blue accent-4"
        >
        <v-icon dark>
            mdi-twitter
        </v-icon>
        </v-btn>

    </div>
    <!--Social Buttons -->

  </div>

</template>

<script>

  export default {
    name: 'Welcome',

    data: () => {
      return {
      }
    },
    mounted() { 
    },
    methods: {
    }
  }
</script>