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
import { collection, getDocs, getFirestore } from "firebase/firestore";
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
    },
  },
  mounted() {
    this.getPosts();
  }
}
</script>
