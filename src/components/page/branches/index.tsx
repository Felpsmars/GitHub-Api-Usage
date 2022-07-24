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
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

  const [repositories, setRepositories] = useState<Users[]>([]);

  const params = useParams();

  useEffect(() => {
    setUsername(params.name);
    setRepositoryName(params.repo);
    setLoadingStatus(true);
    axios
      .get(
        `https://api.github.com/repos/${username}/${repositoryName}/branches`,
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          },
          validateStatus: function (status) {
            return status < 400;
          },
        }
      )
      .then(({ data }) => {
        setRepositories(data);
      })
      .then(() => {
        setLoadingStatus(false);
      });
  }, [params, repositoryName, username]);

  return (
    <div className={styles.container}>
      <Branches
        repositories={repositories}
        repositoryName={repositoryName}
        userName={username}
        loadingStatus={loadingStatus}
      />
    </div>
  );
};

export { BranchesPage };
