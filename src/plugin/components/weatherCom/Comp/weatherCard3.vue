<script setup>
import { ref, computed } from "vue";
const props = defineProps(["getLifestyles"]);
</script>
        
<template>
  <div class="card3">
    <div class="wrapper">
      <div
        class="guide-item"
        v-for="(item, index) in getLifestyles"
        :key="index"
      >
        <div class="gkey">{{ item.name }}</div>
        <div class="gvalue">{{ item.category }}</div>
      </div>
    </div>
  </div>
</template>
        
<style scoped>
.card3 {
  width: 50%;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: inset 0 0 3px hsl(0deg 0% 39% / 30%),
    inset 0 0 10px hsl(0deg 0% 39% / 30%);
  padding: 13px;
  overflow: auto;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
.guide-item {
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.guide-item .gkey {
  font-size: 18px;
  color: #ff9404;
  overflow: hidden;
}
.guide-item .gvalue {
  padding-top: 10px;
  font-size: 14px;
}
</style>