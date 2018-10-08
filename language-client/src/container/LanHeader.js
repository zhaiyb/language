import React from "react";
import { Layout, Menu, Button } from 'antd';
import { observer, inject } from "mobx-react";
import { withRouter, Link } from 'react-router-dom';

const { Header } = Layout;

@withRouter
@inject('projectStore', 'siteStore', 'modalStore')
@observer
class LanHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { projectStore, match } = this.props;
    const project = match.params.project;
    projectStore.activeById(project);
  }

  handleSelect = (item) => {
    const { projectStore } = this.props;
    projectStore.activeById(item.key);
  };
  // 添加业务
  showAddProject = () => {
    this.props.modalStore.showModal('newProject');
  };

  render() {
    const { projects, activeId } = this.props.projectStore;
    return <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[activeId]}
        style={{ lineHeight: '64px' }}
        onSelect={this.handleSelect}
      >
        {
          projects.map((project) => {
            const { name } = project;
            return <Menu.Item key={name}>
              <Link to={`/${name}`}>{name}</Link>
            </Menu.Item>
          })
        }
      </Menu>
      <Button type="primary"
              ghost
              style={{ position: 'absolute', top: 20, right: 10 }}
              onClick={this.showAddProject}>
        添加业务
      </Button>
    </Header>
  }
}

export default LanHeader;