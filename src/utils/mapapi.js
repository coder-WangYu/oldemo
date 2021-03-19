import {Feature, Map as OLMap, Overlay} from "ol";
import {transform} from "ol/proj";
import {fromLonLat} from "ol/proj";
import {upAndDown} from "ol/easing";
import {Circle, LineString, Point, Polygon} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Fill, Stroke, Style, Text} from "ol/style";
import Icon from "ol/style/Icon";
import CircleStyle from "ol/style/Circle";
import {Select} from "ol/interaction";
import {click} from "ol/events/condition";
import {Cluster} from "ol/source";
import {Heatmap} from "ol/layer";
import GeoJSON from "ol/format/GeoJSON";

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
			{zoom: 10},
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

		lineFeature.push(new Feature(new LineString(line)));

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
				polygon.push(transform(ele, "EPSG:4326", "EPSG:3857"));
			});
		}

		newPolygon.push(polygon);
		polygonFeature.push(new Feature(new Polygon(newPolygon)));

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: polygonFeature,
			}),
		}));
	}

	// 添加多个线要素
	addMutipleLines(arr) {
		let lineFeatures = [];

		if (arr.length) {
			arr.forEach(ele => {
				let feature = new Feature(new LineString(ele));

				lineFeatures.push(feature);
			});
		}

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: lineFeatures,
			}),
		}));
	}

	// 添加多个多边形要素
	addMutiplePolygons(arr) {
		let polygons = [];
		let polygonFeatures = [];

		if (arr.length) {
			arr.forEach(ele => {
				polygons.push([ele]);
			});
		}

		polygons.forEach(ele => {
			polygonFeatures.push(new Feature(new Polygon(ele)));
		});

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: polygonFeatures,
			}),
		}));
	}

	// 添加一个自定义样式的点要素
	addCustomizePoint(points) {
		let pointFeatures = []
		let featureStyle = new Style({
			text: new Text({
				text: "嘻",
				stroke: new Stroke({
					color: "white",
					width: 2,
				})
			}),
			image: new Icon({
				src: require("../../src/assets/mapIcon/red.svg"),
				scale: [1.3, 1.3],
			}),
		})

		if (points.length) {
			points.forEach(ele => {
				let feature = new Feature(new Point(ele))

				feature.setStyle(featureStyle)
				pointFeatures.push(feature)
			})
		}

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: pointFeatures,
			}),
		}))
	}

	// 添加自定义样式的圆形要素
	addCustomizeCircle(circle) {
		let featureStyle = new Style({
			fill: new Fill({
				color: "red",
			}),
			stroke: new Stroke({
				color: "blue",
				width: 4,
			})
		})

		let newCircle = new Feature(new Circle(circle, 9e5))

		newCircle.setStyle(featureStyle)

		this.addLayer(new VectorLayer({
			source: new VectorSource({
				features: [newCircle],
			}),
			opacity: .5,
		}))
	}

	// 添加叠加层
	addMyOverlay() {
		let circleFeatures = []
		let circle = new Feature(new Circle([2774826, 8433459], 5e5))

		circle.setStyle(new Style({
			fill: new Fill({
				color: "green"
			}),
			stroke: new Stroke({
				color: "black",
				width: 3,
			})
		}))
		circleFeatures.push(circle)
		let vectorLayer = new VectorLayer({
			source: new VectorSource({
				features: circleFeatures,
			})
		})

		this.addLayer(vectorLayer)
		let overlay = new Overlay({
			element: document.getElementById("overlay")
		})

		this.addOverlay(overlay)
		let selectedFeature = null
		let select = new Select({
			condition: click,
			layers: [vectorLayer],
		})

		this.addInteraction(select)
		select.on("select", (e) => {
			selectedFeature = e.selected[0]
			if (selectedFeature) {
				overlay.setPosition(selectedFeature.getGeometry().getCenter())
			} else {
				overlay.setPosition(undefined)
			}
		})

		// 处理删除事件
		document.getElementById("delete")
			.addEventListener('click', () => {
				vectorLayer.getSource().removeFeature(selectedFeature)
				overlay.setPosition(undefined)
				select.getFeatures().clear()
			});

		// 处理克隆事件
		document.getElementById("clone")
			.addEventListener('click', () => {
				let circle = selectedFeature.clone()
				let circleGeometry = circle.getGeometry()
				let circleCenter = circleGeometry.getCenter()

				circleGeometry.setCenter([
					circleCenter[0] + circleGeometry.getRadius() * 2,
					circleCenter[1]
				])
				vectorLayer.getSource().addFeature(circle)
				overlay.setPosition(undefined)
				select.getFeatures().clear()
		});
	}

	// 群集策略
	useClusterStrategy() {
		const getRandomInt = function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
		let features = [];
		let numberOfFeatures = 0;

		while(numberOfFeatures < 1000) {
			let point = new Point([
				getRandomInt(6545862, 9568284),
				getRandomInt(6102732, 7154505),
			]);
			features.push(new Feature(point));
			numberOfFeatures++;
		}

		let getStyle = (feature) => {
			let length = feature.get("features").length

			return [
				new Style({
					image: new CircleStyle({
						radius: Math.min(
							Math.max(length * 1.2, 15), 20
						),
						fill: new Fill({
							color: [0, 204, 0, 0.6],
						}),
					}),
					text: new Text({
						text: length.toString(),
						fill: new Fill({
							color: "white",
						}),
						stroke: new Stroke({
							color: [0, 51, 0, 1],
							width: 1,
						})
					})
				})
			]
		}

		let vectorLayer = new VectorLayer({
			source: new Cluster({
				distance: 25,
				source: new VectorSource({
					features: features,
				})
			}),
			style: getStyle
		})

		this.addLayer(vectorLayer)
	}

	createHeatmap() {
		this.addLayer(new Heatmap({
			source: new VectorSource({
				url: '../geojsonFiles/users-online.json',
				format: new GeoJSON({
					dataProjection: "EPSG:3857",
				})
			})
		}));
	}
}

export default Mymap;
