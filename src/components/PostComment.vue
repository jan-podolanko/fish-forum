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
      <div id="commentUsername">
        {{ username }}
      </div>
      <div id="ratingBox">
        <span id="rating"> rated {{ rating }}</span>
        <button
          @click="upvoteComment()"
          class="material-symbols-outlined voteButton"
        >
          arrow_upward
        </button>
        <button
          @click="downvoteComment()"
          class="material-symbols-outlined voteButton"
        >
          arrow_downward
        </button>
      </div>
      <div id="commentDate">Posted on: {{ date }}</div>
    </div>
    <div id="commentContent">
      {{ content }}
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

#comment {
  width: 90%;
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
}
#commentDate {
  font-size: small;
}
#commentContent {
  padding: 10px;
}
#rating {
  font-size: small;
}
.voteButton {
  display: inline;
  margin: {
    left: 5px;
  }
  font-size: 18px;
}
</style>
