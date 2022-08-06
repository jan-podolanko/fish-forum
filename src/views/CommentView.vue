<script lang="ts">
import PostComments from "@/components/PostComments.vue";
import { db } from "@/firebase/firebase";
import { onSnapshot, collection } from "@firebase/firestore";

export default {
  data() {
    return{
      comments: []
    }
  },
  components: {
    PostComments,
  },
  props: {
    id: String,
  },
  created(){
    this.getComments()
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
  }
};
</script>

<template>
  {{id}}
  <div v-for="comment in comments">
    <PostComments v-bind=comment />
  </div>
</template>