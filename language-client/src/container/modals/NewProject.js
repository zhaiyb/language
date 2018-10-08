import { inject, observer } from "mobx-react";
import { reaction } from "mobx";
import React from "react";
import { Modal, Input } from 'antd';

@inject('projectStore', 'modalStore')
@observer
class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.name = ''; // 输入的业务线名称
    this.modalName = 'newProject'; // 对应的modalSet中的名字
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
            this.projectDom.focus();
          })
        }
        this.isShow = nowIsShow;
      }
    );
  }

  componentWillUnmount() {
    this.handler();
  }

  changeName = (e) => {
    this.name = e.target.value;
  };
  addProject = () => {
    const { name } = this;
    if (!name) {
      return alert('请输入业务名称');
    }
    this.props.projectStore.add(name)
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
        title="添加业务"
        visible={visible}
        onOk={this.addProject}
        onCancel={this.hideModal}
        closable={false}
      >
        <div className='flex'>
          <label className={'mar-rig5'}>业务名称: </label>
          <Input ref={(dom) => {
            this.projectDom = dom;
          }}
                 style={{ flex: 1 }}
                 onPressEnter={this.addProject}
                 onChange={this.changeName} />
        </div>
      </Modal>
    );
  }
}

export default NewProject;