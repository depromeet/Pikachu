/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Layout from '../../components/Layout';

injectTapEventPlugin();

const title = 'New User Registration';
const muiTheme = getMuiTheme({
  appBar: {
    height: 80,
    textColor: '#4e4e4e',
    color: '#f5f5f5',
  },
});
export default {

  path: '/test',

  action() {
    return {
      title,
      component: <Layout>
        <MuiThemeProvider muiTheme={muiTheme}>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </MuiThemeProvider>
      </Layout>,
    };
  },

};
