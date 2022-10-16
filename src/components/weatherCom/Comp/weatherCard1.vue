<script setup>
import { ref, computed } from "vue";
import { getrequestLoc } from "../config/request";
const props = defineProps(["temp", "time", "text", "icon"]);
const location = ref("北京");

const Ftime = computed(() => {
  return timeFormat(props.time);
});

function timeFormat(time) {
  let Ftime = new Date(time);
  // Ftime.toLocaleString();
  return Ftime.toLocaleString("chinese", { hour12: false });
}

function getposition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => getLocation(pos), // 成功函数
      (e) => showError(e), // 失败函数
      { timeout: 10000, enableHighAccuracy: true } // PositionOptions参数 设置超时时间
    );
  } else {
    alert("浏览器不支持地理定位！");
  }
  // 2.成功获取到定位
  const getLocation = (pos) => {
    // 判断是否已获取到定位 ? 返回经纬度 : 直接使用ip定位
    var longitude = pos.coords.longitude;
    var latitude = pos.coords.latitude;
    console.log(longitude, latitude);
    getrequestLoc(longitude, latitude).then((res) => {
      // console.log(res.data.location[0].name);
      location.value = res.data.location[0].name
    });
  };

  // 3.定位失败反馈
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("定位失败，用户拒绝请求地理定位");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("定位失败，位置信息是不可用");
        break;
      case error.TIMEOUT:
        alert("定位失败，请求获取用户位置超时");
        break;
      case error.UNKNOWN_ERROR:
        alert("未知错误，定位系统失效");
        break;
    }
  }
}
</script>
        
<template>
  <div class="card1">
    <div class="desc">
      <div class="locate">
        {{ location }}
        <i @click="getposition" class="icon iconfont icon-dingwei dingwei"> </i>
      </div>
      <div class="time">{{ Ftime }} 更新</div>
    </div>
    <div class="temp">{{ temp }}℃</div>
    <div class="right">
      <i class="icon" :class="`qi-${icon}`"></i>
      <div class="text">{{ text }}</div>
    </div>
  </div>
</template>
        
<style scoped>
.card1 {
  position: relative;
  width: 50%;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: inset 0 0 3px hsl(0deg 0% 39% / 30%),
    inset 0 0 10px hsl(0deg 0% 39% / 30%);
  padding: 13px;
}
.desc {
  display: flex;
}
.locate {
  position: relative;
  width: 90px;
  font-size: 34px;
}
.dingwei {
  position: absolute;
  font-size: 16px;
}
.time {
  width: 60%;
  height: 44px;
  overflow: hidden;
  font-size: 15px;
  line-height: 44px;
}
.temp {
  font-size: 85px;
  font-weight: 700;
}
.right {
  position: absolute;
  top: 37px;
  right: 18px;
}
.right > .icon {
  font-size: 90px;
  color: orange;
}
.text {
  position: absolute;
  bottom: -18px;
  left: 34px;
}
</style>