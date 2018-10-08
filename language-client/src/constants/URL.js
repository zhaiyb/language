// const pre = 'http://192.168.149.4:3000/api';
const pre = 'http://192.168.148.67:3000/api';
const URL = {
  projects: `${pre}/projects`, //多业务线接口
  project: `${pre}/project`, //单业务线接口
  project_sites: `${pre}/{project}/sites`, //某一业务线下的站点接口
  site: `${pre}/site`, //单站点接口
  languageTypes: `${pre}/languageTypes`, //语言类型
  languageData: `${pre}/{project}/{site}/{language}`, //语言表格数据
  primary: `${pre}/primary`, //主键
  explain: `${pre}/explain`, //英文解释
  translation: `${pre}/translation`, //译文
  jsonText: `${pre}/jsonText`, //json批量更新
};
export default URL;