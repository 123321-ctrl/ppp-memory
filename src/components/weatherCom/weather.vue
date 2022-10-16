<script setup>
import { ref, onMounted, computed } from "vue";
import {
  getNowData,
  get7DaysData,
  getLifestyle,
  get24Temp,
} from "./config/request";

const temp = ref(0);
const time = ref("");
const text = ref("");
const icon = ref("");
const get7Days = ref([]);
const getLifestyles = ref([]);
const get24Hours = ref([]);

onMounted(() => {
  getnewData();
});
function getnewData() {
  // console.log(getNowData(101280101))
  getNowData(101280101).then((res) => {
    // console.log("111",res.data)
    temp.value = res.data.now.temp;
    time.value = res.data.now.obsTime;
    text.value = res.data.now.text;
    icon.value = res.data.now.icon;
  });
  get7DaysData(101280101).then((res) => {
    // console.log("222", res.data.daily);
    get7Days.value = res.data.daily;
  });
  getLifestyle(101280101).then((res) => {
    // console.log(res.data.daily)
    getLifestyles.value = res.data.daily;
  });
  get24Temp(101280101).then((res) => {
    get24Hours.value = res.data.hourly;
  });
}
</script>
        
<template>
  <div class="left">
    <div class="cards">
      <weatherCard1
        :temp="temp"
        :time="time"
        :text="text"
        :icon="icon"
      ></weatherCard1>
      <weatherCard3 :getLifestyles="getLifestyles"></weatherCard3>
    </div>
    <weatherChart :get24Hours="get24Hours"></weatherChart>
    <weatherCard2 :get7Days="get7Days"></weatherCard2>
  </div>
  <div class="right">
    <el-calendar>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split("-").slice(1).join("/") }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>
      </template>
    </el-calendar>
  </div>
</template>
        
<style scoped>
.left {
  width: 66%;
  float: left;
}
.cards {
  display: flex;
  height: 188px;
  /* justify-content: space-between; */
}
.right {
  width: 33%;
  overflow: hidden;
  height: 674px;
  border-left: 1px solid gray;
  float: right;
  font-size: 13px;
}
</style>