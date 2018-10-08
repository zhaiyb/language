const Router = require('koa-router');
const projectsCtrl = require('./controllers/ProjectsController');
const sitesCtrl = require('./controllers/SitesController');
const languageCtrl = require('./controllers/LanguageController');

const router = new Router();
const pre = '/api';
router
  .get('/', (ctx, next) => {
    ctx.body = 'hi haha2'
  })
  // 业务线api
  .get(`${pre}/projects`, projectsCtrl.getProjects)         // 获取所有业务线
  .post(`${pre}/project`, projectsCtrl.addProject)         // 添加业务线
  /*.put('/api/project/:id', projectsCtrl.updateProjects)  // 更新业务线
  .delete('api/project/:id', projectsCtrl.deleteProjects)*/ //删除业务线

  // 站点api
  .get(`${pre}/:project/sites`, sitesCtrl.getSitesByProject)         // 获取某一业务线下的站点
  .post(`${pre}/site`, sitesCtrl.addSite)   // 添加站点
  .post(`${pre}/primary`, sitesCtrl.addPrimary)   // 添加主键
  /*.put('/api/site/:id', sitesCtrl.updateSite)  // 更新站点
  .delete('api/site/:id', sitesCtrl.deleteSite)*/ //删除站点

  // 语言api
  .get(`${pre}/languageTypes`, languageCtrl.getLanguageTypes)         // 获取所有语言类型
  .get(`${pre}/:project/:site/:language`, languageCtrl.getLanguage) // 获取具体站点下的语言包

  .put(`${pre}/translation`, languageCtrl.updateTranslation)  // 更新译文
  .put(`${pre}/jsonText`, languageCtrl.updateJsonText)  // json批量更新文案
// .delete('api/language/:id', languageCtrl.deleteLanguage); //删除语言

module.exports = router;