<template>
  <div class="mapSelected">
    <div class="mapSelectedWrap">
      <!-- <el-radio-group v-model="drawType" @change="changeDraw" class="radioChange">
        <el-radio :label="0">矩形</el-radio>
        <el-radio :label="1">多边形</el-radio>
      </el-radio-group> -->
      <div class="extent">
        <el-radio v-model="drawType" @change="changeDraw" :label="0">矩形</el-radio>
        <div v-show="drawType == 0" class="lon">
          <span>经度范围：</span>
          <div class="lonValue">
            <el-input v-model.number="extent.lonMin" />
            <!-- <span>{{extent.lonMin}}</span> -->
          </div>
          <span>至</span>
          <div class="lonValue">
            <el-input v-model.number="extent.lonMax" />
            <!-- <span>{{extent.lonMax}}</span> -->
          </div>
        </div>
        <div v-show="drawType == 0" class="lon">
          <span>纬度范围：</span>
          <div class="lonValue">
            <el-input v-model.number="extent.latMin" />
            <!-- <span>{{extent.latMin}}</span> -->
          </div>
          <span>至</span>
          <div class="lonValue">
            <el-input v-model.number="extent.latMax" />
            <!-- <span>{{extent.latMax}}</span> -->
          </div>
          <div><el-button size="small" @click="modifyReact">修改</el-button></div>
        </div>
      </div>
      <div>
        <el-radio v-model="drawType" :label="1" @change="changeDraw">多边形</el-radio>
      </div>
    </div>
    <div class="mapCon">
      <Map :areaMark="'111'" />
    </div>
    <div class="selectedTypeCon">
      <el-button class type="primary" size="small" @click="getMapLonlat">确定</el-button>
      <!-- <el-button size="small" @click="getMapLonlat(false)">取消</el-button> -->
    </div>
  </div>
</template>

