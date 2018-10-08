const LanguageTypes = require('../models/LanguageTypesModel');
const Translations = require('../models/TranslationsModel');
const Sites = require('../models/SitesModel');
const constants = require('../constants');

class LanguageController {
  // 根据语言类型
  static async getLanguageTypes(ctx) {
    const data = await LanguageTypes.find();
    ctx.body = data;
  }

  // 获取site下的语言包
  static async getLanguage(ctx) {
    const { project, site, language } = ctx.params;
    const siteDoc = await Sites.findOne({
      name: site,
      project
    });
    if (!siteDoc) {
      // 找不到site
      return ctx.body = [];
    }
    // 当前选择国家的语言包
    const nowDocs = await Translations.find({
      project,
      site,
      language
    });
    const isCn = language === constants.cn;
    const isUs = language === constants.us;
    let originObj = {}; // 原文对象
    let originDateObj = {}; // 原文更新日期对象
    if (isCn) {
      // 简体中文下"没有"原文

    } else if (isUs) {
      // 英文下以"中文"作为原文
      const cnDocs = await Translations.find({
        project,
        site,
        language: constants.cn
      });
      cnDocs.forEach((item) => {
        originObj[item.primary] = item.translation;
        originDateObj[item.primary] = item.updateDate;
      });
    } else {
      // 其他情况以"英文"作为原文
      const usDocs = await Translations.find({
        project,
        site,
        language: constants.us
      });
      usDocs.forEach((item) => {
        originObj[item.primary] = item.translation;
        originDateObj[item.primary] = item.updateDate;
      });
    }
    const result = siteDoc.i18n.map((item) => {
      const { primary } = item;
      const translationItem = nowDocs.find((nowItem) => {
        return nowItem.primary === primary
      });
      let origin = '';
      let originUpdateDate = null;
      if (isCn) {
        // 简体中文下"没有"原文

      } else {
        origin = originObj[primary];
        originUpdateDate = originDateObj[primary];
      }
      return {
        primary,
        origin,
        originUpdateDate,
        translation: translationItem ? translationItem.translation : '',
        translationUpdateDate: translationItem ? translationItem.updateDate : null
      }
    }).sort((a, b) => {
      // 按照原文更新日期排序
      return b.originUpdateDate - a.originUpdateDate
    });
    ctx.body = result;
  }

  // 更新译文
  static async updateTranslation(ctx) {
    const { project, site, language, primary, translation } = ctx.request.body;
    const lanDoc = await Translations.findOne({
      project,
      site,
      language,
      primary
    });
    if (lanDoc && lanDoc.translation !== translation) {
      lanDoc.translation = translation;
      lanDoc.updateDate = new Date();
      await lanDoc.save()
    } else {
      await Translations.create({
        site,
        language,
        primary,
        translation,
        createDate: new Date(),
        updateDate: new Date()
      });
    }
    ctx.body = null;
  }

  // json批量更新文案
  static async updateJsonText(ctx) {
    const { project, site, language, jsonStr } = ctx.request.body;
    const jsonObj = JSON.parse(jsonStr);
    const newPrimaries = Object.keys(jsonObj);
    // i18n处理
    const siteDoc = await Sites.findOne({
      name: site,
      project
    });
    const oldI18n = siteDoc.i18n;
    const oldPrimaries = oldI18n.map((item) => {
      return item.primary
    });
    const allPrimaries = [...new Set([...oldPrimaries, ...newPrimaries])];
    let siteNeedUpdate = false;
    allPrimaries.forEach((primary) => {
      if (!oldPrimaries.includes(primary)) {
        siteNeedUpdate = true;
        oldI18n.unshift({
          primary,
          createDate: new Date()
        })
      }
    });
    if (siteNeedUpdate) {
      await siteDoc.save();
    }
    // language处理
    for (let i = 0; i < newPrimaries.length; i++) {
      const primaryKey = newPrimaries[i];
      const lanDoc = await Translations.findOne({
        project,
        site,
        language,
        primary: primaryKey
      });
      if (lanDoc && lanDoc.translation !== jsonObj[primaryKey]) {
        lanDoc.translation = jsonObj[primaryKey];
        lanDoc.updateDate = new Date();
        await lanDoc.save();
      } else {
        await Translations.create({
          project,
          site,
          language,
          primary: primaryKey,
          create: new Date(),
          updateDate: new Date(),
          translation: jsonObj[primaryKey]
        });
      }
    }
    ctx.body = null;
  }
}

module.exports = LanguageController;