// 获取当前project,site,language
const getCurrentPath = (rootStore) => {
  const { projectStore, siteStore, languageTypeStore } = rootStore;
  const project = projectStore.activeId;
  const site = siteStore.activeId;
  const language = languageTypeStore.activeId;
  return {
    project, site, language
  }
};

const util = {
  getCurrentPath
};
export default util;