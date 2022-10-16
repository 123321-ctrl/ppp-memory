<script setup>
import { ref } from "vue";
import Drag from "../Drag/Drag.vue";
import weather from "../weatherCom/weather.vue";
import { store } from "../../store";

</script>
        
<template>
  <div>
    <header>
      <h1>{{ store.currentTitle }}</h1>
    </header>
    <div>
      <div v-show="store.currentTitle === 'ALL Tasks'">
        <weather></weather>
      </div>
      <div v-show="!(store.currentTitle === 'ALL Tasks')">
        <div>
          <Drag :currentID="store.currentID"></Drag>
        </div>
      </div>
    </div>
  </div>
</template>
        
<style scoped>
</style>