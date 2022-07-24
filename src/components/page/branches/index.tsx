import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Branches } from '../../molecules';

import styles from './styles.module.scss';

interface Users {
  name: string;
}

const BranchesPage = (): JSX.Element => {
  const [repositoryName, setRepositoryName] = useState<string | undefined>('');
  const [username, setUsername] = useState<string | undefined>('');
  const [statusResponse, setStatusResponse] = useState<number>();
  const [repositories, setRepositories] = useState<Users[]>([]);

  const params = useParams();

  useEffect(() => {
    setUsername(params.name);
    setRepositoryName(params.repo);
    axios
      .get(
        `https://api.github.com/repos/${username}/${repositoryName}/branches`,
        {
          headers: {
            Authorization: `token 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`,
          },
          validateStatus: function (status) {
            setStatusResponse(status);
            console.log(statusResponse);

            return status < 400;
          },
        }
      )
      .then(({ data }) => {
        setRepositories(data);
      });
  }, [params, repositoryName, statusResponse, username]);

  return (
    <div className={styles.container}>
      <Branches
        repositories={repositories}
        repositoryName={repositoryName}
        userName={username}
        statusResponse={statusResponse}
      />
    </div>
  );
};

export { BranchesPage };
