<script setup>
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
function addEvent() {
  // console.log(localTitles.value)

  console.log(titles.value);
  const title = prompt("Enter the Title:");
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
</script>
    
<template>
  <div class="eventBar">
    <h2>ppp-memory</h2>
    <button class="btnclass" @click="addEvent">+</button>
    <div class="event-content">
      <div>ALL Task</div>
      <div
        v-for="(item, index) in titles"
        :key="item.id"
        :class="['event-item', curIndex === index + 1 ? 'active' : '']"
        @click="currentEvent(item.id, index)"
      >
        {{ item.title }}
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
.event-item {
  height: 50px;
  line-height: 50px;
  border: 1px solid gray;
  border-radius: 10px;
  text-align: center;
  margin-top: 8px;
}
.event-item:hover {
  background-color: pink;
}
.active {
  background-color: aqua;
}
</style>