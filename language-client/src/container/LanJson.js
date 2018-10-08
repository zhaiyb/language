import React from 'react';
import { Button, Input, message } from 'antd';
import { inject, observer } from 'mobx-react';

const { TextArea } = Input;


@inject('languageStore')
@observer
class LanJson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: ''
    };
    this.placeholder = '1、现有数据不会展示\n2、请以正确的JSON格式录入需要批量处理的数据\n3、现有数据不会减少';
  }

  jsonKeyDown = (e) => {
    if (e.keyCode === 9 || e.which === 9) {
      e.preventDefault();
      document.execCommand("insertText", false, "    ");
    }
  };
  jsonChange = (e) => {
    this.setState({
      jsonData: e.target.value
    });
  };
  updateTranslation = (e) => {
    const jsonStr = this.state.jsonData;
    let jsonObj = null;
    try {
      jsonObj = JSON.parse(jsonStr);
    } catch (e) {
      return alert('JSON格式错误');
    }

    if (Object.prototype.toString.call(jsonObj) === '[Object Object]') {
      return alert('JSON应该是一个Object');
    }
    this.props.languageStore.updateJsonText(jsonStr)
      .then(() => {
        message.success('修改成功');
      });
  };

  render() {
    const { jsonData } = this.state;
    return (
      <div>
        <TextArea autosize={{ minRows: 10, maxRows: 15 }}
                  placeholder={this.placeholder}
                  value={jsonData}
                  onKeyDown={this.jsonKeyDown}
                  onChange={this.jsonChange}
        />

        <div className={'mar-top10'}>
          <Button type="primary"
                  onClick={this.updateTranslation}>
            提交修改
          </Button>
        </div>
      </div>
    );
  }
}

export default LanJson;
