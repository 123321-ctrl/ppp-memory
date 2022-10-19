<script setup>
import { ElMessage } from "element-plus";
import { ref, computed, onMounted } from "vue";
import { store } from "../../store";

const curevent = ref({});
const curIndex = ref(0);
const titles = ref([]);
const localTitles = computed(() => {
  const data = localStorage.getItem("title");
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
});

onMounted(() => {
  titles.value = localTitles.value;
});

function toAllTask() {
  store.currentID = 0;
  store.currentTitle = "ALL Tasks";
}
function addEvent() {
  // console.log(titles.value);
  const title = prompt("Enter the Title:");
  if (title.length === 0) {
    ElMessage.error("不能为空哦");
    return;
  }
  titles.value.push({
    id: new Date().getTime(),
    title: title,
  });
  localStorage.setItem("title", JSON.stringify(titles.value));
}
function currentEvent(id, index) {
  curIndex.value = index + 1;
  //解构
  [curevent.value] = titles.value.filter((item) => {
    return item.id === id;
  });
  store.currentID = curevent.value.id;
  store.currentTitle = curevent.value.title;
}
function deleteItem(index, id) {
  titles.value.splice(index, 1);
  localStorage.setItem("title", JSON.stringify(titles.value));
  localStorage.removeItem(id);
}
</script>
    
<template>
  <div class="eventBar">
    <h3 class="title">memory</h3>
    <button class="btnclass" @click="addEvent">+</button>
    <div class="event-content">
      <div @click="toAllTask" class="allTask">ALL Task：</div>
      <div
        v-for="(item, index) in titles"
        :key="item.id"
        :class="['event-item', curIndex === index + 1 ? 'active' : '']"
        @click="currentEvent(item.id, index)"
      >
        <span>{{ item.title }}</span>
        <span @click="deleteItem(index, item.id)"
          ><i class="icon iconfont icon-shanchu deleteicon"></i
        ></span>
      </div>
    </div>
  </div>
</template>
    
<style scoped>
.eventBar {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid gray;
  overflow-x: auto;
}
.title {
  width: 80%;
}
.btnclass {
  width: 80%;
  height: 40px;
  margin-top: 10px;
  border-radius: 10px;
  font-size: 30px;
}
.event-content {
  width: 80%;
  margin-top: 10px;
}
.allTask {
  cursor: pointer;
}
.event-item {
  position: relative;
  height: 50px;
  border: 1px solid gray;
  border-radius: 10px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.deleteicon {
  position: absolute;
  right: 0;
  top: 16px;
  color: red;
}
.event-item:hover {
  background-color: rgba(128, 128, 128, 0.151);
}
.active {
  background-color: rgba(255, 192, 203, 0.815);
}
</style>