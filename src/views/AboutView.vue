<script>
import AddPost from "../components/AddPost.vue";

export default {
  components: {
    AddPost,
  },
};
</script>

<template>
  <AddPost />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
