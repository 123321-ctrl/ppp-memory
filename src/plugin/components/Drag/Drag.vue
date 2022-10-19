<template>
  <div>
    <div class="taskBox">
      <div class="items toDo">
        <!-- 
        注意需要加上group属性，才能在两个容器中进行拖拽
       -->
        <h3>to do</h3>
        <button @click="showDialog('todoList')">+</button>
        <draggable v-model="todoList" item-key="id" group="course">
          <template #item="{ element }">
            <div class="item">
              {{ element.name }}
              <span class="time">{{
                new Date(element.time).toLocaleString()
              }}</span>
              <div>{{ "⚪" + element.details }}</div>
              <i
                @click="deleteItem('todo', element)"
                class="icon iconfont icon-shanchu deleteicon"
              ></i>
            </div>
          </template>
        </draggable>
      </div>

      <div class="items inProgress">
        <h3>in progress</h3>
        <button @click="showDialog('inProgressList')">+</button>
        <draggable v-model="inProgressList" item-key="id" group="course">
          <template #item="{ element }">
            <div class="item">
              {{ element.name }}
              <span class="time">{{
                new Date(element.time).toLocaleString()
              }}</span>
              <div>{{ "⚪" + element.details }}</div>
              <i
                @click="deleteItem('inpro', element)"
                class="icon iconfont icon-shanchu deleteicon"
              ></i>
            </div>
          </template>
        </draggable>
      </div>

      <div class="items completed">
        <h3>completed</h3>
        <button @click="showDialog('completedList')">+</button>
        <draggable v-model="completedList" item-key="id" group="course">
          <template #item="{ element }">
            <div class="item">
              {{ element.name }}
              <span class="time">{{
                new Date(element.time).toLocaleString()
              }}</span>
              <div>{{ "⚪" + element.details }}</div>
              <i
                @click="deleteItem('completed', element)"
                class="icon iconfont icon-shanchu deleteicon"
              ></i>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="新增事件">
    <el-form :model="form">
      <el-form-item label="task name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="task details" :label-width="formLabelWidth">
        <el-input v-model="form.details" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">提交{{ index }}</el-button>
      </span>
    </template>
  </el-dialog>
  </div>

  
</template>
  <script>
import { defineComponent, ref, reactive, toRefs, watch } from "vue";
// 引入vuedraggable
import draggable from "vuedraggable";

export default defineComponent({
  components: { draggable },
  props: ["currentID"],
  setup(props) {
    // 需要使用ref
    // console.log("ggg",props.currentID)
    const todoList = ref([]);
    const inProgressList = ref([]);
    const completedList = ref([]);
    const { currentID } = toRefs(props);

    const curEvent = reactive({
      todoList,
      inProgressList,
      completedList,
    });

    watch(curEvent, (newVal) => {
      // console.log(newVal)
      localStorage.setItem(currentID.value, JSON.stringify(newVal));
    });
    watch(currentID, (newVal) => {
      const data = JSON.parse(localStorage.getItem(newVal));
      // console.log(data)
      if (data !== null) {
        curEvent.todoList = data.todoList;
        curEvent.inProgressList = data.inProgressList;
        curEvent.completedList = data.completedList;
      } else {
        curEvent.todoList = [];
        curEvent.inProgressList = [];
        curEvent.completedList = [];
      }
    });

    const curMsg = ref("");
    const dialogFormVisible = ref(false);
    const formLabelWidth = "140px";
    const form = reactive({
      name: "",
      details: "",
    });

    return {
      todoList,
      inProgressList,
      completedList,
      curMsg,
      curEvent,
      dialogFormVisible,
      formLabelWidth,
      form,
      currentID,
    };
  },
  methods: {
    showDialog(msg) {
      this.dialogFormVisible = true;
      this.curMsg = msg;
    },
    submit() {
      this.dialogFormVisible = false;
      if (this.curMsg === "todoList") {
        this.todoList.push({
          time: new Date().getTime(),
          name: this.form.name,
          details: this.form.details,
        });
      } else if (this.curMsg === "inProgressList") {
        this.inProgressList.push({
          time: new Date().getTime(),
          name: this.form.name,
          details: this.form.details,
        });
      } else {
        this.completedList.push({
          time: new Date().getTime(),
          name: this.form.name,
          details: this.form.details,
        });
      }
      localStorage.setItem(this.currentID, JSON.stringify(this.curEvent));
    },
    show() {
      console.log(this.currentID);
      console.log(this.curEvent);
    },
    deleteItem(msg, ele) {
      console.log(msg, ele);
      if (msg === "todo") {
        this.todoList.forEach((item, index) => {
          if (item.time === ele.time) {
            this.todoList.splice(index, 1);
          }
        });
      } else if (msg === "inpro") {
        this.inProgressList.forEach((item, index) => {
          if (item.time === ele.time) {
            this.inProgressList.splice(index, 1);
          }
        });
      } else {
        this.completedList.forEach((item, index) => {
          if (item.time === ele.time) {
            this.completedList.splice(index, 1);
          }
        });
      }
    },
  },
});
</script>
  <style scoped>
.taskBox {
  width: 90%;
  display: flex;
  justify-content: space-around;
}

h3 {
  margin: 10px;
}
button {
  width: 93%;
  height: 40px;
  border-radius: 12px;
  margin: 10px;
  font-size: 31px;
}
.items {
  padding: 10px 0 30px 0;
  width: 30%;
  border-radius: 13px;
}
.toDo {
  background: #fbc531;
}

.inProgress {
  background: #353b48;
}

.completed {
  background: #7994d0;
}

.item {
  position: relative;
  margin: 10px;
  padding: 10px;
  border-radius: 12px;
  background: #ffffff;
}
.deleteicon {
  position: absolute;
  top: 39px;
  right: 15px;
  color: red;
  font-size: 20px;
}
.time {
  position: absolute;
  left: 70px;
  top: 15px;
  font-size: 1px;
}
</style>