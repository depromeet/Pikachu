/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

class Navigation extends React.Component {

  render() {
    const thumbnail = '//s-media-cache-ak0.pinimg.com/736x/76/47/9d/76479dd91dc55c2768ddccfc30a4fbf5--pikachu-halloween-costume-diy-halloween-costumes.jpg';

    return (
      <div className={s.root} role="navigation">
        <Link className={s.link} to="/login">Log in</Link>
        <img className={s.thumb} src={thumbnail} alt={'thumbnail'} />
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
