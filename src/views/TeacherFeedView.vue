<template>
  <v-container>
    <h1>Teacher Feed</h1>
    <PostCard v-for="card in filteredCards" :key="card.id" :info="card" />
  </v-container>
</template>

<script>
import store from "../store";
import PostCard from "../components/PostCard";
//import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Posts } from "@/services";

export default {
  name: "TeacherFeedView",
  props: {
    searchTerm: String, // Accept the search term as a prop
  },
  data() {
    return {
      store,
      cards: [],
    };
  },
  components: {
    PostCard,
  },
  computed: {
    filteredCards() {
      // If there's no search term, return all cards
      if (!this.searchTerm) {
        return this.cards;
      }

      // Otherwise, filter cards based on the search term
      const searchLower = this.searchTerm.toLowerCase();
      return this.cards.filter(
        (card) =>
          card.title.toLowerCase().includes(searchLower) ||
          card.text.toLowerCase().includes(searchLower) ||
          card.email.toLowerCase().includes(searchLower)
      );
    },
  },
  methods: {
    async getPosts() {
      try {
        // Fetch posts from the backend using the Posts service
        const teacherPosts = await Posts.GetTeacherFeed();

        // Map the posts data to the format expected by PostCard
        const cards = teacherPosts.map((post) => ({
          id: post._id,
          url: `http://localhost:3000${post.url}`, // Prepend the backend URL to the image path
          time: post.posted_at,
          email: post.email,
          title: post.title,
          text: post.text,
        }));

        // Sort the cards array by time property in descending order
        cards.sort((a, b) => new Date(b.time) - new Date(a.time));

        this.cards = cards;
      } catch (error) {
        console.error("Error fetching student posts:", error);
      }
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>
