// 语言类型模块
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LanguageTypeSchema = new Schema({
  name: String,
  displayName: String
});
const LanguageTypes = mongoose.model('language_type', LanguageTypeSchema);
module.exports = LanguageTypes;