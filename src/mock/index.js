import Mock from 'mockjs';
import {cloneDeep} from 'lodash';
import {getQueryString} from '../assets/js/common'

Mock.setup({
  timeout:"200-600"
})

const Random = Mock.Random;

/*
* +++++++++++++++++++++++++++++++++++++++++++++++++
* 混入标准格式
* +++++++++++++++++++++++++++++++++++++++++++++++++
* */
const responseResult = function (data) {
  const template = {
    "_code": "99999",
    "_msg": "",
    "_result": {}
  };
  return Object.assign(cloneDeep(template), data);
};

/*
* +++++++++++++++++++++++++++++++++++++++++++++++++
* API类接口集合
* +++++++++++++++++++++++++++++++++++++++++++++++++
* */
const api = {
  /*
  * +++++++++++++++++++++++++++++++++++++++++++++++++
  * 获取问卷
  * +++++++++++++++++++++++++++++++++++++++++++++++++
  * */
  "test_mock_api": () => {
    return responseResult({
      "_code": "99999",
      "_result": {
        "collectBrief": Random.cparagraph(1, 5),
      },
      "_msg": "崩了"
    });
  },
};

/*
* +++++++++++++++++++++++++++++++++++++++++++++++++
* API分发
* +++++++++++++++++++++++++++++++++++++++++++++++++
* */
Mock.mock("/proxyApi/api", "post", opt => {
  const action = getQueryString('action', opt.body);
  return api[action]?.();
});