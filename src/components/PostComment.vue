<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    postid: String,
    useremail: String,
    username: String,
    date: Date,
    content: String,
  }
})
</script>

<template>
<div id="comment">
  <div id="commentHeading">
    <div id="commentUsername">
      {{username}}
    </div>
    <div id="commentDate">
      Posted on: {{date}}
    </div>
  </div>
  <div id="commentContent">
    {{content}}
  </div>
</div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss"; 

#comment {
  width: auto;
  background-color: $light-mode-medium;
  margin: 15px;
  border-radius: 10px;
  border: 2px solid black
}
#commentHeading {
  background-color: $light-mode-light;
  position: relative;
  color: $on-light-mode;
  padding: 10px 10px 5px 10px;
  border-radius: 10px;
}
#commentUsername {
  font-weight: bold;
}
#commentDate {
  font-size: small
}
#commentContent {
  padding: 10px;
}
</style>