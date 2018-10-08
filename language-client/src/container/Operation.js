import React from "react";
import { Select, Input, Button, Checkbox } from 'antd';
import { inject, observer } from "mobx-react/index";
import util from '../util';

const Option = Select.Option;

@inject('modalStore', 'languageTypeStore', 'languageStore')
@observer
class Operation extends React.Component {
  constructor(props) {
    super(props);

  }

  handleChangeLanguage = (item) => {
    const { languageTypeStore } = this.props;
    languageTypeStore.activeById(item);
  };
  // 显示添加主键Modal
  showAddPrimary = () => {
    this.props.modalStore.showModal('newPrimary');
  };
  handleChangeFilter = (e) => {
    this.filterLanguage(e.target.value);
  };
  // 过滤表格数据
  filterLanguage = util.debounce((filterStr) => {
    this.props.languageStore.filterStr = filterStr;
  }, 300);

  // 切换视图
  changeView = (e) => {
    this.props.languageStore.changeView(e.target.checked);
  };

  render() {
    const { languageTypeStore, languageStore } = this.props;
    const { isJson } = languageStore;
    return (
      <div className='flex mar-bot10'>
        <Select style={{ width: 120 }}
                value={languageTypeStore.activeId}
                onChange={this.handleChangeLanguage}
        >
          {
            languageTypeStore.languageTypes.map((language) => {
              const { name, displayName } = language;
              return <Option key={name} value={name}>{displayName}</Option>
            })
          }
        </Select>
        <Checkbox
          checked={languageStore.isJson}
          className='mar-left10'
          onChange={this.changeView}>JSON视图</Checkbox>
        {
          !isJson && <Button type="primary"
                             className='mar-left10'
                             onClick={this.showAddPrimary}>添加主键</Button>
        }
        {
          !isJson && <Input className='mar-left10'
                            style={{ flex: 1 }}
                            placeholder={'filter'}
                            defaultValue={languageStore.filterStr}
                            onChange={this.handleChangeFilter} />
        }

      </div>
    );
  }
}

export default Operation;
