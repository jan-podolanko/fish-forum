<script lang="ts">
import EditAccount from "@/components/EditAccount.vue";
export default {
  components: {
    EditAccount,
  },
};
</script>

<template>
  <div>
    <EditAccount />
  </div>
</template>

<style lang="scss">
@import "../assets/colors.scss";
#message {
  margin: {
    top: 10px;
    left: auto;
    right: auto;
  }
  border: 3px solid black;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: darken($light-mode-light, 5%);
  text-align: center;
  width: 200px;
  padding: 10px;
}
</style>
