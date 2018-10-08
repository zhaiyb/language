import { observable, action, computed } from "mobx";
import axios from "axios/index";
import URL from "../constants/URL";
import util from './util';

const formatToJson = (languageData) => {
  let result = {};
  languageData.forEach((item) => {
    const { primary, translation } = item;
    result[primary] = translation || '';
  });
  return JSON.stringify(result, null, 4);
  //return result;
};
export default class Languages {
  @observable originData = []; // 原始数据
  @observable loading = false; // 数据加载状态
  @observable filterStr = ''; // 过滤字符串
  @observable isJson = localStorage.getItem('jsonView') === 'true'; // 是否JSON视图

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  // 切换语言
  @action activeById(id) {
    this.activeId = id;
    this.rootStore.languageStore.getLanguageData();
  }

  // 切换视图
  @action changeView(isJson) {
    this.isJson = isJson;
    localStorage.setItem('jsonView', String(this.isJson));
  }

  // 获取语言表格原始数据
  @action getLanguageData() {
    const { project, site, language } = util.getCurrentPath(this.rootStore);
    if (project && site && language) {
      this.loading = true;
      axios.get(URL.languageData.replace(/{project}(\/){site}(\/){language}/,
        `${project}$1${site}$2${language}`))
        .then((response) => {
          this.originData = response.data.map((row) => {
            const { primary, origin, translation } = row;
            return {
              key: `${project}-${site}-${language}-${primary}`,
              primary,
              origin,
              translation
            }
          });
          this.loading = false;
        });
    }
  }

  // 更新译文-表格形式
  @action updateTranslation(primary, translation) {
    const { project, site, language } = util.getCurrentPath(this.rootStore);
    axios.put(URL.translation, {
      project, site, language,
      primary, translation
    })/*.then(() => {
      this.getLanguageData();
    })*/;
  }

  // 生成table展示数据
  @computed get languageTableData() {
    const { originData, filterStr } = this;
    if (!filterStr.trim()) {
      return originData;
    }
    return this.originData.filter((item) => {
      let matched = false;
      Object.keys(item).filter((curKey) => {
        return curKey !== 'key'
      })
        .some((curKey) => {
          return matched = item[curKey].includes(filterStr);
        });
      return matched;
    })
  }

  // 生成JSON展示数据
  /*@computed get languageJsonData() {
    const { originData, filterStr } = this;
    if (!filterStr.trim()) {
      return {
        total: originData.length,
        jsonData: formatToJson(originData)
      }
    }
    const filteredData = this.originData.filter((item) => {
      let matched = false;
      Object.keys(item).filter((curKey) => {
        return curKey !== 'key'
      })
        .some((curKey) => {
          return matched = item[curKey].includes(filterStr);
        });
      return matched;
    });
    return {
      total: filteredData.length,
      jsonData: formatToJson(filteredData)
    }
  }*/

  // JSON形式批量更新文案
  @action updateJsonText(jsonStr) {
    const { project, site, language } = util.getCurrentPath(this.rootStore);
    return axios.put(URL.jsonText, {
      project, site, language, jsonStr
    }).then(() => {
      this.getLanguageData();
    });
  }
}
