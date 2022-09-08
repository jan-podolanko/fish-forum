<script lang="ts">
import { db } from "@/firebase/firebase";
import { deleteDoc, doc, increment, updateDoc } from "@firebase/firestore";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    postid: String,
    commentid: String,
    useremail: String,
    username: String,
    date: Date,
    content: String,
    rating: Number,
    upvoteby: Array,
  },
  methods: {
    deletePost() {
      deleteDoc(doc(db, "posts", this.postid, "comments", this.commentid));
    },
    upvoteComment() {
      updateDoc(doc(db, "posts", this.postid, "comments", this.commentid), {
        rating: increment(1),
      });
    },
    downvoteComment() {
      updateDoc(doc(db, "posts", this.postid, "comments", this.commentid), {
        rating: increment(-1),
      });
    },
  },
});
</script>

<template>
  <div id="comment">
    <div id="commentHeading">
      <div id="ratingBox">
        <button
          @click="upvoteComment()"
          class="material-symbols-outlined voteButton"
          id="upvote"
        >
          arrow_upward
        </button>
        <button
          @click="downvoteComment()"
          class="material-symbols-outlined voteButton"
          id="downvote"
        >
          arrow_downward
        </button>
      </div>
      <div id="commentData">
        <div id="commentUsername">
          {{ username }}
        </div>
        <span id="rating"> Comment rated {{ rating }}</span>
        <div id="commentDate">Posted on: {{ date }}</div>
      </div>
    </div>
    <div id="commentContent">
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
#commentHeading {
  background-color: $light-mode-light;
  position: relative;
  color: $on-light-mode;
  padding: 10px 10px 5px 10px;
  border-radius: 6px;
}
#commentUsername {
  font-weight: bold;
  width: fit-content;
  float: left;
  display: inline;
}
#commentData {
  position: relative;
  left: 35px;
  width: calc(100% - 50px);
}
#commentDate {
  font-size: small;
  clear: left;
}
#commentContent {
  padding: 10px;
  position: relative;
}
#rating {
  font-size: small;
  margin-left: 10px;
}
.voteButton {
  font-size: 18px;
}
#ratingBox {
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
</style>
