<template>
  <div>
    <v-parallax
        height="910"
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
        <v-row>
            <v-col class="text-align:center;">
                <v-card width="60%" class="mx-auto my-15">
                    <v-app-bar
                    dark
                    color="black"
                    >
                    <v-toolbar-title>My Profile</v-toolbar-title>
                    </v-app-bar>
                    <br>

                    <template>
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Profile Settings
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-expansion-panel>
                                <v-expansion-panel-header>
                                    Account Settings
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </template>
                </v-card>
            </v-col>
        </v-row>

    </v-parallax>
  </div>
</template>

<script>

  export default {
    name: 'Profile',

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