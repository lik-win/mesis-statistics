import { Pool } from "geotiff";

import { fromUrl } from "geotiff";

/**
 * 解压getCofTifData取值
 *
 * @param {string} url - 请求数据
 */

async function getCofTifData(url) {
  const tiff = await fromUrl(url);
  const image = await tiff.getImage(); //栅格数据
  // image.getGeoKeys()  获取坐标系的相关信息    GeogCitationGeoKey
  // image.getGeoKeys().GeogCitationGeoKey    //获取的值 比如 4326  3857
  let proj = image.getGeoKeys().GeographicTypeGeoKey;
  if (proj == "WGS 84") {
    proj = "EPSG:4326";
  } else {
    proj = "EPSG:" + proj;
  }
  const metadata = image.getFileDirectory();
  let metadataString = parseXML(metadata.GDAL_METADATA);
  
  let scale = metadataString.scale;
  let offset = metadataString.offset;
  let unit = metadataString.unit;
  const nodata = metadataString.nodata ?? image.getGDALNoData();
  let maxValue = metadataString.max;
  let minValue = metadataString.min;
  let startX = metadataString.startX; //70
  let startY = metadataString.startY; //60
  let endx = metadataString.endx; //145
  let endY = metadataString.endY; //10
  let bounds;
  if (startX && startY && endx && endY) {
    bounds = [startX, endY, endx, startY];
  } else {
    bounds = image.getBoundingBox();
  }
  console.log(nodata, maxValue, minValue, bounds, proj, scale, offset, unit);
  return {
    nodata,
    maxValue,
    minValue,
    bounds,
    proj,
    scale,
    offset,
    unit,
  };
}

function getWorkerPool() {
  let workerPool;
  if (!workerPool) {
    workerPool = new Pool();
  }
  return workerPool;
}

// this.parseXML(xmlString);
function parseXML(xmlString) {
  // 创建 DOMParser 对象并将 XML 字符串解析为 DOM 对象
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  // 获取 GDALMetadata 元素下的所有 Item 元素
  const itemElements = xmlDoc.querySelectorAll("GDALMetadata Item");

  // 创建一个对象来存储解析后的数据
  const parsedData = {};

  // 遍历每个 Item 元素并将其属性和文本内容存储到对象中
  itemElements.forEach((item) => {
    const name = item.getAttribute("name");
    const value = item.textContent.trim();
    parsedData[name] = value;
  });

  // console.log(parsedData);

  return parsedData;
  // this.items = items;
}

export { getCofTifData };
