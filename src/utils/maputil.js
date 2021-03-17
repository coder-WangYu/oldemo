import Mymap from "@/utils/mapapi";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import OSM from "ol/source/OSM";
import {transform} from "ol/proj";
import {defaults} from 'ol/control';

const maputils = {
  // 初始化地图
  initMap: (mapContainer) => {
    let map = new Mymap({
      target: mapContainer,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
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
