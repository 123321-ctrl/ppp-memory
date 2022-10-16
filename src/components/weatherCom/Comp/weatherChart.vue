<script setup>
import { ref, onMounted, watch, computed } from "vue";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const props = defineProps(["get24Hours"]);
const myChart = ref(null);
const xdatas = computed(() => {
  var xdata = [];
  for (let i = 0; i < props.get24Hours.length; i++) {
    xdata.push(`${timeFormat(props.get24Hours[i].fxTime)}:00`);
  }
  return xdata;
});
const temps = computed(() => {
  var temp = [];
  for (let i = 0; i < props.get24Hours.length; i++) {
    temp.push(props.get24Hours[i].temp);
  }
  return temp;
});
const icons = computed(() => {
  var icon = [];
  for (let i = 0; i < props.get24Hours.length; i++) {
    icon.push(props.get24Hours[i].icon);
  }
  return icon;
});
watch(xdatas, () => {
  showChart();
});
watch(temps, () => {
  showChart();
});

//格式化
function timeFormat(time) {
  let Ftime = new Date(time).getHours();
  if (Ftime <= 9) {
    Ftime = "0" + Ftime;
  }
  return Ftime;
}

onMounted(() => {
  showChart();
  // console.log("resize",myChart.value.resize())
  // window.addEventListener("resize", myChart.value.resize);
});

function showChart() {
  myChart.value = echarts.init(document.getElementById("chart"), null, {
    width: 830,
    height: 300,
  });

  myChart.value.setOption({
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    grid: {
      left: "1%",
      right: "2%",
    },
    xAxis: {
      show: false,
      type: "category",
      axisTick: {
        alignWithLabel: true,
        inside: true,
      },
      axisLabel: {
        margin: 12,
      },
      data: xdatas.value,
    },
    yAxis: {
      type: "value",
      show: false,
      // name: "温度",
      // min: 0,
      // max: 50,
      // position: "left",
      // axisLabel: {
      //   formatter: "{value} °C",
      // },
    },
    series: [
      {
        data: temps.value,
        type: "line",
        smooth: true,
        label: {
          show: true,
          distance: 15,
          fontSize: 10,
          formatter: "{c}°C",
        },
      },
    ],
  });
}
</script>
        
<template>
  <div class="content">
    <ul>
      <li v-for="(item, index) in xdatas" :key="index">
        <span v-show="index % 2 === 0 ? true : false">{{ item }}</span>
        <i
          v-show="index % 2 === 0 ? true : false"
          class="icon"
          :class="`qi-${icons[index]}`"
        ></i>
      </li>
    </ul>
    <div id="chart"></div>
  </div>
</template>
        
<style scoped>
.content {
  position: relative;
  width: 100%;
  height: 200px;
  margin-top: 10px;
  padding-top: 31px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: inset 0 0 3px hsl(0deg 0% 39% / 30%),
    inset 0 0 10px hsl(0deg 0% 39% / 30%);
  overflow-x: auto;
  overflow-y: hidden;
}
ul {
  position: absolute;
  top: 26px;
  display: flex;
  padding-left: 10px;
}
ul li {
  position: relative;
  width: 33.5px;
  list-style: none;
  font-size: 12px;
  align-items: center;
}
.icon{
  position: absolute;
  top: 16px;
  left: 7px;
  color: orange;
  font-size: 18px;
}
</style>