<template>
  <div class="maptools">
    <button class="tool-item" @click="$emit('zoomOut')">放大</button>
    <button class="tool-item" @click="$emit('zoomIn')">缩小</button>
    <button class="tool-item" @click="$emit('fullScreen')">全屏</button>
    <button class="tool-item" @click="$emit('resetPosition')">重置</button>
    <button class="tool-item" @click="$emit('rotateMap')">旋转</button>
  </div>
</template>

<script>
export default {
  name: "maptools",
};
</script>

<style scoped>
.maptools {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: absolute;
  z-index: 9;
  left: 20px;
  top: 20px;

  border-radius: 4px;
  width: 60px;
  padding: 5px;
  background: rgba(0, 0, 0, .3);
}

.tool-item {
  flex: 1;

  width: 60px;
  height: 30px;
  padding: 5px;
  margin: auto;
  line-height: 30px;
  font-size: 14px;

  cursor: pointer;
}

</style>