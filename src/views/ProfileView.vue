<template>
  <v-container>
    <br />
    <h2>User profile</h2>
    <br />
    <div id="div-color">
      <div class="d-flex flex-row bg-surface-variant">
        <v-sheet class="ma-2 transparent-sheet"
          ><a href="/profile">
            <v-avatar class="ma-4" size="50">
              <v-img :src="User"></v-img>
            </v-avatar> </a
        ></v-sheet>
        <v-sheet class="transparent-sheet">
          <p class="text-left mt-10">{{ $route.params.userEmail }}</p>
        </v-sheet>
        <v-sheet class="transparent-sheet mt-10 ml-7"> </v-sheet>
        <v-sheet class="ma-2 pa-2 transparent-sheet">
          <p class="text-left mt-6" style="color: #216ee1">TEACHER</p>
        </v-sheet>
      </div>
      <p class="text-left roboto-font mx-10">
        Hello there! My email is {{ userEmail }}. I'm new!
      </p>
      <br />
    </div>
    <v-container>
      <v-spacer></v-spacer>
      <h1>User's posts</h1>
      <PostCard
        v-for="card in cards"
        :key="card.id"
        :info="card"
        :userEmail="card.email"
      />
    </v-container>
  </v-container>
</template>

<script>
import store from "../store";
import { Posts } from "@/services";
import PostCard from "../components/PostCard";

export default {
  name: "ProfileView",
  props: ["userEmail"],
  data() {
    return {
      store,
      post: null,
      cards: [],
      User: require("@/assets/User.jpg"),
    };
  },
  components: {
    PostCard,
  },
  async mounted() {
    console.log("userEmail prop:", this.userEmail);
  },
  methods: {
    async fetchUserPosts() {
      try {
        const userPosts = await Posts.GetUserPosts(this.userEmail);

        // Map the posts data to the format expected by PostCard
        this.cards = userPosts.map((post) => ({
          id: post._id,
          url: `http://localhost:3000${post.url}`, // Prepend the backend URL to the image path
          time: post.posted_at,
          email: post.email,
          title: post.title,
          text: post.text,
        }));

        // Sort the cards array by time property in descending order
        this.cards.sort((a, b) => new Date(b.time) - new Date(a.time));
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    },
  },
  async created() {
    // Fetch posts when the component is created
    await this.fetchUserPosts();
  },
};
</script>
