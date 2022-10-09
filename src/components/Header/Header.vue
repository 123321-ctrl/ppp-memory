<script setup>
import { ref } from "vue";
const drawer = ref(false);
</script>
        
<template>
  <div class="header">
    <span class="icon iconfont icon-rili rili" @click="drawer = true"></span>
    <span class="icon iconfont icon-tianqiyubao"></span>
    <span class="icon iconfont icon-denglu"></span>
    <div>
      <el-drawer
        v-model="drawer"
        title="I am the title"
        :with-header="false"
        direction="rtl"
        size="50%"
      >
        <el-calendar>
          <template #date-cell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split("-").slice(1).join("-") }}
              {{ data.isSelected ? "✔️" : "" }}
            </p>
          </template>
        </el-calendar>
      </el-drawer>
    </div>
  </div>
</template>
        
<style scoped>
.header {
  width: 100%;
}
.rili {
  width: 50px;
  background-color: aqua;
}
.is-selected {
  color: #1989fa;
}
</style>