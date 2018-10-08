import React from "react";
import { render } from "react-dom";
import { Provider } from 'mobx-react';
import App from "./container/App";
/*import 'antd/dist/antd.css';*/
import './less/index.less';
import rootStore from './stores/index';

render(
  <Provider {...rootStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
