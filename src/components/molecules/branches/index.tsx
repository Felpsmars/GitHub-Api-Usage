import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../atoms';
import styles from './styles.module.scss';

interface Users {
  name: string;
}

interface BranchesProps {
  loadingStatus: boolean;
  userName: string | undefined;
  repositoryName: string | undefined;
  repositories: Users[];
}

const Branches = ({
  loadingStatus,
  userName,
  repositoryName,
  repositories,
}: BranchesProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.branches}>
      <Container>
        <>
          {loadingStatus ? (
            <p>cant fetch any branches at this repository</p>
          ) : (
            repositories.map((repository: Users) => {
              return (
                <>
                  <li
                    className={styles.text}
                    key={repository.name}
                    onClick={() =>
                      navigate(
                        `/branches/commits/${userName}/${repositoryName}`
                      )
                    }
                  >
                    {repository.name}
                  </li>
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

export { Branches };
