import React from 'react';
import styles from './styles.module.scss';

interface Children {
  children: JSX.Element;
}

const Container = ({ children }: Children): JSX.Element => {
  return <div className={styles.container}>{children}</div>;
};

export { Container };
