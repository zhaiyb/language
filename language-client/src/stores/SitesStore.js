import { observable, action } from "mobx";
import axios from 'axios';
import URL from "../constants/URL";

export default class Sites {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable sites = [];
  @observable activeId = '';
  @observable isLoaded = false;

  // 获取当前业务线下的所有站点
  @action getSites() {
    const project = this.rootStore.projectStore.activeId;
    return axios.get(URL.project_sites.replace('{project}', project))
      .then((response) => {
        this.sites = response.data;
      });
  }

  // 切换站点
  @action activeById(id) {
    this.activeId = id;
    id && this.rootStore.languageStore.getLanguageData();
  }

  // 新建站点
  @action addSite(site) {
    const project = this.rootStore.projectStore.activeId;
    return axios.post(URL.site, { project, site }).then(() => {
      this.getSites()
        .then(() => {
          const { sites } = this;
          this.activeById(sites[sites.length - 1].name);
        })
    });
  }

  // 添加主键
  @action addPrimary(primaryParams) {
    const {projectStore, siteStore, languageTypeStore, languageStore} = this.rootStore;
    const project = projectStore.activeId;
    const site = siteStore.activeId;
    const language = languageTypeStore.activeId;
    return axios.post(URL.primary, {
      project,
      site,
      language,
      ...primaryParams
    }).then((response) => {
      const {errMsg} = response.data;
      if(!errMsg) {
        languageStore.getLanguageData();
      }
      return errMsg;
    });
  }
}
