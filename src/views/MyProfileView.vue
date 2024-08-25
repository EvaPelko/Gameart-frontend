<template>
  <v-container>
    <br />
    <h2>My profile</h2>
    <br />
    <div id="div-color">
      <div class="d-flex flex-row bg-surface-variant">
        <v-sheet class="ma-2 transparent-sheet">
          <v-avatar class="ma-4" size="50">
            <v-img src="../assets/User.jpg"></v-img>
          </v-avatar>
        </v-sheet>
        <v-sheet class="transparent-sheet">
          <p class="text-left mt-10">{{ email }}</p>
        </v-sheet>
        <v-sheet class="transparent-sheet mt-10 ml-7">
          <v-img
            src="../assets/check.svg"
            alt="Responsive Image"
            class="mx-auto"
            max-width="30px"
          ></v-img>
        </v-sheet>
        <v-sheet class="ma-2 pa-2 transparent-sheet">
          <!-- Conditional rendering based on user role -->
          <p
            v-if="store.profileType === 'Teacher'"
            class="text-left mt-6"
            style="color: #216ee1"
          >
            TEACHER
          </p>
        </v-sheet>
      </div>
      <p class="text-left roboto-font mx-10">
        Hello there! This is your profile!
      </p>
      <br />
    </div>
    <v-container>
      <v-spacer></v-spacer>
      <h1>Your posts</h1>
      <PostCard
        v-for="card in cards"
        :key="card.id"
        :info="card"
        @delete-post="handleDeletePost"
      />
    </v-container>
  </v-container>
</template>

<script>
import store from "../store";
import { Posts } from "@/services";
import PostCard from "../components/PostCard";

export default {
  name: "MyProfileView",
  props: ["userEmail"],
  data() {
    return {
      store,
      post: null,
      email: store.currentUser,
      cards: [],
    };
  },
  components: {
    PostCard,
  },
  methods: {
    async fetchUserPosts() {
      try {
        // Fetch posts using the email of the logged-in user
        const userPosts = await Posts.GetUserPosts(this.email);

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
    async handleDeletePost() {
      try {
        console.log("refreshing...");
        // Refresh the list of posts after deletion
        await this.fetchUserPosts();
      } catch (error) {
        console.error("Error refreshing posts:", error);
        alert("Failed to refresh posts");
      }
    },
  },
  async created() {
    // Fetch posts when the component is created
    await this.fetchUserPosts();
  },
};
</script>
