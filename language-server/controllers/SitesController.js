const Sites = require('../models/SitesModel');
const Translations = require('../models/TranslationsModel');

class ProjectsController {
  // 根据业务线获取sites
  static async getSitesByProject(ctx) {
    const { project } = ctx.params;
    const data = await Sites.find({ project })
      .select('name');
    ctx.body = data
  }

  // 新增站点
  static async addSite(ctx) {
    const { project, site } = ctx.request.body;
    await Sites.create({ project, name: site });
    ctx.body = null;
  }

  // 新增主键
  static async addPrimary(ctx) {
    const { project, site, language, primary, translation } = ctx.request.body;
    const siteDoc = await Sites.findOne({ name: site, project });
    let isExist = false;
    siteDoc.i18n.some((item) => {
      if (item.primary === primary) {
        return isExist = true;
      }
    });
    if (isExist) {
      return ctx.body = {
        errMsg: '主键已存在'
      }
    }
    // 在site的i18n中新增一条记录
    siteDoc.i18n.unshift({
      primary,
      createDate: new Date(),
      updateDate: new Date()
    });
    // translations中也新增一条记录
    await Translations.create({
      language,//语种
      site,//所属站点
      primary,//主键
      translation,//译文
      updateDate: new Date(),//最新修改日期
      createDate: new Date()//创建日期
    });
    await siteDoc.save();
    return ctx.body = null;
  }
}

module.exports = ProjectsController;