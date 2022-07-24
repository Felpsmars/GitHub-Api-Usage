import React from 'react';
import { Container } from '../../atoms';
import styles from './styles.module.scss';

interface Users {
  name: string;
  author: {
    login: string;
  };
  commit: {
    message: string;
  };
}

interface CommitsProps {
  loadingStatus: boolean;
  repositories: Users[];
}

const Commits = ({
  loadingStatus,
  repositories,
}: CommitsProps): JSX.Element => {
  return (
    <div className={styles.commits}>
      <Container>
        <>
          {loadingStatus ? (
            <p>cant fetch any commits at this branch</p>
          ) : (
            repositories.map((repository: Users) => {
              return (
                <>
                  <p className={styles.text}>
                    Commiter: {repository.author.login}
                  </p>
                  <p className={styles.text}>
                    Message: {repository.commit.message}
                  </p>
                  <div className={styles.line}></div>
                </>
              );
            })
          )}
        </>
      </Container>
    </div>
  );
};

export { Commits };
