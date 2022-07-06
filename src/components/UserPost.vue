<script lang="ts">
export default {
  data() {
    return {
      postVisible: false,
    };
  },
  props: {
    title: String,
    author: String,
    date: String,
    content: String,
  },
};
</script>

<template>
  <div id="postBody">
    <div id="postHeading">
      <div id="postTitle">{{ title }}</div>
      <div id="postDetails">
        <button
          id="expandButton"
          class="material-symbols-outlined"
          @click="postVisible = !postVisible"
        >
          <div v-if="!postVisible">expand_more</div>
          <div v-else>expand_less</div>
        </button>
        <div id="postData">Posted {{ date }} by {{ author }}</div>
      </div>
    </div>
    <div v-if="postVisible" id="postContent">
      <div>{{ content }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

#postBody {
  width: 350px;
  margin: auto;
  border: 2px solid black;
  border-radius: 10px;
  background-color: $light-mode-medium;
}
#postHeading {
  background-color: $light-mode-light;
  color: $on-light-mode;
  padding: 10px 10px 5px 10px;
  border-radius: 10px;
  border-bottom: 2px solid $on-light-mode;
}
#postContent {
  padding: 10px;
}
#postTitle {
  font-size: 2em;
}
#expandButton {
  background-color: $primary;
  border-radius: 7px;
  color: $on-primary;
  border: 0;
}
#expandButton:hover {
  background-color: $primary-dark;
  color: $on-primary-dark;
  cursor: pointer;
}
#postData {
  font-size: 0.8em;
  display: inline-block;
  padding-left: 10px;
  vertical-align: top;
}
#postDetails {
  width: 100%;
}
</style>
