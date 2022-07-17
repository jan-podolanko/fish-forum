<script>
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { db } from "../firebase/firebase"
import { mapGetters } from "vuex";

export default {
  data(){
    return{
      form: {
        title: "",
        user: "",
        content: ""
      },
      currentDate: Timestamp.now()
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    submit() {
      addDoc(collection(db, "posts"), {
        title: this.form.title,
        user: this.user.data.displayName,
        content: this.form.content,
        date: Timestamp.now()
      })
    },
  },
}
</script>

<template>
  <form @submit.prevent="submit">
    <input required v-model="form.title" placeholder="Title" />
    <textarea required v-model="form.content" placeholder="Post content" />
    <button>Submit</button>
  </form>
</template>

<style>
form {
  width: 250px;
  padding: 20px;
  margin: auto;
  border: 3px solid black;
  border-radius: 10px;
  align-items: center;
}
form > * {
  font-family: "Jost", sans-serif;
  margin: 10px auto;
  display: block;
}
textarea {
  width: 90%;
  height: 100px;
  resize: none;
  font-family: "Jost", sans-serif;
}
</style>
