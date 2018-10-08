// 获取语言类型
import { observable, action } from "mobx";
import axios from 'axios';
import URL from '../constants/URL';

export default class Projects {
  @observable languageTypes = [];
  @observable activeId;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @action getLanguageTypes() {
    return axios.get(URL.languageTypes)
      .then((response) => {
        this.languageTypes = response.data;
        this.activeId = response.data[0].name;
      });
  }
  // 切换语言类型
  @action activeById(id) {
    this.activeId = id;
    this.rootStore.languageStore.getLanguageData();
  }
}
