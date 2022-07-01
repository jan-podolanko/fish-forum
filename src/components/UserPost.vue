<script lang="ts">
export default {
  data() {
    return {
      postVisible: false,
    };
  },
  props: {
    title: String,
    date: String,
    content: String,
  },
};
</script>

<template>
  <div id="postBody">
    <div id="postHeading">
      <div id="postTitle">{{ title }}</div>
      <div id="postDate">Posted {{ date }}</div>
      <button
        id="expandButton"
        class="material-symbols-outlined"
        @click="
          postVisible = !postVisible;
          changeButton();
        "
      >
        <div v-if="!postVisible">expand_more</div>
        <div v-else>expand_less</div>
      </button>
    </div>
    <div v-if="postVisible" id="postContent">
      <div>{{ content }}</div>
    </div>
  </div>
</template>

<style>
#postBody {
  width: 300px;
  padding: 20px;
  margin: auto;
  border: 3px solid black;
  border-radius: 10px;
}
#postHeading {
  background-color: lightgrey;
  padding: 10px;
  border-radius: 10px;
}
#postContent {
  padding-top: 10px;
}
#postTitle {
  font-size: 2em;
}
#expandButton {
  background-color: orange;
  border-radius: 10px;
}
#postDate {
  font-size: 0.8em;
}
</style>
