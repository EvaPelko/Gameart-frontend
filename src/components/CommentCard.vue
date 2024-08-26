<template>
  <div style="background-color: #ebe2b4; padding: 10px">
    <div class="d-flex flex-row bg-surface-variant">
      <v-sheet class="transparent-sheet"
        ><a href="#">
          <v-avatar class="ma-4" size="50">
            <v-img :src="User"></v-img>
          </v-avatar> </a
      ></v-sheet>
      <v-sheet class="transparent-sheet">
        <p class="text-left mt-6">{{ info.email }}</p>
      </v-sheet>
    </div>
    <p class="text-left roboto-font mx-15">{{ info.text }}</p>
    <p class="text-left roboto-font mx-15">{{ postedFromNow }}</p>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      User: require("@/assets/User.jpg"),
    };
  },
  name: "CommentCard",
  props: ["info"],
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
};
</script>
