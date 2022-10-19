<script setup>
const props = defineProps(["get7Days"]);

</script>
        
<template>
  <div class="card2">
    <ul>
      <li v-for="(day, index) in get7Days" :key="index">
        <span class="wdate">
          {{ day.fxDate.substr(5, 5).replace("-", "/") }}
        </span>
        <div class="wicon">
          <i :class="`qi-${day.iconDay}`"></i>
          <i :class="`qi-${day.iconNight}`"></i>
        </div>
        <span class="wtemp">{{ day.tempMin }}° - {{ day.tempMax }}°</span>
      </li>
    </ul>
  </div>
</template>
        
<style scoped>
.card2 {
  width: 50%;
  height: 258px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: inset 0 0 3px hsl(0deg 0% 39% / 30%),
    inset 0 0 10px hsl(0deg 0% 39% / 30%);
  padding: 5px 28px;
  margin-top: 10px;
}
ul li {
  flex: 1;
  height: 27px;
  width: 100%;
  margin: 8px 0;
  display: flex;
  align-items: center;
}
ul li span {
  font-size: 15px;
}
ul li .wdate{
  width: 32%;
}
ul li .wicon {
  width: 32%;
  text-align: center;
}
ul li .wicon i{
  color: rgba(67, 67, 168, 0.717);
  margin-right: 10px;
}
ul li .wtemp {
  width: 32%;
  text-align: right;
}
</style>