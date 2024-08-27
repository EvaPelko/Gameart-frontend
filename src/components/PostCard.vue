<template>
  <v-card
    @click="navigateToPost"
    exact
    tile
    height="350px"
    max-width="800"
    color="#EBE2B4"
    class="mx-auto my-12"
  >
    <div class="d-flex">
      <div>
        <v-responsive class="ma-4">
          <v-img
            :src="constructImageUrl(info.url)"
            alt="Responsive Image"
            class="mx-auto"
            max-width="320px"
            :class="{ 'shrink-img': isSmallScreen }"
          ></v-img>
        </v-responsive>
      </div>
      <div>
        <br />
        <v-card-title>{{ info.title }}</v-card-title>
        <v-card-text class="text-left roboto-font text-subtitle-1">
          {{
            info.text.substring(0, 150) + (info.text.length > 150 ? "..." : "")
          }}<span style="color: #216ee1"> Read more</span>
        </v-card-text>
        <v-card-subtitle>{{ info.email }}</v-card-subtitle>
        <v-card-subtitle>{{ postedFromNow }}</v-card-subtitle>
        <!-- Delete Button -->
        <v-btn
          v-if="isMyProfileView"
          icon
          @click.stop="deletePost"
          style="position: absolute; top: 10px; right: 10px"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import moment from "moment";
import store from "@/store";
import { Posts, Users } from "@/services";

export default {
  name: "PostCard",

  data() {
    return {
      imageUrl: "path-to-your-image.jpg",
      isSmallScreen: false,
      userProfileType: null,
    };
  },
  props: ["info"],
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },

    isMyProfileView() {
      return this.$route.name === "my-profile-view";
    },
  },
  methods: {
    constructImageUrl(relativeUrl) {
      // Log the relativeUrl to debug where it might be coming from
      console.log("Relative URL:", relativeUrl);

      if (relativeUrl.startsWith("http://localhost:3000")) {
        relativeUrl = relativeUrl.replace("http://localhost:3000", "");
      }

      if (relativeUrl.startsWith("http")) {
        return relativeUrl; // Already an absolute URL
      }

      const fullUrl = `https://gameart-backend-production.up.railway.app${relativeUrl}`;
      console.log("Constructed Image URL:", fullUrl); // Debugging log
      return fullUrl;
    },
    async fetchUserProfileType() {
      try {
        const response = await Users.GetUserProfileType(this.info.email);
        this.userProfileType = response.profileType;
      } catch (error) {
        console.error("Error fetching user profile type:", error);
      }
    },
    checkScreenSize() {
      this.isSmallScreen = this.$vuetify.breakpoint.smAndDown;
    },
    async deletePost() {
      try {
        // Confirm deletion with the user
        if (confirm("Are you sure you want to delete this post?")) {
          // Send delete request to the backend
          await Posts.DeletePost(this.info.id); // Make sure this.info.id is a valid ObjectId string

          alert("Post deleted successfully");
          this.$emit("delete-post", this.info.id); // Emit event after deletion
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post");
      }
    },
    navigateToPost() {
      // Only navigate if the delete button was not clicked
      if (this.$route.name === "teacher-feed-view") {
        this.$router.push({
          name: "post-view",
          params: { postId: this.info.id },
        });
      } else if (this.$route.name === "student-feed-view") {
        this.$router.push({
          name: "student-post-view",
          params: { postId: this.info.id },
        });
      } else if (this.$route.name === "my-profile-view") {
        if (store.profileType === "Teacher") {
          this.$router.push({
            name: "post-view",
            params: { postId: this.info.id },
          });
        } else {
          this.$router.push({
            name: "student-post-view",
            params: { postId: this.info.id },
          });
        }
      } else {
        if (this.userProfileType === "Teacher") {
          this.$router.push({
            name: "post-view",
            params: { postId: this.info.id },
          });
        } else {
          this.$router.push({
            name: "student-post-view",
            params: { postId: this.info.id },
          });
        }
      }
    },
  },
  async mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
    await this.fetchUserProfileType(); // Fetch the profile type on mount
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  components: {},
};
</script>
