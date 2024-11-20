/*
 * @Author: sjz 15103288529@163.com
 * @Date: 2024-03-21 18:16:08
 * @LastEditors: sjz 15103288529@163.com
 * @LastEditTime: 2024-03-28 18:44:45
 * @FilePath: \cme\src\message\mock.js
 * @Description: mock配置文件
 */
// 引入mockjs
import Mock from "mockjs";

import QS from "qs";
// 获取 mock.Random 对象
const Random = Mock.Random;

/** get请求
 * 获取图层url
 */
Mock.mock(RegExp("/api/mockGetList" + ".*"), "get", (options) => {
  var str = options.url.slice(options.url.indexOf("?") + 1);
  var elem = QS.parse(str);
  let projection;
  switch (elem.projection) {
    // case "EPSG:3857":
    //   projection = "3857";
    //   break;
    // case "EPSG:4326":
    //   projection = "4326";
    //   break;
    // case "Albers":
    //   projection = "102028";
    //   break;
    default:
      projection = "4326";
  }
  console.log(projection, elem, "res");
  return Mock.mock({
    code: 200,
    data: [
      {
        url: `/data/${elem.element}/${elem.element}_${projection}.tif`,
      },
    ],
  });
});

