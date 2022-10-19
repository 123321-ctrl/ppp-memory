<script setup>
import { computed, onMounted, ref } from "vue";
const drawer = ref(false);

</script>
        
<template>
  <div class="header">
    {{ innerWidth }}
    <span class="icon iconfont icon-rili" @click="drawer = true"></span>
    <span class="icon iconfont icon-tianqiyubao"></span>
    <span class="icon iconfont icon-denglu denglu"></span>

    <div class="drawer">
      <el-drawer
        v-model="drawer"
        title="I am the title"
        :with-header="false"
        direction="rtl"
        size="40%"
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
.icon {
  float: left;
  line-height: 50px;
  text-align: center;
  font-size: 28px;
  width: 50px;
}
.denglu {
  float: right;
}
.el-calendar {
  font-size: 0.3rem;
}
.is-selected {
  color: #1989fa;
}
</style>