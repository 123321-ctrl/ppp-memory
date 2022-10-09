<script setup>
import { ref } from "vue";
import { ElDrawer } from "element-plus";

const props = defineProps(["drawer"]);
const direction = ref("rtl");
const size = ref("30%")
</script>
            
<template>
  <div>
    <el-drawer
      v-model="drawer"
      title="I am the title"
      :with-header="true"
      :direction="direction"
      :size="size"
      :modal="false"
    >
      <span>Hi thereaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!</span>
    </el-drawer>
  </div>
</template>
            
<style scoped>
</style>