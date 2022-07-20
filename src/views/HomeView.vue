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
      posts: []
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
  }
};
</script>

<template>
  <main>
    <div v-for="post1 in posts">
      <UserPost v-bind="post1" />
    </div>
  </main>
</template>