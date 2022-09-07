<script lang="ts">
import { db } from "@/firebase/firebase";
import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
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
  },
  methods: {
    deletePost(post: string) {
      deleteDoc(doc(db, "posts", post));
    },
    upvotePost(post: string) {
      updateDoc(doc(db, "posts", post), {
        rating: increment(1),
      });
    },
    downvotePost(post: string) {
      updateDoc(doc(db, "posts", post), {
        rating: increment(-1),
      });
    },
  },
};
</script>

<template>
  <div id="postBody">
    <div id="postHeading">
      <RouterLink id="postTitle" :to="'/comments/' + id">
        {{ title }}
      </RouterLink>
      <div id="ratingBox">
        <span id="rating"> rated {{ rating }}</span>
        <button
          @click="upvotePost(id)"
          class="material-symbols-outlined voteButton"
        >
          arrow_upward
        </button>
        <button
          @click="downvotePost(id)"
          class="material-symbols-outlined voteButton"
        >
          arrow_downward
        </button>
      </div>
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
  width: 90%;
  border-radius: 6px;
  background-color: darken($light-mode-light, 5%);
  margin: 15px;
  border-right: 2px solid $on-light-mode;
  border-bottom: 2px solid $on-light-mode;
}
#postHeading {
  background-color: $light-mode-light;
  position: relative;
  color: $on-light-mode;
  padding: 10px 10px 5px 10px;
  border-radius: 6px;
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
  right: 10px;
  top: 10px;
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
#rating {
  vertical-align: top;
}
#ratingBox {
  margin-top: 3px;
  margin-bottom: 3px;
}
</style>
