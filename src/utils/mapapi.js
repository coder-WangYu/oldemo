import {Feature, Map as OLMap} from "ol";
import {transform} from "ol/proj";
import {fromLonLat} from "ol/proj";
import {upAndDown} from "ol/easing";
import {Circle, LineString, Point, Polygon} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

class Mymap extends OLMap {
	// 放大
	zoomOut(currentZoom) {
		let newZoom = currentZoom + 1;

		this.getView().setZoom(newZoom);
	}

	// 缩小
	zoomIn(currentZoom) {
		let newZoom = currentZoom - 1;

		this.getView().setZoom(newZoom);
	}

	// 重置地图缩放级别和位置
	resetPosition(zoom, center) {
		this.getView().setZoom(zoom);
		this.getView().setCenter(center);
		this.getView().setRotation(0);
	}

	// 返回转换后的坐标
	returnPosition(coordinate) {
		let transformedPosition = transform(coordinate, "EPSG:3857", "EPSG:4326");
		let newPosition = [];

		transformedPosition.forEach(ele => {
			let position = ele.toFixed(2);

			newPosition.push(position);
		});
		return newPosition;
	}

	// 旋转地图
	rotateMap(angle) {
		this.getView().setRotation(angle);
		return this.getView().getRotation();
	}

	// 改变位置
	changePosition(position) {
		this.getView().animate(
			{zoom: 8},
			{center: fromLonLat(position)},
			{duration: 500},
			{easing: upAndDown},
		);
	}

	// 添加点要素
	addPoint(arr = []) {
		let points = [];
		let pointFeatures = [];

		if (arr.length) {
			arr.forEach(ele => {
				let point = new Point(
					transform(ele, "EPSG:4326", "EPSG:3857"),
				);

				points.push(point);
			});
		}

		points.forEach(ele => {
			let feature = new Feature(ele);

			pointFeatures.push(feature);
		});

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: pointFeatures,
			}),
		}));
	}

	// 添加圆形要素
	addCircle(arr) {
		let circles = [];
		let circleFeatures = [];

		if (arr.length) {
			arr.forEach(ele => {
				let circle = new Circle(
					transform(ele, "EPSG:4326", "EPSG:3857"),
					9e5,
				);

				circles.push(circle);
			});
		}

		circles.forEach(ele => {
			let feature = new Feature(ele);

			circleFeatures.push(feature);
		});

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: circleFeatures,
			}),
		}));
	}

	// 添加线要素
	addLine(arr) {
		let line = [];

		// 线要素需要二维数组形式
		let lineFeature = [];

		if (arr.length) {
			arr.forEach(ele => {
				line.push(transform(ele, "EPSG:4326", "EPSG:3857"));
			});
		}

		lineFeature.push(new Feature(new LineString(line)))

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: lineFeature,
			}),
		}));
	}

	// 添加多边形要素
	addPolygon(arr) {
		let polygon = [];
		let polygonFeature = [];

		// 多边形要素需要三维数组形式
		let newPolygon = [];

		if (arr.length) {
			arr.forEach(ele => {
				polygon.push(transform(ele, "EPSG:4326", "EPSG:3857"))
			});
		}

		newPolygon.push(polygon)
		polygonFeature.push(new Feature(new Polygon(newPolygon)))

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: polygonFeature,
			}),
		}));
	}

	// 添加多个线要素
	addMutipleLines(arr) {
		let lineFeatures = []

		if (arr.length) {
			arr.forEach(ele => {
				let feature = new Feature(new LineString(ele))

				lineFeatures.push(feature)
			})
		}

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: lineFeatures,
			})
		}))
	}

	// 添加多个多边形要素
	addMutiplePolygons(arr) {
		let polygons = []
		let polygonFeatures = []

		if (arr.length) {
			arr.forEach(ele => {
				polygons.push([ele])
			})
		}

		polygons.forEach(ele => {
			polygonFeatures.push(new Feature(new Polygon(ele)))
		})

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: polygonFeatures,
			})
		}))
	}
}

export default Mymap;
