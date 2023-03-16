<script lang="ts">
import UserPost from "@/components/UserPost.vue";
import NotLoggedIn from "@/components/NotLoggedIn.vue";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { db } from "../firebase/firebase";
import PostComment from "@/components/PostComment.vue";

export default defineComponent({
  components: {
    UserPost,
    NotLoggedIn,
    PostComment,
},
  data() {
    return {
      posts: [] as any[],
      comments: [] as any[],
      sorting: null,
      filtering: "",
      showFilter: false,
      userName: "",
      userEmail: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  props: {
    userId: String,
  },
  created() {
    this.getPosts();
    this.getUser();
    this.getComments();
  },
  methods: {
    getPosts() {
      onSnapshot(query(collection(db, "posts"), where("userId", "==", this.userId)), (querySnapshot) => {
        this.posts = [];
        querySnapshot.forEach((doc) => {
          this.posts.push({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().userName,
            date: doc.data().date.toDate(),
            content: doc.data().content,
            email: doc.data().userEmail,
            userId: doc.data().userId,
            rating: doc.data().rating,
            upvotedBy: doc.data().upvotedBy,
            downvotedBy: doc.data().downvotedBy,
            homeView: true,
          });
        });
        this.posts.sort(this.sortByDateDesc);
      });
    },
    getComments() {
      onSnapshot(query(collection(db, "comments"), where("userId", "==", this.userId)), (querySnapshot) => {
        this.comments = [];
          querySnapshot.forEach((doc) => {
            this.comments.push({
              postId: doc.data().postId,
              commentId: doc.id,
              userId: doc.data().userId,
              userEmail: doc.data().userEmail,
              userName: doc.data().userName,
              date: doc.data().date.toDate(),
              content: doc.data().content,
              rating: doc.data().rating,
              upvotedBy: doc.data().upvotedBy,
              downvotedBy: doc.data().downvotedBy,
            });
          });
        });
        this.comments.sort(this.sortByDateDesc);
    },
    async getUser() {
      await getDoc(doc(db, "users", this.userId)).then((result) => {
        this.userName = result.data().userName;
        this.userEmail = result.data().userEmail;
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
    searchForPost() {
      return this.posts.filter((post) => post.content.toLowerCase().includes(this.filtering) || post.title.toLowerCase().includes(this.filtering) );
    },
    searchForComment() {
      return this.comments.filter((post) => post.content.toLowerCase().includes(this.filtering));
    },
  },
});
</script>

<template>
    <div> Posts by {{ userName }}</div>
  <div v-if="user.loggedIn">
    <span>Sort by: </span>
    <button class="sort-button" @click="posts.sort(sortByDateAsc)">
      By date, ascending
    </button>
    <button class="sort-button" @click="posts.sort(sortByDateDesc)">
      By date, descending
    </button>
    <button class="sort-button" @click="posts.sort(sortByRatingAsc)">
      By rating, ascending
    </button>
    <button class="sort-button" @click="posts.sort(sortByRatingDesc)">
      By rating, descending
    </button>
    <button class="sort-button" @click="showFilter = !showFilter">
      Search
      <span class="material-symbols-outlined">search</span>
    </button>
    <div id="search-box" v-show="showFilter">
      <div>Search:</div>
      <input id="search" v-model="filtering" />
    </div>
    <main>
      <div v-for="post1 in searchForPost()" :key="post1.id">
        <UserPost v-bind="post1" />
      </div>
      <div v-for="comment in searchForComment()" :key="comment.id">
        <PostComment v-bind="comment" />
      </div>
    </main>
  </div>
  <div v-else id="not-logged-in">
    <NotLoggedIn />
  </div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

.sort-button {
  margin-left: 10px;
  margin-top: 10px;
  font-family: "Jost", sans-serif;
}
button {
  background-color: $primary;
  border-radius: 6px;
  color: $on-primary;
  border: 0;
  vertical-align: center;
  font-size: medium;
}
button > span {
  font-size: medium;
  margin-left: 0;
  vertical-align: -2.8px;
}
button:hover {
  background-color: $primary-dark;
  color: $on-primary-dark;
  cursor: pointer;
}
span {
  margin-left: 15px;
}
#not-logged-in {
  margin: {
    top: 20%;
  }
  text-align: center;
  font-size: xx-large;
}
.nav-link {
  background-color: $primary;
  color: $on-primary;
  font-size: xx-large;
  padding: 5px 10px;
  letter-spacing: 3px;
  border-radius: 6px;
  text-decoration: none;
  border: 0;
  text-align: center;
  display: block;
  max-width: fit-content;
  margin: auto;
}
.nav-link:hover {
  background-color: $primary-dark;
  color: $on-primary-dark;
  cursor: pointer;
}
#logo {
  font-size: 50px;
  user-select: none;
}
#search {
  border: 0;
  border-bottom: 2px solid $primary;
  background-color: $light-mode-light;
  outline: 0;
  font-family: "Jost", sans-serif;
  font-size: large;
  text-align: left;
  margin-left: 10px;
  width: 90%;
}
#search-box {
  padding: 10px;
  display: block;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-radius: 6px;
  background-color: $light-mode-light;
  margin: 15px;
}
#search-box > * {
  display: inline;
}
</style>
