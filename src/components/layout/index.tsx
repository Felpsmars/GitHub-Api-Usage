import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../molecules/sidebar';

import styles from './styles.module.scss';

const Layout = (): JSX.Element => {
  return (
    <div className={styles.layout}>
      <SideBar />
      <Outlet />
    </div>
  );
};

export { Layout };
