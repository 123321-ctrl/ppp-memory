<script setup>
import { computed, ref } from "vue";
const memoryShow = ref(false);
const memoryText = ref("show");
const clientX = ref(0);
const clientY = ref(50);
const left = ref(-40)

const client = computed(() => {
  return {
    left: left.value + "px",
    top: clientY.value + "px",
  };
});
function isShow() {
  memoryShow.value = !memoryShow.value;
  if (memoryShow.value === false) {
    memoryText.value = "show";
  } else {
    memoryText.value = "hide";
  }
}

//容器：当被拖动的对象在另一对象容器范围内拖动时触发此事件
function dragover(e) {
  e.preventDefault();
}
//容器：在一个拖动过程中，释放鼠标键时触发此事件
function drop(e) {
  e.preventDefault();
  clientX.value = e.clientX;
  clientY.value = e.clientY;
  // e.target.appendChild(document.getElementById(data));
}
function mouseenter(){
  left.value = 0
}
function mouseout(){
  left.value = -40
}
</script>

<template>
  <div class="memory" @drop="drop($event)" @dragover="dragover($event)">
    <div
      id="circle"
      class="circle"
      :style="client"
      @click="isShow"
      draggable="true"
      @mouseenter="mouseenter"
      @mouseout="mouseout"
    >
      {{ memoryText }}
    </div>
    <div>
      <Header class="header"></Header>
      <div class="content" v-show="memoryShow">
        <EventBar class="left"></EventBar>
        <TaskBox class="right"></TaskBox>
      </div>
    </div>
  </div>
</template>

<style scoped>
.memory {
  width: 100%;
  height: 100vh;
}
.circle {
  position: absolute;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  background-color: pink;
  border-radius: 50%;
  transition: all 0.5s linear;
  font-size: 15px;
}
.header {
  height: 50px;
  background-color: rgba(255, 192, 203, 0.233);
}
.content {
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
}
.left {
  width: 20%;
  padding-top: 28px;
}
.right {
  width: 80%;
  flex: 1;
  padding: 4px 20px;
}
</style>
