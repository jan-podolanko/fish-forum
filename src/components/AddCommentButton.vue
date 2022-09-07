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
    <button>Submit</button>
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
  background-color: #000000;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 15px;
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
    border-radius: 10px;
  }
  button {
    margin-left: 10px;
  }
}

#showAddComment {
  border-radius: 30px;
  margin: 10px;
  width: 100px;
  height: 100px;
  position: fixed;
  right: 0;
  bottom: 0;
}
</style>
