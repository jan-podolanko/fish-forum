<script lang="ts">
import UserPost from "@/components/UserPost.vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default {
  components: {
    UserPost,
  },
  data() {
    return {
      posts: [],
      sorting: null,
    };
  },
  created() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      onSnapshot(collection(db, "posts"), (querySnapshot) => {
        this.posts = [];
        querySnapshot.forEach((doc) => {
          this.posts.push({
          id: doc.id,
          title: doc.data().title,
          author: doc.data().user,
          date: doc.data().date.toDate(),
          content: doc.data().content,
          email: doc.data().email});
          console.log(doc.data())
        })
      });
    },
    sortByDateAsc(a: { date: number; },b: { date: number; }){
      return a.date - b.date
    },
    sortByDateDesc(a: { date: number; },b: { date: number; }){
      return b.date - a.date
    },
    sortByTitleAsc(a: { title: { toLowerCase: () => { (): any; new(): any; trim: { (): number; new(): any; }; }; }; },b: { title: { toLowerCase: () => { (): any; new(): any; trim: { (): number; new(): any; }; }; }; }){
      if(a.title.toLowerCase().trim() < b.title.toLowerCase().trim()) {return -1}
      if(a.title.toLowerCase().trim() > b.title.toLowerCase().trim()) {return 1}
      return 0
    },
    sortByTitleDesc(a: { title: { toLowerCase: () => { (): any; new(): any; trim: { (): number; new(): any; }; }; }; },b: { title: { toLowerCase: () => { (): any; new(): any; trim: { (): number; new(): any; }; }; }; }){
      if(a.title.toLowerCase().trim() < b.title.toLowerCase().trim()) {return 1}
      if(a.title.toLowerCase().trim() > b.title.toLowerCase().trim()) {return -1}
      return 0
    },
  }
};
</script>

<template>
<span>Sort by: </span>
<button class="sortButton" @click="posts.sort(sortByTitleAsc)">By title, ascending</button>
<button class="sortButton" @click="posts.sort(sortByTitleDesc)">By title, descending</button>
<button class="sortButton" @click="posts.sort(sortByDateAsc)">By date, ascending</button>
<button class="sortButton" @click="posts.sort(sortByDateDesc)">By date, descending</button>
  <main>
    <div v-for="post1 in posts">
      <UserPost v-bind="post1" />
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

.sortButton {
  margin-left: 10px;
  margin-top: 10px;
  font-family: "Jost", sans-serif;
}
button {
  background-color: $primary;
  border-radius: 7px;
  color: $on-primary;
  border: 0;
  vertical-align: center;
}
button:hover {
  background-color: $primary-dark;
  color: $on-primary-dark;
  cursor: pointer;
}
span {
  margin-left: 10px;
}
</style>