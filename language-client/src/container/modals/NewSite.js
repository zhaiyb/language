import { inject, observer } from "mobx-react";
import React from "react";
import { Modal, Input } from 'antd';
import { reaction } from "mobx/lib/mobx";

@inject('siteStore', 'modalStore')
@observer
class NewSite extends React.Component {
  constructor(props) {
    super(props);
    this.name = ''; // 输入的站点名称
    this.modalName = 'newSite'; // 对应的modalSet中的名字
    this.isShow = props.modalStore[this.modalName]; // 显隐标志位，用于自动focus
  }

  componentDidMount() {
    this.handler = reaction(
      () => {
        return this.props.modalStore[this.modalName];
      },
      (nowIsShow) => {
        if (!this.isShow && nowIsShow) {
          setTimeout(() => {
            this.siteDom.focus();
          })
        }
        this.isShow = nowIsShow;
      }
    );
  }

  componentWillUnmount() {
    this.handler();
  }

  changeSiteName = (e) => {
    this.name = e.target.value;
  };
  addSite = () => {
    const { name } = this;
    const { modalStore } = this.props;
    if (!name) {
      return alert('请输入站点名称');
    }
    this.props.siteStore.addSite(name)
      .then(() => {
        this.hideModal();
      });
  };
  hideModal = () => {
    this.props.modalStore.hideModal(this.modalName);
  };

  render() {
    const visible = this.props.modalStore[this.modalName];
    return (
      <Modal
        title="添加新站点"
        visible={visible}
        onOk={this.addSite}
        onCancel={this.hideModal}
        closable={false}
      >
        <div className='flex'>
          <label className={'mar-rig5'}>站点名称: </label>
          <Input ref={(dom) => {
            this.siteDom = dom;
          }}
                 style={{ flex: 1 }}
                 onPressEnter={this.addSite}
                 onChange={this.changeSiteName} />
        </div>
      </Modal>
    );
  }
}

export default NewSite;