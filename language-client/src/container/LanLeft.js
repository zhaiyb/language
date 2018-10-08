import { observer, inject } from "mobx-react/index";
import { Layout, Menu, Button, Modal } from 'antd';

const { Sider } = Layout;
const confirm = Modal.confirm;

import React from "react";

@inject('siteStore', 'modalStore')
@observer
class LanLeft extends React.Component {
  constructor(props) {
    super(props);
  }

  // 选中站点菜单
  handleSelect = (item) => {
    const { siteStore } = this.props;
    siteStore.activeById(item.key);
  };
  // 添加站点
  showAddSite = () => {
    this.props.modalStore.showModal('newSite');
  };
  // 发布上线
  publish = () => {
    confirm({
      title: '发布上线',
      content: '确认要发布?',
      onOk() {
        alert('你完了，真的接入CDN了，1分钟后看线上吧');
      },
      onCancel() {},
    });
  };

  render() {
    const { siteStore } = this.props;
    const { sites, activeId } = siteStore;
    return (
      <Sider width={150} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          selectedKeys={[activeId]}
          style={{ borderRight: 0 }}
          onSelect={this.handleSelect}
        >
          {
            sites.map((site) => {
              const { name } = site;
              return <Menu.Item key={name}>
                {name}
              </Menu.Item>
            })
          }
        </Menu>
        <Button type="primary" className="mar10" onClick={this.showAddSite}>添加站点</Button>
        <Button type="danger" className="mar10" onClick={this.publish}>发布上线</Button>
      </Sider>
    );
  }
}

export default LanLeft;