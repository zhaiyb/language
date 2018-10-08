// 业务线模块
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  name: String
});
// 参数Project 数据库中的集合名称, 不存在会创建.
const Projects = mongoose.model('Project', ProjectSchema);
module.exports = Projects;