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
      post: {
        title: "Hello",
        author: "ja",
        date: "04.05.07",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
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
    }
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
