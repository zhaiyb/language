// 站点模块
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SiteSchema = new Schema({
  name: String, // 站点名称
  project: String, // 所属工程
  i18n: Array // 多语言主键数组
});
const Sites = mongoose.model('Site', SiteSchema);
module.exports = Sites;