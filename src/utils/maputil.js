import Mymap from "@/utils/mapapi";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import OSM from "ol/source/OSM";
import {transform} from "ol/proj";
import {defaults} from 'ol/control';
// import GML2 from 'ol/format/GML2';
// import KML from 'ol/format/KML';
// import TileWMS from "ol/source/TileWMS";
// import ImageWMS from "ol/source/ImageWMS";
// import Image from "ol/layer/Image";

const maputils = {
  // 初始化地图
  initMap: (mapContainer) => {
    let map = new Mymap({
      target: mapContainer,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        // new VectorLayer({
        //   source: new VectorSource({
        //     url: "http://localhost:8080/geoserver/sf/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sf%3Arestricted&maxFeatures=50&outputFormat=text%2Fxml%3B%20subtype%3Dgml%2F2.1.2",
        //     format: new GML2(),
        //   }),
        // }),
        // new VectorLayer({
        //   source: new VectorSource({
        //     url: "./mapfiles/tasmania_state_boundaries.kml",
        //     format: new KML(),
        //   }),
        // })
      ],
      view: new View({
        minZoom: 3,
        maxZoom: 15,
        zoom: 4,
        center: transform([110, 30], "EPSG:4326", "EPSG:3857"),
      }),
      controls: defaults({
        attributionOptions: false,
        attribution: false,
        rotate: false,
        zoom: false,
      }),
    });

    return map;
  },
};

export default maputils;
