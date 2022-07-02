<template>
  <form>
    <input placeholder="Login" />
    <input placeholder="Password" />
    <div id="buttons">
      <button>Login</button>
      <button>Register</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

form {
  max-width: 200px;
  padding: 10px;
  margin: auto;
  border: 3px solid black;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
}
form > * {
  font-family: "Jost", sans-serif;
}
input {
  margin: 10px auto;
  border: 0;
  border-bottom: 2px solid brown;
  background-color: lightgoldenrodyellow;
  display: block;
  outline: 0;
}
input:focus {
  border: 0px;
  outline: 0 !important;
  border-bottom: 2px solid red;
}
#buttons {
  display: block;
  text-align: center;

  button {
    background-color: burlywood;
    margin: 0px 5px;
    border: 0;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
  }
  button:hover {
    background-color: lightcoral;
    color: white;
    cursor: pointer;
  }
}
</style>
