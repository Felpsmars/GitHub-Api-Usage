import React from 'react'

import styles from './styles.module.scss'

const Card = (): JSX.Element => {
  return (
    <div>
        <h1 className={styles.helloWorld}>OLÁ MUNDO!</h1>
    </div>
  )
}

export { Card }