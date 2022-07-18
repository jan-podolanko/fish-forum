<script lang="ts">
import { mapGetters } from "vuex";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default {
  data() {
    return {
      postVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  props: {
    id: String,
    title: String,
    author: String,
    date: Date,
    content: String,
    email: String,
  },
  methods: {
    deletePost(post: string){
      deleteDoc(doc(db, "posts", post));
    }
  }
};
</script>

<template>
  <div id="postBody">
    <div id="postHeading">
      <div id="postTitle">{{ title }}</div>
      <div id="postDetails">
        <button
          id="expandButton"
          class="material-symbols-outlined"
          @click="postVisible = !postVisible"
        >
          <div v-if="!postVisible">expand_more</div>
          <div v-else>expand_less</div>
        </button>
        <div id="postData">Posted {{ date }} by {{ author }}</div>
      </div>
      <button 
        v-if="user.data.email == email" 
        @click="deletePost(id)"
        id="deleteButton"
        class="material-symbols-outlined"
      >
        delete
      </button>
    </div>
    <div v-if="postVisible" id="postContent">
      <div>{{ content }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

#postBody {
  width: auto;
  border: 2px solid black;
  border-radius: 10px;
  background-color: $light-mode-medium;
  margin-top: 15px;
  margin-left: 30px;
  margin-right: 200px;
}
#postHeading {
  background-color: $light-mode-light;
  position: relative;
  color: $on-light-mode;
  padding: 10px 10px 5px 10px;
  border-radius: 10px;
  border-bottom: 2px solid $on-light-mode;
}
#postContent {
  padding: 10px;
}
#postTitle {
  font-size: 2em;
}
button {
  background-color: $primary;
  border-radius: 7px;
  color: $on-primary;
  border: 0;
}
button:hover {
  background-color: $primary-dark;
  color: $on-primary-dark;
  cursor: pointer;
}
#postData {
  font-size: 0.8em;
  display: inline-block;
  padding-left: 10px;
  vertical-align: top;
}
#postDetails {
  width: 100%;
}
#deleteButton {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
