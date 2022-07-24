import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../atoms';

import styles from './styles.module.scss';

interface Users {
  name: string;
  id: number;
}

interface RepositoriesProps {
  statusResponse: number | undefined;
  userName: string | undefined;
  repositories: Users[];
}

const Repositories = (props: RepositoriesProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.repositories}>
      <Container>
        <>
          {props.statusResponse === 404 ? (
            <p>User does not exist!</p>
          ) : (
            props.repositories.map((repository: Users) => {
              return (
                <div className={styles.content}>
                  <p
                    className={styles.text}
                    key={repository.id}
                    onClick={() =>
                      navigate(`/branches/${props.userName}/${repository.name}`)
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
