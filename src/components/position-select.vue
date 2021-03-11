<template>
  <div class="select-wrapper">
    <div class="select">
      <el-select
          v-model="value"
          placeholder="请选择"
          @change="$emit('changePosition', value)"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "position-select",
  data() {
    return {
      options: [{
        value: [116.31, 39.95],
        label: "北京市",
      }, {
        value: [106.51, 29.58],
        label: "重庆市",
      }, {
        value: [91.17, 29.70],
        label: "拉萨市",
      }, {
        value: [111.52, 40.85],
        label: "呼和浩特市",
      }, {
        value: [121.36, 31.29],
        label: "上海市",
      }],
      value: "",
    };
  },
};
</script>

<style scoped>
.select-wrapper {
  position: absolute;
  z-index: 9;
  right: 20px;
  top: 20px;

  border-radius: 4px;
  width: 200px;
  height: 50px;
  padding: 5px;
  background: rgba(0, 0, 0, .3);
}

.select >>> .el-input--suffix .el-input__inner {
  height: 50px;
  width: 200px;
}
</style>
