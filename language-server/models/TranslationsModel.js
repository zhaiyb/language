// 语言包模块
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TranslationSchema = new Schema({
  project: String, //所属业务线
  site: String,//所属站点
  language: String,//语种
  primary: String,//主键
  translation: String,//译文
  createDate: Date, // 创建日期
  updateDate: Date//最新修改日期
});

const Translations = mongoose.model('Translation', TranslationSchema);
module.exports = Translations;