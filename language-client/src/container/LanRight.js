import React from 'react';
import { inject, observer } from "mobx-react/index";
import Operation from './Operation';
import LanJson from './LanJson'
import LanTable from './LanTable'


@inject('siteStore', 'languageTypeStore', 'languageStore')
@observer
class LanRight extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.languageTypeStore.getLanguageTypes()
      .then(() => {
        this.props.languageStore.getLanguageData();
      });
  }

  render() {
    const { activeId } = this.props.siteStore;
    const isZh = ['cn'].includes(this.props.languageTypeStore.activeId);
    if (!activeId) {
      return null;
    }
    const { isJson, languageTableData, loading } = this.props.languageStore;
    return (
      <div style={{ margin: '10px', width: '100%' }}>
        <Operation />
        {
          isJson ? <LanJson /> : <LanTable
            isZh={isZh}
            loading={loading}
            data={languageTableData} />
        }
      </div>
    );
  }
}

export default LanRight;