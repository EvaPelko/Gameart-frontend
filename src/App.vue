<template>
  <v-app>
    <v-app-bar height="120" color="#FFF7D0">
      <v-container>
        <v-row no-gutters>
          <v-col cols="auto">
            <div class="d-flex justify-start align-center">
              <a href="/landing"
                ><v-img
                  alt="Gameart Logo"
                  class="shrink mr-2"
                  contain
                  src="https://www.nicepng.com/png/full/171-1710349_game-controller-pixel-game-controller.png"
                  transition="scale-transition"
                  width="60"
                />
              </a>
              <v-app-bar-title class="stroke">GAMEART</v-app-bar-title>
            </div>
          </v-col>
          <v-col></v-col>
          <v-col class="ml-auto">
            <div class="d-flex align-center mt-5">
              <search-bar @updateSearch="handleSearch"></search-bar>
            </div>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-row>
          <v-col cols="auto">
            <v-btn text to="/landing">Landing</v-btn>

            <v-btn text v-on="on" to="/teacherfeed"> Teacher Feed </v-btn>

            <v-btn
              text
              @click.stop="openDropdownStudent = !openDropdownStudent"
              v-on="on"
              to="/studentfeed"
              >Student Feed
            </v-btn>

            <v-btn v-if="store.currentUser" text to="/newpost">New Post</v-btn>
            <v-btn v-if="store.currentUser" text to="/my-profile">
              Profile
            </v-btn>
            <v-btn v-if="!store.currentUser" text to="/login">Login</v-btn>
            <v-btn v-if="!store.currentUser" text to="/registration">
              Registration
            </v-btn>
            <v-btn v-if="store.currentUser" @click="logOut" text>Logout</v-btn>

            <v-spacer></v-spacer>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto"> </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view :search-term="searchTerm" />
    </v-main>
    <v-content>
      <v-img
        :src="spriteCatImage"
        align="right"
        width="200"
        class="ml-auto mb-15"
      ></v-img>

      <v-footer color="#EBE2B4" absolute>
        <v-row justify="center" no-gutters>
          <router-link v-for="link in links" :key="link" :to="getRoute(link)">
            <v-btn color="#99CBDB" variant="text" class="mx-2">
              {{ link }}
            </v-btn>
          </router-link>
          <v-col class="text-center mt-4" cols="12">
            {{ new Date().getFullYear() }} — <strong>GAMEART</strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-content>
  </v-app>
</template>
<style>
.v-app-bar-title__content {
  width: 300px !important;
  font-size: 1.5em;
}
</style>

<script>
import store from "../src/store";
import SearchBar from "./components/SearchBar.vue";
import { Auth } from "@/services";

/* eslint-disable */
export default {
  name: "App",
  components: {
    SearchBar,
  },
  data() {
    return {
      spriteCatImage: require("@/assets/Sprite-cat.png"),
      drawer: false,
      openDropdown: false,
      dropdownItemsTeacher: [
        { title: "Fundamentals", route: "/post" },
        { title: "Anatomy", route: "/post" },
        { title: "Composition", route: "/post" },
      ],
      dropdownItemsStudent: [
        { title: "Homework", route: "/post" },
        { title: "test", route: "/post" },
        { title: "again", route: "/post" },
      ],

      links: ["Home"],
      store,
      auth: Auth.state,
      searchTerm: "",
    };
  },
  created() {
    this.isLogged();
  },
  methods: {
    async handleSearch(searchTerm) {
      // Save the search term to the state
      this.searchTerm = searchTerm;

      if (this.$route.name === "student-feed-view") {
        // Search in student posts
        try {
          const response = await axios.get(
            `http://localhost:3000/student-posts/search`,
            {
              params: { q: searchTerm },
            }
          );
          this.searchResults = response.data;
          this.$router.push({ name: "student-feed-view" }); // Ensure the view is updated
        } catch (error) {
          console.error("Error searching student posts:", error);
        }
      } else if (this.$route.name === "teacher-feed-view") {
        // Search in teacher posts
        try {
          const response = await axios.get(
            `http://localhost:3000/teacher-posts/search`,
            {
              params: { q: searchTerm },
            }
          );
          this.searchResults = response.data;
          this.$router.push({ name: "teacher-feed-view" }); // Ensure the view is updated
        } catch (error) {
          console.error("Error searching teacher posts:", error);
        }
      } else {
        console.log("Search not applicable on this route");
      }
    },
    closeDropdownTeacher() {
      this.openDropdownTeacher = false;
    },
    closeDropdownStudent() {
      this.openDropdownStudent = false;
    },
    getRoute(link) {
      if (link === "Home") return "/landing";
      else if (link == "About Us") return "/about";
      else if (link === "Contact Us") return "/contact";
    },
    logOut() {
      Auth.logout();
      store.currentUser = null;
      store.profileType = null;
      this.$router.push("/login");
    },
  },
};
</script>
