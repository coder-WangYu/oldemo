<template>
  <div class="position-wrapper">
    <div class="mouse-position">
      {{ $parent.position }}
    </div>
  </div>
</template>

<script>
export default {
  name: "mouse-position",
};
</script>

<style scoped>
.position-wrapper {
  position: absolute;
  z-index: 9;
  bottom: 20px;
  right: 20px;

  border-radius: 4px;
  padding: 5px;
  width: 150px;
  height: 50px;
  background: rgba(0, 0, 0, .3);
}

.mouse-position {
  margin: 0 auto;
  border-radius: 4px;
  width: 150px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  text-align: center;
  background: #eee;
}
</style>
