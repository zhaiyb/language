import React from "react";
import { Table, Input } from 'antd';
import { inject, observer } from "mobx-react/index";

@inject('languageStore')
@observer
class LanTable extends React.Component {
  constructor(props) {
    super(props);
    this.columnsTpl = [{
      title: '主键',
      dataIndex: 'primary'
    }, {
      title: '原文',
      dataIndex: 'origin'
    }, {
      title: '译文',
      dataIndex: 'translation',
      render: (text, item) => {
        const { primary, translationUpdateDate } = item;
        return <Input key={`${text}-${translationUpdateDate}`}
                      data-primary={primary}
                      defaultValue={text}
                      onBlur={this.updateTranslation} />
      }
    }];
  }

  componentDidMount() {
    this.props.languageStore.getLanguageData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isZh) {
      this.columns = [this.columnsTpl[0], this.columnsTpl[2]];
    } else {
      this.columns = this.columnsTpl;
    }
  }

  updateTranslation = (e) => {
    const { dataset, value } = e.target;
    this.props.languageStore.updateTranslation(dataset.primary, value)
  };

  render() {
    const { data, loading } = this.props;
    const total = data.length;
    return (
      <div>
        <span className={'grey'}>
            译文输入框失去焦点，自动更新，无需其他操作
        </span>
        <Table
          className={'mar-top10'}
          dataSource={data}
          columns={this.columns}
          pagination={{
            showTotal: total => `当前 ${total} 条数据`,
            pageSize: 10,
            total: total
          }}
          loading={loading}
        />
      </div>
    )
  }
}

export default LanTable;
