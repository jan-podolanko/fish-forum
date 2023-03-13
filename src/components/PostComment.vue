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
      if(!this.upvotedby?.includes(this.user.data.id)){
        //@ts-ignore
        updateDoc(doc(db, "posts", this.postid, "comments", this.commentid), {
          rating: increment(1),
          upvotedby: arrayUnion(this.user.data.id),
          downvotedby: arrayRemove(this.user.data.id),
        })};
    },
    downvoteComment() {
      if(!this.downvotedby?.includes(this.user.data.id)){
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
        v-if="user.data.email == useremail"
        @click="deleteComment()"
        class="material-symbols-outlined delete-button"
      >
        delete
      </button>
      <div id="comment-data">
        <div id="comment-username">
          {{ username }}
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
  right: 10px;
  top: 10px;
  z-index: 20;
}
.delete-button:hover {
  background-color: $danger !important;
  color: white;
}
</style>
