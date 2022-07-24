import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';

import axios from 'axios';
import { Commits } from '../../molecules';

interface Users {
  name: string;
  author: {
    login: string;
  };
  commit: {
    message: string;
  };
}

const CommitsPage = (): JSX.Element => {
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
        `https://api.github.com/repos/${username}/${repositoryName}/commits`,
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
        setLoadingStatus(false);
      });
  }, [params, repositoryName, username]);

  return (
    <div className={styles.container}>
      <Commits loadingStatus={loadingStatus} repositories={repositories} />
    </div>
  );
};

export { CommitsPage };
