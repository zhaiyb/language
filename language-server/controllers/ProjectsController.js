const Projects = require('../models/ProjectsModel');
class ProjectsController {
  // 获取所有业务线
  static async getProjects(ctx) {
    const data = await Projects.find();
    ctx.body = data;
  }

  // 新增业务线
  static async addProject(ctx) {
    const projectName = ctx.request.body.name;
    // projects集合中插入记录
    await Projects.create({
      name: projectName
    });
    ctx.body = null;
  }
}

module.exports = ProjectsController;