<script lang="ts">
import { db } from "@/firebase/firebase";
import { arrayRemove, arrayUnion, deleteDoc, doc, increment, updateDoc } from "@firebase/firestore";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  props: {
    postid: String,
    commentid: String,
    useremail: String,
    username: String,
    date: Date,
    content: String,
    rating: Number,
    upvotedby: Array,
    downvotedby: Array,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    deleteComment() {
      //@ts-ignore
      deleteDoc(doc(db, "posts", this.postid, "comments", this.commentid));
    },
    upvoteComment() {
      if(!this.upvotedby.includes(this.user.data.id)){
        //@ts-ignore
        updateDoc(doc(db, "posts", this.postid, "comments", this.commentid), {
          rating: increment(1),
          upvotedby: arrayUnion(this.user.data.id),
          downvotedby: arrayRemove(this.user.data.id),
        })};
    },
    downvoteComment() {
      if(!this.downvotedby.includes(this.user.data.id)){
        //@ts-ignore
        updateDoc(doc(db, "posts", this.postid, "comments", this.commentid), {
          rating: increment(-1),
          downvotedby: arrayUnion(this.user.data.id),
          upvotedby: arrayRemove(this.user.data.id),
        })};
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
      <button
        v-if="user.data.email == useremail"
        @click="deleteComment()"
        id="deleteButton"
        class="material-symbols-outlined"
      >
        delete
      </button>
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
#deleteButton {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 20;
}
</style>
