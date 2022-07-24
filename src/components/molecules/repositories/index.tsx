import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../atoms';

import styles from './styles.module.scss';

interface Users {
  name: string;
  id: number;
}

interface RepositoriesProps {
  loadingStatus: boolean;
  userName: string | undefined;
  repositories: Users[];
}

const Repositories = ({
  loadingStatus,
  userName,
  repositories,
}: RepositoriesProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.repositories}>
      <Container>
        <>
          {loadingStatus ? (
            <p>User does not exist!</p>
          ) : (
            repositories.map((repository: Users) => {
              return (
                <div className={styles.content}>
                  <p
                    className={styles.text}
                    key={repository.id}
                    onClick={() =>
                      navigate(`/branches/${userName}/${repository.name}`)
                    }
                  >
                    {repository.name}
                  </p>
                  <div className={styles.line}></div>
                </div>
              );
            })
          )}
        </>
      </Container>
    </div>
  );
};

export { Repositories };
