import React from "react";
import { Layout } from 'antd';
import ModalSet from './ModalSet';
import LanLeft from './LanLeft';
import LanRight from './LanRight';

class LanBody extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <LanLeft />
        <LanRight />
        <ModalSet />
      </Layout>
    );
  }
}

export default LanBody;