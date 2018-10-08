import { observable } from "mobx";
import { action } from "mobx/lib/mobx";
import axios from 'axios';
import URL from '../constants/URL';

export default class Projects {
  @observable languageTypes = [];
  @observable projects = [];
  @observable activeId = null;
  @observable isLoaded = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  // 获取所有业务线
  @action getProjects() {
    return axios.get(URL.projects)
      .then((response) => {
        this.projects = response.data;
        this.activeId = this.projects[0].name;
        this.isLoaded = true;
      });
  }
  // 切换业务线
  @action activeById(id) {
    this.activeId = id;
    const { siteStore } = this.rootStore;
    siteStore.getSites().then(() => {
      const { sites } = siteStore;
      if (sites && sites.length) {
        siteStore.activeById(sites[0].name);
      } else {
        siteStore.activeById(null);
      }
    });
  }
  // 添加业务线
  @action add(name) {
    return axios.post(URL.project, {name})
      .then(() => {
        this.getProjects().then(() => {
          this.activeById(name);
        });
      });
  }
}
