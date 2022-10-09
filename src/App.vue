<script setup>
import EventBar from "./components/EventBar/EventBar.vue";
import TaskBox from "./components/TaskBox/TaskBox.vue";
import Header from "./components/Header/Header.vue";
</script>

<template>
  <div class="memory">
    <Header class="header"></Header>
    <div class="content">
      <EventBar class="left"></EventBar>
      <TaskBox class="right"></TaskBox>
    </div>
  </div>
</template>

<style scoped>
.memory {
  width: 100%;
  height: 100vh;
}
.header{
  height: 50px;
  background-color: pink;
}
.content{
  height: calc(100% - 50px);
  display: flex;
}
.left {
  width: 20%;
  padding-top: 28px;
}
.right {
  flex: 1;
  padding: 33px 20px;
}
</style>
