import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { Repositories } from '../../molecules';

import styles from './styles.module.scss';

interface Users {
  name: string;
  id: number;
}

const RepositoriesPage = (): JSX.Element => {
  const [repositories, setRepositories] = useState<Users[]>([]);
  const [userName, setUserName] = useState<string | undefined>('');
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

  const params = useParams();

  useEffect(() => {
    setLoadingStatus(true);
    setUserName(params.name);
    axios
      .get(`https://api.github.com/users/${userName}/repos`, {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
        validateStatus: function (status) {
          return status < 400;
        },
      })
      .then(({ data }) => {
        setRepositories(data);
      })
      .then(() => {
        setLoadingStatus(false);
      });
  }, [params.name, params.repo, userName]);

  return (
    <div className={styles.container}>
      <Repositories
        loadingStatus={loadingStatus}
        userName={userName}
        repositories={repositories}
      />
    </div>
  );
};

export { RepositoriesPage };
