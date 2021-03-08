<template>
  <div>
    <!--Parallax -->
    <v-parallax
        height="600"
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

    <!--Social Buttons -->
    <v-col>
        <div class="text-center" style="margin-top:150px;height:50px">
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
        <span style="margin-left:25%;">Contact with us by our social medias!</span>
        </div>
    </v-col>
    <!--Social Buttons -->
    <v-divider style="margin:10%;"></v-divider>
    <div class="text-center" style="margin: 10%; margin-bottom:200px; height:150px">

            <v-col>
              <strong>ABOUT US</strong>
              <div class="caption mb-2">
                Founders
              </div>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                ></v-img>
              </v-avatar>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                ></v-img>
              </v-avatar>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                ></v-img>
              </v-avatar>
            </v-col>
        <br>
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</span>
    </div>

    <div> 
        <v-footer
            dark
            padless>
            <v-card style="padding-top:70px; padding-left:10%; padding-right:10%; padding-bottom:50px;"
            flat
            tile
            class="blue darken-4 white--text text-center"
            >
            <v-card-text class="white--text pt-0">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                2020 — <strong>Vuetify</strong>
            </v-card-text>
            </v-card>
        </v-footer>
    </div>

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