<script lang="ts">
import { db } from "@/firebase/firebase";
import { arrayRemove, arrayUnion, deleteDoc, doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { mapGetters } from "vuex";

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
    rating: Number,
    upvotedby: Array,
    downvotedby: Array,
  },
  methods: {
    deletePost(post: string): void {
      deleteDoc(doc(db, "posts", post));
    },
    upvotePost(post: string): void {
      if(!this.upvotedby?.includes(this.user.data.id)){
        updateDoc(doc(db, "posts", post), {
          rating: increment(1),
          upvotedby: arrayUnion(this.user.data.id),
          downvotedby: arrayRemove(this.user.data.id),
      });
      }
      
    },
    downvotePost(post: string): void {
      if(!this.downvotedby?.includes(this.user.data.id)){
        updateDoc(doc(db, "posts", post), {
          rating: increment(-1),
          downvotedby: arrayUnion(this.user.data.id),
          upvotedby: arrayRemove(this.user.data.id),
      });
    }},
  },
};
</script>

<template>
  <div id="postBody">
    <div id="ratingBox">
      <button
        @click="upvotePost(id)"
        class="material-symbols-outlined voteButton"
        id="upvote"
      >
        arrow_upward
      </button>
      <div id="rating">{{ rating }}</div>
      <button
        @click="downvotePost(id)"
        class="material-symbols-outlined voteButton"
        id="downvote"
      >
        arrow_downward
      </button>
    </div>
    <div id="postHeading">
      <RouterLink id="postTitle" :to="'/comments/' + id">
        {{ title }}
      </RouterLink>
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
  border-radius: 6px;
  width: auto;
  background-color: $light-mode-light;
  margin: 15px;
  border-bottom: 2px solid $on-light-mode;
  border-right: 2px solid $on-light-mode;
}
#postHeading {
  background-color: $light-mode-light;
  position: relative;
  color: $on-light-mode;
  padding: 10px 10px 5px 10px;
  border-radius: 6px;
  left: 50px;
  width: calc(100% - 70px);
}
#postContent {
  padding: 10px;
}
#postTitle {
  font-size: 2em;
  color: black;
  text-decoration: none;
}
#postTitle:hover {
  color: $primary-dark;
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
  width: calc(100% - 50px);
}
#postDetails {
  width: 100%;
}
#deleteButton {
  position: absolute;
  right: 7px;
  top: 7px;
}
.voteButton {
  display: inline;
  margin: {
    left: 5px;
  }
  font-size: 20px;
}
#expandButton {
  width: 40px;
}

#ratingBox {
  margin-top: 3px;
  margin-bottom: 3px;
  left: 20px;
  position: absolute;
}
#upvote {
  position: absolute;
  top: 5px;
}
#rating {
  margin-top: 30px;
  text-align: center;
  width: 41px;
}
#downvote {
  position: absolute;
  top: 55px;
}
</style>
