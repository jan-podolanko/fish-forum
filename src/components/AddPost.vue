<template>
  <form id="formBody">
    <input placeholder="Title" />
    <textarea placeholder="Post content" />
    <button>Submit</button>
  </form>
</template>

<style>
#formBody {
  width: 300px;
  padding: 20px;
  margin: auto;
  border: 3px solid black;
  border-radius: 10px;
  align-items: center;
}
input {
  margin: 10px;
}
textarea {
  width: 90%;
  height: 100px;
  resize: none;
}
</style>
