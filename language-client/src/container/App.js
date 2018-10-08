import React from "react";
import { observer, inject } from 'mobx-react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import LanHeader from './LanHeader';
import LanBody from './LanBody';

@inject('projectStore')
@observer
class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.projectStore.getProjects();
  }

  render() {
    const { projects, isLoaded } = this.props.projectStore;
    if (!isLoaded) {
      return null;
    }
    const firstPro = projects[0].name;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to={`/${firstPro}`} />)} />
          {
            projects.map((project) => {
              return (
                <Route path="/:project" key={project.name} render={() =>
                  (
                    <div>
                      <LanHeader />
                      <LanBody />
                    </div>
                  )
                } />
              )
            })
          }
        </Switch>
      </BrowserRouter>
    );
  }
};

export default App;