<script>
import Map from "@/components/gismapPop";
export default {
  data() {
    return {
      map: null,
      mapdraw: null,
      drawobj: null,
      zubiao: [],
      extent: {
        lonMin: "--",
        lonMax: "--",
        latMin: "--",
        latMax: "--",
      },
      drawType: 0, //0-矩形；1-多边形
    };
  },
  mounted() {
    this.reactMap();
    //this.drawPolygonMap()
  },
  methods: {
    modifyReact() {
      let that = this;
      if (this.extent.lonMin == "--" || this.extent.lonMax == "--" || this.extent.latMin == "--" || this.extent.latMax == "--") {
        return false;
      }

      if (!this.map) {
        this.map = this.$store.getters.getpopmap;
      }
      if (!this.map) {
        return false;
      }

      let style = new PIE.ol.style.Style({
        //线条样式
        stroke: new PIE.ol.style.Stroke({
          color: "#264df6",
          width: 2,
        }),
        //填充
        fill: new PIE.ol.style.Fill({
          color: "rgba(37,241,239,0.2)",
        }),
        //画点时需要
        image: new PIE.ol.style.Circle({
          radius: 7,
          //填充
          fill: new PIE.ol.style.Fill({
            //填充颜色
            color: "#e81818",
          }),
        }),
      });
      let latMin = Number(this.extent.latMin);
      let latMax = Number(this.extent.latMax);
      let lonMin = Number(this.extent.lonMin);
      let lonMax = Number(this.extent.lonMax);

      let destLoc = [lonMax, latMin];
      let currentLoc = [lonMin, latMax];

      let ext = PIE.ol.extent.boundingExtent([destLoc, currentLoc]);
      let ii = PIE.ol.proj.transformExtent(ext, "EPSG:4326", "EPSG:45599");
      let coor = [
        [ii[0], ii[3]], // 右上
        [ii[0], ii[1]], // 右下
        [ii[2], ii[1]], // 左下
        [ii[2], ii[3]], // 左上
        [ii[0], ii[3]],
      ];
      const geojsonObject = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coor],
        },
      };
      that.zubiao = [
        [lonMax, latMin],
        [lonMax, latMax],
        [lonMin, latMax],
        [lonMin, latMin],
        [lonMax, latMin],
      ];
      if (that.drawobj) {
        // 修改
        let pls = that.drawobj.getSource();
        pls.clear();
        let ofeas = new PIE.ol.format.GeoJSON().readFeatures(geojsonObject);
        pls.addFeatures(ofeas);
      } else {
        const drawSoucre = new PIE.ol.source.Vector({
          features: new PIE.ol.format.GeoJSON().readFeatures(geojsonObject),
        });
        // 数据源图层，绘图时图层
        let vectorLayer = new PIE.ol.layer.Vector({
          source: drawSoucre,
          style: style,
        });
        that.map.map.addLayer(vectorLayer);
        vectorLayer.setZIndex(5);
        that.drawobj = vectorLayer;
      }
    },
    changeDraw() {
      if (!this.drawType) {
        this.reactMap();
      } else {
        this.drawPolygonMap();
      }
    },
    reactMap() {
      if (!this.map) {
        this.map = this.$store.getters.getpopmap;
      }
      let that = this;
      if (!this.map) {
        setTimeout(function () {
          that.reactMap();
        }, 10);
      }
      if (this.mapdraw) {
        this.map.map.removeInteraction(this.mapdraw);
        this.mapdraw = null;
      }

      let draw;
      let style = new PIE.ol.style.Style({
        //线条样式
        stroke: new PIE.ol.style.Stroke({
          color: "#264df6",
          width: 2,
        }),
        //填充
        fill: new PIE.ol.style.Fill({
          color: "rgba(37,241,239,0.2)",
        }),
        //画点时需要
        image: new PIE.ol.style.Circle({
          radius: 7,
          //填充
          fill: new PIE.ol.style.Fill({
            //填充颜色
            color: "#e81818",
          }),
        }),
      });
      // 数据源
      let drawSoucre = new PIE.ol.source.Vector();
      // 数据源图层，绘图时图层
      let drawLayer = new PIE.ol.layer.Vector({
        source: drawSoucre,
        style: style,
      });
      /*  if (that.drawobj) {
        that.map.map.removeLayer(that.drawobj);
        that.drawobj = null;
      } */
      addInteraction();
      function addInteraction() {
        let value = "Rectangle";
        let geometryFunction, maxPoints;
        value = "LineString";
        maxPoints = 2;
        geometryFunction = function (coordinates, geometry) {
          //如果geometry对象不存在或者为空，则创建
          if (!geometry) {
            //多面几何图形下设置
            geometry = new PIE.ol.geom.Polygon();
          }
          // 开始坐标
          let start = coordinates[0];
          // 结束坐标
          let end = coordinates[1];
          // 根据开始与结束坐标绘制,从起始点，回到起始点
          geometry.setCoordinates([[start, [start[0], end[1]], end, [end[0], start[1]], start]]);
          // 返回几何图形坐标进行渲染
          return geometry;
        };

        // 初始化交互对象
        draw = new PIE.ol.interaction.Draw({
          id: "reactDraw1",
          type: value,
          //一定要添加绘画图层的数据源，否则画图完成后，无法保存矢量数据
          source: drawLayer.getSource(),
          // 更新几何坐标时调用该函数
          geometryFunction: geometryFunction,
          maxPoints: maxPoints,
        });
        // 将交互对象添加到地图上
        that.map.map.addInteraction(draw);
        that.mapdraw = draw;
        //当画图结束后，获取画图形状的坐标
        draw.on("drawend", function (event) {
          if (that.drawobj) {
            drawSoucre.getFeatures().forEach(function (feature) {
              drawSoucre.removeFeature(feature);
            });

            that.drawobj.setSource(drawSoucre);
          } else {
            let vectorLayer = new PIE.ol.layer.Vector({
              source: drawSoucre,
              style: style,
            });
            that.map.map.addLayer(vectorLayer);
            vectorLayer.setZIndex(5);
            that.drawobj = vectorLayer;
          }
          that.zubiao = [];
          let coordinates = event.feature.getGeometry().getCoordinates();
          if (coordinates[0] && coordinates[0].length > 0) {
            coordinates[0].forEach((item) => {
              const zhzb = PIE.ol.proj.transform(item, "EPSG:45599", "EPSG:4326");
              that.zubiao.push(zhzb);
              let lon = [];
              let lat = [];
              that.zubiao.forEach((item) => {
                lon.push(item[0]);
                lat.push(item[1]);
              });
              that.extent.lonMin = Math.min(...lon).toFixed(2);
              that.extent.lonMax = Math.max(...lon).toFixed(2);
              that.extent.latMin = Math.min(...lat).toFixed(2);
              that.extent.latMax = Math.max(...lat).toFixed(2);
            });
          }
        });
      }
    },
    drawPolygonMap() {
      if (!this.map) {
        this.map = this.$store.getters.getpopmap;
      }
      let that = this;
      if (!this.map) {
        setTimeout(function () {
          that.drawPolygonMap();
        }, 10);
      }
      if (this.mapdraw) {
        this.map.map.removeInteraction(this.mapdraw);
        this.mapdraw = null;
      }

      let draw;
      let style = new PIE.ol.style.Style({
        //线条样式
        stroke: new PIE.ol.style.Stroke({
          color: "#264df6",
          width: 2,
        }),
        //填充
        fill: new PIE.ol.style.Fill({
          color: "rgba(37,241,239,0.2)",
        }),
        //画点时需要
        image: new PIE.ol.style.Circle({
          radius: 7,
          //填充
          fill: new PIE.ol.style.Fill({
            //填充颜色
            color: "#e81818",
          }),
        }),
      });
      // 数据源
      let drawSoucre = new PIE.ol.source.Vector();
      // 数据源图层，绘图时图层
      let drawLayer = new PIE.ol.layer.Vector({
        source: drawSoucre,
        style: style,
      });
      /*  if (that.drawobj) {
        that.map.map.removeLayer(that.drawobj);
        that.drawobj = null;
      } */
      addInteraction1();
      function addInteraction1() {
        let value = "Rectangle";
        let geometryFunction, maxPoints;
        value = "Polygon";
        maxPoints = 1000;
        // 初始化交互对象
        draw = new PIE.ol.interaction.Draw({
          id: "PolygonDraw1",
          type: value,
          source: drawLayer.getSource(),
          // 更新几何坐标时调用该函数
          // geometryFunction: geometryFunction,
          maxPoints: maxPoints,
        });
        // 将交互对象添加到地图上
        that.map.map.addInteraction(draw);
        that.mapdraw = draw;
        //当画图结束后，获取画图形状的坐标
        draw.on("drawend", function (event) {
          if (that.drawobj) {
            drawSoucre.getFeatures().forEach(function (feature) {
              drawSoucre.removeFeature(feature);
            });

            that.drawobj.setSource(drawSoucre);
          } else {
            let vectorLayer = new PIE.ol.layer.Vector({
              source: drawSoucre,
              style: style,
            });
            that.map.map.addLayer(vectorLayer);
            vectorLayer.setZIndex(5);
            that.drawobj = vectorLayer;
          }
          that.zubiao = [];
          let ppp = new PIE.ol.geom.Polygon(event.feature.getGeometry().getCoordinates());
          let geo1 = ppp.transform("EPSG:45599", "EPSG:4326");
          let coordinates = geo1.getCoordinates();
          if (coordinates[0] && coordinates[0].length > 0) {
            that.zubiao = coordinates[0];
          }
        });
      }
    },
    //通过绘制的矩形，进行查询
    getMapLonlat(type) {
      if (type) {
        if (this.zubiao.length == 0) {
          this.$message({
            type: "warning",
            message: "请绘制查询区域",
          });
        } else {
          this.$emit("setMapLonlat", { type: true, zubiao: this.zubiao, drawType: this.drawType });
        }
      } else {
        this.$emit("setMapLonlat", { type: false });
      }
    },
  },
  components: {
    Map,
  },
};
</script>

<style lang="scss">
.mapSelected {
  .mapSelectedWrap {
    min-height: 60px;
    margin-bottom: 10px;
    .el-radio {
      display: flex;
      align-items: center;
      padding: 3px 0;
    }
    .el-button {
      margin-left: 10px;
      padding-right: 2px;
      padding-left: 2px;
    }
  }
  .selectedTypeCon {
    text-align: right;
    margin-top: 10px;
  }
  .mapCon {
    margin: auto;
    width: 100%;
    height: 500px;
    border: 1px solid #000;
  }
  .extent {
    display: flex;
    margin-bottom: 10px;
    .lon {
      display: flex;
      margin-right: 20px;
      align-items: center;
      height: 16px;
      span {
        margin: 0px 10px;
      }
      .lonValue {
        text-align: center;
        width: 60px;
        .el-input {
          border-bottom: 1px solid #000;
        }
        .el-input__inner {
          border: 0;
          padding: 0 5px;
          height: 20px;
          line-height: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
