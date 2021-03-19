<template>
  <div class="map1">
    <div id="map1"></div>

    <!-- 地图工具 -->
    <map-tools
        @zoomOut="zoomOut"
        @zoomIn="zoomIn"
        @fullScreen="fullScreen"
        @resetPosition="resetPosition"
        @rotateMap="rotateMap"
    ></map-tools>

    <!-- 鼠标停留的地理位置 -->
    <mouse-position></mouse-position>

    <!-- 地图位置选择框 -->
    <position-select @changePosition="changePosition"></position-select>

		<!-- 地图叠加层 -->
		<div id="overlay">
			<button id="clone">克隆</button>
			<button id="delete">删除</button>
		</div>
  </div>
</template>

<script>
import maputils from "@/utils/maputil";
import MapTools from "@/components/maptools";
import MousePosition from "@/components/mouse-position";
import PositionSelect from "@/components/position-select";

export default {
  name: "map1",
  components: {
    MapTools,
    MousePosition,
    PositionSelect,
  },
  data() {
    return {
      map: undefined,
      zoom: undefined,
      center: undefined,
      rotate: 0,
      position: undefined,
    };
  },
  mounted() {
    let map = maputils.initMap("map1");
    let zoom = map.getView().getZoom();
    let center = map.getView().getCenter();

    this.map = map;
    this.center = center;
    this.zoom = zoom;

    // 监听鼠标移动，返回地图位置
    map.on("pointermove", (event) => {
      let newPosition = this.map.returnPosition(event.coordinate);
      this.position = `${newPosition[0]} , ${newPosition[1]}`;
    });

    // 添加多个点要素
    map.addPoint([
      [106.51, 29.58],
      [91.17, 29.70],
      [111.52, 40.85],
      [121.36, 31.29],
    ]);

    // 添加圆形要素
    map.addCircle([[116.31, 39.95]]);

    // 添加线要素
    map.addLine([
      [116.31, 39.95],
      [106.51, 29.58],
    ]);

    // 添加多边形要素
    map.addPolygon([
      [106.51, 29.58],
      [111.52, 40.85],
      [121.36, 31.29],
    ]);

    // 添加多个线要素
    map.addMutipleLines([
      [
        [7606604, 4285365],
        [1506726, 3933143],
      ],
      [
        [1252344, 3248267],
        [195678, 5248267],
      ],
    ]);

    // 添加多个多边形要素
    map.addMutiplePolygons([
      [
        [606604, 4285365],
        [1506726, 3933143],
        [1253344, 3248267],
        [195678, 3248267],
      ],
      [
        [1506726, 3933143],
        [4252344, 6248267],
        [195678, 3248267],
      ],
    ]);

    // 添加自定义样式的点要素
    map.addCustomizePoint([
      [146759,3297187],
      [26759,497187],
      [126759,297187],
      [166759,1297187]
    ])

		// 添加自定义样式的圆形要素
    map.addCustomizeCircle([126759,9297187])

		// 添加叠加层
		map.addMyOverlay()

		// 使用群集策略
		map.useClusterStrategy()

		// 创建热图
		map.createHeatmap()
  },
  methods: {
    // 放大
    zoomOut() {
      let currentZoom = this.map.getView().getZoom();

      this.map.zoomOut(currentZoom);
    },

    // 缩小
    zoomIn() {
      let currentZoom = this.map.getView().getZoom();

      this.map.zoomIn(currentZoom);
    },

    // 全屏
    fullScreen() {
      document.documentElement.requestFullscreen();
    },

    // 重置地图缩放级别和位置
    resetPosition() {
      this.map.resetPosition(this.zoom, this.center);
    },

    // 旋转地图
    rotateMap() {
      this.rotate = this.map.rotateMap(this.rotate + 90);
    },

    // 改变位置
    changePosition(val) {
      this.map.changePosition(val);
    },
  },
};
</script>

<style scoped>
.map1 {
  width: 100%;
  height: 100%;

  background: url("../assets/flag.jpeg") repeat;
  background-size: 240px;
}

#map1 {
  width: 100%;
  height: 1200px;
}
</style>
