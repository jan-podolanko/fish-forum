<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      hidden: true,
      symbol: "add",
    };
  },
});
</script>

<template>
  <div id="showCommentWrapper">
    <button id="showAddComment" class="material-symbols-outlined">
      {{ symbol }}
    </button>
  </div>
</template>

<style>
#showCommentWrapper {
  position: relative;
}
#showAddComment {
  border-radius: 6px;
  margin: 10px;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 12px;
  bottom: 12px;
}
</style>