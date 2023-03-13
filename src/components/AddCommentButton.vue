<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      hidden: true,
    };
  },
  props: {
    symbol: String,
  },
});
</script>

<template>
  <div id="show-comment-wrapper">
    <button id="show-add-comment" class="material-symbols-outlined">
      {{ symbol }}
    </button>
  </div>
</template>

<style>
#show-comment-wrapper {
  position: relative;
}
#show-add-comment {
  border-radius: 6px;
  margin: 10px;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 12px;
  bottom: 12px;
}
</style>
