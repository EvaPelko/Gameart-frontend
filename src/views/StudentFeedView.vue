<template>
  <v-container>
    <v-spacer></v-spacer>
    <h1>Student Feed</h1>
    <PostCard v-for="card in cards" :key="card.id" :info="card" />

  </v-container>
</template>

<script>
import store from '../store';
import PostCard from '../components/PostCard'
//import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Posts } from "@/services";

export default {
  name: 'StudentFeedView',
  data() {
    return {
      store,
      cards: [],
    };
  },
  components: {
    PostCard,
  },
  methods: {
    async getPosts() {
  try {
    // Fetch posts from the backend using the Posts service
    const studentPosts = await Posts.GetStudentFeed();
    
    // Map the posts data to the format expected by PostCard
    const cards = studentPosts.map(post => ({
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

    /* async getPosts() {
      const cards = [];
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "student-posts"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        const card = {
          id: doc.id,
          url: data.url,
          time: data.posted_at,
          email: data.email,
          title: data.title,
          text: data.text,
        };
        cards.push(card);
      });

      // Sort the cards array by time property in descending order
      cards.sort((a, b) => b.time - a.time);

      this.cards = cards;
    }, */
  },
  mounted() {
    this.getPosts();
  }
}
</script>
