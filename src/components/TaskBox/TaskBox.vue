<script setup>
import { ref } from "vue";
import Drag from '../Drag/Drag.vue'
import {store} from '../../store'

</script>
        
<template>
  <div>
    <header>
      <h1>{{store.currentTitle}}</h1>
      <button v-show="!(store.currentTitle === 'ALL Tasks 可以放天气预报')">remove this Event</button>
      <div v-show="!(store.currentTitle === 'ALL Tasks 可以放天气预报')">
        <Drag :currentID="store.currentID"></Drag>
      </div>
    </header>
  </div>
</template>
        
<style scoped>
</style>