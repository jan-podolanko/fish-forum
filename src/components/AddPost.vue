<script>
</script>

<template>
  <form>
    <input placeholder="Title" />
    <textarea placeholder="Post content" />
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
