<script lang="ts">
import { db } from "@/firebase/firebase";
import { onSnapshot, collection } from "@firebase/firestore";

export default {
  props: {
    postid: String,
    useremail: String,
    username: String,
    date: Date,
    content: String,
  }
}
</script>

<template>
<div> {{postid}}
{{username}}
{{content}}
</div>
</template>