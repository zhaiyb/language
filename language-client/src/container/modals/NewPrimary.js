import { inject, observer } from "mobx-react";
import { reaction } from "mobx";
import React from "react";
import { Modal, Input, Row, Col } from 'antd';

@inject('siteStore', 'modalStore')
@observer
class NewPrimary extends React.Component {
  constructor(props) {
    super(props);
    this.modalName = 'newPrimary';
    this.inputs = [{
      key: 'primary',
      text: '主键:'
    }, {
      key: 'translation',
      text: '译文:'
    }];
    this.inputs.forEach((item) => {
      this[item.key] = '';
    });
    this.isShow = props.modalStore[this.modalName];
  }

  componentDidMount() {
    this.handler = reaction(
      () => {
        return this.props.modalStore[this.modalName];
      },
      (nowIsShow) => {
        if (!this.isShow && nowIsShow) {
          setTimeout(()=>{
            this['primaryDom'].focus();
          })
        }
        this.isShow = nowIsShow;
      }
    );
  }
  componentWillUnmount() {
    this.handler();
  }
  changeInput = (inputKey) => {
    return (e) => {
      this[inputKey] = e.target.value;
    }
  };

  addPrimary = () => {
    const { primary, translation } = this;
    const { siteStore, modalStore } = this.props;
    if (!primary.trim()) {
      return alert('请输入主键');
    }
    if (!translation.trim()) {
      return alert('请输入译文');
    }
    siteStore.addPrimary({
      primary, translation
    }).then((errMsg) => {
      if (errMsg) {
        return alert(errMsg);
      }
      modalStore.hideModal(this.modalName);
    });
  };

  hideNewPrimary = () => {
    this.props.modalStore.hideModal(this.modalName);
  };

  render() {
    const visible = this.props.modalStore[this.modalName];
    return (
      <Modal
        title="添加主键"
        visible={visible}
        onOk={this.addPrimary}
        onCancel={this.hideNewPrimary}
        closable={false}
      >
        {
          this.inputs.map((item) => {
            const { key, text } = item;
            return (
              <Row key={key} className={'mar-bot10'}>
                <Col span={5}>{text}</Col>
                <Col span={19}>
                  <Input ref={(dom) => {
                    this[`${key}Dom`] = dom;
                  }}
                         onPressEnter={this.addPrimary}
                         onChange={this.changeInput(key)} />
                </Col>
              </Row>
            )
          })
        }
      </Modal>
    );
  }
}

export default NewPrimary;