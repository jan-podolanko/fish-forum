<script lang="ts">
import AddCommentButton from "@/components/AddCommentButton.vue";
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
    };
  },
  components: {
    PostComment,
    UserPost,
    AddCommentButton,
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
      onSnapshot(collection(db, "posts", this.id, "comments"), (querySnapshot) => {
          this.comments = [];
          querySnapshot.forEach((doc) => {
            this.comments.push({
              postid: this.id,
              commentid: doc.id,
              useremail: doc.data().useremail,
              username: doc.data().username,
              date: doc.data().date.toDate(),
              content: doc.data().content,
              rating: doc.data().rating,
              upvotedby: doc.data().upvotedby,
            });
            console.log(doc.data());
          });
        }
      );
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
          email: result.data()?.email,
          rating: result.data()?.rating,
          upvotedby: result.data()?.upvotedby,
        });
        console.log(result.data());
      });
    },
  },
});
</script>

<template>
  <UserPost v-bind="post[0]" />
  <div id="comments" v-for="comment in comments" :key="comment">
    <PostComment v-bind="comment" />
  </div>
  <AddCommentButton v-bind="post[0]" />
</template>
