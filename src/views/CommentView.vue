<script lang="ts">
import PostComment from "@/components/PostComment.vue";
import { db } from "@/firebase/firebase";
import { onSnapshot, collection, getDoc, doc } from "@firebase/firestore";
import { defineComponent } from "vue";
import UserPost from "../components/UserPost.vue";

export default defineComponent({
  data() {
    return{
      comments: [] as any[],
      post: {} as any[]
    }
  },
  components: {
    PostComment,
    UserPost
  },
  props: {
    id: String,
  },
  created(){
    this.getComments();
    this.getPost();
  },
  methods: {
    getComments() {
      onSnapshot(collection(db, "posts", this.id, "comments"), (querySnapshot) => {
        this.comments = [];
        querySnapshot.forEach((doc) => {
          this.comments.push({
          postid: doc.id,
          useremail: doc.data().useremail,
          username: doc.data().username,
          date: doc.data().date.toDate(),
          content: doc.data().content})
          console.log(doc.data())
        })
      });
    },
    async getPost() {
      await getDoc(doc(db, "posts", this.id)).then((result) => {
        this.post = [];
        this.post.push({
          id: result.id,
          title: result.data()?.title,
          author: result.data()?.user,
          date: result.data()?.date.toDate(),
          content: result.data()?.content,
          email: result.data()?.email})
          console.log(result.data())
      });
    }
  },
});
</script>

<template>
  <UserPost v-bind=post[0] />
  <div id="comments" v-for="comment in comments">
    <PostComment v-bind=comment />
  </div>
</template>
