<template>
  <v-container>
    <br />
    <h2 class="stroke">{{ post.title }}</h2>
    <br />
    <div id="div-color">
      <div class="d-flex flex-row bg-surface-variant">
        <v-sheet class="ma-2 pa-2 transparent-sheet"
          ><router-link
            :to="{ name: 'profile-view', params: { userEmail: post.email } }"
          >
            <v-avatar class="ma-4" size="50">
              <v-img src="../assets/User.jpg"></v-img>
            </v-avatar> </router-link
        ></v-sheet>
        <v-sheet class="transparent-sheet">
          <p class="text-left mt-10">{{ post.email }}</p>
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
          <p class="text-left mt-6" style="color: #216ee1">TEACHER</p>
        </v-sheet>
      </div>

      <p class="text-left roboto-font mx-10">{{ post.text }}</p>
      <v-img
        :src="post.url"
        alt="Responsive Image"
        class="mx-auto"
        max-width="320px"
        @click="showFullSize"
      ></v-img>
      <v-dialog v-model="dialog" max-width="800px">
        <v-img :src="post.url" contain></v-img>
      </v-dialog>
      <br />
    </div>
    <div class="icon-container">
      <!-- Like Button -->
      <div class="like-container" style="display: flex; align-items: center">
        <v-icon
          @click="toggleLike"
          :color="isLiked ? 'red' : 'grey'"
          max-width="70px"
          style="cursor: pointer; width: 30px; height: 30px"
          >mdi-heart</v-icon
        >
        <span>{{ likesCount }}</span>
      </div>
      <div class="icons-right">
        <v-img
          :src="reportImage"
          alt="Report button"
          class="mx-auto"
          max-width="40px"
          @click="reportPost"
        />
        <v-img
          :src="saveImage"
          alt="Save button"
          class="mx-auto"
          max-width="28px"
          @click="showSaveMessage"
        ></v-img>
        <v-dialog v-model="saveDialog" max-width="300">
          <v-card>
            <v-card-title class="headline">Post Saved</v-card-title>
            <v-card-actions>
              <v-btn color="primary" text @click="saveDialog = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <div id="div-color" style="padding: 10px">
      <p>Comments</p>
      <div class="comment-container">
        <v-textarea
          v-model="newCommentText"
          label="Write a comment..."
          outlined
          dense
          class="comment-input mx-15"
          :rules="rules"
          counter
          @keyup.enter="postComment"
          rows="2"
        ></v-textarea>
        <v-spacer></v-spacer>
        <v-btn @click="postComment" color="#99CBDB" dark class="mx-15"
          >Post</v-btn
        >
      </div>
    </div>
    <CommentCard v-for="card in cards" :key="card.id" :info="card" />
  </v-container>
</template>

<script>
import store from "../store";
import CommentCard from "../components/CommentCard";
import { Posts, Comments } from "@/services";

export default {
  name: "PostView",
  components: {
    CommentCard,
  },
  props: ["postId"],
  data() {
    return {
      newCommentText: "",
      isLiked: false,
      saveDialog: false,
      reportDialog: false,
      imageUrl: "../assets/hand-drawing.jpg",
      dialog: false,
      post: null,
      cards: [],
      rules: [(v) => v.length <= 700 || "Max 700 characters"],
      userImage: require("@/assets/User.jpg"), // Load user image
      checkImage: require("@/assets/check.svg"), // Load check icon
      likeImage: require("@/assets/like.svg"), // Load like icon
      reportImage: require("@/assets/report.svg"), // Load report icon
      saveImage: require("@/assets/save.svg"), // Load save icon
      likesCount: 0, // track number of likes
    };
  },
  computed: {
    selectedPost() {
      return this.posts.find((post) => post.id === this.postId);
    },
  },
  async mounted() {
    await this.fetchPostData(this.postId);
    this.getComments();
  },

  methods: {
    async fetchPostData(postId) {
      try {
        const response = await Posts.GetTeacherPost(postId);

        // Prepend the backend URL to the image path
        this.post = {
          ...response,
          url: `http://localhost:3000${response.url}`,
        };

        // Initialize likesCount and isLiked state
        this.likesCount = this.post.likes || 0;
        this.isLiked = this.post.likedBy
          ? this.post.likedBy.includes(store.currentUser)
          : false;
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    },
    async getComments() {
      try {
        const response = await Comments.GetCommentsByPostId(this.postId);

        // Map the comments and ensure posted_at is correctly formatted
        this.cards = response.map((comment) => ({
          id: comment._id,
          text: comment.text,
          email: comment.email,
          time: comment.posted_at, // Ensure this is an ISO string
        }));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    async postComment() {
      // Check if the user is logged in by verifying that store.currentUser is not null
      if (!store.currentUser) {
        alert("You need to be logged in to post a comment.");
        return;
      }
      if (this.newCommentText.trim() !== "") {
        try {
          const commentData = {
            text: this.newCommentText,
            email: store.currentUser, // Make sure `store.currentUser` is set to the current user's email
            postId: this.postId,
          };

          const response = await Comments.PostComment(commentData);

          if (response && response.message === "Comment posted successfully") {
            alert("Comment posted");
            this.newCommentText = ""; // Clear the input after successful post
            this.getComments(); // Refresh the comments
          } else {
            alert("There was an issue posting your comment.");
          }
        } catch (error) {
          console.error("Error posting comment:", error);
          alert("There was an error posting your comment.");
        }
      }
    },
    async toggleLike() {
      // Check if the user is logged in by verifying that store.currentUser is not null
      if (!store.currentUser) {
        alert("You need to be logged in to like this post.");
        return;
      }

      // Prevent liking more than once
      if (this.isLiked) {
        alert("You have already liked this post.");
        return;
      }

      try {
        const response = await Posts.LikeTeacherPost(
          this.post._id,
          store.currentUser
        );
        if (response && response.message === "Post liked successfully") {
          this.likesCount += 1;
          this.isLiked = true;
        }
      } catch (error) {
        console.error("Error liking post:", error);
        alert("There was an error liking the post.");
      }
    },
    async reportPost() {
      // Check if the user is logged in by verifying that store.currentUser is not null
      if (!store.currentUser) {
        alert("You need to be logged in to report this post.");
        return;
      }

      try {
        const response = await Posts.ReportTeacherPost(
          this.post._id,
          store.currentUser
        );
        if (response && response.message === "Post reported successfully") {
          alert("Post has been reported.");
          this.reportDialog = true;
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data.message;
          if (errorMessage === "You have already reported this post.") {
            alert("You have already reported this post.");
          } else {
            alert("There was an error reporting the post.");
          }
        } else {
          console.error("Error reporting post:", error);
          alert("There was an error reporting the post.");
        }
      }
    },
    showSaveMessage() {
      this.saveDialog = true;
      setTimeout(() => {
        this.saveDialog = false;
      }, 1000);
    },
    showFullSize() {
      this.dialog = true;
    },
    /* async fetchPostData(postId) {
      try {
        const db = getFirestore()
        const postRef = doc(db, "teacher-posts", postId);
        // Fetch the document
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
          // Document exists, do something with the data
          console.log("Document data:", docSnap.data());
          this.post = docSnap.data();
        } else {
          // Document does not exist
          console.log("No such document!");
        }
      } catch (error) {
        console.error('Error fetching post data: ', error)
      }
    }, */
  },
};
</script>
