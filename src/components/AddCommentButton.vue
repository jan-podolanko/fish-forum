<script lang="ts">
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { db } from "../firebase/firebase";

export default defineComponent({
  data() {
    return {
      form: {
        user: "",
        content: "",
      },
      hidden: true,
      symbol: "add",
    };
  },
  props: {
    id: String,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    addComment() {
      addDoc(collection(db, "posts", this.id, "comments"), {
        username: this.user.data.displayName,
        email: this.user.data.email,
        content: this.form.content,
        date: Timestamp.now(),
        rating: 1,
        upvotedby: [],
      });
      console.log(this.id);
    },
    changeVisibility() {
      this.hidden = !this.hidden;
      this.symbol = this.symbol == "add" ? "close" : "add";
    },
  },
});
</script>

<template>
  <form v-show="!hidden" id="addComment" @submit.prevent="addComment">
    <textarea
      id="commentContent"
      required
      v-model="form.content"
      placeholder="Comment here"
    />
    <button class="material-symbols-outlined">send</button>
  </form>
  <button
    id="showAddComment"
    class="material-symbols-outlined"
    @click="changeVisibility"
  >
    {{ symbol }}
  </button>
</template>

<style lang="scss">
@import "../assets/colors.scss";

#addComment {
  background-color: $light-mode-medium;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  padding: 15px;
  border-top: 2px solid black;
  #commentContent {
    padding: {
      top: 3px;
      left: 5px;
      right: 5px;
    }
    height: 50px;
    width: 50%;
    margin-left: 0;
    resize: none;
    font-family: "Jost", sans-serif;
    border-radius: 6px;
  }
  button {
    margin-left: 10px;
    height: 56px;
    position: fixed;
  }
}

#showAddComment {
  border-radius: 6px;
  margin: 10px;
  width: 80px;
  height: 80px;
  position: fixed;
  right: 0;
  bottom: 0;
}
</style>
