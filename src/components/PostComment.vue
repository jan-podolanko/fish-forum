<script lang="ts">
import { db } from "@/firebase/firebase";
import { arrayRemove, arrayUnion, deleteDoc, doc, increment, updateDoc } from "@firebase/firestore";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  props: {
    postId: String,
    commentId: String,
    userId: String,
    userEmail: String,
    userName: String,
    date: Date,
    content: String,
    rating: Number,
    upvotedBy: Array,
    downvotedBy: Array,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    deleteComment() {
      //@ts-ignore
      deleteDoc(doc(db, "comments", this.commentId));
    },
    upvoteComment() {
      if(!this.upvotedBy?.includes(this.user.data.id)){
        //@ts-ignore
        updateDoc(doc(db, "comments", this.commentId), {
          rating: increment(1),
          upvotedBy: arrayUnion(this.user.data.id),
          downvotedBy: arrayRemove(this.user.data.id),
        })};
    },
    downvoteComment() {
      if(!this.downvotedBy?.includes(this.user.data.id)){
        //@ts-ignore
        updateDoc(doc(db, "comments", this.commentId), {
          rating: increment(-1),
          downvotedBy: arrayUnion(this.user.data.id),
          upvotedBy: arrayRemove(this.user.data.id),
        })};
    },
  },
});
</script>

<template>
  <div id="comment">
    <div id="comment-heading">
      <div id="rating-box">
        <button
          @click="upvoteComment()"
          class="material-symbols-outlined vote-button"
          id="upvote"
        >
          arrow_upward
        </button>
        <button
          @click="downvoteComment()"
          class="material-symbols-outlined vote-button"
          id="downvote"
        >
          arrow_downward
        </button>
      </div>
      <button
        v-if="user.data.id == userId"
        @click="deleteComment()"
        class="material-symbols-outlined delete-button"
      >
        delete
      </button>
      <div id="comment-data">
        <div id="comment-username">
          {{ userName }}
        </div>
        <span id="rating"> Comment rated {{ rating }}</span>
        <div id="comment-date">Posted on: {{ date }}</div>
      </div>
    </div>
    <div id="comment-content">
      {{ content }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

#comment {
  background-color: $light-mode-light;
  margin: 15px;
  border-radius: 6px;
  border-right: 2px solid $on-light-mode;
  border-bottom: 2px solid $on-light-mode;
}
#comment-heading {
  background-color: $light-mode-light;
  position: relative;
  color: $on-light-mode;
  padding: 10px 10px 5px 10px;
  border-radius: 6px;
}
#comment-username {
  font-weight: bold;
  width: fit-content;
  float: left;
  display: inline;
}
#comment-data {
  position: relative;
  left: 35px;
  width: calc(100% - 50px);
}
#comment-date {
  font-size: small;
  clear: left;
}
#comment-content {
  padding: 10px;
  position: relative;
}
#rating {
  font-size: small;
  margin-left: 10px;
}
.vote-button {
  font-size: 18px;
}
#rating-box {
  float: left;
  display: inline;
}
#upvote {
  position: absolute;
}
#downvote {
  position: absolute;
  top: 35px;
}
.delete-button {
  position: absolute;
  right: 7px;
  top: 7px;
  z-index: 20;
}
.delete-button:hover {
  background-color: $danger !important;
  color: white;
}
</style>
