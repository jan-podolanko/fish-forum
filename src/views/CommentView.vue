<script lang="ts">
import AddCommentButton from "@/components/AddCommentButton.vue";
import AddCommentMenu from "@/components/AddCommentMenu.vue";
import PostComment from "@/components/PostComment.vue";
import { db } from "@/firebase/firebase";
import { collection, doc, getDoc, onSnapshot } from "@firebase/firestore";
import { defineComponent } from "vue";
import UserPost from "../components/UserPost.vue";

export default defineComponent({
  data() {
    return {
      comments: [] as any[],
      post: {} as any[],
      hasData: false,
      hidden: true,
      symbol: "add",
      filtering: "",
      showFilter: false,
    };
  },
  components: {
    PostComment,
    UserPost,
    AddCommentButton,
    AddCommentMenu,
  },
  props: {
    id: String,
  },
  created() {
    this.getComments();
    this.getPost();
  },
  methods: {
    getComments() {
      //@ts-ignore
      onSnapshot(collection(db, "posts", this.id, "comments"), (querySnapshot) => {
          this.comments = [];
          querySnapshot.forEach((doc) => {
            this.comments.push({
              postid: this.id,
              commentid: doc.id,
              useremail: doc.data().email,
              username: doc.data().username,
              date: doc.data().date.toDate(),
              content: doc.data().content,
              rating: doc.data().rating,
              upvotedby: doc.data().upvotedby,
              downvotedby: doc.data().downvotedby,
            });
            console.log(doc.data());
          });
        }
      );
    },
    async getPost() {
      //@ts-ignore
      await getDoc(doc(db, "posts", this.id)).then((result) => {
        this.post = [];
        this.post.push({
          id: result.id,
          title: result.data()?.title,
          author: result.data()?.user,
          date: result.data()?.date.toDate(),
          content: result.data()?.content,
          email: result.data()?.email,
          rating: result.data()?.rating,
          upvotedby: result.data()?.upvotedby,
        });
        this.hasData = true;
        this.comments.sort(this.sortByDateDesc);
      });
    },
    sortByDateAsc(a: { date: number }, b: { date: number }) {
      return a.date - b.date;
    },
    sortByDateDesc(a: { date: number }, b: { date: number }) {
      return b.date - a.date;
    },
    sortByRatingAsc(a: { rating: number }, b: { rating: number }) {
      return a.rating - b.rating;
    },
    sortByRatingDesc(a: { rating: number }, b: { rating: number }) {
      return b.rating - a.rating;
    },
    changeVisibility() {
      this.hidden = !this.hidden;
      this.symbol = this.symbol == "add" ? "close" : "add";
    },
    searchForComment() {
      return this.comments.filter((comment) => comment.content.toLowerCase().includes(this.filtering));
    },
  },
});
</script>

<template>
  <UserPost v-if="hasData" v-bind="post[0]" />
  <AddCommentButton @click="changeVisibility" :symbol="symbol" />
  <AddCommentMenu v-show="!hidden" v-bind="post[0]" />
  <div id="sortBox">
    <span>Sort {{ comments.length }} comments: </span>
    <button class="sortButton" @click="comments.sort(sortByDateAsc)">
      By date, ascending
    </button>
    <button class="sortButton" @click="comments.sort(sortByDateDesc)">
      By date, descending
    </button>
    <button class="sortButton" @click="comments.sort(sortByRatingAsc)">
      By rating, ascending
    </button>
    <button class="sortButton" @click="comments.sort(sortByRatingDesc)">
      By rating, descending
    </button>
    <button class="sortButton" @click="showFilter = !showFilter">
      Search
      <span id="searchSymbol" class="material-symbols-outlined">search</span>
    </button>
    <div id="searchBox" v-show="showFilter">
      <input id="search" v-model="filtering" />
    </div>
  </div>
  <div id="comments" v-for="comment in searchForComment()" :key="comment">
    <PostComment v-bind="comment" />
  </div>
</template>

<style lang="scss">
@import "../assets/colors.scss";

.sortButton {
  margin-left: 10px;
  margin-top: 10px;
}
#sortBox {
  margin-left: 20px;
}
#showCommentWrapper {
  position: relative;
}
#showAddComment {
  border-radius: 6px;
  margin: 10px;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 12px;
  bottom: 12px;
}
#searchSymbol {
  font-size: 16px;
  margin-left: 0;
  vertical-align: -2.8px;
}
#search {
  border: 0;
  border-bottom: 2px solid $primary;
  background-color: $light-mode-light;
  display: inline-block;
  outline: 0;
  width: 100%;
  text-align: center;
  font-family: "Jost", sans-serif;
  font-size: large;
}
#searchBox {
  padding: 10px;
  display: block;
  text-align: center;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-radius: 6px;
  width: auto;
  background-color: $light-mode-light;
  margin: 15px;
  margin-left: 0;
}
</style>
