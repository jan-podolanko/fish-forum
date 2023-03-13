<script lang="ts">
import { db } from "@/firebase/firebase";
import { arrayRemove, arrayUnion, deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      postVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
    changedId(){
      return this.id ? this.id : ""
    }
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
});
</script>

<template>
  <div id="post-body">
    <div class="rating-box">
    <button
      @click="upvotePost(changedId)"
      class="material-symbols-outlined voteButton"
      id="upvote"
    >
      arrow_upward
    </button>
    <div id="rating">{{ rating }}</div>
    <button
      @click="downvotePost(changedId)"
      class="material-symbols-outlined voteButton"
      id="downvote"
    >
      arrow_downward
    </button>
  </div>
    <div id="post-heading">
      <RouterLink id="post-title" :to="'/comments/' + id">
        {{ title }}
      </RouterLink>
      <div id="post-details">
        <button
          id="expand-button"
          class="material-symbols-outlined"
          @click="postVisible = !postVisible"
        >
          <div v-if="!postVisible">expand_more</div>
          <div v-else>expand_less</div>
        </button>
        <div id="post-data">Posted {{ date }} by {{ author }}</div>
      </div>
      <button
        v-if="user.data.email == email"
        @click="deletePost(changedId)"
        id="deleteButton"
        class="material-symbols-outlined"
      >
        delete
      </button>
    </div>
    <div v-if="postVisible" id="post-content">
      <div>{{ content }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

#post-body {
  border-radius: 6px;
  width: auto;
  background-color: $light-mode-light;
  margin: 15px;
  border-bottom: 2px solid $on-light-mode;
  border-right: 2px solid $on-light-mode;
}
#post-heading {
  background-color: $light-mode-light;
  position: relative;
  color: $on-light-mode;
  padding: 10px 10px 5px 10px;
  border-radius: 6px;
  left: 50px;
  width: calc(100% - 70px);
}
#post-content {
  margin: 15px;
}
#post-title {
  font-size: 2em;
  color: black;
  text-decoration: none;
}
#post-title:hover {
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
#post-data {
  font-size: 0.8em;
  padding-left: 10px;
  vertical-align: top;
  width: calc(100% - 50px);
}
#post-details > * {
  display: inline-grid;
  vertical-align: middle;
}
#expand-button {
  width: 40px;
}

#deleteButton {
  position: absolute;
  right: 7px;
  top: 7px;
  background-color: $danger;
  color: white;
}
.voteButton {
  font-size: 20px;
}
.rating-box {
  margin-top: 7px;
  margin-bottom: 3px;
  left: 25px;
  position: absolute;
}
.rating-box > * {
  display: grid;
  margin: 2px;
  text-align: center;
  vertical-align: middle;
}

</style>
